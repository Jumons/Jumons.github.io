window.addEventListener("DOMContentLoaded", init);

function visualize() {
    let directed    = document.querySelector('#directed').value == "directed";
    let weighted    = document.querySelector('#weighted').value == "weighted";
    let labeled     = document.querySelector('#labeled').value  == "labeled";
    let one_indexed = document.querySelector('#indexed').value  == "1-indexed";

    let text = document.querySelector('#input-text').value.replace(/\r\n|\r/g, "\n");
    
    let lines = text.split('\n');
    let node_num = lines[0].split(' ')[0];
    let edge_num = lines[0].split(' ')[1];
    lines = lines.slice(1);

    // let nodes = new vis.DataSet([...Array(node_num)].map((a,b) => Object({id: b+1, label: String(b+1)})));
    let nodes = [];
    for (var i = 0; i < node_num; i++) {
        let idx = i + (one_indexed ? 1 : 0);
        let node = {
            id: idx,
            label: String(idx),
        };
        if (labeled) node.group = lines[0].split(/ */)[i];
        nodes.push(node);
    }
    nodes = new vis.DataSet(nodes);
    if (labeled) lines = lines.slice(1);

    let arrow = directed ? 'to' : 'with';
    let edges = new vis.DataSet(lines.map((a,b) => Object({
        from:   a.split(' ')[0],
        to:     a.split(' ')[1],
        label:  weighted ? a.split(' ')[2] : '',
        arrows: arrow,
    })));
    window.Nodes = nodes;

    let container = document.querySelector('#my-canvas');

    let data = {
        nodes: nodes,
        edges: edges
    };

    let options = {
    };

    let myCanvas = new vis.Network(container, data, options);
}

function init() {
    let inputFile = document.querySelector('#getfile');
    let inputText = document.querySelector('#input-text');
    inputText.value = '2 3\nAB\n1 1 3\n1 2 1\n2 2 4';

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

// textareaの高さを内部の文の行数に合わせる
$(function() {
      let $textarea = $('#input-text');
      let lineHeight = parseInt($textarea.css('lineHeight'));
      $textarea.on('input', function(e) {
            let lines = ($(this).val() + '\n').match(/\n/g).length;
            $(this).height(lineHeight * lines);
      });
});