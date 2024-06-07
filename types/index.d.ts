
// Typdefinitionen für URL-Suchparameter
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Definition der Benutzerrollen
type AccountRoles = "Manager Developer" | "Marketing" | "Developer" | "DevOps" | "Mobile Dev" | "CEO" | "TestUser";

// Definition der Benachrichtigungstypen
type NotificationType = "AccountRole" | "Reminder" | "Notification";

// Definition von Event-Kategorien und -Typen
type EventCategory = "Meeting" | "Interview" | "Discussion" | "Other";
type EventType = "Monthly Meeting" | "Psychological Test" | "Mid-year discussion" | "Other";

// Typdefinitionen für Anmeldedaten
declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// Typdefinitionen für Anmeldedaten
declare type LoginUser = {
  email: string;
  password: string;
};

// Typdefinitionen für neue Benutzer
declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

// Typdefinitionen für Eigenschaften
declare type Property = {
  propertyId: string;
  name: string;
  location: string;
  totalUnits: number;
  vacantUnits: number;
  occupiedUnits: number;
  maintenanceUnits: number;
  userId: string;
  units: Unit[];
  tasks: Task[];
  reports: Report[];
};

// Typdefinitionen für Einheiten
declare type Unit = {
  unitId: string;
  propertyId: string;
  status: string;
  tenantName: string;
  rentAmount: number;
  tasks: Task[];
};

// Typdefinitionen für Aufgaben
declare type Task = {
  taskId: string;
  propertyId: string;
  unitId: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: Date;
  completionRate: number;
  activities: Activity[];
};

// Typdefinitionen für Aktivitäten
declare type Activity = {
  activityId: string;
  taskId: string;
  date: Date;
  description: string;
};

// Typdefinitionen für Berichte
declare type Report = {
  reportId: string;
  propertyId: string;
  date: Date;
  type: string;
  income: number;
  expenses: number;
};

// Schnittstelle für Authentifizierungsformular
declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

// Schnittstelle für Eigenschaftsformular
declare interface PropertyFormProps {
  property: Property;
}

// Schnittstelle für Einheitsformular
declare interface UnitFormProps {
  unit: Unit;
}

// Schnittstelle für Aufgabenformular
declare interface TaskFormProps {
  task: Task;
}

// Schnittstelle für Aktivitätsformular
declare interface ActivityFormProps {
  activity: Activity;
}

// Schnittstelle für Berichtsformular
declare interface ReportFormProps {
  report: Report;
}

// Benutzerschnittstelle
declare interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  properties: Property[];
}

// Schnittstelle für Kategorie-Select
declare interface CategorySelectProps {
  categories: EventCategory[];
  selectedCategory: EventCategory;
  onChange: (category: EventCategory) => void;
}

// Schnittstelle für Kategorie-Badge
declare interface CategoryBadgeProps {
  category: string;
  type: NotificationType;
}

// Schnittstelle für dynamisches Badge
declare interface DynamicBadgeProps {
  category: string;
  type: NotificationType;
}

// Schnittstelle für Benachrichtigung
declare interface UserNotificationProps {
  id: string;
  category: string;
  message: string;
  date: string;
  status: "read" | "unread";
  type: NotificationType;
}

// Schnittstelle für Benachrichtigungskarte
declare interface NotificationCardProps {
  notifications: UserNotificationProps[];
}

// Schnittstelle für Benachrichtigungstabelle
declare interface NotificationsTableProps {
  notifications: UserNotificationProps[];
}

// Schnittstelle für die rechte Seitenleiste
declare interface RightSidebarProps {
  user: ExtendedUser;
  scheduleItems: ScheduleItem[];
}

// Schnittstelle für die Seitenleiste
declare interface SidebarProps {
  user: User;
}

// Schnittstelle für den Seitenkopf
declare interface PageHeaderProps {
  title: string;
  description: string;
}

// Schnittstelle für Eigenschaftenliste
declare interface PropertyListProps {
  properties: Property[];
}

// Schnittstelle für Eigenschaftsdetails
declare interface PropertyDetailProps {
  property: Property;
}

// Schnittstelle für Einheitsliste
declare interface UnitListProps {
  units: Unit[];
}

// Schnittstelle für Aufgabenliste
declare interface TaskListProps {
  tasks: Task[];
}

// Schnittstelle für Aktivitätsliste
declare interface ActivityListProps {
  activities: Activity[];
}

// Schnittstelle für Berichtsliste
declare interface ReportListProps {
  reports: Report[];
}

// Schnittstelle für Dashboard
declare interface DashboardProps {
  user: User;
  properties: Property[];
  reports: Report[];
}

// Schnittstelle für den Header
declare interface HeaderProps {
  user: User;
}

// Schnittstelle für die Header-Box
declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

// Schnittstelle für Ereignisse im Zeitplan
declare interface ScheduleEventProps {
  time: string;
  title: string;
  participants: string[];
  category: EventCategory;
  type: EventType;
}

// Schnittstelle für Zeitplan-Elemente
declare interface ScheduleItemsProps {
  date: string;
  events: ScheduleEventProps[];
}

// Schnittstelle für Zeitplan-Karte
declare interface ScheduleCardProps {
  scheduleItemsProps: ScheduleItemsProps[];
}

// Schnittstelle für Account-Rollenstile
declare interface AccountRoleStyles {
  bg: string;
  lightBg: string;
  title: string;
  subText: string;
}
