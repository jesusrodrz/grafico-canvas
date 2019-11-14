const canvas = document.getElementById("canvas");
const containerHeight = 900;
const containerWidth = 900;
canvas.setAttribute("width", containerWidth);
canvas.setAttribute("height", containerHeight);
const ctx = canvas.getContext("2d");
const context = canvas.getContext("2d");
const colors = [getRandomColor(), getRandomColor(), getRandomColor()];
function getRandomColor() {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}
const circle = {
  center: [canvas.clientWidth / 2, canvas.clientHeight / 2],
  radius: (containerHeight * 0.8) / 2
};
function getCurrentOptions(object, options) {
  var optionsArray = Object.keys(options);
  var currentOps = optionsArray.reduce(function(data, option) {
    data[option] = object[option];
    return data;
  }, {});
  return currentOps;
}
function setOptions(object, options) {
  var optionsArray = Object.keys(options);

  for (var index = 0; index < optionsArray.length; index++) {
    var key = optionsArray[index];
    object[key] = options[key];
  }
}
function drawCirlce(context, circle, options, circles, lines) {
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);

  circles.forEach(factor => {
    context.beginPath();
    context.arc(
      circle.center[0],
      circle.center[1],
      circle.radius * (factor / 100),
      0,
      2 * Math.PI,
      false
    );

    context.stroke();
  });
  if (lines) {
    arry(lines).forEach(function(angle) {
      var coordXY = getArcCoords(circle, angle)(circle.radius);
      console.log(coordXY);
      context.beginPath();
      context.moveTo(circle.center[0], circle.center[1]);
      context.lineTo(coordXY[0], coordXY[1]);
      context.closePath();
      context.stroke();
    });
  }
  setOptions(context, currentOps);
}
drawCirlce(
  context,
  circle,
  {
    lineWidth: 1,
    strokeStyle: "#000000"
  },
  [25, 50, 75, 100],
  20
);
function drawPoligon(context, coords, radius, sides) {
  const arc = 360 / sides;
  const poligonCoords = [];
  for (let index = 0; index < 360; index += arc) {
    poligonCoords.push(getArcCoords({ center: coords }, index)(radius));
  }
  context.beginPath();
  poligonCoords.forEach((item, index) => {
    if (index > 0) {
      context.lineTo(...item);
    } else {
      context.moveTo(...item);
    }
  });
  context.closePath();
  context.fill();
}

function getArcCoords(circle, arc) {
  const x = circle.center[0];
  const y = circle.center[1];
  const degrees = arc;
  return radius => {
    const beta = 90 - degrees;
    const rad = deg => (deg * Math.PI) / 180;

    const coordX = radius * Math.cos(rad(beta)) + x;
    const coordY = radius * Math.sin(rad(beta)) + y;

    return [coordX, coordY];
  };
}

function arry(num, array, arc) {
  const angle = arc === undefined ? 360 / num : arc;
  if (array === undefined) {
    return arry(num - 1, [angle * num], angle);
  } else if (num > 0) {
    array.push(angle * num);
    return arry(num - 1, array, angle);
  }
  if (num === 0) {
    return array;
  }
}
const random = (max, min) => (max - min) * Math.random() + min;
const data = [];
for (let index = 0; index < random(18, 24); index++) {
  data.push({
    Nombre: `Nombre ${index + 1}`,
    Autoevaluacion: random(2, 4).toFixed(3),
    Requerida: random(2, 4).toFixed(3),
    Evaluacion: random(2, 4).toFixed(3)
  });
}

