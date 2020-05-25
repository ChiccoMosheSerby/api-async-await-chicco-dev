const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// let today = new Date();
// let year = today.getFullYear();
// let month = today.getMonth() + 1;
// let day = today.getDate();
// day = day - 5;

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
// let monthTreeChars = months[month - 1];

// let apiObj = {
//     todayHebrewDate: '',
//     ParashaEnglish: '',
//     englishHebMonth: '',
//     ParashaHebrew: '',
//     currentDate: `${day}.${monthTreeChars}.${year}`
// }

// // today hebrew date:
// //https://www.hebcal.com/home/195/jewish-calendar-rest-api
// let urlWithDate = 'https://www.hebcal.com/converter/?cfg=json&gy=' + year + '&gm=' + month + '&gd=' + day + '&g2h=1';
// let urlParashaHebrew = 'https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&s=on'

// //ROUTER - get data on page load /////////////////////////////////////////////////////////////////////////////
// app.get('/', function (req, res) {
//     function getHebDate() {
//         return new Promise((resolve, reject) => {
//             fetch(urlWithDate).then(res => res.json()).then(json => {
//                 if (json) {
//                     apiObj.todayHebrewDate = json;
//                     apiObj.ParashaEnglish = json.events[0];
//                     apiObj.englishHebMonth = json.hm;

//                     resolve(json);
//                 }
//             })
//         })
//     }
//     function getHebParasha() {
//         return new Promise((resolve, reject) => {
//             fetch(urlParashaHebrew).then(res => res.json()).then(json => {
//                 apiObj.ParashaHebrew = json;
//                 // console.log(json.items[1])

//                 for (i = 0; i < json.items.length; i++) {
//                         if (apiObj.ParashaHebrew.items[i].title === apiObj.todayHebrewDate.events[0]) {
//                             apiObj.ParashaHebrew = apiObj.ParashaHebrew.items[i].hebrew;
//                             apiObj.todayHebrewDate = apiObj.todayHebrewDate.hebrew;
//                             break;
//                         }
//                         else {
//                             apiObj.ParashaHebrew = '';
//                             apiObj.todayHebrewDate = apiObj.todayHebrewDate.hebrew;
//                         }
                    
//                 }
//                 resolve(json);
//             });
//         })
//     }
//     async function async_data_to_client() {
//         let hebDate = await getHebDate();
//         // console.log(users);
//         let hebParasha = await getHebParasha();
//         res.send(apiObj);
//         console.log('sent good data from app.get');
//     }
//     async_data_to_client();
// });

//ROUTER - get data on client request  /////////////////////////////////////////////////////////////////////////////
let usertoday;
let useryear;
let usermonth;
let userday;

let apiObjUser = {
    userHebrewDate: '',
    ParashaEnglish: '',
    englishHebMonth: '',
    ParashaHebrew: '',
    currentDate: usertoday
}

app.post('/getDate', function (req, res) {
    usertoday = new Date(`${req.body.dateToGet}`);
    useryear = usertoday.getFullYear();
    usermonth = usertoday.getMonth() + 1;
    userday = usertoday.getDate();

    apiObjUser.currentDate = `${userday}.${months[usermonth - 1]}.${useryear}`;

    let urlWithDateUser = 'https://www.hebcal.com/converter/?cfg=json&gy=' + useryear + '&gm=' + usermonth + '&gd=' + userday + '&g2h=1';
    function getHebDate_user() {
        return new Promise((resolve, reject) => {
            fetch(urlWithDateUser).then(res => res.json()).then(json => {

                if (json) {
                    apiObjUser.userHebrewDate = json;
                    apiObjUser.ParashaEnglish = json.events[0];
                    apiObjUser.englishHebMonth = json.hm
                    resolve(json);
                }
            })
        })
    }
    function getHebParasha_user() {
        let urlParashaHebrewUSER = 'https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=' + useryear + '&month=' + usermonth + '&ss=on&mf=on&c=on&s=on'
        return new Promise((resolve, reject) => {
            fetch(urlParashaHebrewUSER).then(res => res.json()).then(json => {
                apiObjUser.ParashaHebrew = json;
                for (i = 0; i < json.items.length; i++) {
                    if (apiObjUser.ParashaHebrew.items[i].title === apiObjUser.userHebrewDate.events[0]) {
                        apiObjUser.ParashaHebrew = apiObjUser.ParashaHebrew.items[i].hebrew;
                        apiObjUser.userHebrewDate = apiObjUser.userHebrewDate.hebrew;
                        break;
                    }
                }
                resolve(json);
            });
        })
    }
    async function async_data_to_client_user() {
        let hebDate = await getHebDate_user();
        // console.log(hebDate);
        let hebParasha = await getHebParasha_user();
        // console.log(hebParasha);

        res.send(apiObjUser);
        console.log('sent good data from POST apiObjUser');
    }
    async_data_to_client_user();

});


//conections ////////////////////////////////////////////////////////////////////////////////////////////
//server conection------------------
let port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('-------------------------> server conected to port: ', port, '!<---------------------------------------------------------')
})

//connect mongoDB---------------------------------------------------------------
// const mongoose = require('mongoose');//npm i mongoose
// const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('------------------------------> DB conected as well! <---------------------');
// });
////////// END conections /////////////////////////////////////////////////////////////////////////////
