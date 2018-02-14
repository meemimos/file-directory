// This will create directory, subdirectory and initial files

var botName = "EMPRESA"
var mkdirp = require('mkdirp');
var fs = require('fs');


var firstArg = process.argv[2];
var secondArg = process.argv[3];
var instance = false;

// module
var moduleName;
var subDirectory;
var mName;

start(firstArg, secondArg);

var moduleController = moduleName + '.controller.js';
var moduleModule = moduleName + '.module.js';
var moduleHtml = moduleName + '.html';
var moduleScss = moduleName + '.scss';

var fileName = [moduleController, moduleModule, moduleHtml, moduleScss];


// --services company
// check Arg
function start(firstArg, secondArg) {
    // check either user wants to create directory or subdirectory
    // this will execute if user wants to create subdirectory 
    if(firstArg.slice(0, 1) == '.') {
        subDirectory = firstArg.slice(1);
        mName = secondArg;
        instance = true;
        createSubDirectory(mName, subDirectory);
    } else {
        // if user wants to create directory
        // creating directory starts right from here
        moduleName = firstArg;
        createModuleDirectory(moduleName);
        if(secondArg) {
            subDirectory = secondArg;
            createSubDirectory(moduleName, subDirectory);
        }
    }
}

// creates module directory
function createModuleDirectory(moduleName) {
    // implement loading 
    // try npm install progress (npmjs.com/package/progress)
    // loading();
    mkdirp('modules/'+ moduleName, function(err) {

        // error 
        if(err) throw err;
        
        askToCreateInitialFiles(moduleName, '');
    });
    console.log('app.module: ' + moduleName + ` module created. \n\nDo you want to create initial files inside ${moduleName} directory? [yes/no]`);
}

// creates directory files 
function createDirectoryFiles(moduleName) {
    var files = 0;
    for(var i = 0; i < fileName.length; i++) {
        fs.writeFile('./modules/' + moduleName + '/' + fileName[i], '//code here', function(err) {
            if(err) throw err;
        });    
        files = files+1;
        // To log all files
        // console.log(fileName[i] + " created");
    }
    console.log("\nadded " + files + " files in "+ moduleName +"\n");
}

// creates sub directory
function createSubDirectory(moduleName, subDirectory) {
    if(subDirectory.slice(subDirectory.length -1, subDirectory.length) == "s") {
        mkdirp('modules/' + moduleName + '/' + subDirectory, function(err) {
            if(err) throw err;
        });
        // create initial subdirectory files
        if(!instance) {
            createSubDirectoryFiles(moduleName, subDirectory);
        } else {
            askToCreateInitialFiles(moduleName, subDirectory);
        }
        // for dynamic log
        if(!instance) {
            console.log('app.' + moduleName + ': ' + subDirectory + ' directory created!');
        } else {
            console.log('app.' + moduleName + ': ' + subDirectory + ` directory created. \n\nDo you want to create initial files inside ${subDirectory} directory? [yes/no]`);            
        }
    } else {
        if(instance) {
            console.log("app." + moduleName + ": Subdirectory should be end with 's'. Try `npm start ." + subDirectory + "s " + moduleName + "`");            
        } else {
            console.log("app." + moduleName + ": Subdirectory should be end with 's'. Try `npm start " + moduleName + ' ' + subDirectory + 's`');
        }
    }
}

// creates sub directory files
function createSubDirectoryFiles(moduleName, subDirectory) {
    if(subDirectory == 'services') {
        var serviceName = moduleName + '.service.js';
        fs.writeFile('./modules/' + moduleName + '/' + subDirectory + '/' + serviceName, '//code here', function(err) {
            if(err) throw err;
        });
        console.log("\nadded 1 file in "+ moduleName + "/" + subDirectory +"\n");    
    } else {
        console.log("This directory does not contain any initial files.")
    }
}

// ask for sub directory files
function askToCreateInitialFiles(moduleName, subDirectory) {

    const readline = require('readline');
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: botName +'> '
    });

    rl.prompt();

    rl.on('line', (line) => {
    switch (line.trim()) {
        case 'hello':
        console.log('world!');
        break;
        case 'yes':
        if(!subDirectory) {
            createDirectoryFiles(moduleName);
        } else {
            createSubDirectoryFiles(moduleName, subDirectory);
        }
        rl.close();
        break;
        case 'no':
        rl.close();
        break;
        default:
        if(!subDirectory) {
            console.log(`Do you want to create initial files inside ${moduleName} directory? [yes/no]`);            
        } else {
            console.log(`Do you want to create initial files inside ${subDirectory} directory? [yes/no]`);
        }
        break;
    }
    rl.prompt();
    }).on('close', () => {
    console.log('Have a great day! #happyCoding\n');
    process.exit(0);
    });
}