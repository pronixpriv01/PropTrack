import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScheduleCategoryBadge from "./ScheduleCategoryBadge";
import CategorySelect from "./ScheduleDialogSelect";

interface ScheduleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    scheduleItem: ScheduleEventProps | null;
}

const ScheduleDialog = ({ isOpen, onClose, scheduleItem }: ScheduleDialogProps) => {
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>(scheduleItem?.category || "Other");

    if (!scheduleItem) return null;

    const categories: EventCategory[] = ["Meeting", "Interview", "Discussion", "Other"];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex flex-row">
                    <ScheduleCategoryBadge category={scheduleItem.category}/>
                    <div className="flex flex-col ml-5 p-2 justify-between">
                        <DialogTitle>{scheduleItem.title}</DialogTitle>
                        <DialogDescription>{scheduleItem.time}</DialogDescription>
                    </div>
                </DialogHeader>
                <div>
                    <p>Participants: {scheduleItem.participants.join(', ')}</p>
                    <CategorySelect
                        selectedCategory={selectedCategory}
                        onChange={setSelectedCategory}
                        categories={categories}
                    />
                    {/* <p>Category: {scheduleItem.category} </p> */}
                    <p>Type: {scheduleItem.type}</p>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ScheduleDialog;