# Renovate Playground

A web based playground for testing and debugging [Renovate](https://github.com/renovatebot/renovate) configurations in real-time. This tool allows you to experiment with Renovate configurations against any GitHub repository.

> 🎯 **Harmonized Setup**: Both local and Docker environments run on port **8080** with the same URL structure (`http://localhost:8080`). See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed architecture information.

## What is This?

Renovate Playground is an interactive development tool that helps you:
- **Test Renovate configurations** before deploying them to production
- **Debug configuration issues** with real-time log streaming
- **Visualize package updates** and branch information
- **Experiment safely** with dry-run mode enabled by default

### How It Works

1. **User Input**: Enter a GitHub repository URL, Personal Access Token (PAT), and Renovate configuration
2. **Backend Processing**: The NestJS API spawns a Renovate process with your configuration in dry-run mode
3. **Real-time Streaming**: Logs are streamed back to the UI via Server-Sent Events (SSE)
4. **Results Display**: View package files, proposed updates, and branch information in the UI

## Prerequisites

- **Node.js**: v22.x or higher
- **pnpm**: Latest version (installed globally)
- **Docker/Podman** (optional, for containerized deployment)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd renovate-playground
```

### Install Dependencies

```bash
pnpm install
```

## Usage

### Option 1: Local Development (Unified Mode - Recommended)

Run everything on port 8080, same as Docker:

```bash
pnpm start:api
```

**Access the application**: Open your browser to `http://localhost:8080`

> **Note**: This serves both frontend and backend on the same port, identical to Docker deployment.

### Option 2: Local Development (Separate Dev Servers)

For Angular hot reload during development:

```bash
# Terminal 1 - Start the API (runs on http://localhost:8080)
pnpm start:api

# Terminal 2 - Start the UI dev server (runs on http://localhost:4200)
pnpm start:ui
```

**Access the application**: Open your browser to `http://localhost:4200`

> **Note**: The Angular dev server proxies API requests to port 8080.

### Option 3: Run with Docker

#### Build the Docker Image

```bash
docker build -t renovate-playground:latest .
```

#### Run the Container

```bash
docker run -p 8080:8080 renovate-playground:latest
```

**Access the application**: Open your browser to `http://localhost:8080`

> **Note**: The Docker image serves both the API and the built UI from the same container on port 8080.

#### Using Podman

```bash
# Build
podman build -t renovate-playground:latest .

# Run
podman run -p 8080:8080 renovate-playground:latest
```

## How to Use the Playground

1. **Repository URL**: Enter the full GitHub repository URL (e.g., `https://github.com/owner/repo`)
2. **Personal Access Token**: Provide a GitHub PAT with `repo` scope to access the repository
3. **Renovate Configuration**: Enter your Renovate configuration in JSON format
4. **Submit**: Click submit to run Renovate with your configuration
5. **View Results**: Monitor real-time logs and view the analysis results


## Project Structure

```
renovate-playground/
├── apps/
│   ├── api/              # NestJS backend
│   │   └── src/
│   │       └── app/
│   │           └── playground/  # Renovate execution service
│   └── ui/               # Angular frontend
│       └── src/
├── Dockerfile            # Multi-stage production build
├── nx.json               # Nx workspace configuration
├── package.json          # Dependencies and scripts
└── README.md
```

## Technology Stack

### Frontend
- Angular 20
- Angular Material
- RxJS for reactive programming
- Server-Sent Events for real-time updates

### Backend
- NestJS 11
- Renovate (embedded)
- Node.js child processes for Renovate execution


## License

See LICENSE file for details.
