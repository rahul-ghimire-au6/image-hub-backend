const user_model=require('../model/user_model')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');


module.exports = {
    get:{},
    post:{
        async signup(res,req){
            let yahoo = (res.body)

             //first is to generate token
             var token = jwt.sign({
                data: yahoo.email
              }, 'secret', { expiresIn: '1h' });
            //   console.log(token)

            // second step to encrypt the password
            let encrypted_pass=undefined
            await bcrypt.hash(yahoo.password, 10, (err, hash)=>{
                // console.log('encrypted')
                // console.log(hash)
                 encrypted_pass=hash
                 if(encrypted_pass!==undefined){
                    let user = {
                        name:yahoo.name,
                        email:yahoo.email,
                        password:encrypted_pass,
                        token,
                        createdat:Date.now() 
                    }
                    console.log(user.token.length)
                    let newuser = user_model.create(user)
                    .then(()=>
                    req.send({'value':'success','token':token})
                    )
                    .catch(err=>{
                        // console.log(err.message)
                        // console.log(err.name)
                        req.send({'value':'fail','error_name':err.name,'message':err.message})
                    })                    
                  }
            });
        },
        async login (res,req){
            let yahoo = res.body

            // get the user data
            
            user_model.findOne({
                where: {
                    email:yahoo.email
                }            
            })
            .then(data=>{
                console.log(data)
                if(data===null){
                req.send({'value':'fail','message':'user does not exist'})
                }
                else{
                console.log(data.dataValues)
                bcrypt.compare(yahoo.password, data.dataValues.password)
                .then(result=>{
                    if(result===false){
                        req.send({'value':'fail','message':'incorrect password'})
                    }
                    else{                
                        let token1 = jwt.sign({
                            data: yahoo.email
                          }, 'secret', { expiresIn: '1h' });
                        user_model.update({token:token1,updatedat:Date.now()},{where:{id:data.dataValues.id}}).then((data)=>{
                            req.send({'value':'success','token':token1})
                        })

                    }})
                .catch(err=>console.log(err))
                }
            })}
            ,
            async logout(res,req){
                console.log(res.params)
                yahoo=res.params.token
                user_model.update({token:null},{where:{token:yahoo}}).then(data=>{
                    console.log(data)
                    if(data[0]===0){
                        req.send({'value':'fail','message':'logged out unsuccessfull'})
                    }
                    else{
                        req.send({'value':'success','message':'Logged Out Successfully'})
                    }
                    
                })
            }
            
    },
    put:{},
    delete:{}
}
    