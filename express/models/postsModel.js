const { getTopWords } = require('../utils/tags')

const Post = class {
    constructor(content) {
        this.content = content;
        this.tags = getTopWords(this.content, 5);
    }
};

const PostMeta = class {
    constructor(title, slug) {
        this.title = title;
        this.slug = slug;
    }
};

module.exports = { Post, PostMeta }