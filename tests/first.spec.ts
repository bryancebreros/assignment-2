import { test, expect } from '@playwright/test';
import { PricingPage } from '../pages/pricing.page';


test('scenario 1', async ({ page }) => {
  const email = 'bryan5@gmail.com'
  const pass = 'bryan123'

  const pricing = new PricingPage(page)
  await pricing.goToMainPage()
  // await pricing.login(email, pass)

//   await pricing.verifyLogin()
    
  await pricing.verifyAllPrices()
//   await pricing.logOut()
    
  

});



