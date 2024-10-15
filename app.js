const addBtn = document.querySelector("#addBtn");

printData(getDate);

addBtn.addEventListener("click", addNote);

//ADD DATA
function addNote() {
  const title = document.querySelector("#title").value;
  const textarea = document.querySelector("#text").value;
  let obj = {
    title: title,
    note: textarea,
    date: new Date().toLocaleDateString(), //Adding date to the object
  };

  let notesArr = getDate();

  if (title != "" && textarea != "") {
    notesArr.push(obj);
  }

  localStorage.setItem("notes", JSON.stringify(notesArr));

  document.querySelector("form").reset();

  printData(getDate);
}

//GET DATA
function getDate() {
  if (localStorage.getItem("notes") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("notes"));
  }
}

//PRINT DATA
function printData(callBack) {
  notes = callBack();

  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  notes.forEach((item, index) => {
    let card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.note}</p>
        <button id=${index} onclick="deleteData(this.id)">Delete</button>
        <div>${item.date}</div>
        `;

    cards.appendChild(card);
  });
}

//DELETE FUNCTION
function deleteData(id) {
  let notesArr = getDate();

  notesArr.splice(id, 1);

  localStorage.setItem("notes", JSON.stringify(notesArr));

  printData(getDate);
}
