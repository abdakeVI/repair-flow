Repair Flow – Operations Intelligence Platform
Project Info

How can I edit this code?
There are several ways of editing this application.

Use your preferred IDE
If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed – install with nvm

Follow these steps:

bash
# Step 1: Clone the repository using the project's Git URL
git clone https://github.com/abdakeVI/repair-flow.git

# Step 2: Navigate to the project directory
cd repair-flow

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server with auto-reloading and an instant preview
npm run dev
The application will open at http://localhost:5173

Environment Variables
Create a .env file in the root directory with:

text
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Edit a file directly in GitHub
Navigate to the desired file(s)

Click the "Edit" button (pencil icon) at the top right of the file view

Make your changes and commit the changes

Use GitHub Codespaces
Navigate to the main page of your repository

Click on the "Code" button (green button) near the top right

Select the "Codespaces" tab

Click on "New codespace" to launch a new Codespace environment

Edit files directly within the Codespace and commit and push your changes once you're done

What technologies are used for this project?
This project is built with:

Vite – Build tool and development server

TypeScript – Type-safe JavaScript

React – UI library

shadcn-ui – Component library

Tailwind CSS – Styling framework

How can I run this project locally?
Follow the steps in the "Use your preferred IDE" section above. After running npm run dev, the development server will start and you can view the application at http://localhost:5173.

