import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;
const BACKEND_URL = process.env.BACKEND_URL;

if (!BOT_TOKEN || !WEBAPP_URL || !BACKEND_URL) {
  throw new Error("Please set BOT_TOKEN, WEBAPP_URL, and BACKEND_URL in .env");
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  const tgId = ctx.from.id;
  const username = ctx.from.username ?? ctx.from.first_name ?? "Unknown";
  // Register or login user in backend
  try {
    await axios.post(`${BACKEND_URL}/user/auth`, {
      telegramId: tgId,
      username
    });
  } catch (e) {
    // Ignore if already exists
  }
  await ctx.reply(
    `Welcome to Kingdom Game, ${username}!`,
    Markup.inlineKeyboard([
      [
        Markup.button.webApp("Play Game", WEBAPP_URL),
      ]
    ])
  );
});

bot.command("play", async (ctx) => {
  await ctx.reply(
    "Open the Kingdom Game web app:",
    Markup.inlineKeyboard([
      [
        Markup.button.webApp("Play Game", WEBAPP_URL),
      ]
    ])
  );
});

// Simple stats command
bot.command("profile", async (ctx) => {
  const tgId = ctx.from.id;
  try {
    const { data } = await axios.get(`${BACKEND_URL}/user/${tgId}`);
    await ctx.reply(
      `🏰 *Your Profile*\n\n` +
      `Username: ${data.username}\n` +
      `Area: ${data.area} km²\n` +
      `Coins: ${data.coins}\n` +
      `Soldiers: ${data.soldiers?.map(s => `${s.type}: ${s.count}`).join(', ') || 0}`,
      { parse_mode: "Markdown" }
    );
  } catch {
    await ctx.reply("Profile not found. Try /start to register.");
  }
});

// You can expand with more commands!

bot.launch();
console.log("Kingdom Game Bot running!");

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));