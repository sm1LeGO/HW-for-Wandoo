# HW-for-Wandoo
Repo with HW for potential employer

# Swaper Automated Tests

This project contains two sets of automated tests for the [swaper.com](https://swaper.com) platform:

- **Java + RestAssured** — API test for login and balance check
- **TypeScript + Playwright** — UI test for login and dashboard navigation

_______________________________________________________________________________

## For UI (Playwright)

  - Based on the Page Object Model (POM) for maintainability.
  - Selectors are robust and use either `getByRole`, text match, or semantic CSS.
  - `src/pages/` Login, Dashboard and Settings flows are verified through UI interactions.
  - `.env` is used for credentials — never store them in code.

> Requirements: TypeScript, Playwright, Node.js 16+, npm

`npm install`
`npx playwright install`

for test run please use - `npx playwright test`

---

# API Tests (Java)

  ## Structure

   - `src/test/java/api/` — test classes
   - `TestBase.java` — common RestAssured configuration
   - `LoginAndBalanceTest.java` — login and balance verification test (`openingBalance == 0.00`)

  ## Running the tests

> Requirements: Java 17+, Maven

```bash
mvn clean test
