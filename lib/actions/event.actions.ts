"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { EventSchema, TaskSchema, ParticipantSchema } from "@/schemas";

export const createEvent = async (values: z.infer<typeof EventSchema>) => {
    const validatedFields = EventSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Ungültige Felder!" };
    }

    try {
        const createdEvent = await db.event.create({
            data: {
                title: validatedFields.data.title,
                description: validatedFields.data.description,
                category: { set: validatedFields.data.category},
                type: { set: validatedFields.data.type},
                date: validatedFields.data.date,
                userId: validatedFields.data.userId,
                participants: {
                    create: validatedFields.data.participants.map(participantId => ({
                        userId: participantId,
                    })),
                }

            }
        });
        return { success: "Event erfolgreich erstellt!", event: createdEvent };
    } catch (error) {
        return { error: "Fehler beim Erstellen des Events"};
    }
}

export const updateEvent = async (eventId: string, values: z.infer<typeof EventSchema>) => {
    const validateFields = EventSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Ungültige Felder!" };
    }

    try {
        const updatedEvent = await db.event.update({
            where: { id: eventId },
            data: {
                title: validateFields.data.title,
                description: validateFields.data.description,
                category: { set: validateFields.data.category },
                type: { set: validateFields.data.type },
                date: validateFields.data.date,
                userId: validateFields.data.userId,
                participants: {
                    deleteMany: {},
                    create: validateFields.data.participants.map(participantId => ({
                        userId: participantId,
                    })),
                },
            },
        });
        return { success: "Event erfolgreich aktualisiert!", event: updatedEvent };
    } catch (error) {
        return { error: "Fehler beim Aktualisieren des Events" };
    }
}

export const addParticipant = async (values: z.infer<typeof ParticipantSchema>) => {
    const validatedFields = ParticipantSchema.safeParse(values);
    
    if (!validatedFields.success) {
        return { error: "Ungültige Felder!" };
    }

    try {
        const addedParticipant = await db.participant.create({
            data: {
                eventId: validatedFields.data.eventId,
                userId: validatedFields.data.userId
            }
        });

        return { success: "Teilnehmer erfolgreich hinzugefügt!", participant: addedParticipant };
    } catch (error) {
        return { error: "Fehler beim Hinzufügen des Teilnehmers" };
    }
};

export const removeParticipant = async (eventId: string, userId: string) => {
    try {
        const participant = await db.participant.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId
                }
            }
        });

        if (!participant) {
            return { error: "Teilnehmer nicht gefunden" };
        }

        await db.participant.delete({
            where: { id: participant.id }
        });
        
        return { success: "Teilnehmer erfolgreich entfernt!" };
    } catch (error) {
        return { error: "Fehler beim Entfernen des Teilnehmers" };
    }
}