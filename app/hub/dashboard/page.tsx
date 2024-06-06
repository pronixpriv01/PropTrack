import HeaderBox from "@/components/HeaderBox";
import { currentUser } from "@/lib/auth";
import NotificationsTable from "../_components/NotificationsTable";
import { NotificationCard } from "../_components/NotificationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RightSidebar from "../_components/RightSidebar";
import dummyScheduleItems from "@/lib/dummyScheduleItems";
import { dummyNotifications } from "@/lib/dummyNotifications";

const Dashboard = async ({ searchParams: { id, page} }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const user = await currentUser();

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
                
                <NotificationCard notifications={dummyNotifications} />
            </div>
            <RightSidebar user={user} scheduleItems={dummyScheduleItems} />
        </section>
    )
}

export default Dashboard;