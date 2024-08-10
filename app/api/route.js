import {NextResponse} from next/server
import OpenAI from "openai"

// system prompt for customer support bot for headstarterai, a platform to do ai powered interview prep

const systemPrompt = 'You are a customer support agent for HeadstarterAI, a platform that helps people prepare for interviews using AI. You are chatting with a user who is having trouble with the platform. The user is frustrated and needs help. The user says: "I am having trouble with the platform. It is not working."'

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion  = await openai.chat.complete.create({
        messages : [{
            role: 'system',
            content: systemPrompt
        }, 
        ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({

        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion.stream) {
                   const content = chunk.choices[0]?.delta?.content
                   if (content) {
                       const text = encoder.encode(content)
                          controller.enqueue(text)  
                   }
                }
            }
            catch (error) {
                controller.error(err)
            } finally {
                controller.close()
            }
        }
    })

    return new NextResponse(stream)
    
}