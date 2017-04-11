function getNodes(sortedDupes) {
    var nodes = {};

    function addValueToNode(fileName, lines) {
        nodes[fileName] = nodes[fileName] ? nodes[fileName] + lines : lines;
    }

    for (var i = 0; i < sortedDupes.length; i++) {
        var dupe = sortedDupes[i];

        addValueToNode(dupe.firstFile.name, dupe.lines);
        addValueToNode(dupe.secondFile.name, dupe.lines);
    }

    return nodes;
}

function getEdges(sortedDupes) {
    var edges = {};

    for (var i = 0; i < sortedDupes.length; i++) {
        var dupe = sortedDupes[i];

        var fromFile = dupe.firstFile.name;
        var toFile = dupe.secondFile.name;

        if (!edges[fromFile]) {
            edges[fromFile] = {};
        }

        if (!edges[fromFile][toFile]) {
            edges[fromFile][toFile] = {instances:0, lines:0, tokens:0};
        }

        edges[fromFile][toFile].instances += 1;
        edges[fromFile][toFile].lines += dupe.lines;
        edges[fromFile][toFile].tokens += dupe.tokens;
    }

    return edges;
}

function generateNodesArray(nodesObject) {
    var nodesArray = [];

    for (var node in nodesObject) {
        if (nodesObject.hasOwnProperty(node)) {
            nodesArray.push({id:node, value:nodesObject[node], label:node});
        }
    }

    return nodesArray;
}

function generateEdgesArray(edgesObject) {
    var edgesArray = [];

    var instances = 0;
    var lines = 0;
    var tokens = 0;

    for (var fromNode in edgesObject) {
        if (edgesObject.hasOwnProperty(fromNode)) {
            for (var toNode in edgesObject[fromNode]) {
                instances = edgesObject[fromNode][toNode].instances;
                lines = edgesObject[fromNode][toNode].lines;
                tokens = edgesObject[fromNode][toNode].tokens;
                edgesArray.push({from:fromNode, to:toNode, value:lines, title:'duplicated ' + instances + ' times, with ' + lines + ' lines, ' + tokens + ' tokens.'})
            }
        }
    }

    return edgesArray;
}

function draw(report) {
    var sortedDupesArray = reportObjectBubbleSort(report.duplicates);

    if (commonFilePathToOmit) {
        sortedDupesArray = cleanupFilePath(sortedDupesArray, commonFilePathToOmit);
    }

    var nodesObject = getNodes(sortedDupesArray);
    var edgesObject = getEdges(sortedDupesArray);

    var nodes = generateNodesArray(nodesObject);
    var edges = generateEdgesArray(edgesObject);

    var container = document.getElementById('files-relation');

    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes: {
            shape: 'dot',
            scaling: {
                label: {
                    min:8,
                    max:20
                }
            }
        },
        edges: {
            scaling: {
                min: 1,
                max: 30
            }
        }
    };

    network = new vis.Network(container, data, options);
}

function main() {
    loadJSONReport(pathToJSCPDreport, draw);
}
