"use server";

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});





const suggestCategoryName = async (data: any) => {
    const prompt = `
        For the given title ${data.title} and content ${data.content}
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

    return completion.choices[0].message.content || 'No Suggestions';
}

export default suggestCategoryName;