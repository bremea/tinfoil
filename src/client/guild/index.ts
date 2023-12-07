import * as ApiTypes from "discord-api-types/v10";
import RestClient from "../rest";
import EndpointGroup from "../base";
import AuditLogEndpoints from "./auditlog";
import GuildChannels from "./channels";
import GuildMembers from "./members";
import GuildBans from "./bans";
import GuildRoles from "./roles";
import GuildPrune from "./prune";
import { addAuditLogReason, serializeIntoQuery } from "../../utils/helpers";

/**	# Guild Endpoints
 * 	Guilds in Discord represent an isolated collection of users and channels, and are often referred to as "servers" in the UI. [Discord Docs](https://discord.com/developers/docs/resources/guild)
 */
export default class GuildEndpoints extends EndpointGroup {
  public auditLog: AuditLogEndpoints;
  public channels: GuildChannels;
  public members: GuildMembers;
  public bans: GuildBans;
  public roles: GuildRoles;
  public prune: GuildPrune;

  constructor(client: RestClient) {
    super(client);
    this.auditLog = new AuditLogEndpoints(client);
    this.channels = new GuildChannels(client);
    this.members = new GuildMembers(client);
    this.bans = new GuildBans(client);
    this.roles = new GuildRoles(client);
    this.prune = new GuildPrune(client);
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
  /**	## Get Guild Preview
   * 	Returns the guild preview object for the given id. If the user is not in the guild, then the guild must be discoverable. [Discord Docs](https://discord.com/developers/docs/resources/guild#get-guild-preview)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to fetch
   *	@returns {Promise<ApiTypes.RESTGetAPIdeleteGuildPreviewResult>} Guild preview data
   */
  async getPreview(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildPreviewResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildPreviewResult>("GET", `/guilds/${guildID}/preview`);
  }
  /**	## Modify guild
   * 	Modify a guild's settings. Requires the `MANAGE_GUILD` permission. Returns the updated guild object on success. Fires a Guild Update Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to modify
   *    @param {ApiTypes.RESTPatchAPIGuildJSONBody} options Modifications to apply
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPatchAPIGuildResult>} Updated guild data
   */
  async modify(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchAPIGuildJSONBody, reason?: string): Promise<ApiTypes.RESTPatchAPIGuildResult> {
    return await this.client.request<ApiTypes.RESTPatchAPIGuildResult>("PATCH", `/guilds/${guildID}`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
  /**	## Delete guild
   * 	Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. [Discord Docs](https://discord.com/developers/docs/resources/guild#delete-guild)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to delete
   *	@returns {Promise<ApiTypes.RESTDeleteAPIGuildResult>}
   */
  async delete(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTDeleteAPIGuildResult> {
    return await this.client.request<ApiTypes.RESTDeleteAPIGuildResult>("DELETE", `/guilds/${guildID}`);
  }
  /**	## List Active Guild Threads
   * 	Returns all active threads in the guild, including public and private threads. [Discord Docs](https://discord.com/developers/docs/resources/guild#list-active-guild-threads)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to fetch threads from
   *	@returns {Promise<ApiTypes.RESTGetAPIGuildThreadsResult>} List of active threads
   */
  async listActiveThreads(guildID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIGuildThreadsResult> {
    return await this.client.request<ApiTypes.RESTGetAPIGuildThreadsResult>("GET", `/guilds/${guildID}/threads/active`);
  }
  /**	## Modify Guild MFA Level
   * 	Modify a guild's MFA level. Requires guild ownership. [Discord Docs](https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to modify
   * 	@param {ApiTypes.RESTPostAPIGuildsMFAJSONBody} options MFA options
   *    @param {string?} reason Optional reason to include in the guild's audit log
   *	@returns {Promise<ApiTypes.RESTPostAPIGuildsMFAResult>} List of active threads
   */
  async modifyMFALevel(guildID: ApiTypes.Snowflake, options: ApiTypes.RESTPostAPIGuildsMFAResult, reason: string): Promise<ApiTypes.RESTPostAPIGuildsMFAResult> {
    return await this.client.request<ApiTypes.RESTPostAPIGuildsMFAResult>("POST", `/guilds/${guildID}/mfa`, { body: JSON.stringify(options), headers: addAuditLogReason(reason) });
  }
}
