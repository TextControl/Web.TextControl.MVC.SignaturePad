// ** Text Control SoftPad Signature Javascript **

// global objects
var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

// set the initial color and pen width
var x = "black",
    y = 4;

function init() {

    // remove animation on hover
    $("#softpad").hover(function (e) {
        $(this).addClass("softpad-hover-after");
    });

    // if signature pad is shown, show animation and remove name data
    $("#signaturePad").on("shown.bs.modal", function () {
        ctx.clearRect(0, 0, w, h);
        $("#softpad").removeClass("softpad-hover-after");
        $('#name').val("");
    })

    // define global objects
    canvas = document.getElementById("softpad");
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    // attach mouse events
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

// draw the content onto canvas
function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

// clear canvas
function erase() {
    ctx.clearRect(0, 0, w, h);
}

// save the content as an image
function save() {
    return canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
}

// set 2 points that will be connected and drawn
function findxy(res, e) {
    
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.offsetX;
        currY = e.offsetY;
        
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.offsetX;
            currY = e.offsetY;
            draw();
        }
    }
}