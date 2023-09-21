const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('sequelize-video', 'root', 'root', {
    dialect: 'mysql'
});

// sequelize.sync({ alter: true });
// sequelize.authenticate().then(() => {
//     console.log("Connection successful!");
// }).catch((err) => {
//     console.log("Error connecting database!");
// });

// console.log("Another task.");
sequelize.drop({ match: /_test$/ });

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6]
        }
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    WittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},
{
    freezeTableName: true,
    timestamps: false
});

// User.sync({ force: true });
User.sync({ alter: true }).then(() =>{
    //Working with our updated table
    // return User.findAll();
    // return User.findAll({ attributes: ['username', 'password'] });
    // return User.findAll({ attributes: [['username', 'myName'],['password', 'pwd'] ]});
    // return User.findAll({ attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'howOld']]});
    // return User.findAll({ attributes: { exclude: ['password'] }});
    // return User.findAll({ where: { age:45 } });
    // return User.findAll({ attributes: ['username'], where: { age:45 } });
    // return User.findAll({ where: { age:25, username: 'soccer'} });
    // return User.findAll({ limit: 2 });
    // return User.findAll({ order: [['age', 'DESC']] });
    // return User.findAll({
    //     attributes: ['username',
    //                 [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']],
    //     group: 'username'});
    return User.findAll({ where: {
        [Op.or]: { username: 'soccer', age: 45 }
    }});
})
.then((data) =>{
    data.forEach(element => {
        console.log(element.toJSON());
    });
})

.catch((err) => {
    console.log(err);
})