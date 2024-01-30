import { test, expect } from "@playwright/test";

test("Tredgate PUT train API is ok", async ({ request }) => {
  const response = await request.put(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  await expect(response.status()).toBe(200);
});

test("Tredgate POST train content type", async ({ request }) => {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const headers = response.headers();
  const contentType = headers["content-type"];
  await expect(contentType).toBe("application/json; charset=utf-8");
  await expect(contentType).toContain("application/json");
});

test("TEG#B register body tests", async ({ request }) => {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username: "nejakyuser2",
        email: "neco@example.org",
        password: "Heslo132#",
      },
    }
  );
  const responseBody = await response.json();
  expect(responseBody.username).toBeDefined();
  expect(typeof responseBody.userId).toBe("number");
  expect(responseBody.updateAt).toBe(null);
  expect(responseBody.username).toBe("nejakyuser2");
});
