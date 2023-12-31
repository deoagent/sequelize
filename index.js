const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

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
    return User.bulkCreate([
        {
            username: 'Tomfsdfdsfsd',
            age: 25,
            password: 'pizzasoccer'
        },
        {
            username: 'Mikesdfdsfsdf',
            age: 31,
            password: '12345'
        },
        {
            username: 'F'
        }
    ], {
        validate: true
    });
    // return User.create({
    //     username: 'Freddiertyrhrr'
    // });
    // const user = User.build({ username: 'WittCode', password: '123', age: 25, WittCodeRocks: true });
    // user.username = 'soccer';
    // return user.save();
})
.then((data) =>{
    // console.log('User added to database');
    // data.username = 'pizza';
    // data.age = 45;
    // return data.save({ fields: ['age'] });
    // return data.reload();
    // return data.save();
    // return data.destroy();
    // data.decrement({ age: 2 })
    // console.log(data.toJSON());
    data.forEach(element => {
        console.log(element.toJSON());
    });

})
// .then((data) =>{
//     console.log('User updated!');
//     console.log(data.toJSON());
// })
.catch((err) => {
    console.log(err);
})