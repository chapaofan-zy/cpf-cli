const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");
const util = require("util");
const path = require("path");
const { getRepo, getRepoBranch } = require("./api");
const ora = require('ora');

async function loading(message, fn, ...args) {
    const spinner = ora(message);
    spinner.start(); // 开启加载
    let executeRes = await fn(...args);
    spinner.succeed();
    return executeRes;
}

class Creator {
    constructor(name, target) {
            this.name = name;
            this.target = target;
            // 转化为 promise 方法
            this.downloadGitRepo = util.promisify(downloadGitRepo);
        }
        // 创建项目部分
    async create() {
            // 仓库信息 —— 模板信息
            let repo = await this.getRepoInfo();
            // 标签信息 —— 版本信息
            let branch = await this.getBranch();
            // 下载模板
            await this.download(repo, branch);
            // 模板使用提示
            console.log(`\r\n成功创建项目 ${chalk.cyan(this.name)}`);
            console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
            console.log("  npm i / yarn");
            console.log("  npm run dev / yarn dev\r\n");
        }
        // 获取模板信息及用户选择的模板
    async getRepoInfo() {
            // 获取组织下的仓库信息
            let repo = await loading(
                "等待获取模板...",
                getRepo
            );
            if (!repo) return;
            // 提取分支名
            // const branches = repoList.map((item) => item.name);
            // 选取模板信息
            let obj = await new inquirer.prompt([{
                name: "repo",
                type: "list",
                message: "选择模板",
                choices: [repo.name],
            }, ]);
            return obj.repo;
        }
        // 获取版本信息及用户选择的版本
    async getBranch() {
            let bls = await loading(
                "等待获取版本...",
                getRepoBranch
            );
            if (!bls) return;
            const b = bls.map((item) => item.name);
            // 选取模板信息
            let obj = await new inquirer.prompt([{
                name: "branch",
                type: "list",
                message: "选择模板",
                choices: b,
            }, ]);
            return obj.branch;
        }
        // 下载git仓库
    async download(repo, branch) {
        // 模板下载地址
        const templateUrl = `chapaofan-zy/${repo}#${branch}`;
        console.log(templateUrl);
        // 调用 downloadGitRepo 方法将对应模板下载到指定目录
        await loading(
            "正在下载...",
            this.downloadGitRepo,
            templateUrl,
            path.resolve(process.cwd(), this.target) // 项目创建位置
        );
    }
}

module.exports = {
    Creator,
    loading
};