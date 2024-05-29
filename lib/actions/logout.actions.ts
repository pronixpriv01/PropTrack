"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    // Wird so geschrieben, wenn vor dem Logout noch server actions gebraucht werden
    
    await signOut();
}