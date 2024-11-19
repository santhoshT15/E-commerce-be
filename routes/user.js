const router = require('express').Router();
const { deleteUser, getreview, postreview, order, updateorders, deleteCart, cart, register, login } = require('../controllers/users')

router.post('/login', login);
router.post('/register', register);
router.post('/cart/:id', deleteCart);
router.post('/cart', cart);
router.post('/orders', updateorders);
router.post('/getOrders', order);
router.post('/postReview/:id', postreview);
router.get('/getReview/:id', getreview);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;