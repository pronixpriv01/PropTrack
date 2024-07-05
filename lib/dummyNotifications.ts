export const dummyNotifications: NotificationProps[] = [
    {
        id: "1",
        category: "Other",
        message: "Schulung für neue Mitarbeiter",
        date: new Date(Date.now() - (20 * 1000)), // Vor 20 Sekunden
        status: "unread",
        type: "Notification",
    },
    {
        id: "2",
        category: "Discussion",
        message: "Team-Diskussion über Projektupdates",
        date: new Date(Date.now() - (4 * 60 * 1000)), // Vor 4 Minuten
        status: "unread",
        type: "Notification",
    },
    {
        id: "3",
        category: "Other",
        message: "Überprüfen Sie den Wartungsstatus des Servers",
        date: new Date(Date.now() - (60 * 60 * 1000)), // Vor 1 Stunde
        status: "unread",
        type: "Notification",
    },
    {
        id: "4",
        category: "Reminder",
        message: "Monatsbericht einreichen",
        date: new Date(Date.now() - (5 * 60 * 60 * 1000)), // Vor 5 Stunden
        status: "unread",
        type: "Reminder",
    },
    {
        id: "5",
        category: "Interview",
        message: "Interview mit John Doe",
        date: new Date(Date.now() - (24 * 60 * 60 * 1000)), // Vor 1 Tag
        status: "unread",
        type: "Notification",
    },
    {
        id: "6",
        category: "Meeting",
        message: "Monatliches Team-Meeting",
        date: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)), // Vor 5 Tagen
        status: "unread",
        type: "Notification",
    },
];
