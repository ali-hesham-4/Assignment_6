import Sequelize from 'sequelize';

export const sequelize = new Sequelize('mysql://u5ghhephtbmbexkl:LPXCrqRhXfsQVgEXCmRt@byvqfjmzafg2puopwmwa-mysql.services.clever-cloud.com:3306/byvqfjmzafg2puopwmwa');

export const connectionDB = async () =>{
    return await sequelize.sync({alert: false , force: false}).then(()=>{
        console.log("connected to DataBase");
    }).catch(err =>{
        console.log({msg:"Faild to connect to DataBase" , err});
    })
}


export default connectionDB