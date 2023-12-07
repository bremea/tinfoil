import { addAuditLogReason, serializeIntoQuery } from "../../utils/helpers";
import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";

/**	# Guild Prune
 * 	Group of `/guild/{guild.id}/prune`-related endpoints [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-prune-count)
 */
export default class GuildPrune extends EndpointGroup {
  /**	## Get Guild Prune Count
   * 	Returns an object with one pruned key indicating the number of members that would be removed in a prune operation. Requires the `KICK_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-prune-count)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get prune count from
   * 	@param {ApiTypes.RESTGetAPIGuildPruneCountQuery} options Query params
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildPruneCountResult>} Prune count
   */
  async getCount(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTGetAPIGuildPruneCountQuery): Promise<ApiTypes.RESTGetAPIGuildPruneCountResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildPruneCountResult>("GET", `/guilds/${guildID}/prune${serializeIntoQuery(options)}`);
  }
  /**	## Begin Guild Prune
   * 	Begin a prune operation. Requires the `KICK_MEMBERS` permission. [Discord Docs](https://discord.com/developers/docs/resources/guild#begin-guild-prune)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to prune
   *    @param {ApiTypes.RESTPostAPIGuildPruneJSONBody} options Prune options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPostAPIGuildPruneResult>} Prune count
   */
  async begin(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPostAPIGuildPruneJSONBody, reason?: string): Promise<ApiTypes.RESTPostAPIGuildPruneResult> {
    return await this.client.request<ApiTypes.RESTPostAPIGuildPruneResult>("POST", `/guilds/${guildID}/prune`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
}
