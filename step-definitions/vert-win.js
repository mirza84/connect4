let { $, sleep } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

    this.When(/^the first player plays (\d+) bricks in a row vertically$/, async function (brickstoWin) {
        let slots = await $('.slot');

        await slots[2].click();// spelare1 
        await sleep(sleepTime);

        await slots[3].click() // spelare 2
        await sleep(sleepTime);

        let slotsT = await $('.slot.row5')  //rad 5
        await slotsT[2].click() // spelare 1
        await sleep(sleepTime);

        await slotsT[4].click() // spelare 2
        await sleep(sleepTime);

        slotsT = await $('.slot.row4')  //rad 4
        await slotsT[2].click() // spelare 1
        await sleep(sleepTime);

        await slotsT[5].click() // spelare 2
        await sleep(sleepTime);

        slotsT = await $('.slot.row3')  //rad 3
        await slotsT[2].click() // spelare 1
        await sleep(sleepTime * 4)
    });
}