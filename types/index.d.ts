
// Typdefinitionen für URL-Suchparameter
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Definition der Benutzerrollen
type AccountRoles = "Manager Developer" | "Marketing" | "Developer" | "DevOps" | "Mobile Dev" | "CEO" | "TestUser";

// Definition der Benachrichtigungstypen
type NotificationType = "assignment" | "status_change" | "general";

// Definition der Badge-Variant
type VariantType = "default" | "secondary" | "success" | "reminder" | "message" | "notification";

// Definition von Event-Kategorien und -Typen
type EventCategory = "Meeting" | "Interview" | "Discussion" | "Other";
type EventType = "Monthly Meeting" | "Daily Meeting" | "Mid-year discussion" | "Other";

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
  categories: string[];
  selectedCategory: string | null;
  onChange: (value: string | null) => void;
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

// Typdefinition für DynamicCombobox-Optionen
declare interface DynamicComboboxOption<T> {
  value: T;
  label: string;
}

// Typdefinitionen für DynamicCombobox-Props
declare interface DynamicComboboxProps<T extends string | number | boolean | symbol> {
  options: DynamicComboboxOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
}

// Typdefinition für ParticipantsCombobox-Props
declare interface ParticipantsComboboxProps {
  paritcipants: string[];
  selectedIser: string | null;
  onChange: (value: string | null) => void;
}

// Typdefinition für PopoberCombobox-Props
declare interface PopoverComboboxProps {
  options: DynamicComboboxOption<string>[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
  placeholder?: string;
}
// Schnittstelle für Ereignisse im Zeitplan
declare interface ScheduleEventProps {
  time: string;
  title: string;
  participants: string[];
  category: string;
  type: string;
  notificationTime: string;
}

// Schnittstelle für Zeitplan-Elemente
declare interface ScheduleItemsProps {
  date: string;
  events: ScheduleEventProps[] | null;
}

declare interface EventCardProps {
  scheduleItem: ScheduleEventProps | null;
}

declare interface EventFormProps {
  existingEvent?: z.infer<typeof EventSchema>;
  users: User[];
}


// Schnittstelle für Zeitplan-Karte
declare interface ScheduleCardProps {
  scheduleItemsProps: ScheduleItemsProps[];
}

// Schnittstelle für Zeitplan-Dialog
interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleItem: ScheduleEventProps | null;
}

interface ScheduleComboboxProps {
  participants: string[];
  selectedUser: string | null;
  onChange: (user: string) => void;
}

declare interface NotificationProps {
  id: string;
  category: string;
  title: string;
  description: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'archived';
  type: NotificationType;
  userId: string;
}

declare interface NotificationManager {
  add: (notification: Omit<NotificationProps, 'status'>) => void;
  remove: (id: string) => void;
  items: NotificationProps[];
}

declare interface NotificationConfig {
  maxNotifications?: number;
}

// declare interface NotificationContextProps {
//   notifications: NotificationProps[];
//   addNotification: (notification: NotificationProps) => void;
//   updateNotificationStatus: (id: string, status: 'unread' | 'read' | 'archived') => void;
//   clearNotifications: () => void;
// }

// declare interface NotificationProviderProps {
//   children: React.ReactNode;
// }

declare interface NotificationsTableProps {
  notifications?: NotificationProps[];
}

declare interface NotificationCardProps {
  notifications: NotificationProps[]
}

// Schnittstelle für Account-Rollenstile
declare interface AccountRoleStyles {
  bg: string;
  lightBg: string;
  title: string;
  subText: string;
}
