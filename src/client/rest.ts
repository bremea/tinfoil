import { ClientOptions } from "../types/client";
import { HttpMethods } from "../types/util";
import { DEFAULT_CLIENT_OPTIONS } from "../utils/consts";
import UserEndpoints from "./user";

export default class RestClient {
  private authorization: string;
  private clientOptions: ClientOptions;

  public user: UserEndpoints;

  constructor(token: string, options?: Partial<ClientOptions>) {
    if (!token) throw new Error("No token provided");
    this.authorization = `Bot ${token}`;
    this.clientOptions = { ...options, ...DEFAULT_CLIENT_OPTIONS };

	// add in all endpoint groups
    this.user = new UserEndpoints(this);
  }

  public async request(method: HttpMethods, endpoint: string, options?: FetchRequestInit): Promise<Response> {
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

    return req;
  }
}

export class EndpointGroup {
  protected client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
}
