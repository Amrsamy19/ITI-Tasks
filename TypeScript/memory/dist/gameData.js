export const memoryImagesPaths = [
    "imgs/1.gif",
    "imgs/1.gif",
    "imgs/2.gif",
    "imgs/2.gif",
    "imgs/3.gif",
    "imgs/3.gif",
    "imgs/4.gif",
    "imgs/4.gif",
    "imgs/5.gif",
    "imgs/5.gif",
    "imgs/6.gif",
    "imgs/6.gif",
];
export const shuffleImages = (data) => {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
};
