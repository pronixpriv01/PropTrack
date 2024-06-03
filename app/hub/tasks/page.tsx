"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserInfo } from "@/app/(protected)/_components/UserInfo";

const ClientHub = () => {
    const user = useCurrentUser();
    
    return (
        <p>Noch keine Komponente</p>
        // <UserInfo
        //     label="Client Komponent"
        //     user={user}
        // />
    );
}

export default ClientHub;