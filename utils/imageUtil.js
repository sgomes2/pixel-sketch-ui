const PNG = require('pngjs');
const fs = require('fs');

const RgbArrayFromHex = (hexVal) => {
    const rgbArr = [];
    rgbArr.push(parseInt(hexVal.slice(1, 3), 16));
    rgbArr.push(parseInt(hexVal.slice(3, 5), 16));
    rgbArr.push(parseInt(hexVal.slice(5, 7), 16));
    rgbArr.push(255);
    return rgbArr;
}

const convertSketchToImage = (rawSketch, sketchSize, imageSize) => {

    const image = new PNG.PNG({ width: imageSize, height: imageSize });
    const imageArr = [];
    const repeatLength = Math.floor(imageSize / sketchSize);

    const pixelVals = Object.values(rawSketch);

    for (let i = 0; i < sketchSize; i++) {
        const start = i * sketchSize;

        const row = [];

        const pixelRow = i % 2 ? pixelVals.slice(start, start + sketchSize) : pixelVals.slice(start, start + sketchSize).reverse();

        pixelRow.forEach(pixel => {
            const pixelRgb = RgbArrayFromHex(pixel);
            for (let j = 0; j < repeatLength; j++) {
                row.push(...pixelRgb);
            }
        });

        for (let j = 0; j < repeatLength; j++) {
            imageArr.push(...row)
        }
    }



    image.data = Buffer.from(imageArr);

    return image;
}

const saveImageToFile = async (image, savePath) => {
    await image.pack().pipe(fs.createWriteStream(savePath));
}

module.exports = {
    convertSketchToImage,
    saveImageToFile
}