function getUrlFromObject(object) {
    var jsonse = JSON.stringify(object);
    var blob = new Blob([jsonse], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    return url;
}

export default getUrlFromObject;