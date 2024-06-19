import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("stripe-signature");

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

        await handleRefund(session.payment_intent);

        return new Response(
          JSON.stringify({ error: "User update failed, payment refunded" }),
          { status: 500 }
        );
      }
    } else {
      console.error("Unhandled event type:", event.type);
      await handleRefund(response.payment_intent); // Ensure refund if not a completed session
      return new Response(
        JSON.stringify({ error: "Event not completed, payment refunded" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in webhook processing:", error);
    return new Response(error.message || "Webhook error", { status: 500 });
  }
}

const updateUserCredit = async (userId, priceId) => {
  await connectToDB();
  try {
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { credit: getCredits(priceId) } }
    );
    if (!user) throw new Error("User not found");
    await user.save();
  } catch (error) {
    console.log(error);
    throw error; // Rethrow error to be caught in the POST function
  }
};

const getCredits = (priceId) => {
  const creditsMap = {
    [process.env.STRIPE_SEVENTY_CREDITS]: 70,
    [process.env.STRIPE_EIGHTYFIVE_CREDITS]: 85,
    [process.env.STRIPE_ONEHUNDREDEIGHTY_CREDITS]: 180,
    [process.env.STRIPE_THREEHUNDREDEIGHTY_CREDITS]: 380,
    [process.env.STRIPE_FIVEHUNDREDSEVENTY_CREDITS]: 570,
    [process.env.STRIPE_NINEHUNDREDSEVENTY_CREDITS]: 970,
    [process.env.STRIPE_ONETHOUSANDFIVEHUNDRED_CREDITS]: 1500,
    [process.env.STRIPE_TWOTHOUSANDFIFTY_CREDITS]: 2050,
  };
  return creditsMap[priceId] || 0;
};

const handleRefund = async (paymentIntentId) => {
  try {
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
  } catch (refundError) {
    console.error("Error creating refund:", refundError);
    throw refundError; // Rethrow to handle refund failure cases
  }
};
