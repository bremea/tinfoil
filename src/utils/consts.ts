import { ClientOptions } from "../types/client";

export const TINFOIL_VERSION: number = 0;

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  url: "https://discord.com/api",
  cdnUrl: "https://cdn.discordapp.com",
  version: 10,
  userAgent: `DiscordBot (tinfoil.dev ${TINFOIL_VERSION})`,
};
