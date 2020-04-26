window.addEventListener("DOMContentLoaded", init);

function init() {
    let inputFile = document.querySelector('#getfile');
    let inputText = document.querySelector('#inputText');
    inputText.value = '....\n.##.\n..#.\n#...\n';

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

function update() {
}

// textareaの高さを内部の文の行数に合わせる
$(function() {
  let $textarea = $('#inputText');
  let lineHeight = parseInt($textarea.css('lineHeight'));
  $textarea.on('input', function(e) {
    let lines = ($(this).val() + '\n').match(/\n/g).length;
    $(this).height(lineHeight * lines);
  });
});