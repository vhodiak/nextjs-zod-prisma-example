"use client";
import React from "react";

import Link from "next/link";
import {AuthGithub, AuthGoogle} from "@/components/auth/auth_social";
import EmailSignIn from "@/components/auth/email_sing_in";

export default function Page() {
    return <div className="mx-auto grid w-[350px] gap-6">

        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Estify</h1>
            <h3 className=" text-1xl text-muted-foreground">
                Get started - it's free. No credit card needed. Unsubscribe at any time
            </h3>
        </div>
        <AuthGoogle/>
        <AuthGithub/>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
            </div>
        </div>
        <EmailSignIn/>
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
                Sign in
            </Link>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
            >
                Terms of Service
            </Link>{" "}
            and{" "}
            <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
            >
                Privacy Policy
            </Link>
            .
        </p>
    </div>
}