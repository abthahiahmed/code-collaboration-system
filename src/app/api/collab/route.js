import { v4, v5 } from "uuid";

export async function POST(){
    const uid = v4();
    return Response.json({
        url : `${process.env.BASE}/collab/${uid}`,
    })
}