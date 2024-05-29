import { currentUser } from "@/lib/auth";
import { UserInfo } from "../_components/UserInfo";

const ServerPage = async () => {
    const user = await currentUser();
    
    return (
        <UserInfo
            label="Server Komponent"
            user={user}
        />
    );
}

export default ServerPage;