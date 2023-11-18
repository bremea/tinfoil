import { RestClient } from "../src";

const bot = new RestClient(process.env.BOT_TOKEN as string);
console.log(await bot.user.me.get()); // Logs bot information
