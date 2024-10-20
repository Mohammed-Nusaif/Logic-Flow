const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');
const ASTNode = require('./ASTNode');

class RuleEngine {
    constructor() {
        this.rules = new Map();
    }

    create_rule(rule_string) {
        const tokenizer = new Tokenizer(rule_string);
        const tokens = tokenizer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        return ast;
    }

    combine_rules(rules) {
        if (rules.length === 0) return null;
        if (rules.length === 1) return this.create_rule(rules[0]);

        // Combine rules with AND operator
        let combinedAST = new ASTNode('operator', 'AND');
        combinedAST.left = this.create_rule(rules[0]);
        combinedAST.right = this.create_rule(rules[1]);

        // For more than 2 rules, continue combining with AND
        for (let i = 2; i < rules.length; i++) {
            const newNode = new ASTNode('operator', 'AND');
            newNode.left = combinedAST;
            newNode.right = this.create_rule(rules[i]);
            combinedAST = newNode;
        }

        return combinedAST;
    }

    evaluate_rule(ast, data) {
        if (!ast) return true;

        if (ast.type === 'operator') {
            const leftResult = this.evaluate_rule(ast.left, data);
            const rightResult = this.evaluate_rule(ast.right, data);

            return ast.value === 'AND' ?
                leftResult && rightResult :
                leftResult || rightResult;
        }

        if (ast.type === 'comparison') {
            const { field, operator, value } = ast.value;
            const fieldValue = data[field];

            switch (operator) {
                case '>':
                    return fieldValue > value;
                case '<':
                    return fieldValue < value;
                case '=':
                    return fieldValue === value;
                default:
                    throw new Error(`Unknown operator: ${operator}`);
            }
        }

        throw new Error(`Unknown node type: ${ast.type}`);
    }
}

module.exports = RuleEngine;