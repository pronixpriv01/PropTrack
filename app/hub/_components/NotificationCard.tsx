import { ExtendedUser } from "@/next-auth";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NotificationsTable from "./NotificationsTable";

export const NotificationCard = ({ notifications }: NotificationCardProps) => {
    return (
        <Card className="max-w-[840px] shadow-md">
            <CardHeader>
                <p>
                    Benachrichtigungen
                </p>
            </CardHeader>
            <CardContent>
                <NotificationsTable notifications={notifications} />
            </CardContent>
        </Card>
    )
}