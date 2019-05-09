let { $, sleep } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

    this.When(/^I choose to play as two bot players$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        await typeChoiceButtons[0].click();
        await sleep(sleepTime)
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[1].click()
        await sleep(sleepTime)

        await typeChoiceButtons[1].click();
        await sleep(sleepTime)
        choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[1].click()
    });

    let player1 = 0
    let player2 = 0
    let draw = 0
    this.When(/^the player wins$/, async function () {
        await driver.wait(until.elementLocated(By.className('again-btn')))
        let contents = await driver.findElement(By.className('mb-3 text-center'))
        contents = await contents.getText()

        console.log('test1: ' + contents)
        if (contents.includes('Det blev oavgjort!')) {
            draw++
        }
        if (contents.includes('Spelare 1 vann')) {
            player1++
        }
        if (contents.includes('Spelare 2 vann')) {
            player2++
        }
        
        console.log('Spelare1: ' + player1)
        console.log('Spelare2: ' + player2)
        console.log('Oavgjort: ' + draw)
        await sleep(sleepTime)
    });
}