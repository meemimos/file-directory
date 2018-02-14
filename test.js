// style for console
var styles = [
    'background: gray',
    'color: green',
    'display: block;'
].join(';');


var mkdirp = require('mkdirp');
var fs = require('fs');


var firstArg = process.argv[2];
var secondArg = process.argv[3];
var instance = false;

// module
var moduleName;
var subDirectory;
var mName;

checkArg(firstArg, secondArg);

var moduleController = moduleName + '.controller.js';
var moduleModule = moduleName + '.module.js';
var moduleHtml = moduleName + '.html';
var moduleScss = moduleName + '.scss';

var fileName = [moduleController, moduleModule, moduleHtml, moduleScss];


// --services company
// check Arg
function checkArg(firstArg, secondArg) {
    if(firstArg.slice(0, 1) == '.') {
        subDirectory = firstArg.slice(1);
        mName = secondArg;
        instance = true;
        createSubDirectory(mName, subDirectory);
    } else {
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
    
    mkdirp('modules/'+ moduleName, function(err) {
        if(err) throw err;

        for(var i = 0; i < fileName.length; i++) {
            fs.writeFile('./modules/' + moduleName + '/' + fileName[i], '//code here', function(err) {
                if(err) throw err;
            });    
            // To log all files uncomment below line
            // console.log(fileName[i] + " created");
        }
    });
    console.log("app.module: " + moduleName + " module created along with " + moduleName + "\'s" + " initial files");
}

function loading() {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function() {
      process.stdout.write("\r" + P[x++]);
      x &= 3;
    }, 250);
};

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
            askForSubDirectoryFiles(moduleName, subDirectory);
        }
        // for dynamic log
        if(!instance) {
            console.log('app.' + moduleName + ': ' + subDirectory + ' directory created!');
        } else {
            console.log('app.' + moduleName + ': ' + subDirectory + ` directory created. \nDo you want to create initial files inside ${subDirectory} directory? [yes/no]`);            
        }
    } else {
        if(instance) {
            console.log("app." + moduleName + ": Subdirectory should be end with 's'. Try `npm start ." + subDirectory + "s " + moduleName + "`");            
        } else {
            console.log("app." + moduleName + ": Subdirectory should be end with 's'. Try `npm start " + moduleName + ' ' + subDirectory + 's`');
        }
    }
}

function createSubDirectoryFiles(moduleName, subDirectory) {
    if(subDirectory == 'services') {
        var serviceName = moduleName + '.service.js';
        fs.writeFile('./modules/' + moduleName + '/' + subDirectory + '/' + serviceName, '//code here', function(err) {
            if(err) throw err;
        });
        console.log("app." + moduleName + ": " + serviceName + ' created');
    } else {
        console.log("This directory does not contain any initial files.")
    }
}

function askForSubDirectoryFiles(moduleName, subDirectory) {

    const readline = require('readline');
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'EQUINOX> '
    });

    rl.prompt();

    rl.on('line', (line) => {
    switch (line.trim()) {
        case 'hello':
        console.log('world!');
        break;
        case 'yes':
        createSubDirectoryFiles(moduleName, subDirectory);
        rl.close();
        break;
        case 'no':
        rl.close();
        break;
        default:
        console.log(`Do you want to create initial files inside ${subDirectory} directory? [yes/no]`);
        break;
    }
    rl.prompt();
    }).on('close', () => {
    console.log('Have a great day! #happyCoding');
    process.exit(0);
    });
}