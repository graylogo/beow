const { program } = require('commander')

const getHelp = ()=>{
    program.version(require('../../package.json').version)
    program
            .option('-d, --debug <arg>', 'output extra debugging')
            .option('-s, --small', 'small pizza size')
            .option('-p, --pizza-type <type>', 'flavour of pizza');
    }

module.exports = {
    getHelp
}