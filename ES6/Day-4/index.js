document.querySelector("#search").addEventListener("input", (e) => {
  const value = e.target.value || "";
  getData(value);
});

async function getData(value) {
  try {
    const response = value
      ? await fetch(`https://jsonplaceholder.typicode.com/users/${value}`)
      : await fetch("https://jsonplaceholder.typicode.com/users");

    const data = value ? [await response.json()] : await response.json();

    if (data[0] && data[0].id) {
      if (document.querySelector("h1")) document.querySelector("h1").remove();

      if (document.querySelector("table"))
        document.querySelector("table").remove();

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const rowHead = document.createElement("tr");
      const tbody = document.createElement("tbody");

      const thId = document.createElement("th");
      const thName = document.createElement("th");
      const thEmail = document.createElement("th");
      const thPhone = document.createElement("th");

      thId.innerText = "#";
      thName.innerText = "Name";
      thEmail.innerText = "Email";
      thPhone.innerText = "Phone";

      rowHead.append(thId, thName, thEmail, thPhone);
      thead.append(rowHead);
      table.append(thead, tbody);

      table.classList.add(
        "table",
        "table-striped",
        "table-bordered",
        "table-hover",
        "table-dark"
      );

      document.body.append(table);

      data.forEach((item) => {
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const name = document.createElement("td");
        const email = document.createElement("td");
        const phone = document.createElement("td");
        id.innerText = item.id;
        name.innerText = item.name;
        email.innerText = item.email;
        phone.innerText = item.phone;
        tr.append(id, name, email, phone);

        document.querySelector("tbody").append(tr);
      });
    } else {
      document.querySelector("table").remove();
      const h1 = document.createElement("h1");
      h1.innerText = "User not found";
      h1.classList.add("text-center");
      document.body.append(h1);
    }
  } catch (error) {
    console.log(error);
  }
}

getData();
