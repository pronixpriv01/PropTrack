import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScheduleCategoryBadge from "./ScheduleCategoryBadge";
import CategorySelect from "./ScheduleDialogSelect";
import ParticipantsCombobox from "./ParticipantsCombobox";
import ComboboxPopover from "./ComboboxPopover";
import { BellIcon, ClipboardIcon, Clock, EditIcon, Trash2Icon } from "lucide-react";
import ScheudleItem from './ScheduleItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/utils";
import { EventCard } from "./EventCard";

const ScheduleDialog = ({ isOpen, onClose, scheduleItem }: ScheduleDialogProps) => {
    if (!scheduleItem) return null;

    // const { dateOnly, timeOnly } = formatDateTime(new Date(scheduleItem.time));

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <ScheduleCategoryBadge category={scheduleItem.category}/>
                        <DialogTitle className="ml-4">{scheduleItem.title}</DialogTitle>
                    </div>
                    <DialogClose asChild>
                        <Button variant="ghost" onClick={onClose}>
                            <span aria-hidden>×</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <EventCard scheduleItem={scheduleItem} />
                {/* <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Clock />
                        <DialogDescription>{dateOnly}, {timeOnly}</DialogDescription>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 ml-2">
                        <span>Teilnehmer:</span>
                    </div>
                    {scheduleItem.participants.map((paricipant, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-4 ml-4">
                            <Avatar className="bg-blackA1 inline-flex h-[24px] w-[24px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                <AvatarImage src="icons/user.svg" alt="participant.name"/>
                                <AvatarFallback>{paricipant[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm">{paricipant}</p>
                                <p className="text-sm text-gray-500">mustermail@root.de</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between space-x-2 mb-4">
                        <a href="event/link" className="text-blue-500" target="_blank" rel="noopener noreferrer">
                            <p>Event Link</p>
                        </a>
                        <ClipboardIcon />
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <BellIcon />
                        <DialogDescription>Benachrichtigung {scheduleItem.time} bevor</DialogDescription>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="ghost" onClick={() => console.log("Event bearbeiten")}>
                            <EditIcon />
                        </Button>
                        <Button variant="ghost" onClick={() => console.log("Event löschen")}>
                            <Trash2Icon />
                        </Button>
                    </div>
                </div> */}
            </DialogContent>
        </Dialog>
    )
}

export default ScheduleDialog;