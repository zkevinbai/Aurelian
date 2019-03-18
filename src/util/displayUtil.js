export const commafy = (numberString) => {
    return numberString.replace(/(.)(?=(.{3})+$)/g, "$1,");
}
