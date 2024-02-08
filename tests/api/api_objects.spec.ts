import { test, expect } from "@playwright/test";
import { TegbApi } from "../../api/tegb_api";

test("Train API get 200", async ({ request }) => {
  const tegbApi = new TegbApi(request);
  const response = await tegbApi.getTrainApi();
  expect(response.status()).toBe(200);
});

test("Auth is successful", async ({ request }) => {
  const tegbApi = new TegbApi(request);
  const response = await tegbApi.getBasicAuth(
    "training_user",
    "secure_password"
  );
  expect(response.status()).toBe(200);
});
