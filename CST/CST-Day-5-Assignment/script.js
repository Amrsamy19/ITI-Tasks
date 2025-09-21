function calculateArea(radius) {
  return Math.PI * radius ** 2;
}

function calculateSqrt(number) {
  return Math.sqrt(number);
}

function calculateCosine(angle) {
  return Math.cos(angle * (Math.PI / 180)).toFixed(3);
}

function showAddress(obj) {
  let date = new Date();
  return `${obj.buildingNum} ${obj.street}, ${
    obj.city
  } city registered in ${date.toLocaleDateString("en-GB")}`;
}

function displayValues(obj, key) {
  return key.toLowerCase() === "age" ? `${obj[key]} years old` : obj[key];
}

let choice;

do {
  choice = parseInt(
    prompt(
      "Please enter your choice: \n (1) Math Object Tasks\n (2) Array Object Task\n (3) Object Object Task\n (4) Exit"
    )
  );
  switch (choice) {
    case 1:
      let mathObjChoice = prompt(
        "Please enter your choice: \n(a) Circle Area\n(b) Square Root\n(c) Cosine Value"
      );
      switch (mathObjChoice) {
        case "a":
          let radius;

          do {
            radius = parseInt(
              prompt("Please enter the radius of the circle: ")
            );
          } while (isNaN(radius));

          alert(calculateArea(radius));
          break;
        case "b":
          let randomInput;

          do {
            randomInput = parseInt(
              prompt("Please enter the number to get its square root: ")
            );
          } while (isNaN(randomInput));

          alert(calculateSqrt(randomInput));
          break;
        case "c":
          let angleInDegree;

          do {
            angleInDegree = parseInt(
              prompt("Please enter the angle to calculate the cosine value: ")
            );
          } while (isNaN(angleInDegree));

          console.log(calculateCosine(angleInDegree));
          break;
      }
      break;

    case 2:
      let numberOfValues;
      let arrayOfNumbers = [];

      do {
        numberOfValues = parseInt(
          prompt("Please enter the number of values: ")
        );
      } while (isNaN(numberOfValues));

      for (let index = 0; index < numberOfValues; ) {
        let value = parseInt(prompt("Please enter a positive number: "));

        if (isNaN(value)) {
          alert("Wrong input, Please try again!! ");
        } else {
          arrayOfNumbers.push(value);
          index++;
        }
      }

      console.log(`Ascending Order: {${arrayOfNumbers.sort((a, b) => a - b)}}`);
      console.log(
        `Descending Order: {${arrayOfNumbers.sort((a, b) => b - a)}}`
      );
      break;

    case 3:
      let objChoice = prompt(
        "Please enter your choice: \n(a) Show Address\n(b) Display Value"
      );
      switch (objChoice) {
        case "a":
          let staticObj = { street: "abc st.", buildingNum: 15, city: "xyz" };

          console.log(showAddress(staticObj));
          break;
        case "b":
          let clientData = { nm: "ali", age: 10, address: "abc st." };

          console.log(displayValues(clientData, "age"));
          break;
      }
      break;
  }
} while (choice === 1 || choice === 2 || choice === 3);
