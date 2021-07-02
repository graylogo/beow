// 封装运行shell命令的函数

// spawn用来起一个子进程
const {spawn,exec} = require('child_process')

const spawnCommand = (...args)=>{
    // 返回一个Promise
    return new Promise((resolve,reject)=>{
    // 开一个进程来执行脚本，并返回该进程实例
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout);
    // childProcess.stderr.pip(process.stderr);
    childProcess.on('close',()=>{
        resolve()
    })
})
}
// exec 是对spawn更进一步的封装
const execCommand = (...args)=>{
    return new Promise((resolve,reject)=>{
        exec(...args,(err,stdout,stderr)=>{
            if(err){
                reject(err)
                return
            }
            console.log(stdout.replace('\n',''));
            if(stderr)console.log(stderr);
            resolve()
        })
    })
}

// 将原装的API封装得更好用
module.exports = {
    spawn:spawnCommand,
    exec: execCommand
}