import Sidebar from "./_components/Sidebar";
import MobileNav from "./_components/MobileNav";

import Image from "next/image";
import { currentUser } from "@/lib/auth";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const HubLayout = ({ children }: ProtectedLayoutProps) => {
    const loggedIn = currentUser();

    return (
        <main className="flex h-screen w-full">
            <Sidebar />

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src="/icons/logo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <div>
                        <MobileNav />
                    </div>
                </div>
                {children}
            </div>
        </main>
    )
}

export default HubLayout;

// import { Navbar } from "./_components/Navbar";

// interface ProtectedLayoutProps {
//     children: React.ReactNode;
// };

// const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
//     return (
//         <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
//             <Navbar />
//             {children}
//         </div>
//     )
// }

// export default ProtectedLayout;