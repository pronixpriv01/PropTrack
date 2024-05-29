"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserInfo } from "../_components/UserInfo";

const ClientPage = () => {
    const user = useCurrentUser();
    
    return (
        <UserInfo
            label="Client Komponent"
            user={user}
        />
    );
}

export default ClientPage;