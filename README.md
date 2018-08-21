# 贪吃蛇
------------
>
> **在线访问地址：** [http://cp0725.gitee.io/snaker/es6/index.html] 
>
------------
### 目录结构
	|--  index.html         // 入口
	|--  main.js            // 编译入口/项目启动文件
	|--  package.json       // npm配置
	|--  webpack.config.js  // webpack配置
	|--  src                // 原文件
		|--  control.js       // 控制
		|--  model.js         // 状态
		|--  proto.js         // 原型
		|--  view.js          // 视图
	|--  script             // webpack编译出口
		|--  main.min.js
	|--  test.html          // 原始项目
	|--  static             // 静态资源文件


### MVC

本案例中采用MVC模式开发，即：Model - View - Control 。
- 游戏的各种状态与数据结构由 Model 来管理；
- View 用于显示 Model 的变化，做视图的渲染；
- 用户与游戏的交互由 Control 完成;

这样做的好处是什么？
- Model只负责数据处理完全独立
- View对Model进行视图渲染
- Model 与 View 都由 Control 来驱动。

### 元素&动作&初始化
四个元素： 蛇、食物、墙、舞台  
三个动作： 移动、吃食、碰撞  
两个初始化：初始化一条随机的蛇、初始化一个食物  

**中心思想：舞台是一个 30 * 30 的矩阵（二维数组），矩阵的索引边界是舞台的墙，矩阵上的成员用于标记食物和蛇的位置。对舞台矩阵进行对应的数据渲染就可以映射出蛇和食物，蛇和食物都有他们独立的数据结构，蛇是指向舞台的一个序列也就是一条线，食物是指向舞台的一个点。**


小面是一个 10*6 的空白舞台

    [
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9]
    ]

蛇S和食物#出现在舞台上

    [
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,#,3,4,5,6,7,8,9],
    	[0,1,2,3,S,5,6,7,8,9],
    	[0,1,2,3,S,S,S,7,8,9],
    	[0,1,2,3,4,5,S,7,8,9],
		[0,1,2,3,4,5,6,7,8,9]
    ]
此时蛇和食物对应的数据结构如下  
蛇：[[4,2], [4,3], [5,3], [6,3], [6,4]]  
食物：[1,2]

当蛇的位置发生改变（运动）

    [
    	[0,1,2,3,4,5,6,7,8,9],
    	[0,1,#,3,4,5,6,7,8,9],
    	[0,1,2,S,S,5,6,7,8,9],
    	[0,1,2,3,S,S,S,7,8,9],
    	[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9]
    ]
蛇运动了一个位置，蛇的数据结构如下  
蛇：[[3,2], [4,2], [4,3], [5,3], [6,3]]

我们来分析一下蛇运动前和运动后的数据结构 [[4,2], [4,3], [5,3], [6,3], [6,4]] 和 [[3,2], [4,2], [4,3], [5,3], [6,3]] 不难发现蛇的运动只是对蛇进行了 `shift` 和 `push` 操作，而 `push` 的数据是根据蛇的运动方向确定的。

我们再分析一下“吃食”和 “碰撞”这两个动作，那么吃食就表示为被 `push` 的数据也就是“蛇头”和食物重叠。碰撞又分为“撞墙”和“撞自己”，撞墙比较简单只要判断蛇头有没有超出舞台的边界，而撞自己要判断蛇头有没有和蛇的身体冲突。


我们再分析一下初始化随机蛇和食物的过程，这个过程要注意五个点：
1. 食物不可以和蛇重复
2. 蛇自身不可以重复
3. 在蛇的前进方向上不可以有蛇身紧挨着蛇头
4. 蛇头不可以在前进方向上紧挨着边界
5. 蛇是一条直线嘛？

“食物不可以和蛇重复”食物一定是不能和蛇重复的，这里采用了递归如果重复了就不停的自调；

“蛇自身不可以重复”蛇自身当然也是不能重复的否则就撞了自己，每次随机化蛇的身体的时候可以调用 `getLife()` 方法判断蛇的生命，同样使用递归直到蛇的身体到达设定的长度；

“在蛇的前进方向上不可以有蛇身紧挨着蛇头”如果在蛇的前进方向上有蛇的身体紧挨着蛇头，那么在下一个运动时刻蛇就会“撞自己”，也就是初始化随机一条蛇之后蛇马上就会over，这样的交互体验我们是不希望出现的；

“蛇头不可以在前进方向上紧挨着边界”同上

“蛇是一条直线嘛？”初始化随机出来的蛇应该是一条直线嘛？这也不是我们想要的交互体验；

### 再次回到MVC

#### Model
Model 负责数据结构与处理，比如蛇的运动、蛇的吃食、蛇的死亡、蛇生命的判断，上述这一切 Model 只负责数据的处理，在数据结构的层面完成这些功能。

#### View
View 用于显示 Model 的变化做视图的渲染，不参与任何逻辑，把蛇的数据结构以及食物的数据结构动态的渲染到舞台上。

#### Control
Control 是控制器，简单的理解 Control 负责用户事件交互，当然 Control 也负责驱动 Model 和 View。

#### Proto
Proto 看似独立于 MVC 其实 Proto 是基于 MVC 的，在本项目中 Proto 其实负责了部分 View 的工作，因为蛇和食物的数据结构本质上是一个 Array，那么对 Array 实例的操作我们把操作方法通过 `Array.prototype` 绑到原型上，通过原型链的向上查找原理实现渲染。

### 结语
本例只对贪吃蛇功能做了简单实现， test.html 是未经美化的网格舞台版本代码中用到了es6的箭头函数以及局部作用域声明，部分浏览器可能不支持；es6版本用了模块化开发使用 webpack 打包 babel-loader 编译，下载请自行 `npm install`。


# （完）