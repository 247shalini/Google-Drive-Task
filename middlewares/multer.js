const multer = require("multer")
const path =require("path")
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
      try{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }catch(err){
        console.log("error")
        console.log("filename...",filename)
      }
    }
})

const upload = multer({ storage: storage }).single('image');
module.exports= {
    upload
}