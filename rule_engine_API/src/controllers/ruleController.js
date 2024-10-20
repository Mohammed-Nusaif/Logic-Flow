const RuleEngine = require('../services/ruleEngine/ruleEngine');
const Rule = require('../models/Rule');

const ruleEngine = new RuleEngine();

// Controller method to create a new rule
exports.createRule = async (req, res) => {
    try {
        // Extract name and ruleString from the request body
        const { name, ruleString } = req.body;

        // Generate the Abstract Syntax Tree (AST) for the rule
        const ast = ruleEngine.create_rule(ruleString);

        // Create a new Rule instance
        const rule = new Rule({
            name,
            ruleString,
            ast
        });

        await rule.save();

        res.status(201).json(rule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Method to get all rules
exports.getAllRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.evaluateRule = async (req, res) => {
    try {
        const { ruleId, data } = req.body;
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        const result = ruleEngine.evaluate_rule(rule.ast, data);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.combineRules = async (req, res) => {
    try {
        const { ruleIds } = req.body;
        const rules = await Rule.find({ _id: { $in: ruleIds } });
        const ruleStrings = rules.map(rule => rule.ruleString);

        const combinedAST = ruleEngine.combine_rules(ruleStrings);
        res.json({ combinedAST });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Method to get a specific rule by ID
exports.getRule = async (req, res) => {
    try {
        const { ruleId } = req.params;
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        res.json(rule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Method to delete a rule by ID
exports.deleteRule = async (req, res) => {
    try {
        const { ruleId } = req.params;
        const rule = await Rule.findByIdAndDelete(ruleId);

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        res.json({ message: 'Rule deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};