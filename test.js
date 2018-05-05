/**
 * Created by Administrator on 2018-05-05.
 */
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(x);
// }, 2000);
// });
// }
//
// async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
// }
// f1();


let data = [];

function a(){
    getData();
    console.log(data);
}

function getData(){
    for(let i = 1;i < 10;i++){
        data = data.concat([2,3,4]);
    }
}

a();