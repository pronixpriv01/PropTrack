import Link from "next/link";
import Image from "next/image";
import ScheduleCard from "./ScheduleCard";
import AttendanceCard from './AttendanceCard';

const RightSidebar = ({ user, scheduleItems }: RightSidebarProps) => {
    return (
        <aside className="right-sidebar">
            <section className="mt-8">
                <ScheduleCard scheduleItemsProps={scheduleItems} />
            </section>

            <section className="mt-8">
                <AttendanceCard />
            </section>
        </aside>
    )
}

export default RightSidebar;