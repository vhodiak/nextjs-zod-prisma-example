import {Button} from "@/components/ui/button";
import React from "react";
import {signIn} from "next-auth/react"

export function AuthGoogle() {
    return <Button variant="outline" className="w-full" onClick={() => signIn('google', {callbackUrl: '/dashboard'})}>
        Login with Google
    </Button>
}

export function AuthGithub() {
    return <Button variant="outline" className="w-full" onClick={() => signIn('github', {callbackUrl: '/dashboard'})}>
        Login with Github
    </Button>
}