import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import useSWR from "swr";
import {all} from "@/services/clients";
import React from "react";


export default function ClientSelect({onChange, value}: {
    onChange: (e: string) => void;
    value?: string
}) {
    const {data, isLoading, error} = useSWR('/clients?', () => all());
    return (
        <Select onValueChange={(v) => onChange(v)} value={value}>
            <SelectTrigger>
                <SelectValue placeholder="Select Сlient"/>
            </SelectTrigger>
            <SelectContent>
                {data && data.data.map(e => <SelectItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</SelectItem>)}
            </SelectContent>
        </Select>

    )
}