module.exports = {
  trailingComma: 'es5',
  printWidth: 140, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  // trailingComma: 'all',
  singleQuote: true, // 使用单引号代替双引号
  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  // arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  disableLanguages: ['json'],
  htmlWhitespaceSensitivity: 'ignore',
};
