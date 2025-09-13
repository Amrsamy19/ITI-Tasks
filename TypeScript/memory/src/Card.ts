export const Card = (index: number): HTMLImageElement => {
  const img = document.createElement("img") as HTMLImageElement;
  img.src = "assets/Moon.gif";
  img.id = "card" + index;
  img.classList.add("card");
  return img;
};
