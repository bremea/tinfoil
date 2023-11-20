import { RestClient } from "..";

export default abstract class EndpointGroup {
  protected client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
}
