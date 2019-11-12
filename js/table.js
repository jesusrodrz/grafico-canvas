const table = document.querySelector('#table')
const colors = ['blue','red','green','violet','orange','yellow']
function printTable(table,data) {
    console.log('ok')
    const tbody = document.querySelector('tbody')
    const fragment = document.createDocumentFragment()
    console.log(fragment)
    data.forEach( (element , index) => {
        const tr = document.createElement('tr')
        const odd = (index%2===0)? 'odd' : ''
        tr.innerHTML = `
            <td class="${odd}">
                <h3>${element.title}</h3>
                <p>${element.text}</p>
            </td>
            <td class="tds">
            </td>
        `
        const td = tr.querySelector('.tds')
        const total = element.bars.length
        const height =  (total*18)+(4*total + 2) + 2
        tr.style.height = `${height}px`
        element.bars.forEach(( bar, index) => {
            const barElement = document.createElement('div')
            const width = (Number(bar.number) * 100 / 5)
            const className = colors[index]
            barElement.innerHTML = `
                <span class="letter">${bar.letter}</span>
                <span class="number">${bar.number}</span>
            `

            barElement.style.backgroundColor = bar.color
            barElement.style.top = `${(index*18)+(4*index + 2)}px`
            barElement.style.width = `${width}%`
            // barElement.classList.add(className)
            barElement.classList.add('bar')
            td.append(barElement)
        })
        fragment.append(tr)
    });
    tbody.append(fragment)
}

function loadData(url) {
    fetch(url).then((response)=>{
        return response.json()
    }).then((response)=>{
        printTable(table,response.data)
    })
}
loadData('data/table.json')