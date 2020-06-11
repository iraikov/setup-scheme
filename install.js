const core = require('@actions/core');
const {exec} = require('@actions/exec');


main().catch(err =>{
    core.setFailed(err.message);
})


async function main() {

    const implementation = core.getInput('implementation', {required: true});
    const version = core.getInput('version');
    const option = core.getInput('option');
    const chickenVersion = version || '5.2.0';
    
    if (process.platform === 'darwin') {
        switch (implementation) {

            case 'chez':
                await exec('brew install chezscheme');
                break;
            case 'gambit':
                await exec('brew install gambit-scheme');
                await exec('ln -s /usr/local/Cellar/gambit-scheme/4.9.3_1/v4.9.3/bin/gsi /usr/local/bin/gsi');
                await exec('ln -s /usr/local/Cellar/gambit-scheme/4.9.3_1/v4.9.3/bin/gsc /usr/local/bin/gsc');
                break;
            case 'grebil':
                await exec('brew install gerbil-scheme');
                break;
            case 'mit':
                await exec('brew install mit-scheme');
                break;
            case 'racket':
                await exec('brew install minimal-racket');
                break;
            case 'guile':
                await exec('brew install guile');
                break;
            case 'chicken':
                await exec('brew install chicken');
                break;
        }

    } else if (process.platform === 'linux') {
        switch (implementation) {

            case'chez':
                await exec('sudo apt install chezscheme');
                break;
            case'gambit':
                await exec('sudo apt install gambc');
                break;
            case'mit':
                await exec('sudo apt install mit-scheme');
                break;
            case 'racket':
                await exec('sudo apt install racket');
                break;
            case'guile':
                await exec('sudo apt install guile-2.2');
                break;
            case'chicken':
                core.startGroup('Download and unpack Chicken source code');
                await exec(`wget -N https://code.call-cc.org/releases/${chickenVersion}/chicken-${chickenVersion}.tar.gz`);
                await exec(`tar zxf chicken-${chickenVersion}.tar.gz`);
                core.endGroup();
                core.startGroup('Compile and install Chicken');
                await exec(`make -C chicken-${chickenVersion} PLATFORM=linux`);
                await exec(`sudo make -C chicken-${chickenVersion} install`);
                core.endGroup();
                break;
        }
        
    }
  


  
}
