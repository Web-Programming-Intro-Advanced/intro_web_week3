let table = document.getElementById('table');
let thead = document.getElementById('thead');
let tbody = document.getElementById('tbody');

let list = []

/*let tr = document.createElement('tr');
let th = document.createElement('th')
th.innerText = 'Employment amount'*/

async function generateData() {
    let jsonFile = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    let response = await fetch(jsonFile);
    let data = await response.json();
    let populationList = data.dataset.value;
    let municipality = data.dataset.dimension.Alue.category.label;

    let count = 0;

    Object.entries(municipality).forEach(couple => {
        list.push([couple[1], populationList[count]]);
        count++;
    })

}

async function populateTable(){
    await generateData();
    console.log(list);
    list.forEach(couple => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        td1.innerText = couple[0];
        td2.innerText = couple[1];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    })
}

populateTable();