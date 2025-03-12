function drawTriangle(ctx, p1, p2, p3, strokeStyle="#666666", fillStyle="#FFCC00") {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.lineTo(p3[0], p3[1]);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();

    ctx.fillStyle = fillStyle;
    ctx.fill();
}

function updateEditOrder(currentEditOrder, newEdit) {
    if (currentEditOrder[0] == newEdit) return currentEditOrder;
    return [newEdit, currentEditOrder[0]];
}

function calculate(editOrder, a1, a2, so, sa, sh) {
    var sov = so.value;
    var sav = sa.value;
    var shv = sh.value;
    if (editOrder[0].classList.contains("side") && editOrder[1].classList.contains("side")) {
        if (editOrder.includes(so) && editOrder.includes(sa)) sh.value = Math.sqrt(sov**2 + sav**2);
        if (editOrder.includes(sh) && editOrder.includes(so)) sa.value = Math.sqrt(shv**2 - sov**2);
        if (editOrder.includes(sh) && editOrder.includes(sa)) so.value = Math.sqrt(shv**2 - sav**2);
        a1.value = Math.atan(sov/sav)* (180 / Math.PI);
        a2.value = Math.atan(sav/sov)* (180 / Math.PI);
    }
    if (editOrder.includes(a1) && ((editOrder[0].classList.contains("side") && editOrder[1].classList.contains("angle")) || (editOrder[0].classList.contains("angle") && editOrder[1].classList.contains("side")))) {
        if (editOrder.includes(so) && editOrder.includes(a1)) {
            sa.value = sov / Math.tan(a1.value*Math.PI/180);
            sh.value = sov / Math.sin(a1.value*Math.PI/180);
        }
        if (editOrder.includes(sa) && editOrder.includes(a1)) {
            so.value = sav * Math.tan(a1.value*Math.PI/180);
            sh.value = sav / Math.cos(a1.value*Math.PI/180);
        }
        if (editOrder.includes(sh) && editOrder.includes(a1)) {
            sa.value = shv * Math.cos(a1.value*Math.PI/180);
            so.value = shv * Math.sin(a1.value*Math.PI/180);
        }
    } else if (editOrder.includes(a2) && ((editOrder[0].classList.contains("side") && editOrder[1].classList.contains("angle")) || (editOrder[0].classList.contains("angle") && editOrder[1].classList.contains("side")))) {
        if (editOrder.includes(so) && editOrder.includes(a2)) {
            sa.value = sov * Math.tan(a2.value*Math.PI/180);
            sh.value = sov / Math.cos(a2.value*Math.PI/180);
        }
        if (editOrder.includes(sa) && editOrder.includes(a2)) {
            so.value = sav / Math.tan(a2.value*Math.PI/180);
            sh.value = sav / Math.sin(a2.value*Math.PI/180);
        }
        if (editOrder.includes(sh) && editOrder.includes(a2)) {
            sa.value = shv * Math.sin(a2.value*Math.PI/180);
            so.value = shv * Math.cos(a2.value*Math.PI/180);
        }
    }
}

const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const so = document.getElementById("so");
const sa = document.getElementById("sa");
const sh = document.getElementById("sh");
const input = document.getElementsByClassName("input");
var editOrder = [so,sa];
var accuracy = 5;

Array.from(input).forEach((element) => {
    element.oninput = (e) => {
        editOrder = updateEditOrder(editOrder, element);
    }
})

function repeat() {    // setup canvas element
    console.log(editOrder);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // set canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    // calc data points
    calculate(editOrder, a1, a2, so, sa, sh);


    // calc vertex pos
    p1 = [100,100];
    p3 = [300,300];
    p2 = [100,300];

    // draw triangle
    drawTriangle(ctx, p1, p2, p3);
}

// =================================================================
// SETUP
// =================================================================
so.value=3
sa.value=4
repeat()

// =================================================================
// REPEAT
// =================================================================
setInterval(() => {
    repeat();
}, 10);