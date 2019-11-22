/*var pdfjsLib = window['pdfjs-dist/build/pdf'];
var pdfFile;
var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument('cahierRH.pdf');
loadingTask.promise.then(function (pdf) {
    pdfFile = pdf;
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 2;


    for (var i = 1; i < 4; i++) {
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('cvs');
        var context = canvas.getContext('2d');
        openPage(pdf, i, context);
    }


})

 


    function openPage(pdfFile, pageNumber, context) {


        pdfFile.getPage(pageNumber).then(function (page) {
            console.log('Page loaded');

            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });
            var canvas = context.canvas;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });




    }*/


/* exemple2 */


// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    canvas = document.getElementById('cvs'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;


        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function () {
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
    //var dataURL = localStorage.getItem('cvs');
    //var ctx = document.getElementById('cvs').getContext('2d');

    //var img = new Image;
    //img.src = dataURL;
    //img.onload = function () {
    //    ctx.drawImage(img, 0, 0);
    //};

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
    localStorage.setItem('cvs', document.getElementById('cvs').toDataURL());


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

var decX;
var decY;
var posx;
var posy;
document.getElementById('cvs').addEventListener('mousemove', function (e) {
    var rect = document.getElementById('cvs').getBoundingClientRect();
    posx = e.clientX - rect.left;
    posy = e.clientY - rect.top;




}, false);
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(e) {
    //ev.dataTransfer.setData("text", ev.target.id);
    var dde = (navigator.vendor) ? document.body : document.documentElement;
    var Obj = e.currentTarget;

    var X = e.clientX + dde.scrollLeft;
    var Y = e.clientY + dde.scrollTop;

    decX = X - Obj.offsetLeft;
      decY = Y - Obj.offsetTop;

    e.dataTransfer.setData('Text', Obj.src);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'move';
  
}
function deleteItEM() {
    var dde = (navigator.vendor) ? document.body : document.documentElement;
    var Obj = e.currentTarget;

    var X = e.clientX + dde.scrollLeft;
    var Y = e.clientY + dde.scrollTop;

    decX = X - Obj.offsetLeft;
    decY = Y - Obj.offsetTop;
    var ctx = document.getElementById('cvs').getContext('2d');
    dcx = X - decX - document.getElementById('cvs').offsetLeft;
    dcy = Y - decY - document.getElementById('cvs').offsetTop;
    ctx.clearRect(imgz, dcx, dcy, 66, 28);

}

function drop(e) {
    //ev.preventDefault();
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    e.preventDefault();
    var dde = (navigator.vendor) ? document.body : document.documentElement;
    var X = e.clientX + dde.scrollLeft;
    var Y = e.clientY + dde.scrollTop;

    var draaag = e.dataTransfer.getData("text");
    //Create an instance of Image.

    
    var imgz = new Image();
    imgz.crossOrigin = "anonymous";

    imgz.src = draaag;
    var dynamicCanvas = document.createElement("canvas");
    var dynamicContext = dynamicCanvas.getContext("2d");



  
    imgz.onload = function () {
      //  Create an object that is used to draw graphics on the canvas.
        //The getContext() method returns an object with the properties and methods required for drawing graphics on the canvas.
        //The ‘2d‘ parameter limits us for drawing only 2D graphics.
        var ctx = document.getElementById('cvs').getContext('2d');

            dcx = X - decX - document.getElementById('cvs').offsetLeft;
            dcy = Y - decY - document.getElementById('cvs').offsetTop;
        
        // draw the image on the canvas by specifying the position, width and height of the image.
      //  ctx.drawImage(imgz, dcx, dcy, 66, 28);
    
      dynamicContext.drawImage(imgz, 0, 0,66,28);
        ctx.drawImage(dynamicCanvas, dcx, dcy);

        link.href = document.getElementById('cvs').toDataURL();

      //  localStorage.setItem('cvs', document.getElementById('cvs').toDataURL());

        console.log(dcx, dcy);





    }
    var link = document.createElement('a');
    link.innerHTML = 'Save';
    //link.href = document.getElementById('canvas').toDataURL();

    link.addEventListener('click', function (e) {
        link.download = "imagename.png";
    }, false);

    document.body.appendChild(link);

    document.getElementById('cvs').addEventListener('click', function () {
        var ctx = document.getElementById('cvs').getContext('2d');


      //  ctx.clearRect(dcx, dcy, 66, 28);
        dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);



    }, false);


  

   // function getCoordinate()

 
}