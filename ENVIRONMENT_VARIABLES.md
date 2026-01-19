# Environment Variables Setup

## Frontend Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Production Deployment

For production, create a `.env.production` file:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-production-api-domain.com
```

## Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API | `http://localhost:8080` |

## Usage

The application will automatically use the environment variable for all API calls. In development, it defaults to `http://localhost:8080` if the environment variable is not set.

## Deployment Instructions

1. Set the `NEXT_PUBLIC_API_BASE_URL` to your production backend URL
2. Deploy your frontend application
3. The application will automatically use the production API endpoint

## Security Note

- Never commit `.env.local` or `.env.production` files to version control
- The `.gitignore` file already excludes these files
- Only `NEXT_PUBLIC_*` variables are exposed to the browser