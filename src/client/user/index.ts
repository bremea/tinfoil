import * as ApiTypes from "discord-api-types/v10";
import RestClient from "../rest";
import EndpointGroup from "../base";
import MyUserEndpoints from "./me";

/**	# User Endpoints
 * 	Can be used to make operations against Discord users. [Discord Docs](https://discord.com/developers/docs/resources/user)
 */
export default class UserEndpoints extends EndpointGroup {
  public me: MyUserEndpoints;

  constructor(client: RestClient) {
    super(client);
    this.me = new MyUserEndpoints(client);
  }

  /**	## Get User
   * 	Returns a user object for a given user ID. [Discord Docs](https://discord.com/developers/docs/resources/user#get-user)
   *
   *	@param {ApiTypes.Snowflake} id User's ID
   *	@returns {Promise<ApiTypes.RESTGetAPIUserResult>} User data
   */
  async get(id: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIUserResult> {
    return await this.client.request<ApiTypes.RESTGetAPIUserResult>("GET", `/users/${id}`);
  }
}
