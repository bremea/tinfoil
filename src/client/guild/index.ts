import * as ApiTypes from "discord-api-types/v10";
import RestClient, { EndpointGroup } from "../rest";
import AuditLogEndpoints from "./auditlog";
import { serializeIntoQuery } from "../../utils/helpers";

/**	# Guild Endpoints
 * 	Guilds in Discord represent an isolated collection of users and channels, and are often referred to as "servers" in the UI. [Discord Docs](https://discord.com/developers/docs/resources/guild)
 */
export default class GuildEndpoints extends EndpointGroup {
  public auditLog: AuditLogEndpoints;

  constructor(client: RestClient) {
    super(client);
    this.auditLog = new AuditLogEndpoints(client);
  }

  /**	## Create Guild
   * 	Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/guild#create-guild)
   *
   * 	@param {RESTPostAPIGuildChannelJSONBody} options New guild settings
   *	@returns {Promise<ApiTypes.RESTPostAPIGuildsResult>} New guild data
   */
  async create(options: ApiTypes.RESTPostAPIGuildChannelJSONBody): Promise<ApiTypes.RESTPostAPIGuildsResult> {
    return await this.client.request<ApiTypes.RESTPostAPIGuildsResult>("POST", `/guilds`, { body: JSON.stringify(options) });
  }
  /**	## Get Guild
   * 	Returns the guild object for the given id. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to fetch
   * 	@param {boolean?} withCounts If true, will also return `approximate_member_count` and `approximate_presence_count`
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildResult>} Guild data
   */
  async get(guildID: ApiTypes.Snowflake, withCounts?: boolean): Promise<ApiTypes.RESTGetAPIGuildResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildResult>("GET", `/guilds/${guildID}${withCounts ? serializeIntoQuery({ with_counts: withCounts } as ApiTypes.RESTGetAPIGuildQuery) : ""}`);
  }
}
