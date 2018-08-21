/*
	Model-View-Control

	游戏的各种状态与数据结构由 Model 管理
	View 用于显示 Model 的变化
	用户与游戏的交互由 Control 完成
	特点：Model完全独立，View 是 Model 的状态机，Model 与 View 都由 Control 来驱动。
*/
import proto from './src/proto.js'
import view from './src/view.js'

let View = new view()
View.setViewDom(30, 30) // 加载舞台dom结构
View.setSnake()         // 初始化生成蛇
View.setFoot()          // 初始化生成食物

import model from './src/model.js'
let Model = new model(View)
	Model.getDirection()  // 计算初始运动方向
window.time = setInterval(function(){
	Model.move() // 运动
},250)

import control from './src/control.js'
let Control = new control()
