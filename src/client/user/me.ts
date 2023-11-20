import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";
import { serializeIntoQuery } from "../../utils/helpers";

export default class MyUserEndpoints extends EndpointGroup {
  /**	## Get Current User
   * 	Returns the user object of the requester's account. [Discord Docs](https://discord.com/developers/docs/resources/user#get-current-user)
   *
   *	@returns {Promise<ApiTypes.RESTGetAPICurrentUserResult>} User data
   */
  async get(): Promise<ApiTypes.RESTGetAPICurrentUserResult> {
    return await this.client.request<ApiTypes.RESTGetAPICurrentUserResult>("GET", `/users/@me`);
  }
  /**	## Modify Current User
   * 	Modify the requester's user account settings. Returns a user object on success. Fires a User Update Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/user#modify-current-user)
   *
   *	@param {ApiTypes.RESTPatchAPICurrentUserJSONBody} options Request options
   *	@returns {Promise<ApiTypes.RESTGetAPICurrentUserResult>} User data
   */
  async modify(options: ApiTypes.RESTPatchAPICurrentUserJSONBody): Promise<ApiTypes.RESTPatchAPICurrentUserResult> {
    return await this.client.request<ApiTypes.RESTPatchAPICurrentUserResult>("PATCH", `/users/@me`, { body: JSON.stringify(options) });
  }
  /**	## Get Current User Guilds
   * 	Returns a list of partial guild objects the current user is a member of. [Discord Docs](https://discord.com/developers/docs/resources/user#get-current-user-guilds)
   *
   *	@param {ApiTypes.RESTGetAPICurrentUserGuildsQuery} options Request options
   *	@returns {Promise<ApiTypes.RESTGetAPICurrentUserGuildsResult>} Guild(s) data
   */
  async getGuilds(options: ApiTypes.RESTGetAPICurrentUserGuildsQuery): Promise<ApiTypes.RESTGetAPICurrentUserGuildsResult> {
    return await this.client.request<ApiTypes.RESTGetAPICurrentUserGuildsResult>("GET", `/users/@me/guilds${serializeIntoQuery(options)}`);
  }
  /**	## Get Current User Guild Member
   * 	Returns a guild member object for the current user. [Discord Docs](https://discord.com/developers/docs/resources/user#get-current-user-guild-member)
   *
   *	@param {ApiTypes.Snowflake} guildID ID of guild
   *	@returns {Promise<ApiTypes.RESTGetCurrentUserGuildMemberResult>} Guild member data
   */
  async getGuildMember(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetCurrentUserGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTGetCurrentUserGuildMemberResult>("GET", `/users/@me/guilds/${guildID}/member`);
  }
  /**	## Leave Guild
   * 	Leave a guild. Returns a 204 empty response on success. Fires a Guild Delete Gateway event and a Guild Member Remove Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/user#leave-guild)
   *
   *	@param {ApiTypes.Snowflake} guildID ID of guild
   *	@returns {Promise<ApiTypes.RESTDeleteAPICurrentUserGuildResult>}
   */
  async leaveGuild(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTDeleteAPICurrentUserGuildResult> {
    return await this.client.request<ApiTypes.RESTDeleteAPICurrentUserGuildResult>("DELETE", `/users/@me/guilds/${guildID}`);
  }
  /**	## Create DM
   * 	Create a new DM channel with a user. Returns a DM channel object (if one already exists, it will be returned instead). [Discord Docs](https://discord.com/developers/docs/resources/user#create-dm)
   *
   *	@param {ApiTypes.Snowflake} recipientID ID of recipient
   *	@returns {Promise<ApiTypes.RESTPostAPICurrentUserCreateDMChannelResult>} DM channel
   */
  async createDM(recipientID: ApiTypes.Snowflake): Promise<ApiTypes.RESTPostAPICurrentUserCreateDMChannelResult> {
    return await this.client.request<ApiTypes.RESTPostAPICurrentUserCreateDMChannelResult>("DELETE", `/users/@me/channels`, {
      body: JSON.stringify({ recipient_id: recipientID } as ApiTypes.RESTPostAPICurrentUserCreateDMChannelJSONBody),
    });
  }
  /**	## Get Current User Connections
   * 	Returns a list of connection objects. [Discord Docs](https://discord.com/developers/docs/resources/user#get-current-user-connections)
   *
   *	@returns {Promise<ApiTypes.RESTGetAPICurrentUserConnectionsResult>} List of connection objects
   */
  async getConnections(): Promise<ApiTypes.RESTGetAPICurrentUserConnectionsResult> {
    return await this.client.request<ApiTypes.RESTGetAPICurrentUserConnectionsResult>("GET", `/users/@me/connections`);
  }
  /**	## Get Current User Application Role Connection
   * 	Returns the application role connection for the user. [Discord Docs](https://discord.com/developers/docs/resources/user#get-current-user-application-role-connection)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application
   *	@returns {Promise<ApiTypes.RESTGetAPICurrentUserApplicationRoleConnectionResult>} Application role connection
   */
  async getApplicationRoleConnection(applicationID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPICurrentUserApplicationRoleConnectionResult> {
    return await this.client.request<ApiTypes.RESTGetAPICurrentUserApplicationRoleConnectionResult>("GET", `/users/@me/applications/${applicationID}/role-connection`);
  }
  /**	## Update Current User Application Role Connection
   * 	Updates and returns the application role connection for the user. [Discord Docs](https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application
   * 	@param {ApiTypes.RESTPutAPICurrentUserApplicationRoleConnectionJSONBody} options Updated application role connection details
   *	@returns {Promise<ApiTypes.RESTPutAPICurrentUserApplicationRoleConnectionResult>} Application role connection
   */
  async updateApplicationRoleConnection(
    applicationID: ApiTypes.Snowflake,
    options: ApiTypes.RESTPutAPICurrentUserApplicationRoleConnectionJSONBody
  ): Promise<ApiTypes.RESTPutAPICurrentUserApplicationRoleConnectionResult> {
    return await this.client.request<ApiTypes.RESTPutAPICurrentUserApplicationRoleConnectionResult>("PUT", `/users/@me/applications/${applicationID}/role-connection`, {
      body: JSON.stringify(options),
    });
  }
}
