import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { notificationsCategoryStyles } from "@/constants";
import { cn, formatDateTime, removeSpecialCharacters } from "@/lib/utils";

const CategoryBadge = ({ category }: CatergoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } = notificationsCategoryStyles[category as keyof typeof notificationsCategoryStyles] || notificationsCategoryStyles.default;

  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)}/>
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
}

const NotificationsTable = ({ notifications }: NotificationsTableProps) => {
  return (
    <>
      <Table className="max-w-[765px]">
          <TableCaption className="sr-only">Latest Notifications</TableCaption>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} className="border-b last:border-0">
                <TableCell className="p-2">
                  {notification.status === "unread" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  <CategoryBadge category={notification.category} />
                </TableCell>
                <TableCell className="p-2 text-gray-700">{notification.message}</TableCell>
                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatDateTime(new Date(notification.date)).dateTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </>
  )
}

export default NotificationsTable;