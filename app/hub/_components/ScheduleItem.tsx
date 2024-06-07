"use client"

import ScheduleCategoryBadge from "./ScheduleCategoryBadge";
import { useState } from "react";
import ScheduleDialog from "./ScheduleDialog";
import { formatDateTime } from "@/lib/utils";

const categoryColors = {
    Meeting: 'bg-blue-500',
    Interview: 'bg-red-500',
    Discussion: 'bg-green-500',
    default: 'bg-gray-500',
  };

const ScheudleItem = ({ time, title, participants, category, type }: ScheduleEventProps) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        setDialogOpen(true);
    }

    const formattedTime = typeof time === 'string' ? time : formatDateTime(time).dateOnly;

    return (
        <>
            <div 
            onClick={handleClick}
            className="flex items-center my-4 p-2 rounded-md shadow-md bg-gray-100 bg-opacity-30 hover:drop-shadow-md hover:shadow-slate-300 shadow-slate-200 cursor-pointer">
                <div className="mr-8 text-lg font-bold">{formattedTime}</div>
                <ScheduleCategoryBadge category={category} />
                <div className="ml-6">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm text-gray-500">{participants.join(', ')}</p>
                    <p className="text-sm text-gray-400">{type}</p>
                </div>
            </div>
            <ScheduleDialog 
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                scheduleItem={{time: formattedTime, title, participants, category, type }}
            />
        </>

    );
};

export default ScheudleItem;