"use client"

import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator";
import { ButtonList } from "@/app/(protected)/_components/ButtonList";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                {/* //TODO Logo Link */}
                <h1 className="">Main Menü</h1>
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn('flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start', {'sidebar-btn_bg': isActive})}
                        >
                            <div className="relative size-5">
                                <Image 
                                    src={item.icon}
                                    alt={item.label}
                                    fill
                                    className={cn({
                                        'brightness-[1] invert-0' : isActive
                                    })}
                                />
                            </div>
                            <p
                                className={cn(
                                    'sidebar-label',
                                    { '!text-white' : isActive }
                                )}
                            >
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
                <Separator />
            </nav>

        </section>
    )
}

export default Sidebar;