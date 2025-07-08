## Project Stack

This app is built with the following technologies:

### **Frontend:**

- **React.js**: A powerful JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework used for designing responsive and highly customizable UIs.

### **Data Fetching:**

- **Axios**: A popular promise-based HTTP client for making API requests and handling asynchronous operations.

### **News APIs:**

- **NewsAPI**: A comprehensive API that allows access to articles from over 70,000 news sources.
- **The Guardian API**: Provides access to articles from The Guardian, one of the most respected news outlets in the world.
- **New York Times API**: Provides access to articles from The New York Times, a leading global news provider.

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Docker**: Follow the instructions for installation [here](https://docs.docker.com/get-docker/).

---

## Cloning the Repository

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Zeeahmed48/react-news-aggregator.git
    ```

2. Navigate to project directory:

    ```bash
    cd react-news-aggregator
    ```

---

## Setting Up the Development Environment

### 1. Create the `.env` File

Before running the app, you need to define your environment variables:

- Create a `.env` file in the root of the project.
- Add your environment variables, such as API keys for the news services.

Example `.env` file:

```env
VITE_NEWS_API_KEY=your-newsapi-key-here
VITE_GUARDIAN_API_KEY=your-guardian-api-key-here
VITE_NYTIMES_API_KEY=your-nytimes-api-key-here
```

### 2. Building the Docker Image

You can build the Docker image for the app using the Dockerfile.

- In the project root, where the Dockerfile is located, run the following command:


```bash
docker build . -t "react-news-aggregator:v1.0"
```

This will create a Docker image named react-news-aggregator with tag v1.0.

### 3. Running the Application

Once the Docker image is built, you can run the app inside a Docker container.

```bash
docker run --name react-news-aggregator -p 8080:8080 --env-file .env react-news-aggregator:v1.0
```

---

For the next time just run the container:

```bash
docker start react-news-aggregator
```

to see the logs in the terminal:

```bash
docker logs -f react-news-aggregator
```