const fs = require('fs-extra');
const chalk = require('chalk');


const overWrite = async(filePath) => {
    console.log(chalk.yellow('文件覆盖中...'));
    try {
        await fs.copy('./lib/files', filePath);
        console.log(chalk.yellow('文件覆盖完成！'));
    } catch (e) {
        console.log(chalk.red('文件覆盖失败——'), e);
    }

}

module.exports = {
    overWrite
}