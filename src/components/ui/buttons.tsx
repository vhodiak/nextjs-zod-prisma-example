import React from "react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export function ButtonLoading() {
    return (
        <Button variant="outline"  disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}

export function ButtonsUpdate() {
    return (
        <Button type="submit"  variant="outline">
            Update
        </Button>
    )
}
