import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {ChangeEventHandler} from "react";

const FormInput = ({label, name, value, type, error, onChange}: {
    label: string;
    name: string;
    value?: string | null;
    type?: 'text' | 'tel' | 'email';
    error?: string | null;
    onChange?: ChangeEventHandler | undefined;
}) => {
    return <>
        <Label htmlFor={name}>{label}</Label>
        <Input
            id={name}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            type={type ?? 'text'}
        />
        {error && (
            <p className="text-red-500 text-xs">{error}</p>
        )}
    </>
}

export {FormInput}