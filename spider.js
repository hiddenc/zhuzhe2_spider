/**
 * Created by Administrator on 2018-05-05.
 */
'use strict';
const superagent = require('superagent');
const reptileUrl = "http://api.zhuzhe2.com:9090/api/realTimeDgDealOpen";
const async = require('async');
const mysql = require('mysql');


//const connection = mysql.createConnection({
//    host     : 'localhost',
//    port     :  3308,
//    user     : 'root',
//    password : 'root',
//    database : 'zhuzhe'
//});
//connection.connect();
//var sql = 'SELECT * FROM data';
////查
//connection.query(sql,function (err, result) {
//    if(err){
//        console.log('[SELECT ERROR] - ',err.message);
//        return;
//    }
//    console.log('--------------------------SELECT----------------------------');
//    console.log(result);
//    console.log('------------------------------------------------------------\n\n');
//});
//
//connection.end();

let max = 3; //2398;
let data = [];

async function returnData(){
    await getData();
    console.log(data);
}

function getData(){
    for(let i = 1;i < max;i++){
        superagent.get(reptileUrl)
            .query({ time: '' })
            .query({ pageSize: '40' })
            .query({ curPage: i })
            .set('Content-Type', 'application/json;charset=UTF-8')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36')
            .accept('application/json')
            .end(function (err, res) {
                if (res.ok) {
                    //console.log(res.body.data);
                    //console.log(Array.isArray(res.body.data.data));
                    let list = res.body.data.data.filter(search);
                    data = data.concat(list);
                    console.log(data);
                } else {
                    console.log('bad');
                }
            });
        console.log(i);
    }
}

function search(value){
    return value.floorNum === '14';
}

returnData();



