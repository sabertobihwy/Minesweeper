/**
 *  main logic 
 */

function bindEvent() {
    $('.level').onclick = function (e) {
        // remove existing table
        var table = $('.mainArea table')
        if (table) {
            $('.mainArea').removeChild(table)
        }
        // remove .active 
        $$('button').forEach((b) => {
            b.classList.remove('active')
        })
        var currBtn = e.target || e.srcElement
        currBtn.classList.add('active')
        console.log(currBtn.id)
        // create new table 
        switch (currBtn.id) {
            case 'easy':
                init(config.easy)
                break;
            case 'normal':
                init(config.normal)
                break;
            case 'hard':
                init(config.hard)
                break;
        }
    }
}

function init(mode) {
    generateMineArr(mode)
    generateTable(mode)
}

function main() {
    bindEvent()

}

main()