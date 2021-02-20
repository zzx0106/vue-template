const { question, cmd, timeFormat } = require('./tools');
const fs = require('fs');
const _path = require('path');
const path = (p) => _path.resolve(__dirname, p);
const { chalk } = require('@vue/cli-shared-utils');

async function tips() {
  const curr = process.argv[2]; // pms-test | pms-prod
  let env = 'test'; // 运行环境
  console.log('curr', curr, curr.includes('prod'));
  if (curr.includes('prod')) {
    env = 'prod';
  } else {
    env = 'test';
  }
  const tips1 = `

注：
1、确保当前命令执行环境是bash命令窗口
2、确保本机安装rar压缩工具
3、确保本机拥有git线上地址的仓库文件夹 ops-front (http://git-fl.inn.sf-express.com/devops/ops-front.git)

                `;
  console.log(chalk.green(tips1));
  await question(chalk.bold.cyan('按回车键继续，或ctrl+c键终止 >:'));
  // 版本信息
  const { p_version, p_description } = await getVersionAndDescription();
  const tips2 = `

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

上一次发布的版本: ${p_version}

上一次的版本描述: ${p_description}

↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

          `;
  console.log(chalk.yellow(tips2));
  let p_version_spt = p_version.split('.');
  let new_version = p_version_spt.map((v, i) => {
    if (i === p_version_spt.length - 1) {
      return parseInt(v) + 1;
    }
    return v;
  });
  new_version = new_version.join('.');
  let a_version = await question(`请输入发布的版本(${new_version})： `);
  a_version = a_version || new_version;
  let a_description = await question(`请输入版本描述： `);
  a_description = a_description || '该版本暂无对应描述';
  // 写入版本信息
  console.log(chalk.yellow('\r\n===================   开始版本写入package.json \r\n'));
  setVersionAndDescription({ version: a_version, description: a_description });
  console.log(chalk.green('\r\n===================   版本写入package.json成功 \r\n'));
  const ziptime = timeFormat(new Date(), 'yyyyMMddhhmm');
  // 执行打包
  console.log(chalk.yellow('\r\n===================   开始打zip包 \r\n'));
  await cmd(`sh ${path('./shells/zip_file.sh')} ${curr}`);
  console.log(chalk.green(`\r\n===================   文件打包成功 \r\n`));
  // 备份打包文件
  console.log(chalk.yellow('\r\n===================   开始备份zip包\r\n'));
  await cmd(`sh ${path('./shells/bak_file.sh')} ${curr} t[${ziptime}]___v[${a_version}]___d[${a_description}]`);
  console.log(chalk.green(`\r\n===================   文件备份成功 \r\n`));

  // 判断是否存在config
  let hasConfig = fs.existsSync(path('./config.json'));
  if (!hasConfig) {
    console.log(chalk.green('\r\n===================   检测到没有gitPath文件目录，创建config.json \r\n'));
    const gitPath = await question('请输入git版本控制的地址(到ops-front文件夹)：');
    const configStr = `{
    "gitPath": "${gitPath.replace(/\\/g, '/')}"
  }`;
    console.log('为什么下来了');
    fs.writeFileSync(path('./config.json'), configStr);
  }
  let { gitPath } = require('./config.json');
  if (!gitPath) {
    gitPath = await question('请输入git版本控制的地址(到ops-front文件夹)：');
    console.log('---->', gitPath, gitPath.replace(/\\/g, '/'));
    const configStr = `{
    "gitPath": "${gitPath.replace(/\\/g, '/')}"
  }`;
    console.log('configStr', configStr);
    fs.writeFileSync(path('./config.json'), configStr);
  }
  if (!gitPath) return console.log(chalk.red(`没有输入git版本控制地址，请手动输入，再运行npm run upload:${env}命令`));
  console.log(chalk.green(`\r\n===================   git目录地址：${gitPath}/${curr} \r\n`));
  // 提交推送到gitlab
  console.log(chalk.yellow('\r\n===================   开始提交到gitlab \r\n'));
  await cmd(`sh ${path('./shells/git_push.sh')} ${curr} ${gitPath}/${curr} ${a_version} ${a_description}`);
  console.log(chalk.green(`\r\n===================   推送成功，等待Jenkins自动编译... \r\n`));
}
/** 获取版本号和版本简述 */
function getVersionAndDescription() {
  let files = fs.readFileSync(path('../package.json'), 'utf8');
  const p_version = files.match(/"version": "(\S*?)"/)[1];
  let p_description = files.match(/"versionDescription": "(\S*?)"/);
  if (!p_description) {
    p_description = '';
    addDescription(files, ''); // 没有读到这个，就添加这个
  } else {
    p_description = p_description[1];
  }
  return { p_version, p_description };
}
/** 如果没有description 就写进去 */
function addDescription(file, content = '') {
  const data = file.split('\n');
  let spaceNum = ''; // version前面的空格
  let lineNum = 0; // 行数
  data.forEach((line, index) => {
    if (line.indexOf('"version"') > -1) {
      lineNum = index + 1;
      for (let i = 0; i < line.split('').length; i++) {
        let spac = line.split('')[i];
        if (spac === ' ') spaceNum += ' ';
        if (spac !== ' ') break; // 只读version前面的空格
      }
    }
  });
  data.splice(lineNum, 0, `${spaceNum}"versionDescription": "${content}",`);
  fs.writeFileSync(path('../package.json'), data.join('\n'));
}
/** 设置版本号和版本简述 */
function setVersionAndDescription({ version, description }) {
  let files = fs.readFileSync(path('../package.json'), 'utf8');
  let result = files.replace(/("version":) "(\S*?)"/, `$1 "${version}"`);
  result = result.replace(/("versionDescription":) "(\S*?)"/, `$1 "${description}"`);
  fs.writeFileSync(path('../package.json'), result);
}
tips();
