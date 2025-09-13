export const Card = (index) => {
    const img = document.createElement("img");
    img.src = "assets/Moon.gif";
    img.id = "card" + index;
    img.classList.add("card");
    return img;
};
