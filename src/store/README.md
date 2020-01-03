store 建议使用module的模式并使用namespace

个人建议使用一下命名规则 归类简称_方法名

如果使用纯大写命名，对于国人识别上可能存在欠缺

```
mutations
  ---> mut_xxx
actions
  ---> act_xxx
getters
  ---> get_xxx

在组建中使用mapXxx的方式引入
...mapMutation('module1', ['mut_xxx'])

使用时
this.mut_xxx() 这样方便区分是vuex的方法，还是该组件内部的方法 
```