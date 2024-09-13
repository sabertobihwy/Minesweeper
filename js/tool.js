/**
 *  functions 
 */
function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}



function generateMineArr(mode) {
    var arr = []
    var len = mode.bombNum
    var index = 0;
    for (let r = 0; r < len; r++) {
        for (let c = 0; c < len; c++) {
            arr.push(index++)
        }
    }
    arr.sort(() => 0.5 - Math.random())
    mineArr = arr.slice(0, len)
}

function generateTable(mode) {
    var len = mode.bombNum

    var index = 0;
    var table = document.createElement('table')
    for (let r = 0; r < len; r++) {
        var tr = document.createElement('tr')
        for (let c = 0; c < len; c++) {
            var td = document.createElement('td')
            if (mineArr.includes(index)) {
                var div = document.createElement('div')
                div.classList.add('bomb')
                td.appendChild(div)
                td.classList.add('canFlag')
            }
            tr.appendChild(td)
            index++
        }
        table.appendChild(tr)
    }
    $('.mainArea').appendChild(table)
    $('#bombs').innerText = len
}

