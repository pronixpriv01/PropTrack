import { UserRole, EventCategory, EventType } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }
        
        return true;
    }, {
        message: "Neues Passwort ist erforderlich!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Aktuelles Passwort ist erforderlich!",
        path: ["password"]
    });

export const GuestSchema = z.object({
    name: z.optional(z.string().min(1, {
        message: "Ein Benutzername ist erfolderlich!"
    })),
    refcode: z.optional(z.string()),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Gültige Email erforderlich"
    }),
    password: z.string().min(1, {
        message: "Password erforderlich"
    }),
    code: z.optional(z.string()),
    isGuest: z.optional(z.boolean()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Gültige Email erforderlich"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 Zeichen erforderlich"
    }),
    name: z.string().min(1, {
        message: "Name ist erforderlich"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Gültige Email erforderlich"
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6 ,{
        message: "Minimum 6 Zeichen erforderlich"
    }),
})

export const EventSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    description: z.string().optional(),
    category: z.array(z.enum([EventCategory.INTERVIEW, EventCategory.DISCUSSION, EventCategory.MEETING, EventCategory.OTHER])),
    type: z.array(z.enum([EventType.DAILY_MEETING, EventType.MID_YEAR_DISCUSSION, EventType.MONTHLY_MEETING, EventType.OTHER])),
    date: z.date(),
    userId: z.string().uuid(),
    participants: z.array(z.string().uuid()), // array of user IDs
});

export const TaskSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1, "Titel ist erforderlich"),
    description: z.string().optional(),
    dueDate: z.date().optional(),
    eventId: z.string().uuid(),
    userId: z.string().uuid(),
});

export const ParticipantSchema = z.object({
    eventId: z.string().uuid(),
    userId: z.string().uuid(),
});

export type Event = z.infer<typeof EventSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
