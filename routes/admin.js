const router = require('express').Router();
const {createProduct, deleteProduct,  getUsers, updateProduct, updatestatus } =require('../controllers/admin');
const {allUsers} = require('../controllers/users');

router.get('/users', getUsers)
router.post("/createProduct", createProduct);
router.delete("deleteProduct/:id", deleteProduct);
router.put("/updatePraduct", updateProduct);
router.get('users', allUsers);
router.post('/updateStatus', updatestatus);

module.exports = router;