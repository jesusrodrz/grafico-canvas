var canvasElement = document.querySelector("#myCanvas");
var context = canvasElement.getContext("2d");
 
// the triangle
// context.beginPath();
// context.moveTo(100, 100);
// context.lineTo(100, 300);
// context.lineTo(300, 300);
// context.closePath();
 
// // the outline
// context.lineWidth = 10;
// context.strokeStyle = '#666666';
// context.stroke();
 
// the fill color
context.fillStyle = "#FFCC00";
// context.fill();

function drawPoligon(context,coords,radius, sides) {
    const arc = 360 / sides
    const poligonCoords = []
    for (let index = 0; index < 360; index+=arc) {
        console.log(index)
        poligonCoords.push(getArcCoords({center: coords}, index)(radius))
    }
    context.beginPath();
    poligonCoords.forEach((item,index)=>{
        if(index>0){
            context.lineTo(...item);
        } else {
            context.moveTo(...item);
        }

    })
    context.closePath();
    context.fill();
}
drawPoligon(context,[100,300],5, 5)


function getArcCoords(circle, arc){
    const x = circle.center[0]
    const y = circle.center[1]
    const degrees = arc
    return (radius) => {
        const beta = 90 - degrees 
        const rad = (deg) => deg * Math.PI / 180
        
        const coordX = radius * Math.cos(rad(beta)) + x
        const coordY = radius * Math.sin(rad(beta)) + y
    
        return [coordX,coordY]
    }
}