function loadData() {
  fetch("data/data.json")
    .then(response => {
      return response.json();
    })
    .then(response => {
      printGrapiph(response.data);
    });
}
// loadData()
// printGrapiph(data);
function drawLines(context, array, options) {
  context.beginPath();
  const currentOps = getCurrentOptions(context, options);
  setOptions(context, options);
  array.forEach((item, index) => {
    if (index === 0) {
      context.moveTo(...item);
    } else {
      context.lineTo(...item);
    }
  });
  context.closePath();
  context.stroke();

  setOptions(context, currentOps);
}
function drawPoints(context, array, options, type) {
  const currentOps = getCurrentOptions(context, options);
  setOptions(context, options);

  array.forEach((item, index) => {
    switch (type) {
      case 0:
        drawPoligon(context, item, 7, 4);
        break;
      case 1:
        drawPoligon(context, item, 7, 3);
        break;
      case 2:
        context.beginPath();
        context.arc(...item, 5, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        break;
      default:
        break;
    }
  });

  setOptions(context, currentOps);
}
function printGrapiph(data) {
  const arc = 360 / data.length;
  drawCirlce(
    context,
    circle,
    {
      lineWidth: 1,
      strokeStyle: "#000000"
    },
    data.length
  );
  const newData = data.map((item, index) => {
    const angle = arc * index;
    const coords = getArcCoords(circle, angle);
    const keys = Object.keys(item);
    const coord = keys.reduce((data, key) => {
      if (key !== "Nombre") {
        const length = (Number(item[key]) * circle.radius) / 4;
        data[key] = {
          value: item[key],
          coords: coords(length)
        };
      }
      return data;
    }, {});

    return { ...item, ...coord };
  });
  const fullCoord = data.map((item, index) => {
    return {
      coords: getArcCoords(circle, arc * index)(circle.radius),
      Nombre: item.Nombre,
      arc: arc * index
    };
  });
  const lines = newData.reduce((data, item) => {
    const keys = Object.keys(item);
    keys.forEach(key => {
      if (key === "Nombre") return;

      if (data[key]) {
        data[key].push(item[key].coords);
      } else {
        data[key] = [item[key].coords];
      }
    });

    return data;
  }, {});

  const values = Object.values(lines);
  values.forEach((item, index) => {
    drawLines(context, item, {
      lineWidth: 3,
      strokeStyle: colors[index]
    });
    drawPoints(
      context,
      item,
      {
        fillStyle: colors[index]
      },
      index
    );
  });

  fullCoord.forEach(e => {
    drawName(e, e.arc);
  });
}

function drawName(item, arc) {
  let cssClass = "";
  const container = canvas.parentElement;
  const span = document.createElement("span");
  span.innerHTML = item.Nombre;
  span.style.top = `${item.coords[1]}px`;
  span.style.left = `${item.coords[0]}px`;

  if (arc > 355 || arc < 5) cssClass = "text-0";
  else if (arc > 85 && arc < 95) cssClass = "text-90";
  else if (arc > 175 && arc < 185) cssClass = "text-180";
  else if (arc > 265 && arc < 275) cssClass = "text-270";
  else if (arc >= 5 && arc <= 85) cssClass = "text-0_90";
  else if (arc >= 95 && arc <= 175) cssClass = "text-90_180";
  else if (arc >= 185 && arc <= 265) cssClass = "text-180_270";
  else if (arc >= 275 && arc <= 355) cssClass = "text-180_270";
  span.classList.add(cssClass);
  span.classList.add("canvas-text");
  container.append(span);
}
const captions = [
  {
    name: "Autoevaluacion",
    coords: [60, containerHeight * 0.8]
  },
  {
    name: "Requerida",
    coords: [60, containerHeight * 0.8 + 15]
  },
  {
    name: "Evaluacion",
    coords: [60, containerHeight * 0.8 + 30]
  }
];

function drawCaption(params) {
  captions.forEach((element, index) => {
    const options = {
      lineWidth: 2,
      strokeStyle: colors[index],
      fillStyle: colors[index]
    };
    const gap = 10;
    const x = element.coords[0];
    const y = element.coords[1];
    context.beginPath();
    const currentOps = getCurrentOptions(context, options);
    setOptions(context, options);
    context.moveTo(x - gap, y);
    context.lineTo(x + gap, y);
    context.closePath();
    context.stroke();
    switch (index) {
      case 0:
        drawPoligon(context, element.coords, 5, 4);
        break;
      case 1:
        drawPoligon(context, element.coords, 5, 3);
        break;
      case 2:
        context.beginPath();
        context.arc(...element.coords, 3, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        break;
      default:
        break;
    }
    setOptions(context, currentOps);

    let cssClass = "";
    const container = canvas.parentElement;
    const span = document.createElement("span");
    span.innerHTML = element.name;
    span.style.top = `${element.coords[1]}px`;
    span.style.left = `${element.coords[0] + 10}px`;

    cssClass = "text-90";
    span.classList.add(cssClass);
    span.classList.add("canvas-text");
    container.append(span);
  });
}
drawCaption();
