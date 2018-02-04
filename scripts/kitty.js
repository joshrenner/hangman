function Kitty (args) {
    let min = args.max || 6,
        max = args.min || 0,
        cur = args.start || max,
        dom = args.dom,
        message = args.message || console.log

    function updateDom () {
        dom.style.top = cur * 6 +'rem'
    }
    function kill () {
        message('u ded')
    }
    function health() {
        message('u healthy, bro')
    }

    this.minus = function () {
        cur++
        updateDom()
        if (cur === min)
            kill()
    }
    this.plus = function () {
        cur--
        updateDom()
        if (cur === max)
            health()
    }

    return this;
}
