const readline = require('readline');
const iconv = require('iconv-lite');
const child_process = require('child_process');
const { chalk } = require('@vue/cli-shared-utils');
function cmd(command) {
  return new Promise((res, rej) => {
    const exec = child_process.exec(command, { encoding: 'binary' }, (error, stdout, stderr) => {
      // 处理window系统读取exec utf-8会出现乱码的问题
      // stdout = iconv.decode(Buffer.from(stdout, 'binary'), 'utf-8');
      // stderr = iconv.decode(Buffer.from(stderr, 'binary'), 'utf-8');
      stdout = iconv.decode(Buffer.from(stdout, 'binary'), 'utf-8');
      if (error !== null) {
        console.log(chalk.red(error));
        return rej(error);
      }

      res(stdout);
    });
    exec.stdout.on('data', (data) => {
      console.log(chalk.gray('shell output -> ', iconv.decode(Buffer.from(data, 'binary'), 'utf-8')));
    });
    exec.stderr.on('data', (data) => {
      console.log(chalk.yellow('shell output -> ', iconv.decode(Buffer.from(data, 'binary'), 'utf-8')));
    });
    exec.stdout.on('error', (error) => {
      console.log(chalk.red('shell error -> ', iconv.decode(Buffer.from(error, 'binary'), 'utf-8')));
    });
  });
}

function question(tips, condition = null, resolve = null) {
  tips = tips || '> ';
  return new Promise((__resolve) => {
    if (!resolve) resolve = __resolve;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(tips, (answer) => {
      rl.close();
      if (condition && condition.indexOf(answer) === -1) {
        return question(tips, condition, resolve);
      }
      resolve(answer.trim());
    });
  });
}
function timeFormat(date, fmt = 'yyyy/MM/dd hh:mm:ss') {
  //author: meizz
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}
module.exports = {
  cmd,
  question,
  timeFormat,
};
