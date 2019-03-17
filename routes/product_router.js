const express = require('express');
const ProductCtrl = require('../controllers/product_mongoose_ctrl');

var router = express.Router();




//GET: Retrieves ALL resources.
router.get('/',  ProductCtrl.GetAll );

// GET: Retrieves a resource.
router.get('/:id', ProductCtrl.GetOne );

// POST:  Creates a new resource.
router.post('/', ProductCtrl.PostReq );

// PUT:  Update a resource.
router.put('/:id', ProductCtrl.PutReq );

router.delete('/:id', ProductCtrl.DelReq );

module.exports = router;
