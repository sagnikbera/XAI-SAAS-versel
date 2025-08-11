# Clerk Authentication & Usage Middleware Explained

This document provides a detailed explanation of an Express.js middleware that acts as an authorization gatekeeper using Clerk. It checks if a user has a premium plan and manages their free usage credits accordingly, making this information available to subsequent parts of your application.

---

## Flowchart

This diagram illustrates the logical flow of the middleware, from receiving a request to either passing it on or halting it with an error.

```ascii
[ Incoming Request ]
        |
        v
+---------------------------------+
|      auth Middleware starts     |
+---------------------------------+
        |
        v
[ 1. Get Auth Info from req.auth() ]
(userId, has function)
        |
        v
[ 2. Fetch Full User from Clerk API ]
(to get privateMetadata)
        |
        v
<  Is user on 'freedom' plan? >
(hasPremiumPlan)
        |
        +---------------- NO ---------------+
        |                                   |
        v YES                               v
+-----------------------------+   < Does user have free_usage > 0? >
|  (User is PREMIUM)          |             |
+-----------------------------+             |
        |                                   |
        v                                   |
[ 3. Update Clerk Metadata:  ]              |
[    free_usage = 0          ]              |
        |                                   | YES
        v                                   |
[ 4. Set req.free_usage = 0   ]              |
[ 5. Set req.plan = 'freedom' ]              |
        |                                   |
        |                                   v
        |                     +-----------------------------+
        |                     | (User is FREE w/ USAGE)     |
        |                     +-----------------------------+
        |                                   |
        |                     [ 3. Set req.free_usage =     ]
        |                     [    user.metadata.free_usage ]
        |                     [ 4. Set req.plan = 'free'      ]
        |                                   |
        |                                   |
        +------------------+----------------+
                           |
                           v NO
              +----------------------------+
              | (User is FREE w/out USAGE) |
              +----------------------------+
                           |
                           v
              [ 3. Update Clerk Metadata:  ]
              [    free_usage = 0          ]
                           |
                           v
              [ 4. Set req.free_usage = 0   ]
              [ 5. Set req.plan = 'free'      ]
                           |
                           v
+---------------------------------+
|      Call next() to continue    |--------> [ Next Middleware or Route ]
+---------------------------------+


*** Any failure in the process above leads to... ***
        |
        v
+---------------------------------+
|       catch (error) block       |
+---------------------------------+
        |
        v
[ Respond with JSON error message ]
[         Request HALTS           ]

```




## 1. Get User's Session Info
```js
const { userId, has } = await req.auth();
```
req.auth() must be available (Clerk's middleware must run before this middleware).


userId identifies the signed-in user.

has() is a helper that checks claims/roles (used here to check the plan).
 
## 2. Check for Premium Plan
```js
const hasPremiumPlan = await has({ plan: 'freedom' });
```
Returns true if the session claims indicate the freedom plan; otherwise false.

## 3. Fetch Full User Data
```js
const user = await clerkClient.users.getUser(userId);
```

Pulls the full Clerk user object (needed to read privateMetadata).

user.privateMetadata.free_usage is the free usage count.

## 4. Conditional Logic (Core)
```js
if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
  // Free user with positive usage left
} else {
  // Premium user OR free user with no usage left -> ensure free_usage = 0 on Clerk
}
```

If free and free_usage > 0 → attach usage to req and continue.

Otherwise (premium or free with 0) → update Clerk privateMetadata.free_usage = 0, attach 0 to req.

## 5. Standardize Request Properties
Always set:

```js
req.plan = hasPremiumPlan ? 'freedom' : 'free';
req.free_usage = <number>;
```
Downstream handlers can read req.plan and req.free_usage.

## 6. Continue or Halt
On success: next();

On failure: respond with JSON error and halt the request.

