let { $, sleep } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

    this.When(/^the first player plays (\d+) bricks in a row vertically$/, async function () {
        let slots = await $('.slot');

        await slots[2].click();// spelare1 

        await slots[3].click() // spelare 2

        let slotsT = await $('.slot.row5')  //rad 5
        await slotsT[2].click() // spelare 1

        await slotsT[4].click() // spelare 2

        slotsT = await $('.slot.row4')  //rad 4
        await slots[2].click() // spelare 1

        await slotsT[5].click() // spelare 2

        slotsT = await $('.slot.row3')  //rad 3
        await slots[2].click() // spelare 1
        await sleep(sleepTime * 4)
    });
}