
const superagent = require('superagent');
const url = "http://api.zhuzhe2.com:9090/api/realTimeDgDealOpen";
// const async = require('async');
const mysql = require('mysql');
const connection = mysql.createConnection({
   host     : 'localhost',
   port     :  3308,
   user     : 'root',
   password : 'root',
   database : 'zhuzhe2'
});
connection.connect();
let sql = 'insert into data (houseName,useType,buildID,floorNum,projectID,buildArea,indoorArea,shareArea,beiAnPrice,beiAnAllPrice,dealPrice,dealAllPrice,projectName,buildName,dealDate) values ';
//查

let max = 3; //2398;
let data = [];

async function curl_get (url){
    console.log('begin');
    for(let i = 1;i < max;i++){
        await superagent
                .get(url)
                .query({ time: '' })
                .query({ pageSize: '40' })
                .query({ curPage: i })
                .set('Connection','keep-alive')
                .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36')
                .accept('application/json')
                .then(function (res) {
                    if(res === undefined || res === null || res.statusCode === undefined || res.statusCode !== 200){
                        console.log("err");
                    } else {
                        data = data.concat(res.body.data.data.filter(search));
                    }
                });
        }

        let length = data.length;

        for(let l = 0;l<length;l++){
            let tmp = "('" + data[l].houseName + "','" + data[l].useType + "','" + data[l].floorNum + "',"  + data[l].buildID + ",'" + data[l].projectID + "'," + data[l].buildArea + "," + data[l].indoorArea + "," + data[l].shareArea + "," + data[l].beiAnPrice + "," + data[l].beiAnAllPrice + "," + data[l].dealPrice + "," + data[l].dealAllPrice + ",'" + data[l].projectName + "','" + data[l].buildName + "','" + data[l].dealDate +"')" + (l === length-1 ? ';' : ',');
            sql += tmp;
        }
    console.log("数据组合完毕，上传中");
    console.log(sql);
    // connection.query(sql,function (err, result) {
    //     if(err){
    //         // console.log('[SELECT ERROR] - ',err.message);
    //         // return;
    //         throw err;
    //     }
    //     console.log('--------------------------INSERT----------------------------');
    //     console.log(result);
    //     console.log('------------------------------------------------------------\n\n');
    // });

    connection.end();
}

function search(value){
    return value.buildID === 13834;
}

curl_get(url);