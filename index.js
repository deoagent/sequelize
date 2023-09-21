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

})
.then((data) =>{
  
    data.forEach(element => {
        console.log(element.toJSON());
    });

})

.catch((err) => {
    console.log(err);
})