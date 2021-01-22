import bcrypt from 'bcrypt'

const saltRounds = 10;

async function hashPassword(pass:string): Promise<string> {

    return new Promise((resolve,reject)=>{
        bcrypt.hash(pass, saltRounds, function(err, hash) {
            if(err) reject(err)
            resolve(hash)
        });
    })
    
}

async function comparePassword(pass:string,hash:string):Promise<boolean> {
    
    return new Promise((resolve,reject)=>{
        bcrypt.compare(pass, hash, function(err, result) {
            if(err) reject(err)
            resolve(result)
        });
    })

}

export {hashPassword,comparePassword}
// Testing ---

// async function test(pass:string) {
//     var hashedPass=await hashPassword(pass)
//     console.log(hashedPass)
//     hashedPass+="1"
//     var result=await comparePassword(pass,hashedPass)
//     console.log(result)
// }

// test("good")