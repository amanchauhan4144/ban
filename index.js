const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to LinkedIn login page
  await page.goto('https://www.linkedin.com/login');

  // Wait for the login form to appear
  await page.waitForSelector('input[name="session_key"]');

  // Fill in login credentials
  await page.fill('input[name="session_key"]', 'amanchauhancl1@gmail.com');
  await page.fill('input[name="session_password"]', '5522@AManchauhan2');

  // Click on the login button
  await page.click('button[type="submit"]');


  await page.waitForTimeout(9000 ); // Increase timeout to 60 seconds


  // Wait for login to complete
  await page.waitForNavigation();


  // Confirm login success
  console.log('Logged in successfully!');

  const searchInput = await page.locator('input.search-global-typeahead__input');

  // Type "education" into the search input
  await searchInput.type('education');

  // Press Enter to perform the search (if needed)
  await searchInput.press('Enter');

  // Wait for the search results page to load
  await page.waitForTimeout(1000);


  // Clicks a <button> that has either a "Log in" or "Sign in" text.
  const button = await page.getByRole('button', { name: 'Companies' })


  // Click on the button
  await button.click();

    // Wait for the search results page to load
    await page.waitForTimeout(1000);

    const locationbutton = await page.getByLabel('Locations filter. Clicking');

    await locationbutton.click();

    await page.waitForTimeout(1000);

    await page.getByText('North America', { exact: true }).check();

    await page.waitForTimeout(1000);

   const showResultsButton =  await page.getByRole('button', { name: 'Apply current filter to show' })

   await showResultsButton.click();
   await page.waitForTimeout(1000);



   const industryButton = await page.getByLabel('Industry filter. Clicking');
   await industryButton.click();

    await page.waitForTimeout(1000);
     
    await page.getByLabel('Search filters').getByText('Education', { exact: true }).check();

    
    await page.waitForTimeout(1000);

    const showresultindustry= await  page.getByRole('button', { name: 'Apply current filter to show' })

    showresultindustry.click();

    await page.waitForTimeout(1000);

     
    const companysizeButton = await page.getByLabel('Company size filter. Clicking')
    companysizeButton.click();


    await page.waitForTimeout(1000);


    await page.getByText('1-10 employees', { exact: true }).check();

    await page.waitForTimeout(1000);

   const showresultcompanysize = await page.getByRole('button', { name: 'Apply current filter to show' })
   showresultcompanysize.click();


    await page.waitForTimeout(2000);




   
  
    const processAnchorTag = async (anchorTag) => {
     console.log(anchorTag)

     
  
      console.log('Text:', text);
  
      // Example: Extract href attribute value
      const href = await anchorTag.getAttribute('href');
      console.log('Href:', href);


  
      try {
          // Wait for the anchor tag to be visible and enabled
          await anchorTag.waitForElementState('visible');
          await anchorTag.waitForElementState('enabled');
  
          // Click on the anchor tag
          await anchorTag.click();
  
          // Wait for navigation if needed
          await page.waitForNavigation();
  
          // Example: Return any extracted values
          return { text, href };
      } catch (error) {
          // If an error occurs, retry the interaction after a short delay
          console.error('Error occurred:', error.message);
          
          await page.waitForTimeout(1000); // Adjust the delay as needed
       // Retry the interaction
      }
  };
  ////////yoooooooooooooooooooooooooooooooooo
/////yoooooooooooooooooooooooooooooooooo

const searchResultsContainer = await page.waitForSelector('.reusable-search__entity-result-list');

if (searchResultsContainer) {
    const resultElements = await searchResultsContainer.$$('li.reusable-search__result-container');

    const companyDetails = [];

    // Loop through the resultElements
    for (const elementHandle of resultElements) {
        try {
            // Find the anchor element within each li
            const anchorElement = await elementHandle.$('span.entity-result__title-text a.app-aware-link');
            if (anchorElement) {
                // Retrieve the href attribute
                const href = await anchorElement.getAttribute('href');
                console.log('Link:', href);

      // const newPage = await browser.newPage({ preserveContext: true });


                // Open a new page context to navigate to the link
                const newPage = await browser.newPage();
                await newPage.context().addCookies(cookies);  
                await newPage.goto(href);

                // Wait for the new page to load
                await newPage.waitForLoadState('networkidle');


                await dismissPopup(newPage);


                await newPage.click('button[data-control-name="about"]');
                await newPage.waitForLoadState('networkidle');


                const aboutDetails = await newPage.evaluate(() => {
                  const aboutSection = document.querySelector('.about-section');
                  if (aboutSection) {
                      // Initialize an object to store extracted details
                      const details = {};
              
                      // Extract details from the "About" section
                      const aboutItems = aboutSection.querySelectorAll('dl');
              
                      // Iterate through each <dl> element to extract details
                      aboutItems.forEach(item => {
                          // Extract the label and value from each <dl> element
                          const label = item.querySelector('dt').innerText.trim();
                          const value = item.querySelector('dd').innerText.trim();
                          // Store the label and value in the details object
                          details[label] = value;
                      });
              
                      // Return the extracted details
                      return details;
                  } else {
                      // Return null if "About" section not found
                      return null;
                  }
              });


              companyDetails.push(aboutDetails);
              


                // Close the new page after processing
                await newPage.close();

                // Optionally, you can add some delay between each navigation
                await page.waitForTimeout(2000); // 2 seconds delay
            } else {
                console.error('Anchor element not found within result container.');
            }
        } catch (error) {
            if (error.message.includes('Cannot find context with specified id')) {
                console.error('Skipping element due to context error.');
                continue; // Continue with the next iteration of the loop
            } else {
                console.error('Error occurred while processing result:', error.message);
            }
        }
    }
    console.log('Company details haiiiiiiiiiiiiiiiiiiiiiii:', companyDetails);

} else {
    console.error('Search results container not found.');
}







    
  await page.waitForTimeout(7000);
  
  // Close the browser
  await browser.close();
})();
