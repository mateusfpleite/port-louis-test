const fs = require('fs/promises')
const path = require('path');

async function getJson(dir) {
    const files = await fs.readdir(dir);
    const filesId = files.map((file) => file.replace('.txt', ''));
    filesFullPath = files.map((fileName) => {
        return path.join(dir, fileName);
      });
        const json = await Promise.all(filesFullPath.map( async (file, index) => {
            const readedFile = ((await fs.readFile(file, {encoding: 'utf-8'})).trim().split(/(?<=})/g));
            try {
            const converted = readedFile.map((item) => JSON.parse(item)); 
            return {id: filesId[index], items: converted}; 
            } catch(error) {
              const err = `O arquivo deve conter somente itens no formato JObject.
               Confira o arquivo ${file}
               ${error}`
              throw new Error(err);
            }
        }))
        return json;
       
}

module.exports = getJson;