const {Photo}  = require("../model/index");

const UploadImage = (req, res) => {
    console.log(!req.file)
    if (!req.file) {
        return res.status(400).json({
            msg: "EMPTY_FILE_REQUEST",
            error: 'true',
            status: 400
        })
    }
    if (!req.body) {
        return res.status(400).json({
            msg: "EMPTY_BODY_REQUEST",
            error: 'true',
            status:400
        })
    }
    
    try {
        if (req.file.path) { 
            let image = new Photo({
                filename: req.file.filename,
                name:req.body.name,
                url: "http://"+req.get('host')+`/uploads/${req.file.filename}`,                
            })
            image.save()
                .then((data) => {
                    return res.status(200).json({
                        msg: "IMAGE_SAVED_SUCCESSFULLY",
                        data
                    })
                })
                .catch((err) => {
                    return res.status(403).json({
                        msg: "Error in saving data in database",
                        err
                    })
                })
            
        }
        
        
    } catch (error) {
        return res.status(403).json({
            msg: "ERROR_DURING_UPLOADING",
            error
        })   
    }
}

const GetImages = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            msg:"EMPTY_REQUEST"
        })
    }
console.log("BODY",req.body)
    Image.find({name:req.body.name})
    .then((data, err) => {
        if (data) {
            return res.status(200).json({
                data,
                req:req.body.name,
                msg:"SUCCESS"
            })
        }
        if (err) {
            return res.status(403).json({
                err,
                msg:"ERROR"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })
     
}

const uploadControler = {
    UploadImage,
    GetImages
}
module.exports = uploadControler;