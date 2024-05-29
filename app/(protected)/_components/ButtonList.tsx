import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ButtonList = () => {
    const pathname = usePathname();

    const buttonData = [
        { href: "/server", text: "Server" },
        { href: "/client", text: "Client" },
        { href: "/admin", text: "Admin" },
        { href: "/settings", text: "Einstellungen" },
    ];

    return (
        <>
            {buttonData.map((button) => (
                <Button
                    key={button.href}
                    asChild
                    variant={pathname === button.href ? "default" : "outline"}
                >
                    <Link href={button.href}>
                        {button.text}
                    </Link>
                </Button>
            ))}
        </>
    )
}