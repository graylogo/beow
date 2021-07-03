// action 的内容，实现命令具体内容
const {promisify} = require('util')
const path = require('path')

const ejs = require('ejs')

const { spawn,exec } = require('../utils/terminal');

// 用于下载git仓库的插件
//使用promisify包装成promise风格的函数
const download = promisify(require('download-git-repo')) 
// TODO 实现用户选择，根据用户选择来判断是否自动打开和装包
// 自动打开浏览器
const open = require('open')

const { repo } = require('../config/repo_config');
const log = require('../utils/log');
const { renderEJS, writeFile,mkdirSync } = require('../utils/file');

const createProject = async (projectName,other)=>{
    log.loading('正在下载模板，请稍后。。。');
    // 1. clone项目
    await download(`direct:${repo}`,projectName,{clone: true})
    log.success('模板下载完成，正在装包。。。');
    // 2. 执行npm install
    // 由于windows系统执行的命令是npm.cmd，所以做一下兼容
    const command = process.platform === 'win32'?'npm.cmd':'npm'
    await spawn(command,['install'],{cwd: `./${projectName}`})
    log.loading('包下载完成，正在启动项目。。。');

    // 3. 运行项目
    // 使用封装的exec来执行，效果和spawn是一样的
    // await spawn(command,['run','serve'],{cwd: `./${projectName}`})
    await exec(command+' run serve',{cwd: `./${projectName}`})
    // （有个小缺陷： 没有打印出来setout）

    // 4. 打开浏览器
    // (在vue.config.js中配置更好，这样写固定端口有时候会端口冲突)
    open('http://localhost:8080/')
}

//                     模板路径，文件名， 目标文件夹  文件类型
const handelEJS = async (fileName,data,userPath,type)=>{
    // 创建文件夹
    mkdirSync(userPath)
    // 获取最终需要写入文件的路径
    const targetPath = path.resolve(userPath,data)
    // 渲染模板
    const file =  await  renderEJS(fileName,data)
    await writeFile(targetPath,file,type)
}

const vueCpn = async (folderName,userPath)=>{
    // 1. 获取ejs模板路径
    const ejsPath = '../template/vue/component.vue.ejs'
    await handelEJS(ejsPath,folderName,userPath,'vue')
}

const vuePage = async (folderName,userPath)=>{
    const folder = path.resolve(userPath,folderName.toLowerCase())
    vueCpn(folderName,folder)
    await handelEJS('../template/vue/vue-router.js.ejs',folderName,folder,'js')
}

const vueStore = async (folderName,userPath)=>{
    const folder = path.resolve(userPath,folderName.toLowerCase())
    await handelEJS('../template/vue/vue-store.js.ejs','index',folder,'js')
    await handelEJS('../template/vue/vue-types.js.ejs','type',folder,'js')
}

module.exports = {
    createProject,
    vueCpn,
    vuePage,
    vueStore
}



