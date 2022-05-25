const fs = require('fs');
const path = require('path');
const streamWriteStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));


fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err)=> {
    if(err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'),{withFileTypes:true}, (err, array)=>{
    array.forEach(element=>{
        const readStyles = fs.createReadStream(path.join(__dirname, 'styles', `${element.name}`), 'utf-8');
        readStyles.on('data', chunk=>{
            streamWriteStyles.write(chunk);
        });
    });
});

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, array)=>{
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err)=> {
        if(err) throw err;
    });


    array.forEach(folder => {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${folder.name}`), {recursive: true}, (err)=>{
            if(err) throw err;
        });
     fs.readdir(path.join(__dirname, 'assets', `${folder.name}`), {withFileTypes: true}, (err, element)=>{ 
         element.forEach(e=>{
            fs.copyFile(path.join(__dirname, 'assets', `${folder.name}`, `${e.name}`), 
            path.join(__dirname, 'project-dist', 'assets', `${folder.name}`, `${e.name}`), (error)=>{
            if(error) throw error;
                });
         });
     });   
    });
});

const { mkdir, rm, readFile, readdir, copyFile } = require('fs/promises');
   async function addInIndex(){      
        let rwTemplate = await readFile(path.join(__dirname,  'template.html'), 'utf-8');
         const rdCpmonents = await readdir(path.join(__dirname, "components"), {withFileTypes: true});
           for(let i = 0; i < rdCpmonents.length; i++){
                const pathFile = path.join(__dirname, 'components', `${rdCpmonents[i].name}`);
                const {name} = path.parse(`${rdCpmonents[i].name}`);
                const dataFile = await readFile(pathFile, 'utf-8');
                const subsStr =`{{${name}}}`;
                rwTemplate = rwTemplate.replace(subsStr, dataFile);
           }
          let writeIndex = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
          writeIndex.write(rwTemplate);
   }
   addInIndex();