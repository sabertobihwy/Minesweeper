/**
 *  main logic 
 */

function init(mode) {
    generateMineArr(mode)
    generateTable(mode)
}

function main() {
    bindEvent()
}

main()


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
    document.oncontextmenu = function () {
        return false;
    };

    $('.mainArea').onmousedown = function (e) {
        const div = e.target || e.srcElement
        if (e.button === 0) {
            // 1. bomb    
            if (div.classList.contains('bomb')) {
                showResults()
            } else {
                if (!div.classList.contains('notclick') && !div.classList.contains('flag')) {
                    // 2. searcNeighbours()
                    searcNeighbours(div)
                }
            }
        } else if (e.button === 2) {
            if (div.classList.contains('flag')) {
                div.classList.remove('flag')
                $('#flags').innerText = flags - 1 >= 0 ? --flags : 0
                return
            }
            if (div.classList.contains('canFlag')) {
                // add flag style 
                div.classList.add('flag')
                $('#flags').innerText = ++flags

                if (div.classList.contains('bomb')) {
                    leftBombs--;
                    if (leftBombs === 0) {
                        if (flags === totalBombs) {
                            setTimeout(() => {
                                window.alert("you win!"); // 延迟显示 alert
                            }, 10); // 10 毫秒的延迟
                        } else {
                            // show the result 
                            showResults()
                        }
                    }
                }
            }

        }
    }

}

function showResults() {
    $('.mainArea').querySelectorAll('tr>td div.bomb').forEach((d) => {
        if (d.classList.contains('flag')) {
            d.style.backgroundColor = 'green'
        } else {
            d.style.opacity = 1
        }
    })
    $('.mainArea').querySelectorAll('tr>td div.flag').forEach((d) => {
        if (!d.classList.contains('bomb')) {
            d.style.backgroundColor = 'black'
        }
    })
}

function searcNeighbours(div) {
    const id = div.dataset.id
    const len = tableData.length
    const r = Math.floor(id / len)
    const c = (id - r * len) % len
    console.log(r, c)
    searcNeighboursDfs(r, c, len)

}

function searcNeighboursDfs(r, c, len) {
    if ((r < 0 || r >= len) || (c < 0 || c >= len || tableData[r][c].checked)) {
        return
    }
    var bombNum = 0;
    for (var i = 0; i < dirs.length; i++) {
        let row = r + dirs[i][0]
        let col = c + dirs[i][1]
        if ((row < 0 || row >= len) || (col < 0 || col >= len) || tableData[row][col].checked) {
            continue
        } else {
            if (tableData[row][col].type === 'bomb') {
                bombNum++;
            }
        }
    }
    tableData[r][c].checked = true
    $(`div[data-id="${tableData[r][c].index}"]`).classList.remove('canFlag')
    if (bombNum > 0) {
        $(`div[data-id="${tableData[r][c].index}"]`).innerText = bombNum
        $(`div[data-id="${tableData[r][c].index}"]`).classList.add('number')
    } else {
        $(`div[data-id="${tableData[r][c].index}"]`).classList.add('notclick')
        // recurse 

        dirs.forEach((dir) => {
            let row = r + dir[0]
            let col = c + dir[1]
            searcNeighboursDfs(row, col, len)
        })

    }


}

function generateMineArr(mode) {
    var arr = []
    leftBombs = mode.bombNum
    totalBombs = mode.bombNum
    var index = 0;
    tableData = new Array(mode.len)
    for (let r = 0; r < mode.len; r++) {
        tableData[r] = new Array(mode.len)
        for (let c = 0; c < mode.len; c++) {
            arr.push(index++)
        }
    }
    arr.sort(() => 0.5 - Math.random())
    mineArr = arr.slice(0, mode.bombNum)
    // reset params
    flags = 0
    $('#flags').innerText = 0
}

function generateTable(mode) {
    var index = 0;
    var table = document.createElement('table')
    for (let r = 0; r < mode.len; r++) {
        var tr = document.createElement('tr')
        for (let c = 0; c < mode.len; c++) {
            var td = document.createElement('td')
            var div = document.createElement('div')
            tableData[r][c] = {
                x: r,
                y: c,
                type: 'number',
                bombsNum: 0,
                index: index,
                checked: false
            }

            div.dataset.id = index
            div.classList.add('canFlag')
            if (mineArr.includes(index)) {
                tableData[r][c].type = 'bomb'
                div.classList.add('bomb')

            }
            td.appendChild(div)
            tr.appendChild(td)
            index++
        }
        table.appendChild(tr)
    }
    $('.mainArea').appendChild(table)
    $('#bombs').innerText = totalBombs
}
