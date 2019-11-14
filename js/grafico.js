var canvas = document.getElementById('canvas');
var el = document.createElement('span');
var containerHeight = 600;
var containerWidth = 800;
canvas.setAttribute('width', containerWidth);
canvas.setAttribute('height', containerHeight);
var context = canvas.getContext('2d');

var colors = [getRandomColor(), getRandomColor(), getRandomColor()];
function getRandomColor() {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}
var circle = {
  center: [containerWidth / 2, containerHeight / 2],
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

  circles.map(function(factor) {
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

function getArcCoords(circle, arc) {
  var x = circle.center[0];
  var y = circle.center[1];
  var degrees = arc;
  return function(radius) {
    var beta = 90 - degrees;
    var rad = function(deg) {
      return (deg * Math.PI) / 180;
    };

    var coordX = radius * Math.cos(rad(beta)) + x;
    var coordY = radius * Math.sin(rad(beta)) + y;

    return [coordX, coordY];
  };
}

function arry(num, array, arc) {
  var angle;
  if (arc === undefined) {
    angle = 360 / num;
  } else {
    angle = arc;
  }
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
var random = function(max, min) {
  return (max - min) * Math.random() + min;
};
var data = [];
for (var index = 0; index < random(18, 24); index++) {
  data.push({
    Nombre: 'Nombre ' + (index + 1),
    Autoevaluacion: random(2, 4).toFixed(3),
    Requerida: random(2, 4).toFixed(3),
    Evaluacion: random(2, 4).toFixed(3)
  });
}
function drawLines(context, array, options) {
  context.beginPath();
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);
  array.forEach(function(item, index) {
    if (index === 0) {
      context.moveTo(item[0], item[1]);
    } else {
      context.lineTo(item[0], item[1]);
    }
  });
  context.closePath();
  context.stroke();

  setOptions(context, currentOps);
}
function drawPoints(context, array, options, type) {
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);

  array.forEach(function(item, index) {
    switch (type) {
      case 0:
        drawPoligon(context, item, 7, 4);
        break;
      case 1:
        drawPoligon(context, item, 7, 3);
        break;
      case 2:
        context.beginPath();
        context.arc(item[0], item[1], 5, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        break;
      default:
        break;
    }
  });

  setOptions(context, currentOps);
}
function drawPoligon(context, coords, radius, sides) {
  var arc = 360 / sides;
  var poligonCoords = [];
  for (var index = 0; index < 360; index += arc) {
    poligonCoords.push(getArcCoords({ center: coords }, index)(radius));
  }
  context.beginPath();
  poligonCoords.forEach(function(item, index) {
    if (index > 0) {
      context.lineTo(item[0], item[1]);
    } else {
      context.moveTo(item[0], item[1]);
    }
  });
  context.closePath();
  context.fill();
}
function printGrapiph(data) {
  var arc = 360 / data.length;
  drawCirlce(
    context,
    circle,
    {
      lineWidth: 1,
      strokeStyle: '#000000'
    },
    [25, 50, 75, 100],
    data.length
  );
  var newData = data.map(function(item, index) {
    var angle = arc * index;
    var coords = getArcCoords(circle, angle);
    var keys = Object.keys(item);
    var coord = keys.reduce(function(data, key) {
      if (key !== 'Nombre') {
        var length = (Number(item[key]) * circle.radius) / 4;
        data[key] = {
          value: item[key],
          coords: coords(length)
        };
      }
      return data;
    }, {});
    var newObj = spreadObeject(item, coord);
    return newObj;
  });
  var fullCoord = data.map(function(item, index) {
    return {
      coords: getArcCoords(circle, arc * index)(circle.radius),
      Nombre: item.Nombre,
      arc: arc * index
    };
  });
  var lines = newData.reduce(function(data, item) {
    var keys = Object.keys(item);
    keys.forEach(function(key) {
      if (key === 'Nombre') return;

      if (data[key]) {
        data[key].push(item[key].coords);
      } else {
        data[key] = [item[key].coords];
      }
    });

    return data;
  }, {});

  var values = Object.keys(lines).map(function(key) {
    return lines[key];
  });
  values.forEach(function(item, index) {
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

  fullCoord.forEach(function(e) {
    drawName(context, e, e.arc, { textBaseline: 'top' });
  });
}
printGrapiph(data);
function spreadObeject(objectA, objectB) {
  var objectBKeys = Object.keys(objectB);
  objectBKeys.forEach(function(key) {
    objectA[key] = objectB[key];
  });
  return objectA;
}

function drawName(context, item, arc, options) {
  var x = item.coords[0];
  var y = item.coords[1];
  var width = context.measureText(item.Nombre).width;
  var height = 8.5;
  // var height =
  //   context.measureText(item.Nombre).actualBoundingBoxDescent +
  //   context.measureText(item.Nombre).actualBoundingBoxAscent * -1;
  var gap = 5;
  if (arc > 355 || arc < 5) {
    y = y + gap;
    x = x - width / 2;
  } else if (arc > 85 && arc < 95) {
    x += gap;
    y -= height / 2;
  } else if (arc > 175 && arc < 185) {
    y -= height + gap;
    x = x - width / 2;
  } else if (arc > 265 && arc < 275) {
    x -= width + gap;
    y -= height / 2;
  } else if (arc >= 5 && arc <= 85) {
    y += gap;
    x += gap;
  } else if (arc >= 95 && arc <= 175) {
    y -= gap + height;
    x += gap;
  } else if (arc >= 185 && arc <= 265) {
    y -= gap + height;
    x -= gap + width;
  } else if (arc >= 275 && arc <= 355) {
    y += gap;
    x -= width + gap;
  }
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);
  context.fillText(item.Nombre, x, y, 140);
  setOptions(context, currentOps);
}
var captions = [
  {
    name: 'Autoevaluacion',
    coords: [60, containerHeight * 0.8]
  },
  {
    name: 'Requerida',
    coords: [60, containerHeight * 0.8 + 15]
  },
  {
    name: 'Evaluacion',
    coords: [60, containerHeight * 0.8 + 30]
  }
];

function drawCaption(captions) {
  captions.forEach(function(element, index) {
    var options = {
      lineWidth: 2,
      strokeStyle: colors[index],
      fillStyle: colors[index]
    };
    var gap = 10;
    var x = element.coords[0];
    var y = element.coords[1];
    context.beginPath();
    var currentOps = getCurrentOptions(context, options);
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
        context.arc(
          element.coords[0],
          element.coords[1],
          3,
          0,
          2 * Math.PI,
          false
        );
        context.closePath();
        context.fill();
        break;
      default:
        break;
    }
    setOptions(context, currentOps);
    options = {
      textBaseline: 'top'
    };
    currentOps = getCurrentOptions(context, options);
    setOptions(context, options);
    var x = element.coords[0] + (gap + 5);
    var y = element.coords[1] - 6;
    context.fillText(element.name, x, y, 140);
    setOptions(context, currentOps);
  });
}
drawCaption(captions);
canvas.ur;
