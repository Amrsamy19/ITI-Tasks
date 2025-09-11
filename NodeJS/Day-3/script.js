async function getData() {
  try {
    const response = await fetch("http://localhost:3000/books");

    const data = await response.json();

    if (document.querySelector("table"))
      document.querySelector("table").remove();

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const rowHead = document.createElement("tr");
    const tbody = document.createElement("tbody");

    const thId = document.createElement("th");
    const thTitle = document.createElement("th");
    const thDescription = document.createElement("th");
    const thActions = document.createElement("th");

    thId.innerText = "#";
    thTitle.innerText = "Title";
    thDescription.innerText = "Description";
    thActions.innerText = "Actions";

    rowHead.append(thId, thTitle, thDescription, thActions);
    thead.append(rowHead);
    table.append(thead, tbody);

    table.classList.add(
      "table",
      "table-striped",
      "table-bordered",
      "table-hover",
      "table-dark"
    );

    document.body.prepend(table);

    data.forEach((item) => {
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      const title = document.createElement("td");
      const description = document.createElement("td");
      const buttons = document.createElement("td");
      const deleteBtn = document.createElement("button");
      const editBtn = document.createElement("button");

      buttons.classList.add("d-flex", "justify-content-around");

      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "btn-primary");
      editBtn.dataset.id = item.id;
      editBtn.addEventListener("click", () => {
        editBook(editBtn.dataset.id);
      });

      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("btn", "btn-danger");
      deleteBtn.dataset.id = item.id;
      deleteBtn.addEventListener("click", () => {
        deleteBook(deleteBtn.dataset.id);
      });

      id.innerText = item.id;
      title.innerText = item.title;
      description.innerText = item.description;
      buttons.append(editBtn, deleteBtn);
      tr.append(id, title, description, buttons);

      document.querySelector("tbody").append(tr);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addBook() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;

  clearForm();

  const response = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.status === 201) alert("Book added successfully");

  getData();
}

function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
}

async function editBook(id) {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;

  clearForm();

  const response = await fetch(`http://localhost:3000/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.status === 200) alert("Book updated successfully");

  getData();
}

async function deleteBook(id) {
  const response = await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) alert("Book deleted successfully");

  getData();
}

document.querySelector("#add").addEventListener("click", addBook);

getData();
