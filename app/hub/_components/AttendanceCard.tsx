import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AttendanceCard = () => {
    return (
        <Card className="max-w-[440px] shadow-md">
        <CardHeader>
            <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
            <p>Sick Leave: 8</p>
            <p>Leave: 2</p>
            <p>Overtime: 12</p>
            </div>
        </CardContent>
        </Card>
    );
};

export default AttendanceCard;
