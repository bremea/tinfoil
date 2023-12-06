import { addAuditLogReason, serializeIntoQuery } from "../../utils/helpers";
import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";

/**	# Guild Roles
 * 	Group of `/guild/{guild.id}/roles`-related endpoints [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-roles)
 */
export default class GuildRoles extends EndpointGroup {
  /**	## Get Guild Roles
   * 	Returns a list of role objects for the guild. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-roles)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get roles from
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildRolesResult>} List of roles
   */
  async list(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildRolesResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildRolesResult>("GET", `/guilds/${guildID}/roles`);
  }
  /**	## Create Guild Role
   * 	Create a new role for the guild. Requires the `MANAGE_ROLES` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#create-guild-role)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to create a role in
   *    @param {ApiTypes.RESTPostAPIGuildRoleJSONBody} options Role options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPostAPIGuildRoleResult>} New role
   */
  async create(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPostAPIGuildRoleJSONBody, reason?: string): Promise<ApiTypes.RESTPostAPIGuildRoleResult> {
    return await this.client.request<ApiTypes.RESTPostAPIGuildRoleResult>("POST", `/guilds/${guildID}/roles`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Modify Guild Role Positions
   * 	Modify the positions of a set of role objects for the guild. Requires the `MANAGE_ROLES` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to modify role positions in
   *    @param {ApiTypes.RESTPatchAPIGuildRolePositionsJSONBody} options Array of positions
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildRolePositionsResult>}
   */
  async modifyPositions(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPIGuildRolePositionsJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPIGuildRolePositionsResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildRolePositionsResult>("PATCH", `/guilds/${guildID}/roles`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Modify Guild Role
   * 	Modify a guild role. Requires the `MANAGE_ROLES` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild-role)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to modify role in
   * 	@param {ApiTypes.Snowflake} roleID ID of role to modify
   *    @param {ApiTypes.RESTPatchAPIGuildRoleJSONBody} options Role options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildRoleResult>}
   */
  async modify(guildID: ApiTypes.Snowflake, roleID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPIGuildRolePositionsJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPIGuildRoleResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildRoleResult>("PATCH", `/guilds/${guildID}/roles/${roleID}`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
}
