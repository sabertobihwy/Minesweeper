/**
 *  variables 
 */

var mineArr = []
var leftBombs = 0
var totalBombs = 0
var config = {
    easy: {
        bombNum: 10,
        len: 10,
        flags: 0,
    },
    normal: {
        bombNum: 30,
        len: 15,
        flags: 0,
    },
    hard: {
        bombNum: 50,
        len: 20,
        flags: 0,
    }
}

var tableData = null
var flags = 0
var dirs = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
]