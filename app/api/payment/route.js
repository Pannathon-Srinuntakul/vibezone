import Stripe from 'stripe'

export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    try {
        let data = await request.json()
        let {priceId, userId} = data
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/search',
            metadata: {
                userId,
                priceId
            }
        })
        return new Response(JSON.stringify(session.url), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to create session", error)
    }
}