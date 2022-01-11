const colorBlindToColor = (board: string[]) => {
  // loop through an array of strings and replace the 🟦 with 🟨 and the 🟧 with 🟩
  return board.map((row: string) => {
    return row.replace(/🟦/g, "🟨").replace(/🟧/g, "🟩");
  });
};

const colorToColorBlind = (board: string[]) => {
  // loop through an array of strings and replace the 🟨 with 🟦 and the 🟩 with 🟧
  return board.map((row: string) => {
    return row.replace(/🟨/g, "🟦").replace(/🟩/g, "🟧");
  });
};

const whiteToBlack = (board: string[]) => {
  // loop through an array of strings and replace the ⬜ with ⬛
  return board.map((row: string) => {
    return row.replace(/⬜/g, "⬛");
  });
};

export { colorBlindToColor, colorToColorBlind, whiteToBlack };
