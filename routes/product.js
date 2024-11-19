const router  = require('express').Router();
const { allProducts, cartProducts, getcategory, getoneproduct } = require("../controllers/Products");

router.get('/products', allProducts);
router.post('/product/:id', cartProducts);
router.get('/category/:category', getcategory);
router.get('/:id', getoneproduct);

module.exports = router;