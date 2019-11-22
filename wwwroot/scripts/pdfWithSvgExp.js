var url = "https://localhost:5001/FOR-1568886484838.pdf";
var PDFJS = window['pdfjs-dist/build/pdf'];


var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8;



 function renderPage(num) {
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function (page) {
        // Set scale (zoom) level
        var scale = 1.5;

        // Get viewport (dimensions)
        var viewport = page.getViewport(scale);

        // Get div#the-svg
        var container = document.getElementById('the-svg');

        // Set dimensions
        container.style.width = viewport.width + 'px';
        container.style.height = viewport.height + 'px';

        // SVG rendering by PDF.js
        page.getOperatorList()
            .then(function (opList) {
                var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
                return svgGfx.getSVG(opList, viewport);
            })
            .then(function (svg) {
                pageRendering = false;
                container.removeChild(container.lastChild);

                container.appendChild(svg);
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





function testDisplayElements(element) {
    var className =element.attr('class');

    var n = className.search(pageNum);
    var isDropped = className.search('item');

    if (n !== -1) {
        element.show();
    } else if (n === -1 && isDropped !== -1) {
        element.hide();
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

    testDisplayElements($('#draggable1'));
    testDisplayElements($('#draggable'));

    //var className = $('#draggable1').attr('class');

    //var n = className.search(pageNum);
    //var isDropped = className.search('item');

    //if (n !== -1) {
    //    $("#draggable1").show();
    //} else if (n === -1 && isDropped !== -1) {
    //    $("#draggable1").hide();
    //}

   
    //if (pageNum === 1) {
    //    $("#draggable1").show();
    //    $("#draggable").hide();


    //} else if (pageNum === 2) {
    //    $("#draggable1").hide();
    //    $("#draggable").show();
    //}

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

    testDisplayElements($('#draggable1'));
    testDisplayElements($('#draggable'));


    //var className = $('#draggable1').attr('class');

    //var n = className.search(pageNum);
    //var isDropped = className.search('item');
    //if (n !== -1) {
    //    $("#draggable1").show();
    //} else if(n=== -1 && isDropped !== -1){
    //    $("#draggable1").hide();
    //}


    //if ($("#draggable1").hasClass("jjj") + pageNum) {

    //    alert('true');

    //}




//    if (pageNum === 1) {
//        $("#draggable1").show();
//        $("#draggable").hide();

//    } else if (pageNum === 2) {

//        $("#draggable").show();
//        $("#draggable1").hide();


//    }
//else {
//        $("#draggable1").hide();
//        $("#draggable").hide();

//    }


    queueRenderPage(pageNum);


}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
PDFJS.getDocument(url).promise.then(function (pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('page_count').textContent = pdfDoc.numPages;

    // Initial/first page rendering
    renderPage(pageNum);
});


















/*
 *
 *
 *PDFJS.getDocument(url)
    .then(function (pdf) {
        return pdf.getPage(1);
    })
    .then(function (page) {
        // Set scale (zoom) level
        var scale = 1.5;

        // Get viewport (dimensions)
        var viewport = page.getViewport(scale);

        // Get div#the-svg
        var container = document.getElementById('the-svg');

        // Set dimensions
        container.style.width = viewport.width + 'px';
        container.style.height = viewport.height + 'px';

        // SVG rendering by PDF.js
        page.getOperatorList()
            .then(function (opList) {
                var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
                return svgGfx.getSVG(opList, viewport);
            })
            .then(function (svg) {
                container.appendChild(svg);
            });
    });
 *
 *
 *
 *
 *
 *
 */



$(document).ready(() => {

    $("#draggable1").draggable({
        containment: "#the-svg" // create "copy" with original properties, but not a true clone
    });
    $("#draggable").draggable({ containment: "#the-svg" });



    $("#the-svg").droppable({
        drop: function (e, ui) {
            var position = $("#draggable").position();
            var offsetLeftSVG = ($("#the-svg").offset().left);
            var offsetTopSVG = ($("#the-svg").offset().top);



            var offsetLeft = ($("#draggable").offset().left) - offsetLeftSVG;
            var offsetTop = ($("#draggable").offset().top) - offsetTopSVG;

            ui.draggable.addClass(function () {
                return "item-" + pageNum;
            });
        
            alert("Current position of the box is: (left: " + offsetLeft + ", top: " + offsetTop + ")" + pageNum);
           
        }
    });

});