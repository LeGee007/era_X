# Telegram Kingdom Game – Starter Project

## Structure

- **/backend** – Node.js (Express, TypeScript), MongoDB (Mongoose)
- **/frontend** – React (Telegram Web App)
- **/bot** – Node.js (Telegraf), launches and manages game

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Telegram Bot Token (from @BotFather)

### 2. Setup

```bash
git clone <your-repo-url> telegram-kingdom-game
cd telegram-kingdom-game
```

#### Backend
```bash
cd backend
npm install
cp .env.example .env  # edit with Mongo URI
npm run dev
```
#### Frontend
```bash
cd ../frontend
npm install
npm start
```
#### Bot
```bash
cd ../bot
npm install
cp .env.example .env  # edit with bot token, backend URL
npm run dev
```

### 3. Telegram Setup
- Set your bot’s **web app URL** in BotFather (`/setdomain`)
- Share the bot link with users!

## Features

- User authentication via Telegram
- Interactive continent map (expandable)
- Missions, profile, clan, market stubs
- Modular, clean codebase

## Customize

- Expand models, endpoints, and UI as needed!
- Add game logic, payments, etc.

---

Good luck! 🚀