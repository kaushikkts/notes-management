import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});
export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const query = request.url;

    let queryTitle = query?.split('?')[1].split('&')[0]?.split('=')[1];
    let queryContent = query?.split('?')[1].split('&')[0]?.split('=')[1];
    const prompt = `
        For the given title ${queryTitle} and content ${queryContent}
        give a suggestion for the category of this note. Don't give a detailed suggestion, just the suggestion words are fine.
        Give the suggestions as a list, one suggestion on each line.
`;
    const completion = await openai.chat.completions.create({
        model: "o1-mini",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        store: true,
    });
    if (!completion) {
        throw new Error("Failed to get OpenAI completion");
    }
    // Implement your logic here to get the user data and return it in the response
    // For example:
    return NextResponse.json(completion.choices[0].message.content || 'No Suggestions')
}