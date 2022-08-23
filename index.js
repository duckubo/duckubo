import flatform from './assets/img/platform.png'
var log = console.log.bind(console)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const gravity = 0.5
log(canvas)
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 100
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height - 100) {
            this.velocity.y += gravity
        } else(
            this.velocity.y = 0
        )
    }
}
class Flatform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}
let scrollOffset = 0
const player = new Player()
const flatforms = [new Flatform({ x: 300, y: 500 }), new Flatform({ x: 500, y: 700 })]
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    flatforms.forEach((flatform) => {
        flatform.update()
    })
    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += 5
            flatforms.forEach((flatform) => {
                flatform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            flatforms.forEach((flatform) => {
                flatform.position.x += 5
            })
        }
    }
    flatforms.forEach((flatform) => {
        if (player.position.y + player.height <= flatform.position.y && player.position.y + player.height + player.velocity.y >= flatform.position.y && player.position.x + player.width >= flatform.position.x && player.position.x <= flatform.position.x + flatform.width) {
            player.velocity.y = 0
        }
    })
    if (scrollOffset > 2000) {

    }
}
animate()
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true
            break
        case 83:
            break
        case 68:
            keys.right.pressed = true
            break
        case 87:
            player.velocity.y -= 20
            break
    }
})
window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break
        case 83:
            break
        case 68:
            keys.right.pressed = false
            break
        case 87:
            break
    }
})