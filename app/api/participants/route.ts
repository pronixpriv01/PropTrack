import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { eventId, userId } = await req.json();

    const participant = await prisma.participant.create({
        data: {
            eventId,
            userId,
        },
    });

    return NextResponse.json(participant);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    await prisma.participant.delete({
        where: { id },
    });

    return NextResponse.json({ message: 'Teilnehmer erfolgreich entfernt'})
}