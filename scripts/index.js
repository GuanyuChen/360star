window.onload = function(){
	var start = document.getElementById('start'),
		game = document.getElementById('game'),
		but = start.getElementsByTagName('button')[0];

	but.onclick = function(){
		start.style.display = 'none';
		game.style.display = 'block';
	}
}