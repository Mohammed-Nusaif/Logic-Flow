class ASTNode {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

module.exports = ASTNode;