import { Snowflake } from "discord-api-types/globals";
import { RESTGetAPIUserResult } from "discord-api-types/rest";
import { EndpointGroup } from "../rest";

export default class UserEndpoints extends EndpointGroup {
  /**
   * Returns a user object for a given user ID. [Discord Docs](https://discord.com/developers/docs/resources/user#get-user)
   *
   *	@param {Snowflake} id: User's ID
   *	@returns {RESTGetAPIUserResult}
   */
  async get(id: Snowflake): Promise<RESTGetAPIUserResult> {
    return await this.client.request<RESTGetAPIUserResult>("GET", `/users/${id}`);
  }
}
