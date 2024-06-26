import { getAuth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function POST(request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    let data = await request.json();
    let { priceId, userId } = data;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://www.framefeeling.com",
      cancel_url: "https://www.framefeeling.com",
      metadata: {
        userId,
        priceId,
      },
    });
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create session", error);
  }
}
