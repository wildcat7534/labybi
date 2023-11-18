var plateau = document.getElementById('plateau');
var chemin = document.getElementById('chemin');

var b = 50;
var c = 0;
//go(chemin);

function go(varC){	
	console.log(varC)
	if(b < 150){
		
		b += 10;
		gaucheADroite(varC);
	}else{
		clearInterval(ht);
/*		hautVersBas();
*/	};
};

console.log(chemin)
var ht = setInterval(go, 2000, chemin);



function gaucheADroite(element){
	console.log(element)
	element.style.width = b +'px';
};


function hautVersBas(){
	var div2 = document.createElement('div');

	plateau.appendChild(div2);
	div2.setAttribute('id', 'chemin2');
	div2.style.position = 'absolute';
	div2.style.top = b +20 +'px';


	div2.style.left = b - 50 +'px';
	b = 50;
	var ht2 = setInterval(go, 2000, div2);
};





/*
function goBas(){
	
	if(c < 50){
		
		c += 10;
		hautVersBas(c);
	}else{
		clearInterval(htGoBas);

	};
};*/
