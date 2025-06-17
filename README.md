# Structura.AI - Extract Structured Data from Any Text
Structura.AI is an AI-powered API and web application that transforms unstructured text into structured JSON data in under 3 seconds.  It's designed to be used by both developers and non-technical users, offering a powerful API and an intuitive interactive playground.  Structura.AI leverages Google Gemini's powerful language model to accurately extract key information based on a provided JSON schema.

## Features
* **High-speed data extraction:**  Transforms unstructured text into structured data quickly.
* **Customizable output:** Allows users to specify the desired output format using JSON schema.
* **Developer-friendly API:**  Provides a simple and easy-to-use REST API for integration into various applications.
* **Interactive Playground:**  A user-friendly web interface for testing the API without coding.
* **Robust error handling:** Includes comprehensive error handling and retry mechanisms.
* **Rate limiting:** Prevents abuse and ensures fair usage of the API.

## Usage
The Structura.AI API accepts a POST request with the following JSON payload:

```json
{
  "data": "Your unstructured text here",
  "format": {
    "fieldName1": { "type": "string" },
    "fieldName2": { "type": "number" },
    "fieldName3": { "type": "boolean" }
  }
}
```

The API will return a JSON response containing the extracted data:

```json
{
  "fieldName1": "value1",
  "fieldName2": 123,
  "fieldName3": true
}
```

See the `/playground` route for an interactive demo.

## Installation
This project is a Next.js application.  You'll need Node.js and npm (or yarn, pnpm, bun) installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/ArjunCodess/structura.git
   ```
2. Navigate to the project directory:
   ```bash
   cd structura
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set environment variables (see Configuration section).
5. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used
* **Next.js:** A React framework for building web applications. Used for the frontend and API.
* **React:** A JavaScript library for building user interfaces. Used for the frontend components.
* **Tailwind CSS:** A utility-first CSS framework. Used for styling the application.
* **@shadcn/ui:** A library of UI components built with Radix UI and Tailwind CSS.
* **Google Generative AI:** Provides access to the Gemini language model for data extraction.
* **Zod:** A schema validation library for TypeScript. Used for data validation.
* **Redis (optional):**  Used for rate limiting if configured.
* **Prismr-React-Renderer:**  Used for syntax highlighting in code examples.
* **Lucide-React:**  Used for icon components.

## Configuration
Create a `.env.local` file in the root directory and add the following environment variables:

* `NEXT_PUBLIC_BASE_URL`: The base URL of your application (required for frontend links).
* `GEMINI_API_KEY`: Your Google Gemini API key (required for API functionality).
* `UPSTASH_REDIS_REST_URL` (optional): Your Upstash Redis URL for rate limiting.
* `UPSTASH_REDIS_REST_TOKEN` (optional): Your Upstash Redis token for rate limiting.

## API Documentation
The API endpoint `/api/extract` accepts POST requests with `application/json` content-type.  The request body should include `data` (the unstructured text) and `format` (the JSON schema).  Error responses will include a detailed error message and HTTP status code (400 for bad request, 429 for too many requests, 500 for internal server error). See the Usage section for request/response examples.  Rate limiting is implemented; see the rate-limit headers in the 429 response for details.

## Dependencies
See the `package.json` file for a complete list of dependencies and devDependencies.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

*README.md was made with [Etchr](https://etchr.dev)*