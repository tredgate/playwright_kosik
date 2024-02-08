import { type APIRequestContext } from "@playwright/test";

export class TegbApi {
  readonly baseUrl = "https://tegb-backend-877a0b063d29.herokuapp.com";
  readonly trainEndpoint = "/train";
  readonly authEndpoint = "/auth";
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getTrainApi(): Promise<any> {
    return this.request.get(this.baseUrl + this.trainEndpoint);
  }

  async postTrainApi(): Promise<any> {
    return this.request.post(this.baseUrl + this.trainEndpoint);
  }

  async getBasicAuth(username: string, password: string) {
    const base64 = Buffer.from(`${username}:${password}`).toString("base64");
    return this.request.get(
      this.baseUrl + this.trainEndpoint + this.authEndpoint + "/basic",
      {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }
    );
  }
}
