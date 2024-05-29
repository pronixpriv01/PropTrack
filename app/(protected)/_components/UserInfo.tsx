import { ExtendedUser } from "@/next-auth";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UserInfoList from "./UserInfoList";

import { Server, Computer, Shield, Settings } from 'lucide-react';

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
    IconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const UserInfo = ({ user, label, IconComponent }: UserInfoProps) => {
    
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                {IconComponent && <IconComponent className="w-6 h-6" />}
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <UserInfoList user={user} />
            </CardContent>
        </Card>
    )
}