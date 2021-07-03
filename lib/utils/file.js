// 处理ejs文件和文件路径
const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

const log = require('./log')


const renderEJS = (fileName,data)=>{
    return new Promise((resolve,reject)=>{
        const file = path.resolve(__dirname,fileName)
        ejs.renderFile(file,{data:{name: data,lowerName: data.toLowerCase()}},(err,file)=>{
            if(err) reject(err)
            else{
                resolve(file)
            }
        })
    })
}

const writeFile = (path,file,type)=>{
    const name = `${path}.${type}`
    if(fs.existsSync(name)){
        log.warning(`当前组件已经存在。。`)
    }
   return fs.promises.writeFile(name,file)
}

//递归创建目标文件夹
const mkdirSync = (dirName)=>{
    if(fs.existsSync(dirName)){
        return true
    }
    // 如果不存在，判断父文件夹是否存在
    if(mkdirSync(path.dirname(dirName))){
        // 如果父文件夹存在，则创建父文件夹
        fs.mkdirSync(dirName)
        return true
    }
}

const handlePath = (originPath)=>{
    if(!originPath){
        return false
    }
    if(path.isAbsolute(originPath)){
        // 如果是绝对路径，那么处理成相对路径
        const arr = originPath.split(path.sep)
        arr.shift()
        return arr.join(path.sep)
    }else{
        return originPath
    }
}

module.exports ={
    renderEJS,
    writeFile,
    mkdirSync,
    handlePath
}