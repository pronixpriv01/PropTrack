"use server"

import { db } from "@/lib/db";
import { TaskSchema } from "@/schemas";
import { error } from "console";
import * as z from "zod"

// Funktion zum Laden der Tasks
export const loadTasks = async () => {
    try {
        const tasks = await db.task.findMany();
        return tasks;
    } catch (error) {
        console.log('Fehler beim laden der Tasks:', error);
        return { error: "Fehler beim laden der Tasks" }
    }
}

// Funktion zum Erstellen eines Tasks
export const createTask = async (taskData: any) => {
    // Validierung der Eingabedaten
    const parsedTaskData = TaskSchema.safeParse(taskData);
    if (!parsedTaskData.success) {
        return { error: parsedTaskData.error.errors };
    }

    try {
        const createdTask = await db.task.create({
            data: parsedTaskData.data,
        })
        return createdTask;
    } catch (error) {
        return { error: "Fehler beim erstellen eines Tasks"}
    }
}

// Funktion zum Aktualisieren eines Tasks
export const updateTask = async (taskId: string, taskData: any) => {
    // Validierung der Eingabedaten
    const parsedTaskData = TaskSchema.safeParse(taskData);
    if (!parsedTaskData.success) {
        return { error: parsedTaskData.error.errors };
    }

    try {
        const updatedTask = await db.task.update({
            where: { id: taskId },
            data: parsedTaskData.data,
        });
        return updatedTask;
    } catch (error) {
        return { error: "Fehler beim speichern des Tasks" }
    }
}

// Funktion zum Löschen eines Tasks
export const deleteTask = async (taskId: string) => {
    try {
        await db.task.delete({
            where: { id: taskId },
        });
        return { success: "Task erfolgrecih gelöscht" };
    } catch (error) {
        return { error: "Fehler beim löschen des Tasks" };
    }
}