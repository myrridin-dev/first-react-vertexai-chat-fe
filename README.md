## React Gemini Chatbot

**Credits:**

Inspired by [this article](https://medium.com/@sumudithalanz/building-a-chatbot-with-react-express-and-googles-gemini-ai-858d9d8d3556)

**Dependencies:**

- @google/generative-ai: (Google generative AI service)
- concurrently: (Runs multiple commands concurrently)
- cors: (Enables Cross-Origin Resource Sharing)
- dotenv: (Loads environment variables from a .env file)
- express: (Lightweight web framework for Node.js)
- nodemon: (Monitors changes in Node.js files and restarts the server)
- prismjs: (Provides syntax highlighting for code blocks)
- react-markdown: (Renders Markdown content in React applications)
- react-loader-spinner: (Adds a spinner)

**Installation:**

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add your Google API key:

   ```
   GOOGLE_GEN_AI_KEY=<YOUR_API_KEY>
   ```

**Usage:**

1. Run both frontend and backend servers concurrently:

   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your web browser.

**Scripts:**

- `npm run dev`: Runs both frontend and backend servers concurrently.
- `npm start:frontend`: Starts the React frontend development server.
- `npm start:backend`: Starts the Node.js backend server.
- `npm run build`: Builds the production-ready version of the frontend.
- `npm run test`: Runs tests for the application.
- `npm run eject`: Ejects the React app for more customization (use with caution).
