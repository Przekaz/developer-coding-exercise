const { load } = require('js-yaml')

const findMetadataIndices = (mem, item, i) => {
    if (/^===/.test(item)) {
        mem.push(i)
    }
    return mem
}

const parseMetadata = (lines, metadataIndices) => {
    if (metadataIndices.length > 0) {
        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
        return load(metadata.join('\n'))
    }
    return {}
}

const parseContent = (lines, metadataIndices) => {
    if (metadataIndices.length > 0) {
        lines = lines.slice(metadataIndices[1] + 1, lines.length)
    }
    return lines.join('\n')
}

exports.parseMD = contents => {
    const lines = contents.split('\n')
    const metadataIndices = lines.reduce(findMetadataIndices, [])
    const metadata = parseMetadata(lines, metadataIndices)
    const content = parseContent(lines, metadataIndices)
    return { metadata, content }
}