import { addAuditLogReason, serializeIntoQuery } from "../../utils/helpers";
import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";

/**	# Guild Bans
 * 	Group of `/guild/{guild.id}/bans`-related endpoints [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-bans)
 */
export default class GuildBans extends EndpointGroup {
  /**	## Get Guild Bans
   * 	Returns a list of ban objects for the users banned from this guild. Requires the `BAN_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-bans)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get bans from
   * 	@param {ApiTypes.RESTGetAPIGuildBansQuery} options Query options
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildBansResult>} List of bans
   */
  async list(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTGetAPIGuildBansQuery): Promise<ApiTypes.RESTGetAPIGuildBansResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildBansResult>("GET", `/guilds/${guildID}/bans${serializeIntoQuery(options)}`);
  }
  /**	## Get Guild Ban
   * 	Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the `BAN_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-ban)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to fetch ban from
   *    @param {ApiTypes.Snowflake} userID ID of banned user
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildBanResult>}
   */
  async get(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildBanResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildBanResult>("GET", `/guilds/${guildID}/bans/${userID}`);
  }
  /**	## Create Guild Ban
   * 	Create a guild ban, and optionally delete previous messages sent by the banned user. Requires the `BAN_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#create-guild-ban)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to create ban in
   *    @param {ApiTypes.Snowflake} userID ID of user to ban
   *    @param {ApiTypes.RESTPutAPIGuildBanJSONBody} options Ban options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPutAPIGuildBanResult>}
   */
  async create(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, options: ApiTypes.RESTPutAPIGuildBanJSONBody, reason?: string): Promise<ApiTypes.RESTPutAPIGuildBanResult> {
    return await this.client.request<ApiTypes.RESTPutAPIGuildBanResult>("PUT", `/guilds/${guildID}/bans/${userID}`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Remove Guild Ban
   * 	Remove the ban for a user. Requires the `BAN_MEMBERS` permissions. [Discord Docs](https://discord.com/developers/docs/resources/guild#remove-guild-ban)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to remove ban in
   *    @param {ApiTypes.Snowflake} userID ID of user to unban
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTDeleteAPIGuildBanResult>}
   */
  async remove(guildID: ApiTypes.Snowflake, userID: ApiTypes.Snowflake, reason?: string): Promise<ApiTypes.RESTDeleteAPIGuildBanResult> {
    return await this.client.request<ApiTypes.RESTDeleteAPIGuildBanResult>("DELETE", `/guilds/${guildID}/bans/${userID}`, { headers: addAuditLogReason(reason) });
  }
}
