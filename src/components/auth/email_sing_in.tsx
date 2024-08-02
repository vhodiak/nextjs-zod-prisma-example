import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {z} from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type EmailFormInputs = z.infer<typeof loginSchema>;

export default function EmailSignIn() {
    const [formData, setFormData] = useState<EmailFormInputs>({
        email: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<
        Partial<EmailFormInputs>
    >({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = loginSchema.safeParse(formData);
        if (!validationResult.success) {
            const errors = validationResult.error.formErrors.fieldErrors;
            setValidationErrors(
                Object.fromEntries(
                    Object.entries(errors).map(([key, value]) => [key, value?.[0]])
                ) as Partial<Record<keyof EmailFormInputs, string>>
            );
            return;
        }

        const result = await signIn("email", {
            email: formData.email,
            callbackUrl: '/dashboard'
        });

        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Input
                        name="email"
                        type="email"
                        placeholder="username@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.email && (
                        <p className="text-red-500 text-sm">{validationErrors.email}</p>
                    )}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                    Continue with email
                </Button>
            </div>
        </form>
    );
}
