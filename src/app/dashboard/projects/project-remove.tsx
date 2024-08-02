import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, {useState} from "react";
import useSWRMutation from "swr/mutation";
import {remove} from "@/services/projects";
import {Project} from "@/types";
import {z} from "zod";
import {ButtonRemove} from "@/components/ui/forms/buttons";


export default function ProjectRemove(
    {
        swrKey,
        project
    }: { swrKey: string, project: z.infer<typeof Project> }
) {

    const [open, setOpen] = useState<boolean>(false);
    const {
        trigger,
        isMutating,
        data,
        error
    } = useSWRMutation(swrKey, () => remove(project.id))

    const handleClick = () => {
        trigger().then(r => {
            setOpen(false)
        })
    }

    return <AlertDialog open={open}>
        <AlertDialogTrigger><ButtonRemove onClick={() => setOpen(true)}/></AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm to delete</AlertDialogTitle>
                <AlertDialogDescription>
                    This is permanent! Are you sure you want to delete {project.title}?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}