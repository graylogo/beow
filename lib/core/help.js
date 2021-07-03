const { program } = require('commander')

const getHelp = ()=>{
    program.version(require('../../package.json').version)
    program
            .option('create <projectName>', '创建一个Vue项目')
            .option('-p, --path <path>', '创建组件的路径')
            .option('-p, --pizza-type <type>', 'flavour of pizza');
    }

module.exports = {
    getHelp
}