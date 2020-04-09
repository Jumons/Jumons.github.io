window.addEventListener("DOMContentLoaded", init);

function init() {
    let inputFile = document.querySelector('#getfile');
    let inputText = document.querySelector('#inputText');
    inputText.textContent = '1 0';

    inputFile.onchange = function() {
        var fileList = inputFile.files;
        //読み込み
        var reader = new FileReader();
        reader.readAsText(fileList[0]);

        //読み込み後
        reader.onload = function  () {
            inputText.textContent = reader.result;
            graph.update();
        };
    };


    let nodes = new vis.DataSet([
        {id: 1,  label: '1',  group: 2},
        {id: 2,  label: '2',  group: 2},
        {id: 3,  label: '3',  group: 1},
        {id: 4,  label: '4',  group: 2},
        {id: 5,  label: '5',  group: 2},
        {id: 6,  label: '6',  group: 2},
        {id: 7,  label: '7',  group: 1},
        {id: 8,  label: '8',  group: 1},
        {id: 9,  label: '9',  group: 2},
        {id: 10, label: '10', group: 1},
        {id: 11, label: '11', group: 2},
        {id: 12, label: '12', group: 2},
        {id: 13, label: '13', group: 1},
    ]);

    let edges = new vis.DataSet([
        // {from: 1, to: 2, arrow: 'to'},
        {from: 7,  to: 1},
        {from: 7,  to: 9},
        {from: 11, to: 12},
        {from: 3,  to: 9},
        {from: 11, to: 9},
        {from: 2,  to: 1},
        {from: 11, to: 5},
        {from: 12, to: 11},
        {from: 10, to: 8},
        {from: 1,  to: 11},
        {from: 1,  to: 8},
        {from: 7,  to: 7},
        {from: 9,  to: 10},
        {from: 8,  to: 8},
        {from: 8,  to: 12},
        {from: 6,  to: 2},
        {from: 13, to: 11},
    ]);

    let container = document.getElementById('myCanvas');

    let data = {
        nodes: nodes,
        edges: edges
    };

    let options = {
        // physics: false,
        // edges: {
        //     smooth: false
        // },
    };

    let myCanvas = new vis.Network(container, data, options);
}