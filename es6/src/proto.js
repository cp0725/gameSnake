
Array.prototype.deleteViewSnake = function(){   // 清除蛇之前的一节
	let aViewList = document.querySelectorAll('#view-wrap > div > div')
	aViewList[this[0] * 30 + this[1]].className = ''
}
Array.prototype.getZoneViewSnake = function(){  // 渲染画布上移动的蛇
	let aViewList = document.querySelectorAll('#view-wrap > div > div')
	this.map((a,b) => {
		aViewList[a[0] * 30 + a[1]].className = 'bodys'
	})	
	try{ // 蛇头转向 第一次拿不到Model 把错误抛出
		switch(Array.prototype.direction) {
			case '上':
				aViewList[this[this.length - 1][0] * 30 + this[this.length - 1][1]].className = 'head-top'
				break
			case '下':
				aViewList[this[this.length - 1][0] * 30 + this[this.length - 1][1]].className = 'head-bottom'
				break
			case '左':
				aViewList[this[this.length - 1][0] * 30 + this[this.length - 1][1]].className = 'head-left'
				break
			case '右':
				aViewList[this[this.length - 1][0] * 30 + this[this.length - 1][1]].className = 'head-right'
				break
		}
	}catch(err){

	}
}
Array.prototype.getZoneViewFoot = function(){   // 渲染食物
	let aViewList = document.querySelectorAll('#view-wrap > div > div')
	aViewList[ this[0] * 30 + this[1] ].className = 'eat'
}


Array.prototype.getLife = function(){  // 计算碰撞
	let life = true
	if(this[this.length-1][0] > 29 || this[this.length-1][0] < 0 || this[this.length-1][1] > 29 || this[this.length-1][1] < 0){
		// 撞墙了
		document.querySelectorAll('#view-wrap > div > div')[this[this.length - 2][0] * 30 + this[this.length - 2][1]].innerHTML = '<b></b>'
		life = false
	}
	this.map((a,b) => {
		if(this[this.length-1][0] == a[0] && this[this.length-1][1] == a[1] && b != this.length-1){
			// 撞自己
			document.querySelectorAll('#view-wrap > div > div')[this[this.length - 2][0] * 30 + this[this.length - 2][1]].innerHTML = '<b></b>'
			life = false
		}
	})
	return life
}
