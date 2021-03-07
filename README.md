# Pretty JSCPD
Data visualization for JSCPD report.

Pretty JSCPD provides 2 different views to help you understand the pattern and relation of duplications in your code base, so that you can see at a glance which area in the code base you should tackle first and will guarantee the maximum results for your efforts in reducing duplication and improving code quality. This applicaiton is especially helpful when you are dealing with a legacy codebase with a huge amount of duplication and you don't know where to start for reducing the huge amount of copy pasted code.

## Graph View
The Graph View shows a network of duplicated code, showing how the duplications are connected to each other across files, or within the same file itself (self copy-paste).

## List View
The List View presents a sorted list of duplications found in your code base, starting from the file with the largest amount of duplication.

## Usage
1. Run [JSCPD](https://www.npmjs.com/package/jscpd) to produce a JSON format report. It is important that this format has to be JSON.
2. Go to the pretty-jscpd website and upload your report. All the visualisation and parsing is done in your own browser using JavaScript, your report is not sent anywhere. As you can see this is a front-end only repo and the page is directly deployed to GitHub pages. The report is stored in your browser's local storage for ease of use. If you want to remove this report from local storage, simply run `localStorage.removeItem('pretty-jscpd')` in your browser console.
3. Supported browsers: as Babel is not installed yet and some small amount of ES6+ features are used, it won't run on older borwsers or IE. Any normally updated Safari / Chrome / FireFox / Opera etc. should work well.
