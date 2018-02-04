document.addEventListener('DOMContentLoaded', function() {
    let dom = {
        entry: document.getElementById('entry'),
        game: document.getElementById('game'),
        word: document.getElementById('word'),
        guess: document.getElementById('guess'),
        reject: document.getElementById('rejected'),
        kitten: document.querySelector('#kitten .all'),
        guessInput: document.querySelector('#guess input'),
        guessButton: document.querySelector('#guess button'),
        entryInput: document.querySelector('#entry input'),
        entryButton: document.querySelector('#entry button'),
        hintInput: document.querySelector('#entry textarea'),
        message: document.getElementById('message')
    }
    let game,
        kitten = new Kitty({min:0,max:6,dom:dom.kitten,message:message}),
        guessed = []

    function message (m) {
        dom.message.innerText = m;
    }
    function validateChar (ch) {
        return /^[A-Z]$/i.test(ch) && !guessed.includes(ch);
    }
    function validateWord (word) {
        return word.match(/^[A-Za-z]+$/);
    }
    function gameOver (didWin) {
        if (didWin)
            kitten.save()
        else
            kitten.kill()

        dom.guessButton.setAttribute('disabled', 'disabled')
        dom.guessInput.setAttribute('disabled', 'disabled')
    }

    dom.entryInput.onkeyup = function () {
        if (validateWord(dom.entryInput.value)) {
            dom.entryButton.removeAttribute('disabled')
        } else {
            dom.entryButton.setAttribute('disabled', 'disabled')
        }
    }

    dom.entryButton.onclick = function () {
        game = new Game({
            word: dom.entryInput.value.toLowerCase(),
            hint: dom.hintInput.value
        })
        dom.entry.remove()
        dom.game.classList.add('show')
        dom.guessInput.focus()
        let len = game.length()
        for (var i=0; i<len; i++) {
            let ele = document.createElement('span')
            ele.classList.add('blank')
            dom.word.appendChild(ele)
        }
        let hint = game.hint()
        if (hint) {
            let m = document.createElement('p')
            m.innerText = hint
            dom.word.appendChild(m)
        }

        let count = game.length()
        dom.guessInput.onkeyup = function () {
            if (validateChar(dom.guessInput.value)) {
                dom.guessButton.removeAttribute('disabled')
                dom.guessButton.focus()
            }
            else {
                dom.guessButton.setAttribute('disabled', 'disabled')
                dom.guessInput.value = ''
                dom.guessInput.focus()
            }
        }
        dom.guessButton.onclick = function () {
            let x = dom.guessInput.value.toLowerCase()
            let i = game.guess(x)
            let stillAlive = true;
            dom.guessInput.value = ''
            guessed.push(x)
            if (i.length===0) {
                let r = dom.reject.innerText
                r = (r.length > 0) ? r+=', '+x : x
                dom.reject.innerText = r
                stillAlive = kitten.minus()
            } else {
                for (var d=0; d<i.length; d++) {
                    let n = document.querySelectorAll('#word span')[i[d]]
                    n.classList.remove('blank')
                    n.innerText = x
                    count--
                }
                kitten.plus()
            }
            if (!stillAlive)
                gameOver(false)
            if (count === 0)
                gameOver(true)
            dom.guessInput.focus()
        }
    }

}, false);
