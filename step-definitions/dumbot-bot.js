let { $, sleep } = require('./funcs');

let sleepTime = 5000;

module.exports = function () {

    this.When(/^I choose to play as bot to dum bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        await typeChoiceButtons[0].click();
        await sleep(sleepTime)
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[1].click()
        await sleep(sleepTime)

        await typeChoiceButtons[1].click();
        await sleep(sleepTime)
        choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[2].click()

    });
    
    this.Then(/^the winning result should show$/, async function () {
        let contents = await driver.findElement(By.css('body > div > main > div > div.game-info > h3 > span'))
        contents = await contents.getText()
        //assert(contents === 'Spelare')
        contents = contents.split(',')
        await sleep(sleepTime)
    
       assert(contents[0] === 'Spelare 1 vann', 'Fel har inträffat' + contents)
       await sleep(sleepTime)
        
      });


}