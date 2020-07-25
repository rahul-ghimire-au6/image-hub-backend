const image_model=require('../model/image_model')
const cloudinary = require('../helper/cloudinary')
const fs=require('fs')


module.exports={
    get:{
        async get_image_public(req,res){
            let temp = []
            image_model.findAll({})
            .then(data=>{
                for(let i = 0;i<data.length;i++){
                   temp.push(data[i].dataValues) 
                }
                let filtered_img = temp.filter(element=>element.privacy_status!=='private')
                res.send({'value':'success','data':filtered_img})
            })            
        },
        async get_image_private(req,res){
            let temp = []
            let userdata=req.user.dataValues
            image_model.findAll({})
            .then(data=>{
                for(let i = 0;i<data.length;i++){
                   temp.push(data[i].dataValues) 
                }
                // let public_img = temp.filter(element=>element.privacy_status!=='private')
                let my_img = temp.filter(element=>element.uploaded_by===userdata.email)
                res.send({'value':'success','data':my_img})
            })   
        }
    },
    post:{
        async upload_image(req,res){
            var yahoo=req.body
            // console.log(yahoo)
            var userdata=req.user.dataValues
            // start
            if(yahoo.img_url){
                console.log('inside')
                let temp1={
                    title:yahoo.title,                                
                    img_url:yahoo.img_url,
                    description:yahoo.description,
                    privacy_status:yahoo.privacy_status,
                    uploaded_by:userdata.email,
                    createdat:Date.now()
                }
                console.log(temp1)
                let newuser = new image_model({ ...temp1 })
                let data159 = async () => {
                    let val159 = await newuser.save()
                    await console.log(val159)
                    res.json({'value':'success','data':val159})
                }
                data159();
            }
            else{
                console.log('outside')
                console.log(req.user.dataValues)
                console.log(req.body)
            let img_url = [];
                fs.readdir('uploads/', (err, data) => {
                    if (err) { throw err }
                        let temp = data
                            img_url.length = 0;
                            console.log(temp)
                            for (let i = 0; i < temp.length; i++) {
                                if (/.jpg$/.test(temp[i])) {
                                    cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
                                        if (err) console.log(err.message)
                                        else {
                                            img_url.push(result.secure_url)
                                            fs.unlink(`uploads/${temp[i]}`, (err) => { if (err) { console.log('delete error')
                                                 throw err } else { console.log('deleted') } })
                                        }
                                    });
                                }
                                else if (/.jpeg$/.test(temp[i])) {
                                    cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
                                        if (err) console.log(err.message)
                                        else {
                                            img_url.push(result.secure_url)
                                            fs.unlink(`uploads/${temp[i]}`, (err) => { if (err) { throw err } else { console.log('deleted') } })
                                        }
                                    });
                                }
                                else if (/.png$/.test(temp[i])) {
                                    cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
                                        if (err) console.log(err)
                                        else {
                                            img_url.push(result.secure_url)
                                            fs.unlink(`uploads/${temp[i]}`, (err) => { if (err) { throw err } else { console.log('deleted') } })
                                        }
                                    });
                                }
                                else if (/.webp$/.test(temp[i])) {
                                    cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
                                        if (err) console.log(err.message)
                                        else {
                                            img_url.push(result.secure_url)
                                            fs.unlink(`uploads/${temp[i]}`, (err) => { if (err) { throw err } else { console.log('deleted') } })
                                        }
                                    });
                                }

                            }
                            // end of for loop
                        })
                        // end of read file
                        setTimeout(() => {
                            let temp1={
                                title:yahoo.title,                                
                                img_url:img_url[0],
                                description:yahoo.description,
                                privacy_status:yahoo.privacy_status,
                                uploaded_by:userdata.email,
                                createdat:Date.now()
                            }
                            let newuser = new image_model({ ...temp1 })
                            let data159 = async () => {
                                let val159 = await newuser.save()
                                await console.log(val159)
                                res.json({'value':'success','data':val159})
                            }
                            data159();
                        }, 10000);
                    }
                }
            // end
        
    },
    update:{},
    delete:{}

}