import { expect } from "@playwright/test"

export class PricingPage {
    constructor(page){
        this.page = page
        this.loginBtn = '[data-automation="loginButton"]'
        this.loginFrameId = '#login-iframe'
        this.emailInput = '[data-test-id="email-input"]'
        this.passInput = '[data-test-id="password-input"]'
        this.sendLogin = '[data-test-id="login-form-submit-button"]'
        this.packTwoBtn= '[data-automation="2Tab"]'
        this.packFiveBtn= '[data-automation="5Tab"]'
        this.packTwentyfiveBtn= '[data-automation="25Tab"]'
        this.priceSpan = '[data-automation="PricingCard_OD_priceContainer"] > h4 > span'
        this.logoutBtn = '[data-automation="ProfileDrawer_LogoutButton"]'
        this.standardInput = 'input[value="standardLicense"]'
        this.enhancedInput = 'input[value="enhancedLicense"]'
        this.accountIcon = 'button[aria-label="User profile"]'

    }
    async goToMainPage(){
        await this.page.goto('https://www.shutterstock.com/pricing')
        await expect(this.page).toHaveURL('https://www.shutterstock.com/pricing');

    }
    async login(email, pass){
        await this.page.locator(this.loginBtn).click()
        const loginFrame = await this.page.frameLocator(this.loginFrameId)
        await loginFrame.locator(this.emailInput).fill(email)
        await loginFrame.locator(this.passInput).fill(pass)
        await loginFrame.locator(this.sendLogin).click()
    }
    async logOut(){
        await this.page.locator(this.accountIcon).click()
        await this.page.locator(this.logoutBtn).click()
    }
    async verifyLogin(){
        await expect(this.page.locator(this.accountIcon)).toBeVisible()
    }
    async verifyAllPrices(){
        await this.page.locator(this.packTwoBtn).click()
        await this.page.locator(this.standardInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$22')
        await this.page.locator(this.enhancedInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$199')

        await this.page.locator(this.packFiveBtn).click()
        await this.page.locator(this.standardInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$49')
        await this.page.locator(this.enhancedInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$449')

        await this.page.locator(this.packTwentyfiveBtn).click()
        await this.page.locator(this.standardInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$229')
        await this.page.locator(this.enhancedInput).click()
        await expect(this.page.locator(this.priceSpan)).toContainText('$1,699')
    }
}