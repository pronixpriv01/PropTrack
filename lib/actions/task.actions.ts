"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { TaskSchema } from "@/schemas";

export const loadTasks = async () => {
    try {
        const tasks = await db.task.findMany();
        return { tasks };
    } catch (error) {
        return { error: "Fehler beim Laden der Tasks" };
    }
}

export const createTask = async (taskData: z.infer<typeof TaskSchema>) => {
    const parsedTaskData = TaskSchema.safeParse(taskData);
    if (!parsedTaskData.success) {
        return { error: "Ungültige Felder" };
    }

    try {
        const createdTask = await db.task.create({
            data: parsedTaskData.data,
        });
        return { success: "Aufgabe erfolgrecih erstellt!", task: createdTask };
    } catch (error) {
        return { error: "Fehler beim Erstellen einer Aufgabe" };
    }
}

export const updateTask = async (taskId: string, taskData: z.infer<typeof TaskSchema>) => {
    const parsedTaskData = TaskSchema.safeParse(taskData);
    if (!parsedTaskData.success) {
        return { error: "Ungültige Felder!" };
    }

    try {
        const updatedTask = await db.task.update({
            where: { id: taskId },
            data: parsedTaskData.data,
        });
        return {success: "Aufgabe erfolgreich aktualiseiert!", task: updatedTask};
    } catch (error) {
        return { error: "Fehler beim Speichern der Aufgabe" };
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        await db.task.delete({
            where: { id: taskId } 
        })
        return { success: "Aufgabe erfolgreich gelöscht!" };
    } catch (error) {
        return { error: "Fehler beim Löschen der Aufgabe" };
    }
}