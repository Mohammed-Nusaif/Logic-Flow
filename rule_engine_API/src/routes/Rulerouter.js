const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.post('/rules', ruleController.createRule);
router.post('/rules/evaluate', ruleController.evaluateRule);
router.post('/rules/combine', ruleController.combineRules);
router.get('/getrules', ruleController.getAllRules);
router.get('/getrules/:ruleId', ruleController.getRule);
router.delete('/rules/:ruleId', ruleController.deleteRule); 

module.exports = router;