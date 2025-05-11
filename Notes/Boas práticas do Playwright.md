# Boas práticas do Playwright

# Adoção do modelo Page Object Model (POM)

Ref.: [https://playwright.dev/docs/pom](https://playwright.dev/docs/pom)

<aside>
🎯

Page objects **simplify authoring** by creating a higher-level API which suits your application and **simplify maintenance** by capturing element selectors in one place and create reusable code to avoid repetition

</aside>

<aside>
🎯

Each page should have a corresponding [P](https://playwright.dev/docs/pom)OM File to help the maintainability and scalability of our tests. 

The POM file should contain all selectors and functions that relate to the given POM.

All interactions should be done via page objects, i.e. no selectors in your tests.

All assertions should be done in your test, i.e. no assertions in the POM.

</aside>

```jsx
// playwright-dev-page.ts
import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
```

```jsx
// example.spec.ts
import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './playwright-dev-page';

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
});

test('should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});
```

# Estrutura: agrupar testes por funcionalidade

Exemplo:

```jsx
src/
├── pages/ (ou objects/)
│   ├── LoginPage.ts
│   └── PopupPage.ts
tests/
├── auth/
│   └── login.spec.ts
├── popups/
│   └── notifications.spec.ts
utils/
├── helpers.ts
└── config.ts
```

Melhor (a testar):

- Pom (selectors and functions)
- Tests (asserts)
- Helpers (funções genericas)

## Exemplo 2 (Gerado por IA):

- login.spec.ts:

```jsx
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Authentication Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Deve conter elementos essenciais', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('Login válido deve redirecionar para homepage', async ({ page }) => {
    await loginPage.login('user', 'pass');
    await expect(page).toHaveURL('/home');
  });
});
```

- LoginPage.ts (pom)

```jsx
export class LoginPage {
  constructor(private readonly page: Page) {}

  // Elementos
  usernameInput = this.page.locator('#username');
  passwordInput = this.page.locator('#password');
  submitButton = this.page.locator('#submit-btn');

  // Ações
  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

# Links úteis

[https://www.houseful.blog/posts/2023/playwright-standards/](https://www.houseful.blog/posts/2023/playwright-standards/)

[https://betterstack.com/community/guides/testing/playwright-best-practices/](https://betterstack.com/community/guides/testing/playwright-best-practices/)