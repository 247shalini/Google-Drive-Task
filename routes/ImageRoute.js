const express = require('express')
const { upload } = require('../middlewares')
const router = express.Router()
const { ImageController } = require('../controllers')

router.post('/sendemail' , ImageController.index)
router.post('/uploadmultiple',
 upload.upload , 
 ImageController.store)
router.put('/:id', ImageController.update)
router.delete('/', ImageController.destroy)
router.get('/:id', ImageController.details)

module.exports = router