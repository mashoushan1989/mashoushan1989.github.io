---
title: "《157页微软GPT研究报告（全中文版）》"
published: true
categories: [其他]
tags: [非招聘内容]
---

### 157页微软GPT研究报告（全中文版）

微软于近日发布了此份157页的GPT报告，已翻译成中文；这也是目前也是市面上关于“GPT”最为全面的解析；关注此领域者值得深入研读！

**资料来源于网络，如有侵权，请联系我删除**

**[如遇加载缓慢无法阅读，可点此直接下载](https://ashma.info/assets/pdfs/Microsoft-GPT-reserch.pdf)**
<br>

<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script src="https://cdn.bootcss.com/pdf.js/2.2.228/pdf.js"></script>
    <div align="center">
      <canvas id="the-canvas" ></canvas>
    </div>
    <div align="center">
      <button id="prev" >上一页</button>
      <button id="next">下一页</button>
      &nbsp; &nbsp;
      <span>页码: <span id="page_num"></span> / <span id="page_count"></span></span>
    </div>

    <script type="text/javascript">
    // If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = '/assets/pdfs/Microsoft-GPT-reserch.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.2.228/pdf.worker.js';

var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1,
  canvas = document.getElementById('the-canvas'),
  ctx = canvas.getContext('2d');

/**
* Get page info from document, resize canvas accordingly, and render page.
* @param num Page number.
*/
function renderPage(num) {
pageRendering = true;
// Using promise to fetch the page
pdfDoc.getPage(num).then(function(page) {
  var viewport = page.getViewport({scale: scale});
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render PDF page into canvas context
  var renderContext = {
    canvasContext: ctx,
    viewport: viewport
  };
  var renderTask = page.render(renderContext);

  // Wait for rendering to finish
  renderTask.promise.then(function() {
    pageRendering = false;
    if (pageNumPending !== null) {
      // New page rendering is pending
      renderPage(pageNumPending);
      pageNumPending = null;
    }
  });
});

// Update page counters
document.getElementById('page_num').textContent = num;
}

/**
* If another page rendering in progress, waits until the rendering is
* finised. Otherwise, executes rendering immediately.
*/
function queueRenderPage(num) {
if (pageRendering) {
  pageNumPending = num;
} else {
  renderPage(num);
}
}

/**
* Displays previous page.
*/
function onPrevPage() {
if (pageNum <= 1) {
  return;
}
pageNum--;
queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
* Displays next page.
*/
function onNextPage() {
if (pageNum >= pdfDoc.numPages) {
  return;
}
pageNum++;
queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
* Asynchronously downloads PDF.
*/
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
pdfDoc = pdfDoc_;
document.getElementById('page_count').textContent = pdfDoc.numPages;

// Initial/first page rendering
renderPage(pageNum);
});
    </script>
  </body>
</html>
