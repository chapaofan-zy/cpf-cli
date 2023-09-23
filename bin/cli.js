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
    .description('茶泡饭的项目')
    .command('create <app-name>')
    .option('-f, --force', '覆盖原有文件夹如果存在')
    .option('-v, --vite', '使用vite原生模板搭建')
    .action((name, cmd) => {
        // console.log(name, cmd);
        require("../lib/create")(name, cmd);
    })

program.parse(process.argv);