> **NOTICE**: Tinfoil is still under development! Use at your own risk.

# Tinfoil
[![](https://dcbadge.vercel.app/api/server/CXhCTscDfc)](https://discord.gg/CXhCTscDfc)

Tinfoil is a small, unopinionated, and zero-dependency Discord API wrapper, written in Typescript for the Bun runtime. It includes no caching, rate limit handling, command handlers, etc. It is up to you to implement everything you need for your bot - tinfoil simply makes interacting with the API a bit easier.

## Getting Started
You can install Tinfoil with one of the commands below, depending on what package manager you are using:
```
// Install commmands coming soon
```

Here is an example of using the REST API:
```ts
import { RestClient } from "tinfoil";

const bot = new RestClient(process.env.BOT_TOKEN as string);
console.log(await bot.users.me.get()) // Logs bot information
```

## Contributing

Please open an [issue](https://github.com/bremea/tinfoil/issues/new) with any bug reports, or a [pull request](https://github.com/bremea/tinfoil/compare) to merge something you worked on.
