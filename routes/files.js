const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/files')
const {v4 : uuid4} = require('uuid');
const { request } = require('http');

let storage = multer.diskStorage({
    destination : (req, file, cb) => cb( null, 'uploads/'),
    filename : (req, file, cb) => {
        // Set unique name for each file.
        //
        const uniqueName = `${Date.now()}-${ Math.round(Math.random() * 1E9) }${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100}
}).single('myFile');

router.post('/', (req, res) => {
    
        

        // Store file.
        //
        upload(req, res, async (err) => {
            
            // Validate request.
            //
            if(!req.file){
                return res.json({ error : 'All fields are required.'});
            }

            if(err){
                return res.status(500).send({ error: err.message });
            }
        
            // Store into DB
            //
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
            });
            const response = await file.save();
            return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        })
    

    // Response -> Link

});

module.exports = router;