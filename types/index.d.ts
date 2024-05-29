declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

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

declare type Unit = {
  unitId: string;
  propertyId: string;
  status: string;
  tenantName: string;
  rentAmount: number;
  tasks: Task[];
};

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

declare type Activity = {
  activityId: string;
  taskId: string;
  date: Date;
  description: string;
};

declare type Report = {
  reportId: string;
  propertyId: string;
  date: Date;
  type: string;
  income: number;
  expenses: number;
};

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface PropertyFormProps {
  property: Property;
}

declare interface UnitFormProps {
  unit: Unit;
}

declare interface TaskFormProps {
  task: Task;
}

declare interface ActivityFormProps {
  activity: Activity;
}

declare interface ReportFormProps {
  report: Report;
}

declare interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  properties: Property[];
}

declare interface SidebarProps {
  user: User;
}

declare interface PageHeaderProps {
  title: string;
  description: string;
}

declare interface PropertyListProps {
  properties: Property[];
}

declare interface PropertyDetailProps {
  property: Property;
}

declare interface UnitListProps {
  units: Unit[];
}

declare interface TaskListProps {
  tasks: Task[];
}

declare interface ActivityListProps {
  activities: Activity[];
}

declare interface ReportListProps {
  reports: Report[];
}

declare interface DashboardProps {
  user: User;
  properties: Property[];
  reports: Report[];
}

declare interface HeaderProps {
  user: User;
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}