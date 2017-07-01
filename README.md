# nodejs-fleaMarket
## 使用nodejs改写的二手商品交易平台

### 项目环境
1. nodejs
2. express框架
3. mongoDB数据库

### 项目运行
```
npm install express-generator -g
npm install nodemon -g
npm install
## 类unix环境下使用以下命令启动项目
DEBUG=flea-market npm start
## windows环境下使用以下命令启动项目
set DEBUG=flea-market & npm start
```

### 项目说明
```
个人练手项目，以前使用python的Django框架做了一个二手商品交易市场，现将此项目改成以nodejs实现的web应用，包括的
功能有：用户的注册登录、所有上架商品的展示、查看对应商品的详细信息、商品的购买、历史交易记录的查询、最高权限管
理员模块
```
