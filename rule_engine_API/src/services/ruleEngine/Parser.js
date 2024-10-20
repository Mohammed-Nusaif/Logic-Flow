const ASTNode = require('./ASTNode');

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse() {
        return this.parseExpression();
    }

    parseExpression() {
        let left = this.parsePrimary();

        while (this.position < this.tokens.length) {
            const token = this.tokens[this.position];
            if (token.type === 'operator' && (token.value === 'AND' || token.value === 'OR')) {
                this.position++;
                const right = this.parsePrimary();
                const node = new ASTNode('operator', token.value);
                node.left = left;
                node.right = right;
                left = node;
            } else {
                break;
            }
        }

        return left;
    }

    parsePrimary() {
        const token = this.tokens[this.position];

        if (token.type === 'parenthesis' && token.value === '(') {
            this.position++;
            const expression = this.parseExpression();
            this.position++; // Skip closing parenthesis
            return expression;
        }

        if (token.type === 'identifier') {
            const field = token.value;
            this.position++;
            const operator = this.tokens[this.position].value;
            this.position++;
            const value = this.tokens[this.position].value;
            this.position++;

            const node = new ASTNode('comparison');
            node.value = { field, operator, value };
            return node;
        }

        throw new Error('Unexpected token');
    }
}

module.exports = Parser;