const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const streamWrite = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello! \n Please, enter your name! \n');

    stdin.on('data', data => {
        if(data.toString().trim() === 'exit'){
            process.exit();
        }else {
            streamWrite.write(data);
        }
        
    });

process.on('exit', () => stdout.write('Good luck! \n'));

process.on('SIGINT', ()=>{
    process.exit()
});

