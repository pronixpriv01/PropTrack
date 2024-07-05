import * as z from "zod"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schemas";

export const useEventForm = (existingEvent: any) => {
    return useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: existingEvent || {
            id: "",
            title: "",
            description: "",
            category: ["OTHER"],
            type: ["OTHER"],
            date: new Date(),
            participants: [],
        },
    });
};
