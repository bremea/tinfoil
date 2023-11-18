import * as ApiTypes from "discord-api-types/v10";
import RestClient, { EndpointGroup } from "../rest";
import ApplicationRoleConnections from "./roleconnections";

/**	# Application Endpoints
 * 	[Discord Docs](https://discord.com/developers/docs/resources/application)
 */
export default class ApplicationEndpoints extends EndpointGroup {
  public roleConnections: ApplicationRoleConnections;

  constructor(client: RestClient) {
    super(client);
    this.roleConnections = new ApplicationRoleConnections(client);
  }

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
}
