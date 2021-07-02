// action 的内容，实现命令具体内容
const {promisify} = require('util')
const { spawn,exec } = require('../utils/terminal');

// 用于下载git仓库的插件
//使用promisify包装成promise风格的函数
const download = promisify(require('download-git-repo')) 
// 自动打开浏览器
const open = require('open')

const { repo } = require('../config/repo_config');

const createProject = async (projectName,other)=>{
    console.log('正在下载模板，请稍后。。。');
    // 1. clone项目
    await download(`direct:${repo}`,projectName,{clone: true})
    console.log('模板下载完成，正在装包。。。');

    // 2. 执行npm install
    // 由于windows系统执行的命令是npm.cmd，所以做一下兼容
    const command = process.platform === 'win32'?'npm.cmd':'npm'
    await spawn(command,['install'],{cwd: `./${projectName}`})
    console.log('包下载完成，正在启动项目。。。');

    // 3. 运行项目
    // 使用封装的exec来执行，效果和spawn是一样的
    // await spawn(command,['run','serve'],{cwd: `./${projectName}`})
    await exec(command+' run serve',{cwd: `./${projectName}`})
    // （有个小缺陷： 没有打印出来setout）

    // 4. 打开浏览器
    // (在vue.config.js中配置更好，这样写固定端口有时候会端口冲突)
    open('http://localhost:8080/')
}

module.exports = {
    createProject
}



