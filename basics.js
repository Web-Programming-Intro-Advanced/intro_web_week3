let table = document.getElementById('table');
let thead = document.getElementById('thead');
let tbody = document.getElementById('tbody');
let thRow = document.getElementById('thRow'); // if I create a new tr, employment will be added in new line

let Employment = document.createElement('th')
Employment.innerText = 'Employment amount'
thRow.appendChild(Employment);
thead.appendChild(thRow)

let list = []

async function generateData() {
    let jsonFile1 = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    let jsonFile2 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    let response1 = await fetch(jsonFile1);
    let response2 = await fetch(jsonFile2);
    let data1 = await response1.json();
    let data2 = await response2.json();

    let populationList = data1.dataset.value;
    let municipality = data1.dataset.dimension.Alue.category.label;
    let employment = data2.dataset.value;
    console.log(employment)

    let count = 0;

    Object.entries(municipality).forEach(couple => {
        list.push([couple[1], populationList[count], employment[count]]);
        count++;
    })

}

async function populateTable(){
    await generateData();
    console.log(list);
    list.forEach(triple => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.innerText = triple[0];
        td2.innerText = triple[1];
        td3.innerText = triple[2];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    })
}

populateTable();