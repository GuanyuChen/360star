window.onload = function(){
	var start = document.getElementById('start'),	// 开始游戏页面
		game = document.getElementById('game'),		// 游戏页面
		but = start.getElementsByTagName('button')[0],	// 开始游戏按钮
		add = document.getElementById('add'),	// 下注按钮
		addCard = document.getElementById('deal'),		// 发牌按钮
		bet = document.getElementById('bet'),	// 下注金额span
		over = document.getElementById('over'),		// 剩余金币span
		club = document.getElementsByClassName('club')[0],
		diamond = document.getElementsByClassName('diamond')[0],
		hearts = document.getElementsByClassName('hearts')[0],
		spade = document.getElementsByClassName('spade')[0],	// 四种花色的牌的ul
		player = document.getElementById('players'),	// 玩家区域
		maker = document.getElementById('makers'),		// 庄家区域
		grade = document.getElementsByClassName('grade'),	// 点数
		bef = document.getElementById('before'),	
		aft = document.getElementById('after'),		// 中间信息区的两种页面
		money = 0,		// 奖池
		used = [],		// 每张牌是否用过
		count = [];		// 52张牌加一个牌面

	// 为扑克牌赋牌面
	poker(club);
	poker(diamond);
	poker(hearts);
	poker(spade);

	but.onclick = function(){
		start.style.display = 'none';
		game.style.display = 'block';
	}

	add.onclick = function(){
		addBet();
	}

	addCard.onclick = function(){
		deal(count);
		bef.style.display = 'none';
		aft.style.display = 'flex';
		for(var i=0;i<grade.length;i++){
			grade[i].parentNode.style.display = 'block';
		}
	}

	// 下注
	function addBet(){
		var tem = parseInt(bet.innerHTML,10),
			tem2 = parseInt(over.innerHTML,10);
		if (tem < 25 && tem2 > 0) {		// 每次下注最大不能超过25 余额不能为负
			tem += 5;
			tem2 -= 5;
			bet.innerHTML = tem;
			over.innerHTML = tem2;
		}
	}

	// 开始发牌
	function deal(tem){
		if (parseInt(bet.innerHTML,10) > 0) {	// 每一次下注至少为5
			money = parseInt(bet.innerHTML,10);		//赌注入奖池
			bet.innerHTML = '0';	// 发牌后赌注归零
			used[every(maker,0)] = 2;
			used[every(player,1)] = 2;
			console.log(used);
		}

		// 每次发牌
		function every(obj,index){
			
				var ran = Math.round(Math.random() * tem.length),	// 随机数
					ul = obj.getElementsByTagName('ul')[0];
				while (used[ran] == 0) {
					ran = Math.round(Math.random() * tem.length);
				}
				if (ran < 12) {
					ul.className = 'club';	
				} else if (ran < 25) {
					ul.className = 'diamond';
				} else if (ran < 38) {
					ul.className = 'hearts';
				} else {
					ul.className = 'spade';
				}
				tem[ran].style.display = 'block';
				ul.appendChild(tem[ran]);
				console.log(ran);
				grade[index].innerHTML = parseInt(grade[index].innerHTML) + parseInt(tem[ran].childNodes[0].innerHTML);
				return ran;	// 返回本次发出的牌的索引
			
		}
	}

	// 通过js修改background-position值
	function poker(obj){
		var tem = obj.getElementsByTagName('li');
		for (var i=0;i<tem.length;i++) {
			if (i < 5) {
				tem[i].style.backgroundPosition = -70*i+'px 0px';
			} else if (i < 10) {
				tem[i].style.backgroundPosition = -70*(i-5)+'px 183px';
			} else if (i < 13) {
				tem[i].style.backgroundPosition = -70*(i-10)+'px 90px';
			} else if (i == 13) {
				tem[i].style.backgroundPosition = -282+'px 90px';
			}
			count.push(tem[i]);
			used.push(1);	// 每张牌没用过为1 用过为0
		}
	}
}