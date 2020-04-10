window.addEventListener("DOMContentLoaded", init);

function visualize() {
    let text = document.querySelector('#inputText').value.replace(/\r\n|\r/g, "\n");
    window.T = text;
    let lines = text.split('\n');
    let node_num = lines[0].split(' ')[0];
    let edge_num = lines[0].split(' ')[1];
    window.N = node_num;
    // let nodes = new vis.DataSet([...Array(node_num)].map((a,b) => Object({id: b+1, label: String(b+1)})));
    let nodes = [];
    for (var i = 0; i < node_num; i++) {
        nodes.push(Object({id: i+1, label: String(i+1)}));
    }
    nodes = new vis.DataSet(nodes);
    let edges = new vis.DataSet(lines.slice(2).map((a,b) => Object({from: a.split(' ')[0], to: a.split(' ')[1], value: a.split(' ')[2]})))
    window.Nodes = nodes;

    let container = document.getElementById('myCanvas');

    let data = {
        nodes: nodes,
        edges: edges
    };

    let options = {
    };

    window.myCanvas = new vis.Network(container, data, options);
}

function init() {
    let inputFile = document.querySelector('#getfile');
    let inputText = document.querySelector('#inputText');
    inputText.textContent = '1 0';

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
}