"use client"

import Link from "next/link"
import Image from "next/image"
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
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn('flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start', {'bg-blue-500': isActive})}
                        >
                            <div className="relative size-6">
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
            </nav>

        </section>
    )
}

export default Sidebar;