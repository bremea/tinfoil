import * as ApiTypes from "discord-api-types/v10";
import { EndpointGroup } from "../rest";
import { serializeIntoQuery } from "../../utils/helpers";

/**	# Audit Logs
 * 	When an administrative action is performed in a guild, an entry is added to its audit log. [Discord Docs](https://discord.com/developers/docs/resources/audit-log)
 */
export default class AuditLogEndpoints extends EndpointGroup {
  /**	## Get Guild Audit Log
   * 	Returns an audit log object for the guild. Requires the `VIEW_AUDIT_LOG` permission. [Discord Docs](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log)
   *
   * 	@param {ApiTypes.Snowflake} guildID ID of guild to fetch from
   * 	@param {ApiTypes.RESTGetAPIAuditLogQuery?} options Query data for filtering
   *	@returns {Promise<ApiTypes.RESTGetAPIAuditLogResult>} Application data
   */
  async get(guildID: ApiTypes.Snowflake, options?: ApiTypes.RESTGetAPIAuditLogQuery): Promise<ApiTypes.RESTGetAPIAuditLogResult> {
    return await this.client.request<ApiTypes.RESTGetAPIAuditLogResult>("GET", `/guilds/${guildID}/audit-logs${serializeIntoQuery(options)}`);
  }
}
