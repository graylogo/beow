const program = require('commander')
const { createProject,vueCpn,vuePage,vueStore} = require('./actions')
const {handlePath} = require('../utils/file')

// 获取命令传入的参数
const options = program.opts()
const createCommands = ()=>{
    program
        .command('vue <projectName> [others...]')
        .description('create a vue demo')
        .action(createProject)

    program
        .command('vuecpn <name>')
        .description('create a vue component')
        .action(name=>vueCpn(name,handlePath(options.path || null) || 'src/components'))

    program
        .command('vuepage <name>')
        .description('create a vue page with router')
        .action(name=>{
            vuePage(name, options.path|| `src/pages`)
        })

        program
        .command('vuestore <name>')
        .description('create a Store')
        .action(name=>{
            vueStore(name, options.path|| `src/store/modules`)
        })
}

module.exports = createCommands