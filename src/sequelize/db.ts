import { DataTypes, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config()


export const database = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,{ 
        dialect:'mysql',
        host: process.env.DB_HOST || 'localhost',
    })



export const QueuePosition = database.define("queuePosition", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    studentName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    position:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})


export const Role = database.define("role", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    telegramId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    aproved:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
})


export const Queue = database.define("queue", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
})

Queue.hasMany(QueuePosition, {
    foreignKey:'queueName', 
    keyType:DataTypes.STRING, 
    sourceKey:'name'
});

// const modelDefiners  = [
//         defineQueue,
//         defineQueuePosition
//     ]

// //define tabels
// for (const modelDefiner of modelDefiners) {
//    console.log( typeof modelDefiner(database))
// }

// define relationships
// defineRelationships()
