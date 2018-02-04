function Game (args) {
    let word = args.word || "",
        hint = args.hint || ""

    this.length = function () {
        return word.length
    }
    this.guess = function (x) {
        let indices = [];
        for(var i=0;i<word.length;i++) {
            if (word[i] === x) indices.push(i);
        }
        return indices
    }
    this.hint = function () {
        return hint
    }

    return this
}
