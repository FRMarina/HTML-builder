const fs = require('fs/promises');
const {stat} = require('fs')
const path = require('path');

try{
    const files = fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    files.then(arrayOfFiles=>{
        arrayOfFiles.forEach(async dirent=>{
            if(dirent.isFile()){
                const {name, ext} = path.parse(`${dirent.name}`);
                stat(path.join(__dirname,'secret-folder',`${dirent.name}`), (err, stats) => {
                      console.log(`${name} - ${ext.split('').splice(1,3).join('')} - ${stats.size}`);
                });               
            }
        });
    });
}catch(err){
    console.error(err);
}
