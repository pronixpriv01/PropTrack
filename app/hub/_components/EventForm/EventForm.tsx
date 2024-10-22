"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { CalendarIcon, UserPlus2Icon } from "lucide-react";
import { useTransition, useState } from "react";
import { EventSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { categoryOptions, typeOptions } from './comboboxOptions';
import { handleAddParticipant, handleRemoveParticipant, handleSubmit } from "./eventHelpers";
import DynamicCombobox from "../DynamicCombox";

const EventForm = ({ existingEvent, users }: EventFormProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [date, setDate] = useState<Date | undefined>(
        existingEvent ? new Date(existingEvent.date) : undefined
    );
    const actualUser = useCurrentUser();

    const form = useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: existingEvent || {
            id: "",
            title: "",
            description: "",
            category: ["OTHER"],
            type: ["OTHER"],
            date: new Date(),
            participants: [],
        }
    });

    const onSubmit = (values: z.infer<typeof EventSchema>) => {
        handleSubmit(values, existingEvent, date, actualUser, setError, setSuccess, form, startTransition);
    };

    const participantOptions = users.map(user => ({
        value: user.userId,
        label: user.name,
    }));

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="space-y-2 pt-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="title"
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Event Titel"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center mb-2 justify-between">
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    {date ? (
                                                        format(date, "PPP")
                                                    ) : (
                                                        <span>Datum wählen</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center mb-2 justify-between">
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <DynamicCombobox
                                            options={typeOptions}
                                            value={Array.isArray(field.value) ? field.value : []}
                                            onChange={(value) => form.setValue("type", [value])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center mb-2 justify-between">
                                    <FormLabel>Kategorie</FormLabel>
                                    <FormControl>
                                        <DynamicCombobox
                                            options={categoryOptions}
                                            value={Array.isArray(field.value) ? field.value : []}
                                            onChange={(value) => form.setValue("category", [value])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="participants"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                                <FormLabel>Teilnehmer</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {form.watch("participants").map((participantId, index) => {
                                            const user = users.find(u => u.userId === participantId);
                                            return (
                                                <Avatar key={index}>
                                                    <AvatarImage src={user?.userId || ""} alt={user?.name || ""} />
                                                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            );
                                        })}
                                        <DynamicCombobox
                                            options={participantOptions}
                                            value={Array.isArray(form.watch("participants")) ? form.watch("participants") : []}
                                            onChange={(value) => form.setValue("participants", value)}
                                            placeholder="Teilnehmer hinzufügen..."
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Beschreibung</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Event Beschreibung"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button 
                    className="w-full" 
                    disabled={isPending} 
                    type="submit"
                >
                    Speichern
                </Button>
            </form>
        </Form>
    );
};

export default EventForm;
