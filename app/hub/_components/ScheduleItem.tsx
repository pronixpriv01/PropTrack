import { cn, getEventCategoryStyles } from "@/lib/utils";
import ScheduleCategoryBadge from "./ScheduleCategoryBadge";

const categoryColors = {
    Meeting: 'bg-blue-500',
    Interview: 'bg-red-500',
    Discussion: 'bg-green-500',
    default: 'bg-gray-500',
  };

const ScheudleItem = ({ time, title, participants, category, type }: ScheduleEventProps) => {

    return (
        // <div className="schedule-item">
        //     <div className="schedule-time">{time}</div>
        //     <div className={categoryStyles}>
        //         <div className="schedule-title">{title}</div>
        //         {participants && participants.length > 0 && (
        //             <div className="schedule-participants">{participants.join(", ")}</div>
        //         )}
        //     </div>
        // </div>

        <div className="flex items-center my-4 p-2 rounded-md shadow-md bg-gray-100 bg-opacity-30 hover:drop-shadow-md hover:shadow-slate-300 shadow-slate-200 cursor-pointer">
            <div className="mr-8 text-lg font-bold">{time}</div>
            <ScheduleCategoryBadge category={category} />
            <div className="ml-6">
                <p className="font-bold">{title}</p>
                <p className="text-sm text-gray-500">{participants.join(', ')}</p>
                <p className="text-sm text-gray-400">{type}</p>
            </div>
        </div>
    );
};

export default ScheudleItem;