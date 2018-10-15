/*
	游戏状态与数据结构 Model
*/
let model = function(View){
	this.snake = View.snake  // 蛇
	Array.prototype.direction = '右'  // 运动的方向 上下左右
	this.getDirection = () => {  // 初始运动方向非左即右
		if(this.snake[this.snake.length-1][0] == this.snake[this.snake.length-2][0] && this.snake[this.snake.length-1][1] + 1 == this.snake[this.snake.length-2][1]){
			Array.prototype.direction = '左'
		}
	}
	
	this.move = () => {
		switch(Array.prototype.direction) {
			case '上':
				this.snake.push([this.snake[this.snake.length-1][0] - 1, this.snake[this.snake.length-1][1]])
				break
			case '下':
				this.snake.push([this.snake[this.snake.length-1][0] + 1, this.snake[this.snake.length-1][1]])
				break
			case '左':
				this.snake.push([this.snake[this.snake.length-1][0], this.snake[this.snake.length-1][1] - 1])
				break
			case '右':
				this.snake.push([this.snake[this.snake.length-1][0], this.snake[this.snake.length-1][1] + 1])
				break
		}
		let a = this.snake.shift()
		 // 计算碰撞
		if( !this.snake.getLife() ){
			clearInterval(window.time)
			document.querySelectorAll('#over')[0].play() // 音效
			return false
			// 大结局
		}
		if(this.eatFoot()){
			// 吃到了
			this.snake.unshift(a)
			this.snake.getZoneViewSnake()
			document.querySelectorAll('#eat')[0].play()  // 音效
			View.setFoot() // 再生生一个食物
		}else{
			// 没吃到
			a.deleteViewSnake()
			this.snake.getZoneViewSnake()
		}
	}
	this.eatFoot = () => {
		if(this.snake[this.snake.length-1][0] == View.foot[0] && this.snake[this.snake.length-1][1] == View.foot[1]){
			// 吃到了
			return true
		}else{
			// 没吃到
			return false
		}
	}
}
export default model
