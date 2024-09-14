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

let mypromise = new Promise( (resolve,reject) => {
    let learn = false;

    if(learn){
        resolve("This is true")
    }else{
        reject("This is false")
    }
})

mypromise.then( (resolve) => {
    console.log(resolve);    
}).catch( (reject)=> {
    console.log("this is rejected message : ",reject);    
})