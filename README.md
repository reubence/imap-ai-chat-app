This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- [pnpm or npm](https://pnpm.io/installation)
- A [PostgreSQL](https://www.postgresql.org/download/) database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/imap-ai-chat-app.git
    cd imap-ai-chat-app
    ```

2.  **Install dependencies:**

    You can use either `pnpm` or `npm`.

    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and replace the placeholder values with your actual PostgreSQL connection string. For a local setup, `DATABASE_URL` and `DIRECT_URL` can be the same.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Set up the database:**

    Run the following command to apply database migrations and generate the Prisma client. This will set up your database schema based on the definitions in `prisma/schema.prisma`.

    ```bash
    pnpm prisma migrate dev
    # or
    npm run prisma -- migrate dev
    ```
    You can learn more about Prisma migrations [here](https://www.prisma.io/docs/concepts/components/prisma-migrate).

5.  **Run the development server:**

    ```bash
    pnpm dev
    # or
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Authentication:** [Better-Auth](https://better-auth.dev/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [Shadcn/ui](https://ui.shadcn.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
