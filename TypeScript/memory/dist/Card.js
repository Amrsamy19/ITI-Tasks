export const Card = (index) => {
    const img = document.createElement("img");
    img.src = "imgs/Moon.gif";
    img.id = "card" + index;
    img.classList.add("card");
    return img;
};
