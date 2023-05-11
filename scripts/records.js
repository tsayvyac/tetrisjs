const table = document.getElementById("table");
const back = document.getElementById("back");
let records = {...localStorage};
let sorted = [];

for (let key in records) {
    sorted.push([key, parseInt(records[key])]);
}

sorted.sort((a, b) => b[1] - a[1]);

// Storage only 10 records
if (sorted.length > 10) {
    for (let i = 10; i < sorted.length; i++) {
        localStorage.removeItem(sorted[i][0]);
        sorted.splice(10, 1);
    }

}

// Generate rows of tbody
let generate = () => {
    for (let i = 0; i < sorted.length; i++) {
        let row = table.insertRow();
        let cell = row.insertCell();
        let inf = document.createTextNode(i + 1 + ".");
        cell.appendChild(inf);
        for (let j = 0; j < sorted[i].length; j++) {
            cell = row.insertCell();
            inf = document.createTextNode(sorted[i][j]);
            cell.appendChild(inf);
        }
    }
}

window.addEventListener("load", () => {
    generate();
});

document.addEventListener("keydown", e => {
    switch(e.code) {
        case "KeyE":
            back.click();
            break;
    }
});