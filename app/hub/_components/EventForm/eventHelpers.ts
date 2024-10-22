import * as z from "zod";
import { createEvent, updateEvent, addParticipant, removeParticipant } from "@/lib/actions/event.actions";
import { EventSchema } from "@/schemas";

export const handleSubmit = (
    values: z.infer<typeof EventSchema>,
    existingEvent: any,
    date: Date | undefined,
    actualUser: any,
    setError: (msg: string) => void,
    setSucces: (msg: string) => void,
    form: any,
    startTransition: any
) => {
    setError("");
    setSucces("");
    console.log("Form Submitted", values);

    startTransition(() => {
        const action = existingEvent ? updateEvent : createEvent;

        const eventData = {
            ...values,
            category: Array.isArray(values.category) ? values.category : [values.category],
            type: Array.isArray(values.type) ? values.type : [values.type],
            date: date || new Date(),
            userId: actualUser?.id || "",
        };

        console.log("Event Data", eventData);

        action(existingEvent?.id ?? "", eventData)
            .then((data) => {
                console.log("Action Response", data);
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setSucces(data.success);
                }
            })
            .catch((err) => {
                console.error("Action Error", err);
                setError("Etwas ist schiefgelaufen");
            });
    });
};

export const handleAddParticipant = (
    userId: string,
    existingEvent: any,
    setError: (msg: string) => void,
    setSucces: (msg: string) => void,
    form: any,
    startTransition: any
) => {
    console.log("Adding Participant", userId);
    startTransition(() => {
        addParticipant({ eventId: existingEvent?.id || "", userId })
            .then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                if (data?.success) {
                    setSucces(data.success);
                    form.setValue("participants", [...form.getValues("participants"), userId]);
                }
            })
            .catch(() => setError("Etwas ist schiefgelaufen"));
    });
};

export const handleRemoveParticipant = (
    userId: string,
    existingEvent: any,
    setError: (msg: string) => void,
    setSucces: (msg: string) => void,
    form: any,
    startTransition: any
) => {
    startTransition(() => {
        removeParticipant(existingEvent?.id || "", userId)
            .then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                if (data?.success) {
                    setSucces(data.success);
                    form.setValue("participants", form.getValues("participants").filter((id: string) => id !== userId));
                }
            })
            .catch(() => setError("Etwas ist schiefgelaufen"));
    });
};
