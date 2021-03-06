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

    let wins = 0
    this.Then(/^the bot should win$/, async function () {
        let contents;
        // this is way to wait until an element is on screen
        // instead of waiting a long while we try to get the element
        // sleep for a short while and try to get again until we have it
        // (dangerous if we are not sure that the element will be eventually)
        while (true){
          contents = await driver.findElement(By.css('body > div > main > div > div.game-info > h3 > span'))
          if(contents !== null){ 
              break;
              // we found the element so exit the loop
          } 
          // otherwis sleep and continue the loop
          await sleep(200);
        }
        contents = await contents.getText()
        
        contents = contents.split(',')

        if(contents[0] === 'Spelare 1 vann'){
            wins++
            console.log('Spelare1 vann ' + wins + ' gånger')
        }
        assert(contents[0] === 'Spelare 1 vann', 'Fel har inträffat' + contents)
        await sleep(sleepTime)
    });

}