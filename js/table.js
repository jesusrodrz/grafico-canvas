var table = document.querySelector('#table');
var colors = ['blue', 'red', 'green', 'violet', 'orange', 'yellow'];
function printTable(table, data) {
  console.log('ok');
  var tbody = document.querySelector('tbody');
  var fragment = document.createDocumentFragment();
  console.log(fragment);
  data.forEach(function(element, index) {
    var tr = document.createElement('tr');
    var odd = index % 2 === 0 ? 'odd' : '';
    tr.innerHTML =
      '<td class="' +
      odd +
      '"><h3>' +
      element.title +
      '</h3><p>' +
      element.text +
      '</p></td><td class="tds"></td>';
    var td = tr.querySelector('.tds');
    var total = element.bars.length;
    var height = total * 18 + (4 * total + 2) + 2;
    tr.style.height = height + 'px';
    element.bars.forEach(function(bar, index) {
      var barElement = document.createElement('div');
      var width = (Number(bar.number) * 100) / 5;
      var className = colors[index];
      barElement.innerHTML =
        '<span class="letter">' +
        bar.letter +
        '</span><span class="number">' +
        bar.number +
        '</span>';

      barElement.style.backgroundColor = bar.color;
      barElement.style.top = Number(index * 18 + (4 * index + 2)) + 'px';
      barElement.style.width = width + '%';
      // barElement.classList.add(className)
      barElement.classList.add('bar');
      td.append(barElement);
    });
    fragment.append(tr);
  });
  tbody.append(fragment);
}

var data = [
  {
    title: 'Liderasgo',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi debitis molestiae nemo quae voluptates quis architecto eligendi dolore similique quo nihil labore quibusdam rerum, unde dolorem error? Doloribus, beatae eos.',
    bars: [
      {
        letter: 'A',
        color: '#ff0000',
        number: 4.5
      },
      {
        letter: 'J',
        color: '#ffff00',
        number: 3.2
      },
      {
        letter: 'E',
        color: '#ffff00',
        number: 4.1
      },
      {
        letter: 'P',
        color: '#ffff00',
        number: 2.3
      },
      {
        letter: 'C',
        color: '#ffff00',
        number: 2.7
      },
      {
        letter: 'T',
        color: '#ffff00',
        number: 3.8
      }
    ]
  },
  {
    title: 'Adaptabilidad',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi debitis molestiae nemo quae voluptates quis architecto eligendi dolore similique quo nihil labore quibusdam rerum, unde dolorem error? Doloribus, beatae eos.',
    bars: [
      {
        letter: 'A',
        color: '#ff0000',
        number: 4.5
      },
      {
        letter: 'J',
        color: '#ffff00',
        number: 3.2
      },
      {
        letter: 'E',
        color: '#ffff00',
        number: 4.1
      },
      {
        letter: 'P',
        color: '#ffff00',
        number: 2.3
      },
      {
        letter: 'C',
        color: '#ffff00',
        number: 2.7
      },
      {
        letter: 'T',
        color: '#ffff00',
        number: 3.8
      }
    ]
  },
  {
    title: 'Relaciones',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi debitis molestiae nemo quae voluptates quis architecto eligendi dolore similique quo nihil labore quibusdam rerum, unde dolorem error? Doloribus, beatae eos.',
    bars: [
      {
        letter: 'A',
        color: '#ff0000',
        number: 4.5
      },
      {
        letter: 'J',
        color: '#ffff00',
        number: 3.2
      },
      {
        letter: 'E',
        color: '#ffff00',
        number: 4.1
      },
      {
        letter: 'P',
        color: '#ffff00',
        number: 2.3
      },
      {
        letter: 'C',
        color: '#ffff00',
        number: 2.7
      },
      {
        letter: 'T',
        color: '#ffff00',
        number: 3.8
      }
    ]
  },
  {
    title: 'Produccion',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi debitis molestiae nemo quae voluptates quis architecto eligendi dolore similique quo nihil labore quibusdam rerum, unde dolorem error? Doloribus, beatae eos.',
    bars: [
      {
        letter: 'A',
        color: '#ff0000',
        number: 4.5
      },
      {
        letter: 'J',
        color: '#ffff00',
        number: 3.2
      },
      {
        letter: 'E',
        color: '#ffff00',
        number: 4.1
      },
      {
        letter: 'P',
        color: '#ffff00',
        number: 2.3
      },
      {
        letter: 'C',
        color: '#ffff00',
        number: 2.7
      },
      {
        letter: 'T',
        color: '#ffff00',
        number: 3.8
      }
    ]
  }
];
printTable(table, data);
