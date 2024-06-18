import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScheudleItem from "./ScheduleItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";

const ScheduleCard = ({ scheduleItemsProps }: ScheduleCardProps) => {
    const today = new Date().toISOString().split('T')[0];
    let todayEventCount = 0;
    let nextDayEventDisplayed = false;

    const hasTodayEvents = scheduleItemsProps.some(
        (scheudleItem) => scheudleItem.date === today && scheudleItem.events && scheudleItem.events.length > 0
    );

    return (
        <Card className="max-w-[440px] max-h-[590px] shadow-md rounded-2xl">
            <CardHeader>
                <CardTitle>
                  {scheduleItemsProps.length > 0 && (
                    <div className="flex flex-row items-center">
                        <h1 className="text-xl mr-2">Zeitplan</h1>
                        {hasTodayEvents && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                    </div>
                  )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {scheduleItemsProps.map((scheduleItem, index) => {
                    const isToday = scheduleItem.date === today;
                    const { dateOnly: formattedDate } = formatDateTime(new Date(scheduleItem.date));
                    const displayDate = isToday ? `Heute - ${formattedDate}`: formattedDate;

                    if (isToday && todayEventCount < 2) {
                        const eventsToShow = scheduleItem.events?.slice(0, 2 - todayEventCount) || [];
                        todayEventCount += eventsToShow.length;

                        return (
                            <div key={index} className="my-2">
                                <p>{displayDate}</p>
                                {eventsToShow.map((event, eventIndex) => (
                                    <ScheudleItem
                                        key={eventIndex}
                                        time={event.time}
                                        title={event.title}
                                        participants={event.participants}
                                        category={event.category}
                                        type={event.type} notificationTime={""}                                    />
                                ))}
                                {todayEventCount === 2 && <Separator/>}
                            </div>
                        );
                    } else if (!isToday && todayEventCount >= 2 && !nextDayEventDisplayed) {
                        nextDayEventDisplayed = true;
                        return (
                            <div key={index} className="my-4">
                                <p>{displayDate}</p>
                                {scheduleItem.events && (
                                    <ScheudleItem
                                        key={0}
                                        time={scheduleItem.events[0].time}
                                        title={scheduleItem.events[0].title}
                                        participants={scheduleItem.events[0].participants}
                                        category={scheduleItem.events[0].category}
                                        type={scheduleItem.events[0].type}
                                        notificationTime={""}                                    />
                                )}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
                <Button
                    className="w-full h-[48px] bg-cyan-400 hover:bg-slate-200 bg-opacity-20 rounded-2xl"
                    variant="secondary"
                >
                    <p className="font-semibold text-black">Mehr ansehen</p>
                </Button>
            </CardContent>
        </Card>
    )
}

export default ScheduleCard;