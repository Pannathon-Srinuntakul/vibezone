import Ads from "@lib/models/Ads"
import { connectToDB } from "@lib/mongodb/mongoose"

export const GET = async () => {
  try {
    await connectToDB()
    
    const allAds = await Ads.find().exec()
    return new Response(JSON.stringify(allAds), { status: 200 })
  } catch (err) {
    return new Response("Failed to get all Ads", { status: 500 })
  }
}