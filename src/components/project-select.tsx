import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import useSWR from "swr";
import {all} from "@/services/projects";
import React from "react";


export default function ProjectSelect({onChange, clientId, value, }: {
    onChange: (e: string) => void;
    clientId?: string
    value?: string
}) {
    const {data, isLoading, error} = useSWR(`/projects?clientId=${clientId}`, () => all({clientId: clientId}));
    return (
        <div className='w-full'>
            <Select onValueChange={(v) => onChange(v)} value={value} disabled={!clientId}>
                <SelectTrigger >
                    <SelectValue placeholder="Select Project"/>
                </SelectTrigger>
                <SelectContent>
                    {data && data.data.map(e => <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

    )
}