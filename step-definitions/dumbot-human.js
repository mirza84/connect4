let { $, sleep } = require('./funcs');

let sleepTime = 2000;

module.exports = function () {

    this.When(/^I choose to play as human to dum bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        await typeChoiceButtons[0].click();
        await sleep(sleepTime)
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[0].click()
        await sleep(sleepTime)

        await typeChoiceButtons[1].click();
        await sleep(sleepTime)
        choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        await choices[2].click()

    });

    this.When(/^the human plays (\d+) bricks in a row$/, function (arg1, callback) {

       
      });
}