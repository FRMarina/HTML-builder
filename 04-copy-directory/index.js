const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname), {withFileTypes: true}, (err, array)=>{
    let copyDir =  function(){
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files)=>{
        fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err)=> {
            if(err) throw err;
        });

    files.forEach(async file =>{
        fs.copyFile(path.join(__dirname, 'files',`${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`), (err)=>{
            if(err) throw err;
                });
            })
        });
    }
        
    array.forEach(obj => {
        if(obj.name === 'files-copy'){
            fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true,}, (err)=>{
                if(err) throw err;
            copyDir();
            });     
        }else{
            copyDir();
        }
    }); 
});