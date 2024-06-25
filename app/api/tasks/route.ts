import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const tasks = await prisma.task.findMany({
        include: {
            participants: {
                include: {
                    user: true,
                }
            }
        }
    });

    return NextResponse.json(tasks);
}

export async function PUT(req: NextRequest) {
    const { id, title, description, dueDate } = await req.json();

    const task = await prisma.task.update({
        where: { id },
        data: {
            title,
            description,
            dueDate: new Date(dueDate)
        }
    });

    return NextResponse.json(task)
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    await prisma.task.delete({
        where: { id },
    });

    return NextResponse.json({ message: 'Task wurde gelöscht' })
}