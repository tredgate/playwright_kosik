import { test } from "@playwright/test";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET teg#b userId 2", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: {
      userId: 22,
    },
  });
});

test("GET Booking with Header", async ({ request }) => {
  await request.get("https://restful-booker.herokuapp.com/booking", {
    headers: {
      "Accept-Language": "en-US,en;q=0.9,cs-CZ;q=0.8,cs;q=0.7,it;q=0.6",
    },
  });
});

test("POST: Create user with Tredgate API test", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/auth/register",
    {
      data: {
        email: "luke@example.com",
        password: "heslo1",
        firstName: "Luke",
        lastName: "Skywalker",
        age: 25,
      },
    }
  );
});

test("Update Booking with authorized request - transfer data", async ({
  request,
}) => {
  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    }
  );
  const responseBody = await response.json();
  const token = responseBody.token;

  // * Nastavení proměnných pro Update request
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Cookie: "token=" + token, // ! Použití const token do hlavičky cookie
  };
  const data = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  // * provolání requestu
  const bookingResponse = await request.put(
    "https://restful-booker.herokuapp.com/booking/1182",
    {
      headers: headers, // * použití const headers
      data: data, // * použití const data
    }
  );
});
