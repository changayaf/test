import express from 'express';
import users from '../controllers/users';
const router = express.Router();

router.get('/users', users.getUsers);
router.get('/users/:id', users.getUser);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.deleteUser);
router.post('/users', users.addUser);

export = router;