//todo Gemini Set up Start
import OpenAI from "openai";
import sql from "./../configs/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
//todo end

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "freedom" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit Reached. Upgrade to continue.",
      });
    }

    //!Generate AI response
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt, //! Get the prompt from user -> req.body
        },
      ],
      temperature: 0.7,
      max_tokens: length, //! Get the length from user -> req.body
    });

    const content = response.choices[0].message.content;

    //! Add to database009
    await sql`
        INSERT INTO creations (user_id , prompt , content , type)
        VALUES (${userId} , ${prompt} , ${content} , 'article')
    `;

    if (plan != "freedom") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content: content,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
