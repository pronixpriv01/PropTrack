export const dummyNotifications: NotificationProps[] = [
    {
        id: "1",
        category: "Other",
        title: "Neue Mitarbeiterschulung",
        description: "Schulung für neue Mitarbeiter",
        message: "Schulung für neue Mitarbeiter",
        date: new Date(Date.now() - (20 * 1000)).toISOString(), // Vor 20 Sekunden
        status: "unread",
        type: "general",
        userId: "1",
    },
    {
        id: "2",
        category: "Discussion",
        title: "Team-Diskussion",
        description: "Diskussion über Projektupdates",
        message: "Team-Diskussion über Projektupdates",
        date: new Date(Date.now() - (4 * 60 * 1000)).toISOString(), // Vor 4 Minuten
        status: "unread",
        type: "general",
        userId: "2",
    },
    {
        id: "3",
        category: "Other",
        title: "Wartungsstatus Überprüfung",
        description: "Überprüfen Sie den Wartungsstatus des Servers",
        message: "Überprüfen Sie den Wartungsstatus des Servers",
        date: new Date(Date.now() - (60 * 60 * 1000)).toISOString(), // Vor 1 Stunde
        status: "unread",
        type: "general",
        userId: "3",
    },
    {
        id: "4",
        category: "Reminder",
        title: "Monatsbericht Erinnerung",
        description: "Monatsbericht einreichen",
        message: "Monatsbericht einreichen",
        date: new Date(Date.now() - (5 * 60 * 60 * 1000)).toISOString(), // Vor 5 Stunden
        status: "unread",
        type: "assignment",
        userId: "4",
    },
    {
        id: "5",
        category: "Interview",
        title: "Interview",
        description: "Interview mit John Doe",
        message: "Interview mit John Doe",
        date: new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString(), // Vor 1 Tag
        status: "unread",
        type: "general",
        userId: "5",
    },
    {
        id: "6",
        category: "Meeting",
        title: "Monatliches Team-Meeting",
        description: "Team-Meeting zur Besprechung der monatlichen Fortschritte",
        message: "Monatliches Team-Meeting",
        date: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString(), // Vor 5 Tagen
        status: "unread",
        type: "general",
        userId: "6",
        role: "Manager Developer", // Beispielhafte Rolle h
    },
]