import path from 'path'
import express from 'express'
import multer from 'multer';
const router = express.Router() 
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
      return cb(null,true)
    } else {
      cb('Images Only')
    }
  }
  const upload = multer({ storage,checkFileType });
  const uploadSingleImage = upload.single('image');
  router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        res.status(400).send({ message: err.message });
      }
      // `/${req.file.path.replace(/\\/g, "/")
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path.replace(/\\/g, "/")}`,
      });
    });
  });

export default router;