# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

WATCH LIVE SITE: https://user-data-crud-example.vercel.app

# Fork and Run Vite App

This guide will walk you through the process of forking a Vite app repository on GitHub and running it on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/en/)
2. [Git](https://git-scm.com/)

## Step 1: Fork the Repository

1. Go to the Vite app repository you want to fork on GitHub.
2. Click the "Fork" button in the top right corner of the page.
3. Choose your GitHub account or organization where you want to fork the repository.

## Step 2: Clone the Forked Repository

1. On your GitHub profile, navigate to the forked repository.
2. Click the "Code" button and copy the repository URL (HTTPS or SSH).
3. Open your terminal or command prompt on your local machine.
4. Navigate to the directory where you want to clone the repository.
5. Run the following command, replacing `<repository-url>` with the copied URL:

   ```bash
   git clone <repository-url>

## Step 3: Install Dependencies

1. Navigate to the cloned repository's directory:

   ```bash
   cd <repository-name>
2. Install the project dependencies using npm or yarn:
   ```bash
   npm install
   ```
   or
   ```
   yarn install
   ```

## Step 4: Run the Vite App
1. Once the dependencies are installed, start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
2. The development server will compile the app and open it in your default browser. If it doesn't open automatically, you can access it at http://localhost:5173/ or another port specified in the terminal.
