import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getUsers(req, res);
        case 'GET':
            return await getUser(req, res);
        case 'POST':
            return await createUser(req, res);
        case 'PUT':
            return await updateUser(req, res);
        case 'DELETE':
            return await deleteUser(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Get the logged-in User
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Bsp für das Abrufen des Tokens mit next-auth
        const token = await getToken({ req })

        if (!token || !token.sub) {
            return res.status(401).json({ error: 'Nicht Authorisiert'});
        }

        const userId = token.sub;

        const user = await prisma.user.findUnique({
            where: {
                userId: userId,
            },
            include: {
                properties: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User nicht gefunden' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Error fetching user' });
    }
}

// Get all Users
const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                properties: true,
            },
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users' });
    }
};

// Create a new user
const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};

// Update a user
const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, name, email, password, role } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'USer ID is required '});
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { userId },
            data: { name, email, password, role },
        });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating user' });
    }
}

// Delete a user
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await prisma.user.delete({
        where: { userId },
        });
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user' });
    }
}