'use client';
import {PlusCircle, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {all} from "@/services/clients";
import moment from "moment/moment";
import TablePagination from "@/components/table-pagination";
import {z} from "zod";
import {Client, FilterQuery} from "@/types";
import Drawer from "@/components/drawer";
import {ButtonLink} from "@/components/ui/forms/buttons";
import ClientForm from "@/app/dashboard/clients/client-form";
import ClientRemove from "@/app/dashboard/clients/client-remove";
import {useSearchParams} from "next/navigation";


export default function Page() {

    const [drawerState, setDrawerState] = useState<{
        open: boolean,
        title?: string,
        description?: string,
        children?: React.ReactNode
    }>({
        open: false,
    });

    // TODO. EMpty Stage
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState<z.infer<typeof FilterQuery>>(searchParams as z.infer<typeof FilterQuery>);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        setFilter(params)
    }, [searchParams]);

    const swrKey = `/clients?${JSON.stringify(filter)}`
    const {data, isLoading, error} = useSWR(swrKey, () => all(filter));

    const openAddClient = () => {
        setDrawerState({
            open: true,
            title: 'Create Client',
            description: 'Create client',
            children: <ClientForm swrKey={swrKey} onSuccess={closeDrawer}/>
        });
    };

    const openEditClient = (client: z.infer<typeof Client>) => {
        setDrawerState({
            open: true,
            title: 'Modify Client',
            description: `Modify ${client.firstName} ${client.lastName} information.`,
            children: <ClientForm swrKey={swrKey} onSuccess={closeDrawer} client={client}/>
        });
    };

    const closeDrawer = () => {
        setDrawerState({open: false});
    };

    return (
        <>
            <div className="px-1">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
                </div>
                <div className="mb-6 flex flex-row items-center justify-between">
                    <div className="flex-none">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search..."
                            onChange={(e) => setFilter({q: e.target.value})}
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <div className="ml-4 flex-none">
                        <Button size="sm" className="h-8 gap-1" onClick={openAddClient}>
                            <PlusCircle className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Client</span>
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="table-auto border-collapse border">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tel</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.data.map((e) => (

                        <TableRow key={e.id}>
                            <TableCell className="font-medium">
                                <ButtonLink onClick={() => openEditClient(e)}>{e.id}</ButtonLink>
                            </TableCell>
                            <TableCell className="font-medium">{e.firstName} {e.lastName}</TableCell>
                            <TableCell>{e.email}</TableCell>
                            <TableCell>{e.tel}</TableCell>
                            <TableCell>{moment(e.createdAt).fromNow()}</TableCell>
                            <TableCell><ClientRemove client={e} swrKey={swrKey}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination total={data?.total || 0}/>
            <Drawer
                title={drawerState.title}
                description={drawerState.description}
                isOpen={drawerState.open}
                onClose={closeDrawer}

            >{drawerState.children}</Drawer>
        </>
    );
}