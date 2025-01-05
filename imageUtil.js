const sharp = require('sharp');

const RgbArrayFromHex = (hexVal) => {
    const rgbArr = [];
    rgbArr.push(parseInt(hexVal.slice(1, 3), 16));
    rgbArr.push(parseInt(hexVal.slice(3, 5), 16));
    rgbArr.push(parseInt(hexVal.slice(5, 7), 16));
    return rgbArr;
}

const resizeSketch = (rawSketch, sketchSize, imageSize) => {
    const repeatLength = Math.floor(imageSize / sketchSize);

    const imageArr = [];
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

    return imageArr;
}

const convertSketchToImage = (rawSketch, sketchSize, imageSize) => {
    const input = Uint8Array.from(resizeSketch(rawSketch, sketchSize, imageSize)); // or Uint8ClampedArray
    const image = sharp(input, {
        // because the input does not contain its dimensions or how many channels it has
        // we need to specify it in the constructor options
        raw: {
            width: imageSize,
            height: imageSize,
            channels: 3
        }
    });

    return image;
}

const saveImageToFile = async (image, savePath) => {
    await image.toFile(savePath);
}

module.exports = {
    convertSketchToImage,
    saveImageToFile
}