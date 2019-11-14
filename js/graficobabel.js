"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var canvas = document.getElementById("canvas");
var containerHeight = 900;
var containerWidth = 900;
canvas.setAttribute("width", containerWidth);
canvas.setAttribute("height", containerHeight); // const ctx = canvas.getContext("2d");

var context = canvas.getContext("2d");
var colors = [getRandomColor(), getRandomColor(), getRandomColor()];

function getRandomColor() {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}

var circle = {
  center: [450, 450],
  radius: 450
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
  var optionsArray = Object.entries(options);
  optionsArray.forEach(function(option) {
    object[option[0]] = option[1];
  });
}

function drawCirlce(context, circle, options, lines) {
  context.beginPath();
  context.arc.apply(
    context,
    _toConsumableArray(circle.center).concat([
      circle.radius,
      0,
      2 * Math.PI,
      false
    ])
  );
  context.arc.apply(
    context,
    _toConsumableArray(circle.center).concat([
      circle.radius * 0.75,
      0,
      2 * Math.PI,
      false
    ])
  );
  context.arc.apply(
    context,
    _toConsumableArray(circle.center).concat([
      circle.radius * 0.5,
      0,
      2 * Math.PI,
      false
    ])
  );
  context.arc.apply(
    context,
    _toConsumableArray(circle.center).concat([
      circle.radius * 0.25,
      0,
      2 * Math.PI,
      false
    ])
  );
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);
  context.stroke();

  if (lines) {
    arry(lines).forEach(function(angle) {
      context.beginPath();
      context.moveTo.apply(context, _toConsumableArray(circle.center));
      context.lineTo.apply(
        context,
        _toConsumableArray(getArcCoords(circle, angle)(circle.radius))
      );
      context.closePath();
      context.stroke();
    });
  }

  setOptions(context, currentOps);
}

function drawPoligon(context, coords, radius, sides) {
  var arc = 360 / sides;
  var poligonCoords = [];

  for (var index = 0; index < 360; index += arc) {
    poligonCoords.push(
      getArcCoords(
        {
          center: coords
        },
        index
      )(radius)
    );
  }

  context.beginPath();
  poligonCoords.forEach(function(item, index) {
    if (index > 0) {
      context.lineTo.apply(context, _toConsumableArray(item));
    } else {
      context.moveTo.apply(context, _toConsumableArray(item));
    }
  });
  context.closePath();
  context.fill();
}

function getArcCoords(circle, arc) {
  var x = circle.center[0];
  var y = circle.center[1];
  var degrees = arc;
  return function(radius) {
    var beta = 90 - degrees;

    var rad = function rad(deg) {
      return (deg * Math.PI) / 180;
    };

    var coordX = radius * Math.cos(rad(beta)) + x;
    var coordY = radius * Math.sin(rad(beta)) + y;
    return [coordX, coordY];
  };
}

function arry(num, array, arc) {
  var angle = arc === undefined ? 360 / num : arc;

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

var random = function random(max, min) {
  return (max - min) * Math.random() + min;
};

var data = [];

for (var index = 0; index < random(18, 24); index++) {
  data.push({
    Nombre: "Nombre ".concat(index + 1),
    Autoevaluacion: random(2, 4).toFixed(3),
    Requerida: random(2, 4).toFixed(3),
    Evaluacion: random(2, 4).toFixed(3)
  });
}

function loadData() {
  fetch("data/data.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      printGrapiph(response.data);
    });
} // loadData()

printGrapiph(data);

function drawLines(context, array, options) {
  context.beginPath();
  var currentOps = getCurrentOptions(context, options);
  setOptions(context, options);
  array.forEach(function(item, index) {
    if (index === 0) {
      context.moveTo.apply(context, _toConsumableArray(item));
    } else {
      context.lineTo.apply(context, _toConsumableArray(item));
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
        context.arc.apply(
          context,
          _toConsumableArray(item).concat([5, 0, 2 * Math.PI, false])
        );
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
  var arc = 360 / data.length;
  drawCirlce(
    context,
    circle,
    {
      lineWidth: 1,
      strokeStyle: "#000000"
    },
    data.length
  );
  var newData = data.map(function(item, index) {
    var angle = arc * index;
    var coords = getArcCoords(circle, angle);
    var keys = Object.keys(item);
    var coord = keys.reduce(function(data, key) {
      if (key !== "Nombre") {
        var length = (Number(item[key]) * circle.radius) / 4;
        data[key] = {
          value: item[key],
          coords: coords(length)
        };
      }

      return data;
    }, {});
    return _objectSpread({}, item, {}, coord);
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
      if (key === "Nombre") return;

      if (data[key]) {
        data[key].push(item[key].coords);
      } else {
        data[key] = [item[key].coords];
      }
    });
    return data;
  }, {});
  var values = Object.values(lines);
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
    drawName(e, e.arc);
  });
}

function drawName(item, arc) {
  var cssClass = "";
  var container = canvas.parentElement;
  var span = document.createElement("span");
  span.innerHTML = item.Nombre;
  span.style.top = "".concat(item.coords[1], "px");
  span.style.left = "".concat(item.coords[0], "px");
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

var captions = [
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
        context.arc.apply(
          context,
          _toConsumableArray(element.coords).concat([3, 0, 2 * Math.PI, false])
        );
        context.closePath();
        context.fill();
        break;

      default:
        break;
    }

    setOptions(context, currentOps);
    var cssClass = "";
    var container = canvas.parentElement;
    var span = document.createElement("span");
    span.innerHTML = element.name;
    span.style.top = "".concat(element.coords[1], "px");
    span.style.left = "".concat(element.coords[0] + 10, "px");
    cssClass = "text-90";
    span.classList.add(cssClass);
    span.classList.add("canvas-text");
    container.append(span);
  });
}

drawCaption();
