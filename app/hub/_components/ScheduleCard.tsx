import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScheudleItem from "./ScheduleItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ScheudleCard = ({ scheduleItemsProps }: ScheduleCardProps) => {
    const today = new Date().toISOString().split('T')[0];
    let todayEventCount = 0;
    let nextDayEventDisplayed = false;

    return (
        <Card className="max-w-[440px] min-h-[590px] shadow-md rounded-2xl">
            <CardHeader>
                <CardTitle>
                  {scheduleItemsProps.length > 0 && (
                    <div className="flex flex-row">
                        <h1 className="text-xl">Schedule</h1>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                  )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {scheduleItemsProps.map((scheduleItem, index) => (
                    <div key={index} className="mb-4">
                        <p>{scheduleItem.date}</p>
                        {scheduleItem.events.map((event, eventIndex) => (
                            <ScheudleItem
                                key={eventIndex}
                                time={event.time}
                                title={event.title}
                                participants={event.participants}
                            />
                        ))}
                        <Separator/>
                    </div>
                ))}
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

export default ScheudleCard;