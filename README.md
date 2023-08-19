This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally

First, create a `.env.local` file in the root directory of the project. This file should contain the following environment variables:

```bash
NEXT_PUBLIC_API_URL=/api
YELP_API_KEY=<your Yelp API key>
NEXT_PUBLIC_YELP_API_URL=https://api.yelp.com/v3
```

After setting the environment variables, install the dependencies:

```bash
yarn install
```

After installing the dependencies, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## View the live demo
You can view the live demo [here](https://playstudios-challenge.vercel.app/).
The source code for the live demo is hosted on the [`main`](https://github.com/MatheusRoichman/ps-challenge/tree/main) branch of this repository.