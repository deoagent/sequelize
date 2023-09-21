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
    // return User.update({ username: 'pizza' }, {
    //     where: {age: 25}
    // });
    // return User.update({ username: 'Yes!' }, {
    //     where: {age: {
    //         [Op.gt]: 1
    //     }}
    // });
    // return User.destroy({ where: { username: 'Yes!' }});
    // return User.create({ 
    //     username: 'oldy',
    //     password: '12345',
    //     age: 87
    // });
    // return User.max('age');
    // return User.sum('age');
    return User.max('age', { where: {age: 25} });
})
.then((data) =>{
    console.log(data);
})

.catch((err) => {
    console.log(err);
})