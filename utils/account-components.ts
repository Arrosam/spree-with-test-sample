import { Page, Locator } from '@playwright/test';

export class AccountComponents {
    readonly page: Page;
    readonly logoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.logoutButton = this.page.locator('//html/body/div[3]/div[1]/div/form/button');
    }
}