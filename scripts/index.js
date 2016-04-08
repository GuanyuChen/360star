window.onload = function(){
	var start = document.getElementById('start'),	// 开始游戏页面
		game = document.getElementById('game'),		// 游戏页面
		but = start.getElementsByTagName('button')[0],	// 开始游戏按钮
		add = document.getElementById('add'),	// 下注按钮
		addCard = document.getElementById('deal'),		// 发牌按钮
		bet = document.getElementById('bet'),	//下注金额span
		over = document.getElementById('over'),		//剩余金币span
		club = document.getElementById('club'),
		diamond = document.getElementById('diamond'),
		hearts = document.getElementById('hearts'),
		spade = document.getElementById('spade'),
		count = [];		//52张牌加一个牌面

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
		deal();
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

	// 发牌
	function deal(){
		if (parseInt(bet.innerHTML,10) > 0) {	// 每一次下注至少为5
			bet.innerHTML = '0';	// 发牌后赌注归零
			console.log('发牌啦');
			console.log(count);

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
		}
	}
}