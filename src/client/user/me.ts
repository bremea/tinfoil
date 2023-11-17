import { Snowflake } from "discord-api-types/globals";
import { EndpointGroup } from "../rest";

export default class MyUserEndpoints extends EndpointGroup {
  /**
   * Returns a user object for a given user ID. [Discord Docs](https://discord.com/developers/docs/resources/user#get-user)
   */
  async get() {
    return await this.client.request("GET", `/users/@me`);
  }
}
