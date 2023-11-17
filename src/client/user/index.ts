import { Snowflake } from "discord-api-types/globals";
import { EndpointGroup } from "../rest";

export default class UserEndpoints extends EndpointGroup {
  /**
   * Returns a user object for a given user ID. [Discord Docs](https://discord.com/developers/docs/resources/user#get-user)
   *
   *	@param {Snowflake} id: User's ID
   */
  async get(id: Snowflake) {
    return await this.client.request("GET", `/users/${id}`);
  }
}
