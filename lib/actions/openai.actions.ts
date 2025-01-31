import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
});






const suggestCategoryName = async (data: any) => {
    console.log(data.title, data.content)
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

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content || 'No Suggestions';
}

export default suggestCategoryName;