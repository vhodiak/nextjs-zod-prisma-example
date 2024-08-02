import {SkipTake} from "@/types";
import {NextRequest} from "next/server";

const ippRange = [25, 50, 100, 250];

const makeSkipTake = (req: NextRequest): SkipTake => {
    const {searchParams} = new URL(req.url);

    const page = parseInt(searchParams.get('page') || "1");
    const ipp = parseInt(searchParams.get('ipp') || `${ippRange[0]}`, 10);

    return {
        skip: (page - 1) * ipp,
        take: ipp
    };
}


export {ippRange, makeSkipTake};
