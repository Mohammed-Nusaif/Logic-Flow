class Tokenizer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.position < this.input.length) {
            let char = this.input[this.position];

            if (char === ' ') {
                this.position++;
                continue;
            }

            if (char === '(' || char === ')') {
                this.tokens.push({ type: 'parenthesis', value: char });
                this.position++;
                continue;
            }

            if (this.isOperator(char)) {
                let operator = this.getOperator();
                this.tokens.push({ type: 'operator', value: operator });
                continue;
            }

            if (this.isNumber(char) || char === '-') {
                let number = this.getNumber();
                this.tokens.push({ type: 'number', value: number });
                continue;
            }

            if (this.isLetter(char) || char === "'") {
                let identifier = this.getIdentifier();
                this.tokens.push({ type: 'identifier', value: identifier });
                continue;
            }

            this.position++;
        }

        return this.tokens;
    }

    isOperator(char) {
        return ['>', '<', '=', 'A', 'O'].includes(char);
    }

    getOperator() {
        let operator = '';
        while (this.position < this.input.length && this.isOperator(this.input[this.position])) {
            operator += this.input[this.position];
            this.position++;
        }
        if (operator === 'AND' || operator === 'OR') return operator;
        return operator;
    }

    isNumber(char) {
        return !isNaN(parseInt(char));
    }

    getNumber() {
        let number = '';
        if (this.input[this.position] === '-') {
            number += '-';
            this.position++;
        }
        while (this.position < this.input.length && this.isNumber(this.input[this.position])) {
            number += this.input[this.position];
            this.position++;
        }
        return parseFloat(number);
    }

    isLetter(char) {
        return /[a-zA-Z]/.test(char);
    }

    getIdentifier() {
        let identifier = '';
        if (this.input[this.position] === "'") {
            this.position++;
            while (this.position < this.input.length && this.input[this.position] !== "'") {
                identifier += this.input[this.position];
                this.position++;
            }
            this.position++;
        } else {
            while (this.position < this.input.length &&
                (this.isLetter(this.input[this.position]) || this.input[this.position] === '_')) {
                identifier += this.input[this.position];
                this.position++;
            }
        }
        return identifier;
    }
}

module.exports = Tokenizer;