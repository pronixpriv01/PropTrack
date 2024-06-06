// badgeUtils.ts

// Funktion zur Bestimmung der Variante basierend auf der Benutzerrolle
export function getAccountRoleBadgeVariant(role: string): "success" | "destructive" {
    if (role === "Manager Developer" || role === "Marketing" || role === "Developer" || role === "DevOps" || role === "Mobile Dev" || role === "CEO" || role === "TestUser") {
    return "success";
    } else {
    return "destructive";
    }
}

// Funktion zur Bestimmung der Variante basierend auf dem Typ der Benachrichtigung
export function getUpdateNotificationBadgeVariant(): string {
    return "secondary";
}

// Funktion zur Bestimmung der Variante basierend auf dem Typ des Erinnerung
export function getReminderBadgeVariant(): string {
    return "default";
}

// Funktion zur Bestimmung der Variante basierend auf dem Status der Zwei-Faktor-Authentifizierung
export function getTwoFactorAuthBadgeVariant(isTwoFactorEnabled: boolean): "success" | "destructive" {
    return isTwoFactorEnabled ? "success" : "destructive";
}
