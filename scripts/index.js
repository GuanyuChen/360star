window.onload = function(){
	var start = document.getElementById('start'),	// 开始游戏页面
		game = document.getElementById('game'),		// 游戏页面
		but = start.getElementsByTagName('button')[0],	// 开始游戏按钮
		add = document.getElementById('add'),	// 下注按钮
		addCard = document.getElementById('deal'),		// 发牌按钮
		bet = document.getElementById('bet'),	// 下注金额span
		over = document.getElementById('over'),		// 剩余金币span
		player = document.getElementById('players'),	// 玩家区域
		maker = document.getElementById('makers'),		// 庄家区域
		mu = maker.getElementsByTagName('ul')[0],
		pu = player.getElementsByTagName('ul')[0],
		grade = document.getElementsByClassName('grade'),	// 点数
		bef = document.getElementById('before'),	
		aft = document.getElementById('after'),		// 中间信息区的两种页面
		res = document.getElementById('result'),	// 结果页面
		reset = res.getElementsByTagName('button')[0];	//重置按钮
		money = 0,		// 奖池
		flag = true,
		first = [];		//庄家第一张牌的两个索引
		used = [];		// 每张牌是否用过

	for(var i=0;i<52;i++){
		used[i] = 1;
	}

	but.onclick = function(){
		start.style.display = 'none';
		game.style.display = 'block';
	}

	add.onclick = function(){
		addBet();
	}

	addCard.onclick = function(){
		deal();
		bef.style.display = 'none';
		aft.style.display = 'flex';		//切换按钮面板
		grade[1].parentNode.style.display = 'block';	//显示玩家的点数
	}

	aft.getElementsByTagName('button')[0].onclick = function(){		//叫牌按钮
		every(player);	//给玩家发一张牌
		if (parseInt(grade[1].innerHTML) > 21) {
			console.log('爆掉了');
			aft.style.display = 'none';
			makerChoose(false);		// 传的false表示玩家已经没有赢的机会
		}
	}

	aft.getElementsByTagName('button')[1].onclick = function(){		//听牌按钮
		aft.style.display = 'none';
		makerChoose(true);
	}

	reset.onclick = function(){
		bef.style.display = 'flex';
		res.style.display = 'none';
		while (mu.lastChild) {
			mu.removeChild(mu.lastChild);
		}
		while (pu.lastChild) {
			pu.removeChild(pu.lastChild);
		}
		for(var i=0;i<grade.length;i++){
			grade[i].innerHTML = 0;
			grade[i].parentNode.style.display = 'none';
		}
		flag = true;
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
	function deal(){
		if (parseInt(bet.innerHTML,10) > 0) {	// 每一次下注至少为5
			money = parseInt(bet.innerHTML,10);		//赌注入奖池
			bet.innerHTML = '0';	// 发牌后赌注归零
			every(maker);
			every(player);
			every(maker);
			every(player);	//一边先发两张
			// console.log(used.length);
		}
	}

	// 每次发牌
	function every(obj){
		
			var ran = Math.round(Math.random() * (used.length-1)),	// 随机数
				ul = obj.getElementsByTagName('ul')[0],
				count = 0,
				index = 0;
			while (used[ran] == 0) {
				ran = Math.round(Math.random() * used.length);
			}

			var tem = poker(Math.floor(ran/13),Math.floor(ran%13));
			tem.style.display = 'block';
			ul.appendChild(tem);

			if (ran%13 < 10) {
				count = ran%13+1;
			} else {
				count = 10;
			}
			if (obj == player) {
				index = 1;
			}
			grade[index].innerHTML = parseInt(grade[index].innerHTML) + count;
			console.log(grade[index].innerHTML);
			used[ran] = 0;
		
	}

	// 通过随机数生成一张牌
	function poker(i1,i2){
		var tem = document.createElement('li');
		if (flag) {		//庄家的第一张牌显示背面
			first[0] = i1;
			first[1] = i2;
			i1 = 3;
			i2 = 13;
			flag = false;
			console.log(first);
		}
		switch (i1) {
			case 0:
				tem.style.backgroundImage = 'url(images/club2.jpg)';
				break;
			case 1:
				tem.style.backgroundImage = 'url(images/diamond2.jpg)';
				break;
			case 2:
				tem.style.backgroundImage = 'url(images/hearts2.jpg)';
				break;
			case 3:
				tem.style.backgroundImage = 'url(images/spade2.jpg)';
				break;
			default:
				console.log('随机数计算错误，发不出牌');
				break;
		}
		if (i2 < 5) {
			tem.style.backgroundPosition = -70*i2+'px 0px';
		} else if (i2 < 10) {
			tem.style.backgroundPosition = -70*(i2-5)+'px 183px';
		} else if (i2 < 13) {
			tem.style.backgroundPosition = -70*(i2-10)+'px 90px';
		} else if (i2 == 13) {
			tem.style.backgroundPosition = -282+'px 90px';	//唯一一张牌面
		}

		return tem;
	}

	// 当玩家爆掉或选择听牌时，控制权交回给庄家
	function makerChoose(flag){
		var tem = poker(first[0],first[1]),
			flag2 = true,
			text = '';
			ul = maker.getElementsByTagName('ul')[0];
		ul.replaceChild(tem, ul.childNodes[0]);		//把牌面替换成正面

		grade[0].parentNode.style.display = 'block'		//显示庄家的点数

		while(parseInt(grade[0].innerHTML, 10) < 17){	//当庄家的点数小于18时，一直叫牌
			every(maker);
		}

		if (parseInt(grade[0].innerHTML, 10) > 21) {
			console.log('庄家也爆掉了');
			flag2 = false;
		}

		if (flag) {		//如果玩家没爆掉
			if (flag2) {	//如果庄家也没爆掉
				if ((parseInt(grade[0].innerHTML, 10)) > (parseInt(grade[1].innerHTML, 10))) {
					text = '真不爽，又输了！';
				} else if ((parseInt(grade[0].innerHTML, 10)) < (parseInt(grade[1].innerHTML, 10))) {
					text = '爽呆了，又赚了！';
					over.innerHTML = parseInt(over.innerHTML,10) + money*2;
				} else {
					text = '真不巧，和了';
					over.innerHTML = parseInt(over.innerHTML,10) + money;
				}
			} else {
				text = '哈哈哈！他爆掉了！';
				over.innerHTML = parseInt(over.innerHTML,10) + money*2;
			}
		} else {
			if (flag2) {
				text = '真不爽，又输了！';
			} else {
				text = '哈哈哈！都爆掉了！';
				over.innerHTML = parseInt(over.innerHTML,10) + money;
			}
		}

		res.childNodes[1].innerHTML = text;
		res.style.display = 'flex';
	}
}