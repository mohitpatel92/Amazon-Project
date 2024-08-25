// let mypromise = new Promise((resolve,reject) => {
//     let learn = true;

//     if(learn){
//         resolve("This is true")
//     }else{
//         reject("This is rejected");
//     }
// });

// mypromise.then( (result) => {
//     console.log(result);
// }).catch ( (error) => {
//     console.log(error);
// });

let mypromises = new Promise((resolve,reject) => {
    let learn = true;

    if(learn){
        resolve("this is resolve")
    }else{
        reject("this is rejected")
    }
});

mypromises.then( (result) => {
        console.log(result);
}).catch ( (error) => {
    console.log(error);
});