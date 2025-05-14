export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const genRandomColors = (): string => {
  const colorsMap = [
    "#F9D6B5", // peachy
    "#A8DFF1", // light blue
    "#F1DDA8", // light yellow
    "#F9B5DC", // pink
    "#B5F9D6", // light green
    "#D6B5F9", // lavender
    "#F1A8DF", // magenta
    "#DFF1A8", // lime
    "#B5DCF9", // sky blue
    "#F9DCB5", // light orange
  ];

  return colorsMap[Math.floor(Math.random() * colorsMap.length)] ?? "";
};
