#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
// const { getRepo } = require('../lib/api');



program
    .version(require('../package').version)
    .name(chalk.cyan('茶泡饭的脚手架'))
    .usage('<command> [options]')

program.on("--help", function() {
        // 前后两个空行调整格式，更舒适
        console.log();
        console.log(
            `Run ${chalk.cyan(
      "cpf-cli <command> --help"
    )} 获取详细help.`
        );
        console.log();
    })
    .option('-f, --force     覆盖原有文件夹如果存在')
    .command('create <app-name>')
    .description('茶泡饭的项目')
    .action((name, cmd) => {
        // const options = cleanArgs(cmd)
        // if (minimist(process.argv.slice(3))._.length > 1) {
        //     console.log(chalk.yellow('\n ⚠️  检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦'))
        // }
        // require('../lib/create')(name, options)
        // require('../lib/clean')(name, cmd);
        require("../lib/create")(name, cmd);
        // getRepoInfo();
    })
program.parse(process.argv);