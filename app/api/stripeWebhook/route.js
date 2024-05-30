import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("stripe-signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { userId, priceId } = session.metadata;

      try {
        await updateUserCredit(userId, priceId);
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
        });
      } catch (updateError) {
        console.error("Error updating user purchase:", updateError);

        await stripe.refunds.create({
          payment_intent: session.payment_intent,
        });

        return new Response(
          JSON.stringify({ error: "User update failed, payment refunded" }),
          { status: 500 }
        );
      }
    }
    return new Response(JSON.stringify({ event: event.type }), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

const updateUserCredit = async (userId, priceId) => {
  await connectToDB();
  try {
    if (priceId === process.env.STRIPE_SUNGLASSES_PRICE) {
      const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          $inc: { credit: 120 },
        }
      );
      await user.save();
    } else if (priceId === process.env.STRIPE_GLASSES_PRICE) {
      const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          $inc: { credit: 60 },
        }
      );
      await user.save();
    } else if (priceId === process.env.STRIPE_THREEHUNDRED_CREDITS) {
      const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          $inc: { credit: 300 },
        }
      );
      await user.save()
    }

  } catch (error) {
    console.log(error);
  }
};
