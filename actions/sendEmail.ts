'use server'
import EmailTemplate from "@/components/landing/EmailTemplate";
import { FormSchema } from "@/lib/type";
import { validateString, getErrorMessage } from "@/lib/utils";
import { stat } from "fs";
import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (formData: FormData) => {
    
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return { error: 'Invalid form data. Please check your inputs.' };
    }

    const name = validatedFields.data.name;
    const email = validatedFields.data.email;
    const subject = validatedFields.data.subject;
    const message = validatedFields.data.message;
    
    // Send email
    try {
        const { data, error } = await resend.emails.send({
        from: 'Message from Sky Tutors <onboarding@resend.dev>',
        to: ['muhammadsaif713@gmail.com'],
        subject: `Message from Sky Tutors Contact Form: ${subject}`,
        replyTo: email,
        react: EmailTemplate({sender: email, message: message}),
        });

        if (error)
            return { error: getErrorMessage(error), status: 400 };

        return { data, status: 200 };
    } catch (error) {
        console.error(error);
        return { error: getErrorMessage(error), status: 500 };

    }
}

export default sendEmail