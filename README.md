# Pretty JSCPD

Data visualization for JSCPD report. Site: https://klaviercat.github.io/pretty-jscpd/graph.html

Pretty JSCPD provides 2 different views to help you understand the pattern and relation of duplications in your code base, so that you can see at a glance which area in the code base you should tackle first and will guarantee the maximum results for your efforts in reducing duplication and improving code quality. This application is especially helpful when you are dealing with a legacy codebase with a huge amount of duplications and you don't know where to start for reducing the huge amount of copy pasted code.

## Graph View

The Graph View shows a network of duplicated code, showing how the duplications are connected to each other across files, or within the same file itself (self copy-paste).

![Screenshot 2021-03-07 at 12 50 09](https://user-images.githubusercontent.com/5871704/110244172-677b1780-7f55-11eb-8f36-4f718027f221.png)

Each node in the graph represents a file with duplicated code. Each edge linking the nodes represent a copy-paste behaviour between the files. The graph could be zoomed in to view details information about the nodes (the files) and the edges (the links between files). The size of the nodes / edges signify the magnitude of duplication: the bigger the node, the more instances of duplications are detected in the file; the thicker the edge, the more duplications exist between the two nodes (files).

When clicking or hovering over a node or an edge, more information will be presented regarding the magnitude of the issue.

For example, the following file `ReactionsDetailSheet.swift` has been duplicated 10 times, with 182 lines:

![Screenshot 2021-03-07 at 12 41 18](https://user-images.githubusercontent.com/5871704/110245946-677f1580-7f5d-11eb-8551-3c0541588c83.png)

Between `ReactionsDetailSheet.swift` and `GroupCallMemberSheet.swift` there are 6 duplications, with 167 lines:

![Screenshot 2021-03-07 at 12 43 14](https://user-images.githubusercontent.com/5871704/110245982-9ac1a480-7f5d-11eb-93dd-4665384e96a7.png)

Sometimes a file also copy-pastes code within itself. You'll see an edge pointing back towards itself in this case. For example:

![Screenshot 2021-03-07 at 12 43 54](https://user-images.githubusercontent.com/5871704/110245987-a319df80-7f5d-11eb-8b73-0e4903130438.png)

## List View

The List View presents a sorted list of duplications found in your code base, starting from the file with the largest amount of duplication.

![Screenshot 2021-03-07 at 12 49 45](https://user-images.githubusercontent.com/5871704/110244197-782b8d80-7f55-11eb-8869-fead3118aa05.png)

## Usage

1. Run [JSCPD](https://www.npmjs.com/package/jscpd) to produce a JSON format report. It is important that this format has to be JSON. [Here](https://gist.github.com/KlavierCat/0b1e3214f8d9ca1b0f4e523b38a3df88) is a large real-life example sample JSCPD JSON report that you can use to test the app out if you don't want to generate your own yet.
1. Go to the [pretty-jscpd website](https://klaviercat.github.io/pretty-jscpd/graph.html) and upload your report. The default view is a Graph view. Click on the link in the page to get to the List View if you so desired. All the visualisation and parsing is done in your own browser using JavaScript, your report is not sent anywhere. As you can see this is a front-end only repo and the page is directly deployed to GitHub pages. The report is stored in your browser's local storage for ease of use. If you want to remove this report from local storage, simply run `localStorage.removeItem('pretty-jscpd')` in your browser console.
1. Supported browsers: as Babel is not installed yet and some small amount of ES6+ features are used, it won't run on older borwsers or IE. Any normally updated Safari / Chrome / FireFox / Opera etc. should work well.
