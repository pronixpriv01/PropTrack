"use client"

import { ButtonList } from "./ButtonList"
import { UserButton } from "@/components/auth/UserButton";

export const Navbar = () => {

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <ButtonList />
            </div>
            <UserButton/>
        </nav>
    )
}