import { addAuditLogReason } from "../../utils/helpers";
import EndpointGroup from "../base";
import * as ApiTypes from "discord-api-types/v10";

/**	# Guild Channels
 * 	Group of `/guild/{guild.id}/channel`-related endpoints [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-channels)
 */
export default class GuildChannels extends EndpointGroup {
  /**	## Get Guild Channels
   * 	Returns a list of all guild channel objects. Does not include threads. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-channels)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to get channels from
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildChannelsResult>}
   */
  async list(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildChannelsResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildChannelsResult>("GET", `/guilds/${guildID}/channels`);
  }
  /**	## Create Guild Channel
   * 	Create a new channel object for the guild. Requires the `MANAGE_CHANNELS` permission. Returns the new channel object on success. Fires a Channel Create Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/guild#create-guild-channel)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to create channel in
   *    @param {ApiTypes.RESTPostAPIGuildChannelJSONBody} options Channel options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPostAPIGuildChannelResult>} New channel
   */
  async create(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPostAPIGuildChannelJSONBody, reason?: string): Promise<ApiTypes.RESTPostAPIGuildChannelResult> {
    return await this.client.request<ApiTypes.RESTPostAPIGuildChannelResult>("POST", `/guilds/${guildID}/channels`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Modify Guild Channel Positions
   * 	Modify the positions of a set of channel objects for the guild. Requires MANAGE_CHANNELS permission. Returns a 204 empty response on success. Fires multiple Channel Update Gateway events. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild with the channel(s)
   *    @param {ApiTypes.RESTPatchAPIGuildChannelPositionsJSONBody} options Array of movement options
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildChannelPositionsResult>}
   */
  async modifyPositions(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPIGuildChannelPositionsJSONBody): Promise<ApiTypes.RESTPatchAPIGuildChannelPositionsResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildChannelPositionsResult>("PATCH", `/guilds/${guildID}/channels`, { body: JSON.stringify(options) });
  }
}
