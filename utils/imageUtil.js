// const PNG = require('pngjs');
const { Jimp } = require("jimp");

const RgbArrayFromHex = (hexVal) => {
    const rgbArr = [];
    rgbArr.push(parseInt(hexVal.slice(1, 3), 16));
    rgbArr.push(parseInt(hexVal.slice(3, 5), 16));
    rgbArr.push(parseInt(hexVal.slice(5, 7), 16));
    rgbArr.push(255);
    return rgbArr;
}

const convertSketchToImage = (rawSketch, sketchSize, imageSize) => {
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

    return Jimp.fromBitmap({
        data: Buffer.from(imageArr),
        width: imageSize,
        height: imageSize
    });
}

const saveImageToFile = async (image, savePath) => {
    await image.write(savePath);
}

const getHexStringFromPixelColor = (colorVal) => {
    return `#${colorVal.toString(16).slice(0, -2)}`;
}

const jimpImageToHexArray = (image, size) => {
    const hexArray = {};
    let index = 0;
    for (let i = 0; i < size; i++) {
        if (i % 2) {
            for (let j = 0; j < size; j++) {
                hexArray[index] = getHexStringFromPixelColor(image.getPixelColor(i, j));
                index++;
            }
        } else {
            for (let j = size - 1; j >= 0; j--) {
                hexArray[index] = getHexStringFromPixelColor(image.getPixelColor(i, j));
                index++;
            }
        }
    }
    return hexArray;
}

const convertImageToSketch = async (path, size) => {
    try {
        const image = await Jimp.read(path);

        image.resize({ w: size, h: size }).rotate(90);
        const imageArray = await jimpImageToHexArray(image, size);
        return imageArray;
    } catch (err) {
        return {
            failure: true,
            message: err,
        }
    }
}

module.exports = {
    convertSketchToImage,
    convertImageToSketch,
    saveImageToFile
}