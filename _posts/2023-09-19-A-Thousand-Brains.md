---
title: "《千脑智能》"
published: true
categories: [其他]
tags: [非招聘内容]
---

### 书籍推荐《千脑智能》

**作者简介**
杰夫·霍金斯
- 科技界一代传奇，美国有名的发明家、计算机科学家和神经科学家，于2003年当选美国国家工程院院士。Palm掌上电脑创始人，Numenta公司创始人。
- 多年来深耕对大脑的探索，致力于解释大脑是如何工作的。他认为只有把人类智能弄明白，才能制造出像人类大脑一样工作的机器智能，著有《千脑智能》《新机器智能》。
**内容简介**
- 近些年，当人们谈论人工智能时，总热衷于讨论算法的优化、模型的迭代、算力的多少。人们不断地在追求模型的深度、数据的规模和芯片的算力。海量参数的复杂网络仿佛就是人工智能的发展方向。然而，这就是真的智能吗？
- 科技界的一代传奇人物、计算机科学家与神经科学家杰夫·霍金斯在《千脑智能》中揭示了一种关于大脑和智能的理论——千脑智能理论，这将彻底改变我们对大脑和人工智能的未来的理解。
- 就像人类蕞终不是通过模仿鸟类，而是通过理解空气动力学而发明了飞行一样，在我们改进机器和深度学习的同时，我们需要首先了解大脑是如何工作的。
- 杰夫·霍金斯和他的团队发现，大脑使用类似地图的结构来建立一个世界的模型——不仅仅是一个模型，而是成千上万个我们所知道的一切的模型，也就是千脑智能理论。这一发现为创造机器智能提供了清晰的路线图。
- 霍金斯多年深耕于大脑研究的领域，终于在这本书中给出了答案。

<hr>
**资料均来源于网络，如有侵权，请联系本人删除。**
<hr>

**[如遇加载缓慢无法阅读，可点此直接下载](https://ashma.info/assets/pdfs/A-Thousand-Brains.pdf)**
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
var url = '/assets/pdfs/A-Thousand-Brains.pdf';

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
