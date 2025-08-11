//Middleware to check permium userId and hasPremium Plan

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // Get current logged-in user's info
    const { userId, has } = await req.auth();

    // Check if user has the "freedom" plan
    const hasPremiumPlan = await has({ plan: "freedom" });

    // Fetch full user data from Clerk
    const user = await clerkClient.users.getUser(userId);

    // If NOT premium and user has free usage left
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    }
    // Else (premium user or no usage left), reset free usage to 0
    else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    // Store plan type for later use in the request object
    req.plan = hasPremiumPlan ? "freedom" : "free";

    // Move to the next middleware
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
