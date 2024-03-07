
import preval from 'preval.macro';
const path = require('path');

// Read the array from the file
const readFile = (fileName) => {
    // Create the file path by joining the directory path and file name
    const filePath = path.join(__dirname, fileName);
    try {
        const data = preval
        ` const fs = require('fs');
      const files = fs.readdirSync(${filePath}, 'utf8');
      module.exports = files;
    `
    console.log(data)
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

// // Append new elements to the array
// const appendToArray = (filename, newData) => {
//     const existingData = readFile(filename);
//     console.log(existingData)
//     const newArray = existingData.concat(newData);
//     return newArray;
// };

// // Save the modified array back to the file
// const saveToFile = (filename, data) => {
//     try {
//         fs.writeFileSync(filename, JSON.stringify(data, null, 2));
//         console.log('Data saved successfully.');
//         return true;
//     } catch (err) {
//         console.error('Error saving data to file:', err);
//     }
// };

// const getNewData = (data) => {
//     const filename = 'data.json'
//     const newData = data
//     // Append new elements to the array
//     const modifiedArray = appendToArray(filename, newData);

//     // Save the modified array back to the file
//     const isSaved = saveToFile(filename, modifiedArray);
//     if (isSaved) {
//         return {
//             code: 200,
//             message: "Data Saved Successfully."
//         }
//     } else {
//         return {
//             code: 500,
//             message: "Something went wrong."
//         }
//     }
// }

export {
    readFile,
    // getNewData
}

// Example usage
// const filename = 'data.json';
// const newData = [4, 5, 6];

