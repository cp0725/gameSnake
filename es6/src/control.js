/*
	事件交互控制器 Control
*/
let control = function(){
	window.onkeydown = function(evt){
		// 左37  上38  右39  下40
		switch(evt.keyCode) {
			case 37:
				if(Array.prototype.direction != '右'){
					Array.prototype.direction = '左'
				}
				break
			case 38:
				if(Array.prototype.direction != '下'){
					Array.prototype.direction = '上'
				}
				break
			case 39:
				if(Array.prototype.direction != '左'){
					Array.prototype.direction = '右'
				}
				break
			case 40:
				if(Array.prototype.direction != '上'){
					Array.prototype.direction = '下'
				}
				break
		}
	}
}
export default control