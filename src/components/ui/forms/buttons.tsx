import React, {MouseEvent, ReactNode} from "react";
import {Button} from "@/components/ui/button";

import {Trash} from "lucide-react";

const ButtonLink = (
    {
        children,
        onClick
    }: {
        children: ReactNode,
        onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    }
) => <Button onClick={onClick} variant="link">{children}</Button>
const ButtonRemove = (
    {
        onClick
    }: {

        onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    }
) => <Button onClick={onClick} variant="destructive"><Trash size={14}/></Button>


export {ButtonLink, ButtonRemove}