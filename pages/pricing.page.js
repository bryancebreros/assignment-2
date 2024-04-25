import { expect } from "@playwright/test"

export class PricingPage {
    constructor(page){
        this.page = page
        this.loginBtn = '[data-automation="loginButton"]'
        this.loginFrameId = '#login-iframe'
        this.emailInput = '[data-test-id="email-input"]'
        this.passInput = '[data-test-id="password-input"]'
        this.sendLogin = '[data-test-id="login-form-submit-button"]'
        this.pack2Btn= '[data-automation="2Tab"]'
        this.pack5Btn= '[data-automation="5Tab"]'
        this.pack10Btn= '[data-automation="10Tab"]'
        this.pack25Btn= '[data-automation="25Tab"]'
        this.priceSpan = '[data-automation="PricingCard_OD_priceContainer"] > h4 > span'
        this.logoutBtn = '[data-automation="ProfileDrawer_LogoutButton"]'
        this.standardInput = 'input[value="standardLicense"]'
        this.enhancedInput = 'input[value="enhancedLicense"]'
        this.accountIcon = 'button[aria-label="User profile"]'

        this.resolutionDD = '[data-automation="PricingCard_DropDownOptions"]'
        this.selectSD = '[data-automation="PricingCard_DropDownOption_SD"]'
        this.selectHD = '[data-automation="PricingCard_DropDownOption_HD"]'
        this.select4K = '[data-automation="PricingCard_DropDownOption_4K"]'

    }
    async goToMainPage(URL){
        await this.page.goto('https://www.shutterstock.com/pricing' + URL)
        await expect(this.page).toHaveURL('https://www.shutterstock.com/pricing' +URL);

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
    async verifyAllPrices(prices, packs, resolution) {
        if (await this.page.locator(this.resolutionDD).isVisible()) {
            await this.page.locator(this.resolutionDD).click()
            await this.page.locator(this[`select${resolution}`]).click()
        }
        for (let i = 0; i < prices.length; i++) {
            const price = prices[i]
            const packNumber = packs[i]

            await this.page.locator(this[`pack${packNumber}Btn`]).first().click()

            await this.page.locator(this.standardInput).click()
            await expect(this.page.locator(this.priceSpan)).toContainText('$' + price.standard)
            await this.page.locator(this.enhancedInput).click()
            await expect(this.page.locator(this.priceSpan)).toContainText('$' + price.enhanced)

            
        }
    }
    
}