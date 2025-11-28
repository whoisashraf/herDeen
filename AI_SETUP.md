# AI Integration Setup with OpenRouter

## Why OpenRouter?

OpenRouter gives you access to multiple AI models (OpenAI, Anthropic, Google, Meta, etc.) with:
- One API key for all models
- Pay-as-you-go pricing
- Easy model switching
- No separate accounts needed

## Getting Your API Key

1. Go to https://openrouter.ai/keys
2. Sign up with Google/GitHub or email
3. Click "Create Key"
4. Copy your API key (starts with `sk-or-`)
5. Add $5-10 credits to your account

## Setup Steps

1. **Copy the environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API key to `.env`:**
   ```
   EXPO_PUBLIC_OPENROUTER_API_KEY=sk-or-your-actual-key-here
   EXPO_PUBLIC_APP_URL=https://herdeen.app
   EXPO_PUBLIC_APP_NAME=HerDeen
   ```

3. **Restart your development server:**
   ```bash
   bun start
   ```

## Available Models

You can change the model in `services/ai-service.ts`:

```typescript
model: 'openai/gpt-4o-mini', // Current (fast & cheap)
// model: 'openai/gpt-4o',    // More capable
// model: 'anthropic/claude-3-haiku', // Fast Claude
// model: 'anthropic/claude-3.5-sonnet', // Best Claude
// model: 'google/gemini-pro', // Google's model
// model: 'meta-llama/llama-3.1-8b-instruct', // Open source
```

See all models: https://openrouter.ai/models

## Security Notes

- ⚠️ **NEVER commit `.env` to git** - it's already in `.gitignore`
- ⚠️ **For production apps**, use a backend API to proxy AI requests
- The current setup is for development/testing only
- API keys in mobile apps can be extracted by determined users

## Production Recommendations

For a production app, create a backend API:

```
Mobile App → Your Backend API → OpenAI API
```

This way:
- API keys stay secure on your server
- You can add rate limiting
- You can monitor usage
- You can add authentication

## Testing Without AI

If you don't have an API key yet, the app will show an error message. You can still:
- Manually add tasks in the planner
- Use the "Generate My Day Plan" button (skips AI chat)
- Test the rest of the app functionality

## Cost Estimates (via OpenRouter)

- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Claude 3 Haiku**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
- **Llama 3.1 8B**: ~$0.06 per 1M tokens (cheapest)
- Average conversation: ~500-1000 tokens = $0.001-0.002 per plan

Check current pricing: https://openrouter.ai/models

## Troubleshooting

**Error: "API key not configured"**
- Make sure `.env` file exists in project root
- Check that the key starts with `EXPO_PUBLIC_OPENROUTER_API_KEY`
- Verify the key starts with `sk-or-`
- Restart the dev server after adding the key

**Error: "Failed to get AI response"**
- Check your API key is valid at https://openrouter.ai/keys
- Verify you have credits in your OpenRouter account
- Check your internet connection
- Try a different model (some may be temporarily unavailable)
