function titleCase(inputString) {
    return inputString.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

module.exports = titleCase;