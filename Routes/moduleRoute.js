const ModuleControl = require('../controllers/moduleController');
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => ModuleControl.getAllModule(req,res));
router.get('/details', (req, res) => ModuleControl.getModuleDetails(req, res));
router.get('/:id', (req, res) => ModuleControl.getModuleById(req, res));
router.post('/', (req, res) => ModuleControl.addModule(req, res));


module.exports = router;