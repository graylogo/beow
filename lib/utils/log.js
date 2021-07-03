const chalk = require('chalk')
const chalkAnimation = require('chalk-animation')

const error = (...message)=>{
    console.log(chalk.red(...message))
}

const warning = (...message)=>{
    console.log(chalk.yellow(...message));
}

const success = (...message)=>{
    console.log(chalk.green(...message));
}

let rainbow = ''
const loading = (...message)=>{
     rainbow = chalkAnimation.rainbow(message.join(),1)
}

const stop = ()=>{
    rainbow.stop()
}

const clear = ()=>{
    console.clear()
}


module.exports = {
    error,
    warning,
    success,
    loading,
    stop,
    clear
}