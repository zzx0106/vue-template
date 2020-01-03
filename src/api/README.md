建议将接口集中化处理，这样更方便维护

个人建议将接口以api_xxx的方式命名，如果有更优或者组内规范，请忽略

以api_xxx的方式命名，需要将eslint中的camelcase关闭，因为不符合驼峰规范，但是这样能让代码中的接口请求更加清晰。

开发人员可以根据 ：

this.api_xxxx   区分是接口方法

this.mut_xxxx   区分是mutations的方法

this.xxxx       区分是组件内部方法