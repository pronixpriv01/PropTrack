import { Header } from "@/components/auth/Header";
import { BackButton } from "@/components/auth/BackButton";

import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { CardWrapper } from "./CardWrapper";
import { TriangleAlertIcon } from "lucide-react";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Ooops! Etwas ist schiefgelaufen!"
            backButtonHref="/sign-in"
            backButtonLabel="Zurück zum Login"
        >
            <div className="w-full flex justify-center items-center">
                <TriangleAlertIcon
                    className="text-destructive"
                />
            </div>
        </CardWrapper>
    )
};