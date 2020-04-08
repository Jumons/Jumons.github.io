window.addEventListener("DOMContentLoaded", init);

function init() {
  var nodes = new vis.DataSet([
    {id: 1, label: 'A'},
    {id: 2, label: 'B'},
    {id: 3, label: 'C'},
    {id: 4, label: 'D'},
    {id: 5, label: 'E'},
    {id: 6, label: 'F'},
    {id: 7, label: 'G'},
    {id: 8, label: 'H'},
  ]);

  var edges = new vis.DataSet([
    {from: 1, to: 2, arrows: 'to'},
    {from: 1, to: 3, arrows: 'to'},
    {from: 3, to: 4, arrows: 'to'},
    {from: 6, to: 1, arrows: 'to'},
    {from: 7, to: 8, arrows: 'to'},
    {from: 8, to: 7, arrows: 'to'},
  ]);

  var container = document.getElementById('graph');

  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
  };

  var graph = new vis.Network(container, data, options);
}