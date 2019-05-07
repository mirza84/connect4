let { $, sleep } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

    this.When(/^I choose to play as human to bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        await typeChoiceButtons[0].click();
        await sleep(sleepTime)
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[1].click()
        await sleep(sleepTime)

        await typeChoiceButtons[1].click();
        await sleep(sleepTime)
        choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[0].click()
    });

    this.When(/^the bot plays (\d+) bricks in a row$/, async function (brickstoWin) {

        let slots = await $('.slot');

        await slots[3].click();// spelare1 
        await sleep(sleepTime * 4);

        slots = await $('.slot')
        await slots[2].click() // spelare 1
        await sleep(sleepTime * 4)

        slots = await $('.slot')
        await slots[1].click() // spelare 1
        await sleep(sleepTime * 4)

        slots = await $('.slot')
        await slots[0].click() // spelare 1
        await sleep(sleepTime * 4)
    });

    this.Then(/^the bot should win$/, async function () {
        let contents = await driver.findElement(By.css('body > div > main > div > div.game-info > h3 > span'))
        contents = await contents.getText()
        //assert(contents === 'Spelare')
        contents = contents.split(',')

        assert(contents[0] === 'Spelare 1 vann', 'Fel har inträffat' + contents)
        await sleep(sleepTime)
    });

}