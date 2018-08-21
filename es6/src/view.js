/*
	渲染视图 view
*/ 

let view = function(){
	this.directionArr = ['上','下','左','右']
	this.snake = [[parseInt(parseInt(Math.random( )*21+5)), parseInt(parseInt(Math.random( )*21+5))]] // 保持蛇头在5-25的矩阵
	this.setViewDom = (x, y) => {
  		let oViewWrap = document.createElement('div')
  		oViewWrap.id = 'view-wrap'
  		for(let i = 0; i < x; i++){
  			let oListWrap = document.createElement('div')
	  		for(let j = 0; j < y; j++){
	  			oListWrap.appendChild(document.createElement('div'))
	  		} 
	  		oViewWrap.appendChild(oListWrap)		
  		}
  		document.getElementsByTagName('body')[0].appendChild(oViewWrap)
	}	
	this.setSnake = () => {
		switch(this.directionArr[parseInt(Math.random( )*4)]) {
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
		if(this.snake.length == 6){
			if(this.snake.getLife()){
				// 生成的蛇没有打结
				this.snake.getZoneViewSnake()
			}else{
				// 生成的蛇打结了
				document.querySelectorAll('#view-wrap > div > div')[this.snake[this.snake.length - 2][0] * 30 + this.snake[this.snake.length - 2][1]].innerHTML = ''
				this.snake.pop()
				this.setSnake()
			}	
		}else{
			if(this.snake.getLife()){
				// 生成的蛇没有打结
				this.setSnake()
			}else{
				// 生成的蛇打结了
				document.querySelectorAll('#view-wrap > div > div')[this.snake[this.snake.length - 2][0] * 30 + this.snake[this.snake.length - 2][1]].innerHTML = ''
				this.snake.pop()
				this.setSnake()
			}
		}
	}
	this.setFoot = () => {
		this.foot = [parseInt(Math.random( )*30), parseInt(Math.random( )*30)]
		this.snake.map((a,b) => {
			if(this.foot[0] == a[0] && this.foot[1] == a[1]){
				this.setFoot()
			}
		})
		this.foot.getZoneViewFoot()
	}
}
export default view