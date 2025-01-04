import sharp from 'sharp';
import fs from 'fs';

const sketchFile = process.argv[2];
console.log(`File Read: ${sketchFile}`);

const destinationFileArr = sketchFile.split(".");
destinationFileArr[destinationFileArr.length - 1] = 'png';
const destinationFilePath = destinationFileArr.join(".");
console.log(`PNG destination${destinationFilePath}`)

const sketchData = JSON.parse(fs.readFileSync(sketchFile, 'utf8'));

console.log(JSON.stringify(sketchData.sketch));

const RgbArrayFromHex = (hexVal) => {
    const rgbArr = [];
    rgbArr.push(parseInt(hexVal.slice(1, 3), 16));
    rgbArr.push(parseInt(hexVal.slice(3, 5), 16));
    rgbArr.push(parseInt(hexVal.slice(5, 7), 16));
    return rgbArr;
}

const sketchToImage = (rawSketchData, desiredSize) => {
    const currentSize = rawSketchData.size;
    const repeatLength = Math.floor(desiredSize / currentSize);

    const imageArr = [];
    const pixelVals = Object.values(rawSketchData.sketch);


    for (let i = 0; i < currentSize; i++) {
        const start = i * currentSize;

        const row = [];

        const pixelRow = i % 2 ? pixelVals.slice(start, start + currentSize) : pixelVals.slice(start, start + currentSize).reverse();

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

// Read a raw array of pixels and save it to a png
const input = Uint8Array.from(sketchToImage(sketchData, 512)); // or Uint8ClampedArray
const image = sharp(input, {
    // because the input does not contain its dimensions or how many channels it has
    // we need to specify it in the constructor options
    raw: {
        width: 512,
        height: 512,
        channels: 3
    }
});
await image.toFile(destinationFilePath);