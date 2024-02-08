import { test, expect } from "@playwright/test";
import newProjectData from "../data/new_project_data.json";
import { faker } from "@faker-js/faker";
import moment from "moment";

test.describe("Data Driven Tests", () => {
  newProjectData.forEach((project, index) => {
    test(`${++index} Create project: ${project.description}`, async ({
      page,
    }) => {
      const project_name =
        project.name_prefix + faker.number.int({ max: 99999 });
      const startDate = getStartDate(project.start_date, "YYYY-MM-DD");

      // * Vložit kroky sem:
      await page.goto("http://tredgate.com/pmtool/");
      await page.locator("#username").fill("pw_skoleni");
      await page.locator("#password").fill("TEG2023");
      await page.locator(".btn").click();
      await page.locator("//li[@id='Projects']").click();
      await expect(page.locator(`//th[@test_id='Name']`)).toBeVisible();
      await expect(page.locator(".data_listing_processing")).not.toBeVisible();
      await page.locator("//button[@test_id='Add Project']").click();
      await page
        .locator('div[data-testid="Priority"] select')
        .selectOption(project.priority);
      await page
        .locator('div[data-testid="Status"] select')
        .selectOption(project.status);
      await page.locator('div[data-testid="Start Date"] input').fill(startDate);
      await page.locator("//div[@data-testid='Name']/input").fill(project_name);
      await page.locator("//button[@type='submit']").click();
    });
  });
});

function getStartDate(startDate, format) {
  let resultDate;
  switch (startDate) {
    case "today":
      resultDate = moment().format(format);
      break;
    case "tomorrow":
      resultDate = moment().add(1, "days").format(format);
      break;
    case "yesterday":
      resultDate = moment().subtract(1, "days").format(format);
      break;
    default:
  }
  return resultDate;
}
