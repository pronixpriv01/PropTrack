import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { cn, formatDateTime, formatTimeAgo, removeSpecialCharacters } from "@/lib/utils";
import DynamicBadge from "./DynamicBadge";

const NotificationsTable = ({ notifications }: NotificationsTableProps) => {
  if (!notifications || notifications.length === 0) {
    return <p>Keine Benachrichtigungen</p>;
  }


  const sortedNotifications = notifications.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })

  const latestNotifications = sortedNotifications.slice(0, 6);

  return (
    <>
      <Table className="max-w-[765px]">
          <TableCaption className="sr-only">Latest Notifications</TableCaption>
          <TableBody>
            {latestNotifications.map((notification) => (
              <TableRow key={notification.id} className="shadow-sm border-b last:border-0 hover:cursor-default">
                <TableCell className="p-2">
                  {notification.status === "unread" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  <DynamicBadge 
                    category={notification.category} 
                    type={notification.type}
                    role={notification.role}
                  />
                </TableCell>
                <TableCell className="p-2 text-gray-700">{notification.message}</TableCell>
                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatTimeAgo(new Date(notification.date))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </>
  )
}

export default NotificationsTable;