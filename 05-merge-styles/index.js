const fs = require('fs');
const path = require('path');
const writeStrim = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes:true}, (err, array)=>{
    array.forEach( file => {
        const {ext} = path.parse(`${file.name}`)
        if(file.isFile() && ext === '.css'){

            const stream = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf-8');
            stream.on('data', chunk =>{
                writeStrim.write(chunk);
            });
        }
    });
});