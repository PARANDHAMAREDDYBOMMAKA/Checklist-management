# NX MUI Testing - CP Checklist

This project is a React-based application built with Vite. It allows users to manage activities and sub-activities with weights, units, and names. The application ensures that the total weight percentage of all activities equals 100% before saving.

## Features

- Add, edit, and delete activities and sub-activities.
- Assign weights and units to activities and sub-activities.
- Real-time calculation of total weight percentage.
- Save functionality with validation to ensure the total weight equals 100%.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: Icon library for React.

## Live Demo

Check out the live application here: [Checklist App](https://checklist-indol.vercel.app/)

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   \`\`\`
   git clone <repository-url>
   cd <repository-folder>
   \`\`\`

2. Install dependencies:

   \`\`\`
   npm install
   \`\`\`

3. Start the development server:

   \`\`\`
   npm run dev
   \`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`.

## Scripts

- \`npm run dev\`: Start the development server.
- \`npm run build\`: Build the project for production.
- \`npm run preview\`: Preview the production build.
- \`npm run lint\`: Run ESLint to check for code issues.

## Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own version:

1. Install the Vercel CLI:

   \`\`\`
   npm install -g vercel
   \`\`\`

2. Link your project to a Vercel account:

   \`\`\`
   vercel link
   \`\`\`

3. Deploy the project:

   \`\`\`
   vercel
   \`\`\`
