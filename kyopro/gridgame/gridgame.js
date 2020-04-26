window.addEventListener("DOMContentLoaded", init);

class Table {
    constructor(tableId) {
        this.table = document.querySelector(tableId);
        this.update();
    }

    update() {
        this.text = document.querySelector('#input-text').value.replace(/\r\n|\r/g, "\n");
        this.lines = this.text.split('\n');
        this.reset();
        this.drawTable();
    }

    drawTable() {
        for (let line of this.lines) {
            let row = this.table.insertRow();
            for (let ch of line) {
                let cell = row.insertCell();
                if (ch != ' ') cell.classList.add('cell');
                if (ch == '#') cell.classList.add('obstacle');
            }
        }
    }

    reset() {
        while (this.table.rows[0]) this.table.deleteRow(0);
    }

    onCell(x, y) {
        if (y < 0 || y >= this.lines.length) return false;
        if (x < 0 || x >= this.lines[y].length) return false;

        const cellClassList = this.table.rows[y].cells[x].classList;
        if (cellClassList.contains('obstacle')) return false;
        return cellClassList.contains('cell');
    }

    getCell(x, y) {
        return this.table.rows[y].cells[x];
    }
}

class Point {
    constructor(table, x=0, y=0) {
        this.initial_x = x;
        this.initial_y = y;
        this.x = x;
        this.y = y;
        this.counter = 0;
        this.table = table;
    }

    init() {
        this.reset();
        this.drawCharacter();
    }

    drawCharacter() {
        const character = document.createElement('div');
        character.id = 'chara';
        character.innerText = 'P';
        this.table.getCell(this.x, this.y).appendChild(character);
    }

    removeCharacter() {
        const character = document.querySelector('#chara');
        character.remove();
    }

    move(dx, dy) {
        if (this.table.onCell(this.x + dx, this.y + dy)) {
            this.removeCharacter();
            this.x += dx;
            this.y += dy;
            this.counter += 1;
            this.drawCharacter();
            return true;
        }
        console.log('cannot move');
        return false;
    }

    reset() {
        this.x = this.initial_x;
        this.y = this.initial_y;
        this.counter = 0;
    }
}

function init() {
    let inputFile = document.querySelector('#getfile');
    let inputText = document.querySelector('#input-text');
    inputText.value = '....\n.##.\n..#.\n#...';

    inputFile.onchange = function() {
        let fileList = inputFile.files;
        //読み込み
        let reader = new FileReader();
        reader.readAsText(fileList[0]);

        //読み込み後
        reader.onload = function  () {
            inputText.value = reader.result;
        };
    };

    let table = new Table('#my-table');
    let pos = new Point(table);
    pos.init();
    document.querySelector('#update-button').addEventListener('click', () => {
        table.update();
        pos.init();
    });
    document.addEventListener('keydown', e => {
        if (inputText.isEqualNode(document.activeElement)) return;
        if (e.key == "ArrowUp") {
            pos.move(0, -1);
        }
        if (e.key == "ArrowDown") {
            pos.move(0, +1);
        }
        if (e.key == "ArrowLeft") {
            pos.move(-1, 0);
        }
        if (e.key == "ArrowRight") {
            pos.move(+1, 0);
        }
        if (e.key == " ") {
            pos.move(0, 0);
        }
        if (e.key == "Escape") {
        }
    });
}

// textareaの高さを内部の文の行数に合わせる
$(function() {
    let $textarea = $('#input-text');
    let lineHeight = parseInt($textarea.css('lineHeight'));
    $textarea.on('input', function(e) {
        let lines = ($(this).val() + '\n').match(/\n/g).length;
        $(this).height(lineHeight * lines);
    });
});