// 引入mongoose模块
var mongoDB = require('mongoose');
//使用nodejs内置的promise实现替换
mongoDB.Promise = Promise;
var opts = { mongos: true };
// 连接数据库
mongoDB.connect('mongodb://localhost/flea');
var Schema = mongoDB.Schema;


// 学生用户集合
var studentSchema = new Schema({
    account: String,
    pwd: String,
    name: String,
    email: String,
    birthday: {
        type: Date,
        default: Date.now
    },
    mobile: Number
});

// 处理年龄
studentSchema.methods.getAge = function() {
    var now = new Date();
    return (now.getFullYear() - this.birthday.getFullYear());
}

// 处理生日日期
studentSchema.methods.getBirthday = function() {
    var year = this.birthday.getFullYear();
    var month = this.birthday.getMonth() + 1;
    var date = this.birthday.getDate();
    return (year + '-' + month + '-' + date);
}

// 拿到模型对象
var Student = mongoDB.model('student', studentSchema);


// 商品集合
var commoditySchema = new Schema({
    name: String,
    material: String,
    introduction: String,
    price: Number,
    image: String,
    is_trade: {
        type: Boolean,
        default: false
    }
});

var Commodity = mongoDB.model('commodity', commoditySchema);


// 用户商品集合
var studentCommoditySchema = new Schema({
    cid: {
        type: Schema.Types.ObjectId,
        ref: 'commodity'
    },
    sid: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
});

var StudentCommodity = mongoDB.model('student_commodity', studentCommoditySchema);


// 交易集合
var tradeSchema = new Schema({
    cid: {
        type: Schema.Types.ObjectId,
        ref: 'commodity'
    },
    bid: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    tradeDate: {
        type: Date,
        default: Date.now
    }
});

tradeSchema.methods.getDate = function() {
    var year = this.tradeDate.getFullYear();
    var month = this.tradeDate.getMonth() + 1;
    var date = this.tradeDate.getDate();
    return (year + '-' + month + '-' + date);
}

var Trade = mongoDB.model('trade', tradeSchema);


// 导出模块
module.exports = {
    Student: Student,
    Commodity: Commodity,
    StudentCommodity: StudentCommodity,
    Trade: Trade
}