const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d") // canvas element with color

canvas.width = 1024 // canvas specifications
canvas.height = 576

const collisionsMap = [] // create collisions
for (let i = 0; i < collisions.length; i+=70+i) {
	collisionsMap.push(collisions.slice(i, 70))} // create a 2D array from data
                                                // (70 tiles width, 40 tiles height)

class Boundary {
	static width = 48
	static height = 48
	constructor({position}) {
		this.position = position
		this.width = 48
		this.height = 48
	}

	draw() {
		c.fillStyle = "red"
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}

const offset = {
	x: -353,
	y: -410
}

const boundaries = []

collisionsMap.forEach((row, i) => { // loop for collisions
	row.forEach((symbol, j) => {
		if(symbol === 1025)
			boundaries.push(new Boundary({position: {
				x: j * Boundary.width + offset.x,
				y: i * Boundary.height + offset.y }
			})
			)
	})
})

const image = new Image() // create an html image element for MAP BG (global)
image.src = "./assets/GameMapBG.png" 

const playerImage = new Image() // create player
playerImage.src = "./assets/playerDown.png"

class Sprite { // class for animation moving
	constructor({position, velocity, image}){
		this.position = position
		this.velocity = velocity
		this.image = image
	}

	draw() { // method for canvas show
		c.drawImage(this.image, this.position.x, this.position.y)
	}
}

const background = new Sprite({
	position: {
		x: offset.x,
		y:offset.y
	},
	image: image // use global const image
})

const keys = { // value for keys for movement
	a: {pressed: false},
	s: {pressed: false},
	d: {pressed: false},
	w: {pressed: false},
}


function animate() { //walking animation loop, char moving
	window.requestAnimationFrame(animate) // loop

	boundaries.forEach((boundary) => {
		boundary.draw()
	})
	
	background.draw()

	

	c.drawImage(playerImage, 
		// cropping img
		0, // crop position start
		0,
		playerImage.width/4, // crop width and height
		playerImage.height,
		// crop done

		canvas.width/2 - (playerImage.width/4)/2, // to position in screen center
		canvas.height/2 - playerImage.height/2,

		playerImage.width/4, // rendered size
		playerImage.height)

	if(keys.a.pressed) background.position.x += 3 // move map with keys
	if(keys.s.pressed) background.position.y -= 3
	if(keys.d.pressed) background.position.x -= 3
	if(keys.w.pressed) background.position.y += 3
}
animate()

// key listeners
window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "a": 
			keys.a.pressed = true
			break

		case "s": 
			keys.s.pressed = true
			break

		case "d": 
			keys.d.pressed = true
			break

		case "w": 
			keys.w.pressed = true
			break
	}
})

window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "a": 
			keys.a.pressed = false
			break

		case "s": 
			keys.s.pressed = false
			break

		case "d": 
			keys.d.pressed = false
			break

		case "w": 
			keys.w.pressed = false
			break
	}
})