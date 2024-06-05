import HeaderBox from "@/components/HeaderBox";
import { currentUser } from "@/lib/auth";
import NotificationsTable from "../_components/NotificationsTable";
import { NotificationCard } from "../_components/NotificationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RightSidebar from "../_components/RightSidebar";
import dummyScheduleItems from "@/lib/dummyScheduleItems";

const Dashboard = async ({ searchParams: { id, page} }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const user = await currentUser();

    const notifications: UserNotificationProps[] = [
        {
          id: "1",
          category: "CEO",
          message: "Andi Restu sent you a message",
          date: "2022-08-08T07:00:00Z",
          status: "unread",
        },
        {
          id: "2",
          category: "Reminder",
          message: "Enter new employee data in system",
          date: "2022-08-07T16:00:00Z",
          status: "read",
        },
        // Weitere Benachrichtigungen hier hinzufügen
      ];


    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                        type="greeting"
                        title="Wilkommen"
                        user={user?.name || 'Guest'}
                        subtext="Hier sind, ein paar nützliche Infos für dich."
                    />
                </header>
                
                <NotificationCard notifications={notifications} />
            </div>
            <RightSidebar user={user} scheduleItems={dummyScheduleItems} />
        </section>
    )
}

export default Dashboard;