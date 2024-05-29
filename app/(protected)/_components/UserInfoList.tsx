import { ExtendedUser } from "@/next-auth";
import React from "react"
import { Badge } from "@/components/ui/badge";


interface UserInfoListProps {
    user?: ExtendedUser;
}

const UserInfoList = ({ user }: UserInfoListProps) => {
    const userInfo = [
        { label: "ID", value: user?.id },
        { label: "Name", value: user?.name },
        { label: "Email", value: user?.email },
        { label: "Rolle", value: user?.role },
        { label: "Zwei Faktor Authentifizierung", value: user?.isTwoFactorEnabled ? "Aktiv" : "Deaktiviert"}
    ];

    return (
        <>
            {userInfo.map((info) => (
                <div key={info.label} className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        {info.label}
                    </p>
                    {info.label === "Zwei Faktor Authentifizierung" ? (
                        <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                            {info.value}
                        </Badge>
                    ) : (
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {info.value}
                        </p>
                    )}
                </div>
            ))}
        </>
    );
};

export default UserInfoList;