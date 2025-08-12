### 1. Import dependencies
`OpenAI` → The package that lets you call the Gemini API (even though it’s Google’s Gemini, you’re using OpenAI’s client configured with Gemini’s base URL).

`sql` → Your database connection (Neon/PostgreSQL).

clerkClient → Used to manage user authentication and metadata (like free_usage count).

```js
import OpenAI from "openai";
import sql from "./../configs/db";
import { clerkClient } from "@clerk/express";
```

### 2. Set up the Gemini API client
`apiKey` → Loaded from .env so your secret key isn’t in the code.

`baseURL` → Points to Google’s Gemini API endpoint (compatible with the OpenAI API structure).

```js
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
```
from Gemini/Google ai studio => https://aistudio.google.com/apikey

### 3. Define the API route handler
```js
export const generateArticle = async (req, res) => { ... }
```
This is the Express.js route function that runs when a user requests an AI-generated article.

### 4. Get user details from the request
```js
const { userId } = req.auth();
const { prompt, length } = req.body;
const plan = req.plan;
const free_usage = req.free_usage;
```
`userId` → The unique ID of the current logged-in user.

`prompt` → The text instruction from the user (e.g., "Write a blog about AI").

`length` → How many tokens/words to generate.

`plan` → The user’s subscription plan (freedom, premium, etc.).

`free_usage` → How many free requests the user has already made.


### 5  Call the Gemini AI API
model → `"gemini-2.0-flash"` is a fast version of Gemini.

messages → Chat format where role is `"user"` and `content` is the prompt.

`temperature` → Creativity level (0 = factual, 1 = very creative).
```java
`temperature` is a parameter that controls how creative or random the AI’s responses are:

Low temperature (0–0.3) → More deterministic, predictable, and factual answers.

Medium temperature (0.5–0.7) → Balanced mix of accuracy and creativity.

High temperature (0.8–1.0+) → More creative, varied, and sometimes unpredictable outputs.

Think of it like seasoning:

Low temperature = plain boiled potatoes (safe but not exciting)

High temperature = spicy street food (interesting but may surprise you 😅)

For example:
If you prompt "Write a title for an article about AI"

Temp 0.2 → "The Impact of AI on Modern Life"

Temp 0.9 → "From Sci-Fi to Selfies: How AI Rules Your World"
```

max_tokens → Maximum length of the response.

### 6.  Extract AI’s text response
```js
const content = response.choices[0].message.content;
```
Gemini returns an array of possible completions (`choices`), and you take the first one’s `message.content`.

### 7. Save to the database
```js
await sql`
    INSERT INTO creations (user_id , prompt , content , type)
    VALUES (${userId} , ${prompt} , ${content} , 'article')
`;
```
```sql
-- Original Table
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

```

### 8. Send the final response back to the frontend
```js
res.json({
  success: true,
  content: content,
});
```
Sends JSON containing:

`success: true` <br/>
`content → The generated article.`

```
1. User sends prompt + length → POST /generateArticle

2. Check user plan & usage → reject if limit reached

3. Send prompt to Gemini API

4. Get AI-generated text

5. Save in database

6. Update usage count

7. Return generated content to the user
```