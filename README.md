📒 Notes Management App

🚀 Overview

The Notes Management App is a powerful note-taking application built using Next.js, featuring real-time collaboration via Liveblocks and AI-enhanced functionalities powered by OpenAI API. Users can create, edit, and collaborate on notes in real-time while leveraging AI for category generation.

✨ Features

📝 Real-time Collaboration: Multiple users can edit notes simultaneously with Liveblocks.

🤖 AI Integration: Utilize OpenAI API for smart category recommendations.

🔐 Secure Authentication: Secure login and access control for a personalized experience using Clerk.

📄 Rich Text Editing: Support for markdown, formatting options.

📱 Cross-Platform Support: Works seamlessly on desktops, tablets, and mobile devices.

🛠 Tech Stack

Frontend: Next.js (React-based framework)

Real-time Collaboration: Liveblocks

AI Integration: OpenAI API

Authentication: Clerk

Styling: Tailwind CSS / Shadcn

🔧 Installation & Setup

Clone the repository:

git clone https://github.com/kaushikkts/notes-management.git
cd notes-management

Install dependencies:

npm install  # or yarn install

Set up environment variables: Create a .env.local file and add the following:

#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=

#OpenAI
OPEN_API_KEY=


Run the development server:

npm run dev  # or yarn dev

Open http://localhost:3000 in your browser.

📖 Usage

🆕 Creating a Note: Click on "Start a blank document" and start typing.

📡 Real-time Collaboration: Share the note link with others for seamless teamwork.

🧠 AI Assistance: Use AI-powered features for category suggestions.

📂 Saving & Organizing: Notes are automatically saved and can be categorized.
