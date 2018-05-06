const superagent = require('superagent');
const url = "http://api.zhuzhe2.com:9090/api/realTimeDgDealOpen";
// const async = require('async');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'root',
    database: 'zhuzhe2'
});
connection.connect();

//查

let max = 2410; //2411;
let data = [];
let gs = 1; //65

async function curl_get(url) {
    console.log('begin');
    for (let i = max; i > 0; i--) {
        let sql = 'insert into data_all (houseName,useType,floorNum,buildID,projectID,buildArea,indoorArea,shareArea,beiAnPrice,beiAnAllPrice,dealPrice,dealAllPrice,projectName,buildName,dealDate) values ';
        console.log("----第" + i + "页数据采集中");
        await superagent
            .get(url)
            .query({time: ''})
            .query({pageSize: '40'})
            .query({curPage: i})
            .set('Connection', 'keep-alive')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36')
            .accept('application/json')
            .then(function (res) {
                if (res === undefined || res === null || res.statusCode === undefined || res.statusCode !== 200) {
                    console.log("err");
                } else {
                    return res.body.data.data;
                }
            })
            .then(function (res) {
                for (let l = 0; l < 40; l++) {
                    let tmp = "('" + res[l].houseName + "','" + res[l].useType + "','" + res[l].floorNum + "'," + res[l].buildID + ",'" + res[l].projectID + "'," + res[l].buildArea + "," + res[l].indoorArea + "," + res[l].shareArea + "," + res[l].beiAnPrice + "," + res[l].beiAnAllPrice + "," + res[l].dealPrice + "," + res[l].dealAllPrice + ",'" + res[l].projectName + "','" + res[l].buildName + "','" + res[l].dealDate + "')" + (l === 39 ? ';' : ',');
                    sql += tmp;
                }
                console.log("第" + i + "页数据组合完毕，上传中");
                connection.query(sql,function (err, result) {
                    if(err){
                        // console.log('[SELECT ERROR] - ',err.message);
                        // return;
                        throw err;
                    }
                    console.log('--------------------------INSERT----------------------------');
                    console.log(result);
                    console.log('------------------------------------------------------------\n\n');
                });
            })
    }

    connection.end();
    console.log('结束');
}

function search(value) {
    return value.buildID === 13834;
}

curl_get(url);