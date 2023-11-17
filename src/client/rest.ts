import { ClientOptions } from "../types/client";
import { HttpMethods } from "../types/util";
import { DEFAULT_CLIENT_OPTIONS } from "../utils/consts";
import UserEndpoints from "./user";

/**
 * 	# Rest Client
 * 	Client object used for interacting with Discord's REST API. [Discord API Reference](https://discord.com/developers/docs/reference)
 *
 * 	### Resources Available:
 * 	- `users`: user endpoints
 */
export default class RestClient {
  private authorization: string;
  private clientOptions: ClientOptions;

  /**
   * 	### User Endpoints
   * 	Can be used to make operations against Discord users. [Discord Docs](https://discord.com/developers/docs/resources/user)
   */
  public user: UserEndpoints;

  /**
   * Create new rest client.
   * @param token Your bot's authentication token.
   * @param options
   */
  constructor(token: string, options?: Partial<ClientOptions>) {
    if (!token) throw new Error("No token provided");
    this.authorization = `Bot ${token}`;
    this.clientOptions = { ...options, ...DEFAULT_CLIENT_OPTIONS };

    // add in all endpoint groups
    this.user = new UserEndpoints(this);
  }

  /**
   * 	Makes a HTTPS request against the Discord API
   *	@param {HttpMethods} method HTTP method to use
   *	@param {string} endpoint Endpoint to hit, ex `/users/@me`
   *	@param {FetchRequestInit?} options Options to add to fetch
   */
  public async request<T>(method: HttpMethods, endpoint: string, options?: FetchRequestInit): Promise<T> {
    const req = await fetch(`${this.clientOptions.url}/v${this.clientOptions.version}${endpoint}`, {
      method,
      headers: {
        Authorization: this.authorization,
        "User-Agent": this.clientOptions.userAgent,
        ...options?.headers,
      },
      ...options,
    });

    if (!req.ok) {
      throw req;
    }

    if (req.headers.get("Content-Type") == "application/json") {
      return (await req.json()) as T;
    } else {
      return (await req.text()) as T;
    }
  }
}

export class EndpointGroup {
  protected client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
}
