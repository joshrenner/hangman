function Kitty (args) {
    let self = this,
        min = args.max || 6,
        max = args.min || 0,
        cur = args.start || max,
        dom = args.dom,
        message = args.message || console.log

    function updateDom (x) {
        dom.style.top = x +'rem'
    }
    self.kill = function () {
        updateDom(50)
        message('You got the cat wet! :(')
    }
    self.save = function () {
        updateDom(-25)
        message('You saved the cat! :)')
    }

    self.minus = function () {
        cur++
        updateDom(cur*5)
        return cur != min
    }
    self.plus = function () {
        cur--
        updateDom(cur*5)
    }

    return self;
}
