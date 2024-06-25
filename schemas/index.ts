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
        message: "Neues passwort ist erforderlich!",
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

export const EventSchema = z.object({
    time: z.optional(z.date()),
    title: z.optional(z.string().min(1)),
    category: z.enum([EventCategory.MEETING, EventCategory.INTERVIEW, EventCategory.DISCUSSION, EventCategory.OTHER]),
    type: z.enum([EventType.DAILY_MEETING, EventType.MONTHLY_MEETING, EventType.MID_YEAR_DISCUSSION, EventType.OTHER]),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Gültige Email erforderlich"
    }),
    password: z.string().min(1, {
        message: "Password erforderlich"
    }),
    code: z.optional(z.string()),
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

export const TaskSchema = z.object({
    title: z.string().min(1, "Titel ist erforderlich"),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    eventId: z.string().uuid(),
    userId: z.string().uuid(),
});