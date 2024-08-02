import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginFormInputs>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<
        Partial<LoginFormInputs>
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
                ) as Partial<Record<keyof LoginFormInputs, string>>
            );
            return;
        }

        const result = await signIn("credentials", {
            // redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            console.log('Auth.OK')
            // window.location.href = "/dashboard";
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-2 text-center">
                <p className="text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
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
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.password && (
                        <p className="text-red-500 text-sm">{validationErrors.password}</p>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
        </form>
    );
}
