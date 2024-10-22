import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { GuestSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "../FormSuccess";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { guestLogin } from "@/lib/actions/guestLogin.actions";
import { z } from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export const GuestForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "=OAuthAccountNotLinked"
        ? "Email wird bereits von einer Alternativen Anmeldemöglichkeit verwendet!"
        : "";
    
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof GuestSchema>>({
        resolver: zodResolver(GuestSchema),
        defaultValues: {
            name: "",
            refcode: "",
        },
    });

    const onSubmit = (values: z.infer<typeof GuestSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            guestLogin(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Etwas ist schiefgelaufen"));
        });
    };

    return (
        <CardWrapper
            headerLabel="Gäste-Login"
            backButtonLabel="Du hast einen Account?"
            backButtonHref="/sign-in"

        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ihr Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Refcode Field */}
                    <FormField
                            control={form.control}
                            name="refcode"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>"REF Code"</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isPending}
                                        >
                                            <InputOTPGroup className="felx justify-center">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                    {/* <FormField
                        control={form.control}
                        name="refcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Refcode</FormLabel>
                                <FormControl>
                                    <Input placeholder="Refcode" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* Two-factor authentication section, if needed */}
                    {/* {showTwoFactor && (
                        <>
                            <div className="mt-4">
                                <FormLabel>Zwei-Faktor-Authentifizierung</FormLabel>
                                <InputOTPGroup>
                                </InputOTPGroup>
                            </div>
                        </>
                    )} */}

                    {/* Submit Button */}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Verarbeiten..." : "Einloggen"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};