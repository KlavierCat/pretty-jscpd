const sortDuplicatesInDescendingOrder = (dupesArr) => {
  dupesArr.sort((a, b) => b.lines - a.lines);
  return dupesArr;
};

const aggregateAllDupesFragments = (sortedDupes) => {
  let aggregatedHTML = '';
  for (let i = 0; i < sortedDupes.length; i += 1) {
    const { firstFile } = sortedDupes[i];
    const { secondFile } = sortedDupes[i];
    aggregatedHTML = aggregatedHTML.concat(`
      <div class='dupe'>
        <h2>${(i + 1).toString()}</h2>
        <p>
          <strong>First file</strong>: ${firstFile.name}<br/>
          <strong>Start</strong>: line ${firstFile.start}<br/>
          <strong>End</strong>: line ${firstFile.end}
        </p>
        <p>
          <strong>Second file</strong>: ${secondFile.name}<br/>
          <strong>Start</strong>: line ${secondFile.start}<br/>
          <strong>End</strong>: line ${secondFile.end}
        </p>
        <pre>
          <code>${sortedDupes[i].fragment}</code>
        </pre>
      </div>
      <br/>
    `);
  }
  return aggregatedHTML;
}

const summarise = (stats) => {
  const summaryHTML = `
    <p>
      <strong>${stats.percentage}%</strong> duplication (
        <strong>${stats.duplicatedLines}</strong> duplicated lines
      out of ${stats.lines} total lines of code).
    </p>
    <p>Exact clones: <strong>${stats.clones}</strong></p>
    <p>Sorted in descending order of magnitude of duplication:</p>
  `;
  return summaryHTML;
}

const parseReport = (report) => {
  const sortedDupesArray = sortDuplicatesInDescendingOrder(report.duplicates);
  const sortedDupesHTML = aggregateAllDupesFragments(sortedDupesArray);

  const dupesNode = document.getElementById('dupes');
  dupesNode.innerHTML = sortedDupesHTML;

  const summaryNode = document.getElementById('summary');
  summaryNode.innerHTML = summarise(report.statistics.total);
}

const printReport = (report) => {
  parseReport(report);
  hljs.highlightAll();
}

const list = () => {
  initWithResultProcessor(printReport);
}
