import Stripe from "stripe";

export async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list()

    const filteredPrices = prices.data.filter(price => {
        return price.active === true;
    });
    console.log('filter',filteredPrices)
    return new Response(JSON.stringify(filteredPrices.reverse()), {status: 200})
}