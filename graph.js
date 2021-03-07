const getNodes = (sortedDupes) => {
  const nodes = {};

  const addValueToNode = (fileName, lines) => {
    nodes[fileName] = nodes[fileName] ? nodes[fileName] + lines : lines;
  }

  for (let i = 0; i < sortedDupes.length; i += 1) {
    const dupe = sortedDupes[i];

    addValueToNode(dupe.firstFile.name, dupe.lines);
    addValueToNode(dupe.secondFile.name, dupe.lines);
  }

  return nodes;
}

const getEdges = (dupes) => {
  const edges = {};

  for (let i = 0; i < dupes.length; i += 1) {
    const dupe = dupes[i];
    const fromFile = dupe.firstFile.name;
    const toFile = dupe.secondFile.name;

    if (!edges[fromFile]) {
      edges[fromFile] = {};
    }

    if (!edges[fromFile][toFile]) {
      edges[fromFile][toFile] = { instances: 0, lines: 0, tokens: 0 };
    }

    edges[fromFile][toFile].instances += 1;
    edges[fromFile][toFile].lines += dupe.lines;
    edges[fromFile][toFile].tokens += dupe.tokens;
  }

  return edges;
}

const generateNodesArray = (nodesObject) => {
  const nodesArray = [];

  Object.entries(nodesObject).forEach((entry) => {
    const filePath = entry[0];
    const dupeCount = entry[1];
    nodesArray.push({
      id: filePath,
      value: dupeCount,
      label: filePath,
    });
  });

  return nodesArray;
}

const generateEdgesArray = (edgesObject) => {
  const edgesArray = [];

  let instances = 0;
  let lines = 0;
  let tokens = 0;

  Object.entries(edgesObject).forEach((dupe) => {
    const fromNode = dupe[0];
    const toNodes = dupe[1];
    Object.entries(toNodes).forEach((node) => {
      const toNode = node[0];
      const dupeStats = node[1];
      instances = dupeStats.instances;
      lines = dupeStats.lines;
      tokens = dupeStats.tokens;
      edgesArray.push({
        from: fromNode,
        to: toNode,
        value: lines,
        title: `duplicated ${instances} times, with ${lines} lines, ${tokens} tokens.`,
      });
    });
  });

  return edgesArray;
}

const draw = (report) => {
  const dupesArray = report.duplicates;

  const nodesObject = getNodes(dupesArray);
  const edgesObject = getEdges(dupesArray);

  const nodes = generateNodesArray(nodesObject);
  const edges = generateEdgesArray(edgesObject);

  const container = document.getElementById('files-relation');

  const data = {
    nodes,
    edges,
  };

  const options = {
    nodes: {
      shape: 'dot',
      scaling: {
        label: {
          min: 8,
          max: 20,
        },
      },
    },
    edges: {
      scaling: {
        min: 1,
        max: 30,
      },
    },
  };

  network = new vis.Network(container, data, options);
}

const graph = () => {
  initWithResultProcessor(draw);
}
