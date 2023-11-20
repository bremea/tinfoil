import * as ApiTypes from "discord-api-types/v10";
import EndpointGroup from "../base";

/**	# Application Role Connections
 * 	[Discord Docs](https://discord.com/developers/docs/resources/application-role-connection-metadata)
 */
export default class ApplicationRoleConnections extends EndpointGroup {
  /**	## Get Application Role Connection Metadata Records
   * 	Returns a list of application role connection metadata objects for the given application. [Discord Docs](https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application to fetch from
   *	@returns {Promise<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult>} List of application role connection metadata objects
   */
  async getMetadata(applicationID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult> {
    return await this.client.request<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult>("GET", `/applications/${applicationID}/role-connections/metadata`);
  }
  /**	## Update Application Role Connection Metadata Records
   * 	Updates and returns a list of application role connection metadata objects for the given application. [Discord Docs](https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application to update role connection metadata for
   * 	@param {ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataJSONBody} options Application role connection metadata update options
   *	@returns {Promise<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult>} List of application role connection metadata objects
   */
  async updateMetadata(applicationID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchCurrentApplicationJSONBody): Promise<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult> {
    return await this.client.request<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult>("PUT", `/applications/${applicationID}/role-connections/metadata`, { body: JSON.stringify(options) });
  }
}
