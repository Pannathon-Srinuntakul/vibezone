import { getAuth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function GET(request) {
    const { userId } = getAuth(request);

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list()

    const filteredPrices = prices.data.filter(price => {
        return price.active === true;
    });
    return new Response(JSON.stringify(filteredPrices.reverse()), {status: 200})
}