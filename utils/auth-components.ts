import { Page, Locator } from '@playwright/test';

export class UserComponents {
    readonly page : Page;
    readonly userIconButton: Locator;
    readonly registerButton: Locator;
    readonly loginModal: Locator;
    readonly userEmailInput: Locator;
    readonly userPasswordInput: Locator;
    readonly userPasswordConfirmationInput: Locator;
    readonly signUpButton: Locator;
    readonly messageBanner: Locator;

    constructor(page) {
        this.page = page;
        this.userIconButton = this.page.locator('//*[@id="section-21"]/header/nav/div[1]/div/div[3]/div[1]/button');
        this.registerButton = this.page.locator('//*[@id="login"]/div/div/a[1]');
        this.loginModal = this.page.locator('//*[@id="login"]');
        this.userEmailInput = this.page.locator('//*[@id="user_email"]');
        this.userPasswordInput = this.page.locator('//*[@id="user_password"]');
        this.userPasswordConfirmationInput = this.page.locator('//*[@id="user_password_confirmation"]');
        this.signUpButton = this.page.locator('//*[@id="new_user"]/div[4]/input');
        this.messageBanner = this.page.locator('//*[@id="flashes"]/div/div/div/p');
    }
}