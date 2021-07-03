#! /usr/bin/env node
// 必须放在第一行  寻找环境变量  然后使用npm link创建全局命令

// 关于commander的说明 https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md
const { program } = require('commander')
const createCommands = require('./lib/core/commands')

const {getHelp} = require('./lib/core/help')

// 获取帮助信息
getHelp()

// create指令
createCommands()

// 获取参数(必要，必然啥也不会显示)
program.parse(process.argv)
// 获取参数   先定义，再获取
// const options = program.opts()
// if (options.debug) console.log(options);
// if (options.small) console.log('- small pizza size');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);