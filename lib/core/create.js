const program = require('commander')
const { createProject } = require('./actions')

const createCommands = ()=>{
    program
        .command('create <projectName> [others...]')
        .description('clone template from the origin...')
        .action(createProject)
}

module.exports = createCommands