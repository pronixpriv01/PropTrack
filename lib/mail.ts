import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Dein 2FA code: ${token}</p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `https://www.pronixpriv.com/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Passwort zurücksetzen",
        html: `<p>Klicke <a href="${resetLink}">hier</a> um dein Passwort zu ändern.</p>`
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `http://www.pronixpriv.com/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Bestätige deine Email",
        html: `<p>Klicke <a href="${confirmLink}">hier</a> um deine Email zu bestätigen.</p>`
    });
};
