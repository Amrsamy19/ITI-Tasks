export const memoryImagesPaths = [
    "assets/1.gif",
    "assets/1.gif",
    "assets/2.gif",
    "assets/2.gif",
    "assets/3.gif",
    "assets/3.gif",
    "assets/4.gif",
    "assets/4.gif",
    "assets/5.gif",
    "assets/5.gif",
    "assets/6.gif",
    "assets/6.gif",
];
export const shuffleImages = (data) => {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
};
