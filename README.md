# vueProject
```
该项目中涉及到的有：
express,vue,vue-router,vuex,axios,es6,echart,mock,less,css3
插件涉及到：swiper,lazyload
组件涉及到：轮播图,瀑布流懒加载,分页,弹窗,留言板,选项卡,返回顶部
```


```
vue搭建后台系统管理页面
终端：
git init   //初始化git
git add . //提交版本放入暂存
git commit -m '添加备注'  //提交到版本库
git remote set-url origin git@github.com:yangjianxue/vueProject.git //提交路径
git pull origin master : 获取git上master分支最新代码，防止代码冲突
git push  -u origin master 第一次提交到远端仓库;以后用：git push origin master



查看状态 ：git status 

查看分支 ：git branch

创建分支 ： git branch <name>

切换分支 : git checkout <name>
  
创建+切换分支 ： git checkout -b <name>
  
合并某分支到当前分支 ： git merge <name>
  
删除分支 ： git branch -d <name>
  

ERROR:Repository not found.
fatal:Could not read from remote repository
Please make sure you have the correct access rights
and the repository exists.
提交代码权限问题：
原因:没有配置SSH key
$ ssh-keygen -t rsa -C "youremail@example.com"

查看ssh-key :C:\Users\Administrator\.ssh

然后登陆GitHub  点击右上角--setting --点击 SSH and GPG keys -- 点击 New SSH key
title随意
key 将 C:\Users\Administrator\.ssh\id_rsa.pub 的全部内容拷入到key中保存
然后 提交地址选择ssh而不要用https

安装 cnpm:npm install -g cnpm --registry=https://registry.npm.taobao.org
常看cnpm状态： cnpm -v

```
