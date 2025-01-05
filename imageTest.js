import fs from 'fs';
import { convertSketchToImage, saveImageToFile } from "./utils/imageUtil.js";

const sketchFile = process.argv[2];
console.log(`File Read: ${sketchFile}`);
const destinationFileArr = sketchFile.split(".");
destinationFileArr[destinationFileArr.length - 1] = 'png';
const destinationFilePath = destinationFileArr.join(".");
console.log(`PNG destination${destinationFilePath}`)
const sketchData = JSON.parse(fs.readFileSync(sketchFile, 'utf8'));

const image = convertSketchToImage(sketchData.sketch, sketchData.size, 512);

saveImageToFile(image, destinationFilePath);