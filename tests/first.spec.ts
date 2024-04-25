import { test, expect } from '@playwright/test';
import { PricingPage } from '../pages/pricing.page';


test('scenario 1', async ({ page }) => {
  const email = 'bryan5@gmail.com'
  const pass = 'bryan123'

  const pricing = new PricingPage(page)
  await pricing.goToMainPage('')
  // await pricing.login(email, pass)
//   await pricing.verifyLogin()
  const prices = [
    { standard: '22', enhanced: '199' },
    { standard: '49', enhanced: '449' },
    { standard: '229', enhanced: '1,699' }
  ];
  const packs = [2,5,25]

  await pricing.verifyAllPrices(prices, packs);

//   await pricing.logOut()
    
  

});



test('scenario 2', async ({ page }) => {
  const pricing = new PricingPage(page)
  await pricing.goToMainPage('/video')
    
  const prices = [
    { standard: '299', enhanced: '669' },
    { standard: '549', enhanced: '919' },
    { standard: '1,299', enhanced: '1,669' }

  ];

  const packs = [5,10,25]

  await pricing.verifyAllPrices(prices, packs, 'SD');
  const prices2 = [
    { standard: '359', enhanced: '729' },
    { standard: '669', enhanced: '1,039' },
    { standard: '1,579', enhanced: '1,949' },
    
  ]

  await pricing.verifyAllPrices(prices2, packs, 'HD');

  const prices3 = [
    { standard: '599', enhanced: '969' },
    { standard: '999', enhanced: '1,369' },
   
    { standard: '2,299', enhanced: '2,669' }
  ]
  await pricing.verifyAllPrices(prices3, packs, '4K');

});