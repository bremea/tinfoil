import * as ApiTypes from "discord-api-types/v10";
import { EndpointGroup } from "../rest";

/**	# Application Endpoints
 * 	[Discord Docs](https://discord.com/developers/docs/resources/application)
 */
export default class ApplicationEndpoints extends EndpointGroup {
  /**	## Get Current Application
   * 	Returns the application object associated with the requesting bot user. [Discord Docs](https://discord.com/developers/docs/resources/application#get-current-application)
   *
   *	@returns {Promise<ApiTypes.RESTGetCurrentApplicationResult>} Application data
   */
  async get(): Promise<ApiTypes.RESTGetCurrentApplicationResult> {
    return await this.client.request<ApiTypes.RESTGetCurrentApplicationResult>("GET", `/applications/@me`);
  }
  /**	## Edit Current Application
   * 	Edit properties of the app associated with the requesting bot user. Only properties that are passed will be updated. Returns the updated application object on success. [Discord Docs](https://discord.com/developers/docs/resources/application#edit-current-application)
   *
   * 	@param {ApiTypes.RESTPatchCurrentApplicationJSONBody} options Application edit options
   *	@returns {Promise<ApiTypes.RESTPatchCurrentApplicationResult>} Application data
   */
  async edit(options: ApiTypes.RESTPatchCurrentApplicationJSONBody): Promise<ApiTypes.RESTPatchCurrentApplicationResult> {
    return await this.client.request<ApiTypes.RESTPatchCurrentApplicationResult>("PATCH", `/applications/@me`, { body: JSON.stringify(options) });
  }
  /**	## Get Application Role Connection Metadata Records
   * 	Returns a list of application role connection metadata objects for the given application. [Discord Docs](https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application to fetch from
   *	@returns {Promise<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult>} List of application role connection metadata objects
   */
  async getRoleConnectionMetadata(applicationID: ApiTypes.Snowflake): Promise<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult> {
    return await this.client.request<ApiTypes.RESTGetAPIApplicationRoleConnectionMetadataResult>("GET", `/applications/${applicationID}/role-connections/metadata`);
  }
  /**	## Update Application Role Connection Metadata Records
   * 	Updates and returns a list of application role connection metadata objects for the given application. [Discord Docs](https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)
   *
   * 	@param {ApiTypes.Snowflake} applicationID ID of application to update role connection metadata for
   * 	@param {ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataJSONBody} options Application role connection metadata update options
   *	@returns {Promise<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult>} List of application role connection metadata objects
   */
  async updateRoleConnectionMetadata(applicationID: ApiTypes.Snowflake, options: ApiTypes.RESTPatchCurrentApplicationJSONBody): Promise<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult> {
    return await this.client.request<ApiTypes.RESTPutAPIApplicationRoleConnectionMetadataResult>("PUT", `/applications/${applicationID}/role-connections/metadata`, { body: JSON.stringify(options) });
  }
}
