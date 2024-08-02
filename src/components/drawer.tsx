import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import React from "react";

interface DrawerProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    width?: 's' | 'm' | 'l';
    actions?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = (
    {
        title,
        description,
        children,
        actions,
        width,
        isOpen,
        onClose,
    }) =>
{
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
                {actions && <SheetFooter>
                    <SheetClose asChild>
                        {actions}
                    </SheetClose>
                </SheetFooter>}
            </SheetContent>
        </Sheet>
    );
}

export default Drawer