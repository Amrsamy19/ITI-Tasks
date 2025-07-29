const ChangeFont = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "arial":
      element.style.fontFamily = "Arial, sans-serif";
      break;
    case "courier":
      element.style.fontFamily = "Courier New, monospace";
      break;
    case "georgia":
      element.style.fontFamily = "Georgia, serif";
      break;
    case "impact":
      element.style.fontFamily = "Impact, sans-serif";
      break;
    case "times new roman":
      element.style.fontFamily = "Times New Roman, serif";
      break;
    case "verdana":
      element.style.fontFamily = "Verdana, sans-serif";
      break;
  }
};
const ChangeAlign = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "left":
      element.style.textAlign = "left";
      break;
    case "center":
      element.style.textAlign = "center";
      break;
    case "right":
      element.style.textAlign = "right";
      break;
    case "justify":
      element.style.textAlign = "justify";
      break;
  }
};
const ChangeHeight = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "normal":
      element.style.lineHeight = "normal";
      break;
    case "10px":
      element.style.lineHeight = "10px";
      break;
    case "15px":
      element.style.lineHeight = "15px";
      break;
    case "1.5":
      element.style.lineHeight = "1.5";
      break;
  }
};
const ChangeLSpace = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "normal":
      element.style.letterSpacing = "normal";
      break;
    case "-1px":
      element.style.letterSpacing = "-1px";
      break;
    case "2px":
      element.style.letterSpacing = "2px";
      break;
    case "3px":
      element.style.letterSpacing = "3px";
      break;
  }
};
const ChangeIndent = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "0px":
      element.style.textIndent = "0px";
      break;
    case "5px":
      element.style.textIndent = "5px";
      break;
    case "15px":
      element.style.textIndent = "15px";
      break;
    case "25px":
      element.style.textIndent = "25px";
      break;
  }
};
const ChangeTransform = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "none":
      element.style.textTransform = "none";
      break;
    case "capitalize":
      element.style.textTransform = "capitalize";
      break;
    case "uppercase":
      element.style.textTransform = "uppercase";
      break;
    case "lowercase":
      element.style.textTransform = "lowercase";
      break;
  }
};
const ChangeDecorate = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "none":
      element.style.textDecoration = "none";
      break;
    case "line-through":
      element.style.textDecoration = "line-through";
      break;
    case "overline":
      element.style.textDecoration = "overline";
      break;
    case "underline":
      element.style.textDecoration = "underline";
      break;
  }
};
const ChangeBorder = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "none":
      element.style.border = "none";
      break;
    case "dotted":
      element.style.border = "dotted";
      break;
    case "double":
      element.style.border = "double";
      break;
    case "groove":
      element.style.border = "groove";
      break;
    case "dashed":
      element.style.border = "dashed";
      break;
    case "insert":
      element.style.border = "insert";
      break;
    case "solid":
      element.style.border = "solid";
      break;
    case "outset":
      element.style.border = "outset";
      break;
    case "ridge":
      element.style.border = "ridge";
      break;
  }
};
const ChangeBorderColor = (type) => {
  let element = document.getElementById("PAR");

  switch (type) {
    case "black":
      element.style.borderColor = "black";
      break;
    case "pink":
      element.style.borderColor = "pink";
      break;
    case "red":
      element.style.borderColor = "red";
      break;
    case "green":
      element.style.borderColor = "green";
      break;
    case "blue":
      element.style.borderColor = "blue";
      break;
    case "yellow":
      element.style.borderColor = "yellow";
      break;
    case "purple":
      element.style.borderColor = "purple";
      break;
  }
};
