import {NextRequest, NextResponse} from "next/server";
import {findOne, remove, update} from "@/repositories/client";
import {getUserSessionTeam} from "@/services/user";
import {MissingTeamError} from "@/types";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const team = await getUserSessionTeam()
        const {id} = params;
        const client = await findOne(team.id, id);
        if (!client) {
            return NextResponse.json({error: 'Client not found'}, {status: 404});
        }
        return NextResponse.json(client, {status: 200});
    } catch (e) {
        if (e instanceof MissingTeamError) {
            return NextResponse.json({error: e.message}, {status: 400})
        }
        return NextResponse.json({error: e}, {status: 500});
    }
}

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const team = await getUserSessionTeam()
        const {id} = params;
        const body = await req.json();
        await update(team.id, id, body.data);
        return NextResponse.json([]);
    } catch (e) {
        if (e instanceof MissingTeamError) {
            return NextResponse.json({error: e.message}, {status: 400})
        }
        return NextResponse.json({error: e}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const team = await getUserSessionTeam()
        const {id} = params;
        await remove(team.id, id);
        return NextResponse.json({message: 'Deleted'});
    } catch (e) {
        if (e instanceof MissingTeamError) {
            return NextResponse.json({error: e.message}, {status: 400})
        }
        return NextResponse.json({error: e}, {status: 500});
    }
}