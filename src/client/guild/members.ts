import { addAuditLogReason, serializeIntoQuery } from "../../utils/helpers";
import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";

/**	# Guild Members
 * 	Group of `/guild/{guild.id}/members`-related endpoints [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-member)
 */
export default class GuildMembers extends EndpointGroup {
  /**	## Get Guild Member
   * 	Returns a guild member object for the specified user. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-member)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get member from
   * 	@param {ApiTypes.Snowflake} userID ID of user to get
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildMemberResult>} Member data
   */
  async get(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildMemberResult>("GET", `/guilds/${guildID}/members/${userID}`);
  }
  /**	## List Guild Members
   * 	Returns a list of guild member objects that are members of the guild. [Discord Docs](https://discord.com/developers/docs/resources/guild#list-guild-members)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get members from
   * 	@param {ApiTypes.RESTGetAPIGuildMembersQuery} options Query options
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildMembersResult>} List of members
   */
  async list(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTGetAPIGuildMembersQuery): Promise<ApiTypes.RESTGetAPIGuildMembersResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildMembersResult>("GET", `/guilds/${guildID}/members${serializeIntoQuery(options)}`);
  }
  /**	## Search Guild Members
   * 	Returns a list of guild member objects whose username or nickname starts with a provided string. [Discord Docs](https://discord.com/developers/docs/resources/guild#search-guild-members)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to search
   * 	@param {ApiTypes.RESTGetAPIGuildMembersSearchQuery} options Search options
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildMembersSearchResult>} List of members matching the search
   */
  async search(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTGetAPIGuildMembersSearchQuery): Promise<ApiTypes.RESTGetAPIGuildMembersSearchResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildMembersSearchResult>("GET", `/guilds/${guildID}/members/search${serializeIntoQuery(options)}`);
  }
  /**	## Add Guild Member
   * 	Adds a user to the guild. [Discord Docs](https://discord.com/developers/docs/resources/guild#add-guild-member)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to add member to
   * 	@param {ApiTypes.Snowflake} userID ID of user to add
   *    @param {ApiTypes.RESTPutAPIGuildMemberJSONBody} options Options for new member
   *	@returns {Promise<ApiTypes.RESTPutAPIGuildMemberResult>} Guild member object, or no content if user is already a member
   */
  async add(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, options: ApiTypes.RESTPutAPIGuildMemberJSONBody, reason?: string): Promise<ApiTypes.RESTPutAPIGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTPutAPIGuildMemberResult>("POST", `/guilds/${guildID}/members/${userID}`, { body: JSON.stringify(options) });
  }
  /**	## Modify Guild Member
   * 	Modify attributes of a guild member. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild-member)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild with member
   * 	@param {ApiTypes.Snowflake} userID ID of user to modify
   *    @param {ApiTypes.RESTPatchAPIGuildMemberJSONBody} options Modification options
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildMemberResult>} Updated guild member
   */
  async modify(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPIGuildMemberJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPIGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildMemberResult>("PATCH", `/guilds/${guildID}/members/${userID}`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Modify Current Member
   * 	Modifies the current member in a guild. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-current-member)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild
   *    @param {ApiTypes.RESTPatchAPICurrentGuildMemberJSONBody} options Modification options
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildMemberResult>} Updated guild member
   */
  async modifyMe(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPICurrentGuildMemberJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPIGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildMemberResult>("PATCH", `/guilds/${guildID}/members/@me`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**
   *	@deprecated Use `modifyMe` instead
   *
   *	## Modify Current User Nick
   * 	Modifies the nickname of the current user in a guild. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-current-user-nick)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild
   *    @param {ApiTypes.RESTPatchAPICurrentGuildMemberNicknameJSONBody} options Modification options
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPICurrentGuildMemberNicknameResult>} Updated guild member
   */
  async modifyMyNick(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPICurrentGuildMemberNicknameJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPICurrentGuildMemberNicknameResult> {
    return await this.client.request<ApiTypes.RESTPatchAPICurrentGuildMemberNicknameResult>("PATCH", `/guilds/${guildID}/members/@me/nick`, {
      body: JSON.stringify(options),
      headers: addAuditLogReason(reason),
    });
  }
  /**	## Add Guild Member Role
   * 	Adds a role to a guild member. Requires the `MANAGE_ROLES` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#add-guild-member-role)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild with member
   * 	@param {ApiTypes.Snowflake} userID ID of user to add role to
   * 	@param {ApiTypes.Snowflake} roleID ID of role to add
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPutAPIGuildMemberRoleResult>} Updated guild member
   */
  async addRole(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, roleID: ApiTypes.Snowflake, reason?: string): Promise<ApiTypes.RESTPutAPIGuildMemberRoleResult> {
    return await this.client.request<ApiTypes.RESTPutAPIGuildMemberRoleResult>("PUT", `/guilds/${guildID}/members/${userID}/roles/${roleID}`, { headers: addAuditLogReason(reason) });
  }
  /**	## Remove Guild Member Role
   * 	Removes a role to a guild member. Requires the `MANAGE_ROLES` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#remove-guild-member-role)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild with member
   * 	@param {ApiTypes.Snowflake} userID ID of user to add role to
   * 	@param {ApiTypes.Snowflake} roleID ID of role to add
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTDeleteAPIGuildMemberRoleResult>} Updated guild member
   */
  async removeRole(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, roleID: ApiTypes.Snowflake, reason?: string): Promise<ApiTypes.RESTDeleteAPIGuildMemberRoleResult> {
    return await this.client.request<ApiTypes.RESTDeleteAPIGuildMemberRoleResult>("PUT", `/guilds/${guildID}/members/${userID}/roles/${roleID}`, { headers: addAuditLogReason(reason) });
  }
  /**	## Remove Guild Member
   * 	Remove a member from a guild. Requires `KICK_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#remove-guild-member)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild with member
   * 	@param {ApiTypes.Snowflake} userID ID of user to add role to
   * 	@param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTDeleteAPIGuildMemberResult>}
   */
  async kick(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, reason?: string): Promise<ApiTypes.RESTDeleteAPIGuildMemberResult> {
    return await this.client.request<ApiTypes.RESTDeleteAPIGuildMemberResult>("DELETE", `/guilds/${guildID}/members/${userID}`, { headers: addAuditLogReason(reason) });
  }
}
