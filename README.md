![GitHub](https://img.shields.io/github/license/Zeeahmed48/flash-feed)
![GitHub last commit](https://img.shields.io/github/last-commit/Zeeahmed48/flash-feed)
![Firebase](https://img.shields.io/badge/hosted%20on-Firebase-orange)

# ⚡ Flash Feed

**Flash Feed** is a modern, responsive, and containerized news aggregator built with **React**, **TypeScript**, and **Tailwind CSS v4**. It fetches and normalizes news from **NewsAPI**, **The Guardian**, and **The New York Times**, offering filters by keyword, date range, source, and category.

---


## 📚 Table of Contents

- [Features](#-features)
- [News APIs](#news-apis)
- [Folder Overview](#-folder-overview)
- [Prerequisites](#prerequisites)
- [Cloning the Repository](#cloning-the-repository)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [🐳 Development in Docker](#-development-in-docker)

---

## ✨ Features

- 🔥 Aggregates news from **NewsAPI**, **The Guardian**, and **NYTimes**
- 🧠 Smart filtering by **keyword**, **date**, **category**, **author**, and **source**
- 🗂 Feature-first, scalable folder structure using **KISS**, **DRY**, and **SOLID**
- 🎨 Fully **responsive** with modern UI using **Tailwind CSS v4**
- ⚙️ Custom Axios factory and error handling with **Sonner** toasts
- 🐳 Containerized with **Docker** (dev + prod)
- 🚀 **CI/CD to Firebase Hosting** using GitHub Actions
- 📦 Built with **Vite**, **React 19**, **TypeScript**, and strict typing

---

### **News APIs:**

- **NewsAPI**: A comprehensive API that allows access to articles from over 70,000 news sources.
- **The Guardian API**: Provides access to articles from The Guardian, one of the most respected news outlets in the world.
- **New York Times API**: Provides access to articles from The New York Times, a leading global news provider.

---

## 📂 Folder Overview

├── Dockerfile
├── Dockerfile.dev
├── README.md
├── docker-compose.yml
├── eslint.config.js
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── pglite-debug.log
├── public/
│   └── logo.svg
├── src/
│   ├── App.tsx
│   ├── assets/
│   │   ├── images/
│   │   │   └── no-image-placeholder.jpg
│   │   └── index.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── app-shell/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── container/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── footer/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── header/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── index.ts
│   │   │   └── sidebar/
│   │   │       ├── index.tsx
│   │   │       └── style.css
│   │   ├── shared/
│   │   │   ├── check-list/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── empty-result/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── error-fallback/
│   │   │   │   └── index.tsx
│   │   │   ├── error-message/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── index.ts
│   │   │   └── loader/
│   │   │       ├── index.tsx
│   │   │       └── style.css
│   │   └── ui/
│   │       ├── badge/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── card/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── checkbox/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── date-picker/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── index.ts
│   │       ├── input/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── select/
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       └── tooltip/
│   │           └── index.tsx
│   ├── constants/
│   │   ├── assets.ts
│   │   ├── config.ts
│   │   ├── general.ts
│   │   ├── index.ts
│   │   └── navigations.ts
│   ├── features/
│   │   ├── feed/
│   │   │   ├── components/
│   │   │   │   ├── index.ts
│   │   │   │   └── preferences/
│   │   │   │       ├── index.tsx
│   │   │   │       └── style.css
│   │   │   └── index.ts
│   │   └── news/
│   │       ├── components/
│   │       │   ├── filters/
│   │       │   │   ├── index.tsx
│   │       │   │   └── style.css
│   │       │   ├── index.ts
│   │       │   ├── news-card/
│   │       │   │   ├── index.tsx
│   │       │   │   └── style.css
│   │       │   └── news-list/
│   │       │       ├── index.tsx
│   │       │       └── style.css
│   │       └── index.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useAuthors.ts
│   │   ├── useDebounce.ts
│   │   ├── useFilters.ts
│   │   ├── useNews.ts
│   │   ├── usePreferedNews.ts
│   │   └── usePreferences.ts
│   ├── index.css
│   ├── lib/
│   │   ├── axios-factory.ts
│   │   └── index.ts
│   ├── main.tsx
│   ├── pages/
│   │   ├── feed/
│   │   │   ├── index.tsx
│   │   │   └── style.css
│   │   └── home/
│   │       ├── index.tsx
│   │       └── style.css
│   ├── routes/
│   │   └── index.tsx
│   ├── services/
│   │   ├── guardian.ts
│   │   ├── newsapi.ts
│   │   └── nytimes.ts
│   ├── types/
│   │   ├── feed.ts
│   │   ├── index.ts
│   │   └── news.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── index.ts
│   │   └── tw-merge.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts



## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Docker**: Follow the instructions for installation [here](https://docs.docker.com/get-docker/).
- **NodeJS v22.12.0**: Follow the instructions for installation [here](https://nodejs.org/en/download/).

---

## Cloning the Repository

1. Clone the repository to your local machine:

    ```bash 
    git clone https://github.com/Zeeahmed48/flash-feed.git
    ```

2. Navigate to project directory:

    ```bash
    cd flash-feed
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

---

## Setting Up the Development Environment

### Create the `.env` File

Before running the app, you need to define your environment variables:

- Create a `.env` file in the root of the project.
- Add your environment variables, such as API keys for the news services.

Example `.env` file:

```env
VITE_NEWS_API_KEY=your-newsapi-key-here
VITE_GUARDIAN_API_KEY=your-guardian-api-key-here
VITE_NYTIMES_API_KEY=your-nytimes-api-key-here
```

---

## 🐳 Development in Docker

### Building the Docker Image

In the project root, run the following command:

For development:
```bash
npm run docker:dev:build
```

For production:
```bash
npm run docker:build
```

This will create a Docker image named news-aggregator with tag dev or prod.

### Running the Application

Once the Docker image is built, you can run the app inside a Docker container or you can create container by using following script.

For development:
```bash
npm run docker:dev:run
```

For production:
```bash
npm run docker:run
```

---

For the next time just start the container:

```bash
docker start news-aggregator-dev
```

OR

```bash
docker start news-aggregator-prod
```

to see the logs in the terminal:

```bash
docker logs -f news-aggregator-dev
```

OR

```bash
docker logs -f news-aggregator-prod
```

---

## 👨‍💻 Author

Developed by [Zeeshan Ahmed](https://github.com/Zeeahmed48)