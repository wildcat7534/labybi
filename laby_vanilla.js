/*"use strict";*/
var chrono = document.querySelector('#chrono');
var perdus = document.querySelectorAll(".perdu");
var level = document.querySelector('#level');
var check = document.querySelector("#check");
var checks = document.querySelectorAll('#game input[name="check"]');
var labyMenu = document.querySelector('#labyMenu');
var retourMenu = document.querySelector('#retourMenu');
var theLabels = document.querySelectorAll('label');
var gamePlateau = document.querySelector('#game');
var plateaux = document.querySelectorAll('.plateau');
var chemins = document.querySelectorAll('.chemin');
var valide = document.querySelector('#valide');
var choixOptions = document.querySelectorAll('#labyMenu ul li');
var divWin = document.querySelector('#win');
var bordGauche = document.querySelector('#bordGauche');
var bordDroite = document.querySelector('#bordDroite');
var nextLevels = document.querySelectorAll('.nextLevel');
var cssRond = document.querySelector('#plateauRond');
var boite = document.querySelector('#boite');

var label_gagner = document.querySelector("#label_gagner");

var interval;
var timesUP = 5; 
var temps = 0;
var win = null;
var chronoDisplay;
var bouton_menu = document.querySelector('#menu button');
var ul_menu = document.querySelector('#menu ul');
var menu_chrono = document.querySelector('#optionChrono');
var menu_timeUP = document.querySelector('#optionVSmontre');

for( var choixOpt of choixOptions ){
	choixOpt.addEventListener('click', function(){
		if( this.id == 'optionVSmontre' ){
			reloadGame();

			chronoDisplay = setInterval(chronoTimer, 1000);
			gameEnCour();
		}else if( this.id == 'formePlateau' ){
			changeWorld();
		}else if( this.id == 'optionLibre' ){

			reloadGame();
		}else if( this.id == 'optionChrono' ){
			reloadGame();
			chronos();
		}else if( this.id == 'shufflePlateau' ){
			 deleteOldPath();
			 randomLevel();
		}

	});
};
retourMenu.addEventListener('click', function(){
	labyMenu.style.display = 'flex';
});


function changeWorld(){
	cssRond.removeAttribute('href', 'laby_vanilla_rond.css');
	for(var plateau of plateaux ){
		if( plateau.classList.contains('plateauRond') ){

			plateau.classList.remove('plateauRond');

			for( var perdu of perdus ){
				perdu.classList.remove('perduRond');
			}
			for( var chemin of chemins ){
				chemin.classList.remove('cheminRond');
			}
			for( var nextLevel of nextLevels ){
				valide.style.top = '0';
			}
			bordDroite.style.display = 'block';
			bordGauche.style.display = 'block';

		}else{

			cssRond.setAttribute('href', 'laby_vanilla_rond.css');
			plateau.classList.add('plateauRond');
			for( var perdu of perdus){
				perdu.classList.add('perduRond');
			}
			for(var chemin of chemins){
				chemin.classList.add('cheminRond');
			}
			bordDroite.style.display = 'none';
			bordGauche.style.display = 'none';
			divWin.style.borderRadius = '100%';
			for( var nextLevel of nextLevels ){
				nextLevel.style.top = '95px';
			}
		}
	}
}

function reloadGame(){
	clearTimeout(interval);
	clearInterval(chronoDisplay);
	win = null;
	temps = 0;
	timesUP = 5;
	level.style.color = "aliceblue";
	level.innerHTML = "Level 1";
	labyMenu.style.display = 'none';
	gamePlateau.style.animationName = '';
	chrono.innerHTML = '';

	for( var check of checks ){

		check.checked = false;
	}
	for( var perdu of perdus ){
		perdu.style.display = '';
	}
}

//pour le meilleur temps
function chronos(){

	interval = setTimeout(chronos, 1000);

	chrono.innerHTML = temps
						+" secondes écoulées !";
	temps++;
}

//pour le VS la montre
function gameEnCour(){
	
	if( win == false ){ // Lose
		
		clearInterval(chronoDisplay);

		chrono.style.color = 'red';

		chrono.innerHTML = "Temps écoulé ! PERDU";

		chrono.classList.remove('urgent');

		for( var perdu of perdus){
			perdu.style.display = "flex";
		}

	}else if( win == true ){ // Victory

		chrono.classList.remove('urgent');
		/*chrono.style.color = 'darkgoldenrod';*/
		chrono.innerHTML = "bravo ! en : "
							+temps +" secondes !";

		clearInterval(chronoDisplay);
		saucer();

	}else{
		
		setTimeout(gameEnCour, 500);
	}	
}

//l'affichage du Chrono
function chronoTimer(){
	temps++

	if( temps > timesUP ){

		win = false;
	}

	var rest = ( timesUP - temps );
	
	chrono.innerHTML = "Time : "
						+temps
						+" / "
						+timesUP
						+" secondes !";

	if( rest > 4 ){
	
		chrono.classList.remove('urgent');
	}
	else if( rest < 4 && rest > 0 ){

		chrono.classList.add('urgent');

	}
};

theLabels.forEach(function(labelCliquer, j){

	j = j + 1;

	labelCliquer.addEventListener('click', function(){

			timesUP += 3;

			level.innerHTML = "Level " +( j + 1 );


			if( j == 4 ){
				win = true;
				level.style.color = "gold";
				level.innerHTML = "*Gold Level*";
				plateauAnnimeFin();
			};
	});
});

function saucer(){
	var saucers = document.querySelectorAll('.saucerEnd');

	setTimeout(function (){

		for( var saucer of saucers ){
			
			saucer.style.animationName = 'saucer';
		};
	},1000);

	setTimeout(function (){
		
		for( var saucer of saucers ){
			
			saucer.style.animationName = '';
		};

	}, 6000);
};

function plateauAnnimeFin(){

	gamePlateau.style.animationName = 'plateauAnnimeFin';

};


//------------------------------------------------------//
// --------------------- Dev MODE -------------------- //
var divDebug = document.createElement('div');
var labelDebug = document.createElement('label');
var inputDebug = document.createElement('input');
divDebug.id = 'debug';
labelDebug.setAttribute('for', 'godMod');
inputDebug.id = 'godMod'

inputDebug.setAttribute('type', 'checkbox');

document.body.appendChild(divDebug);
divDebug.appendChild(labelDebug);
divDebug.appendChild(inputDebug);

labelDebug.innerHTML = '[Dev mod] GodMod -->';

inputDebug.addEventListener('click', function(){

	debug();

});

function debug(){
	if ( inputDebug.checked ){

    	boite.setAttribute("DEV",0);

		for( var perdu of perdus){

			perdu.classList.remove('perdu');

		};
	}else if( !inputDebug.checked ){
		boite.removeAttribute("DEV",0);

		for(perdu of perdus){

			perdu.classList.add('perdu');

		};
	}
}
//----------------------------- END - Dev Mode -------------------------//

//---------------------------------------------------------------------------------//
//------------------------------ RANDOM LEVEL ! -----------------------------------//

var balades = [
		{
			sentiera : [3,1,4,7]
		},
		{
			sentiera : [3,1,4,4],
			sentierb : [4,3,4,6],
			sentierc : [3,5,3,8],
		},
		{
			sentiera : [3,1,4,4],
			sentierb : [2,3,2,6],
			sentierc : [3,5,3,8],
		},
		{
			sentiera : [4,1,4,3],
			sentierb : [5,3,2,3],
			sentierc : [2,4,2,6],
			sentierd : [3,5,5,5],
			sentiere : [4,6,4,8],
		}
];
var baladesRondes = [
		{
			sentiera : [5,1,6,9]
		},
		{
			sentiera : [5,1,6,4],
			sentierb : [6,3,7,6],
			sentierc : [5,5,6,9],
		},
		{
			sentiera : [5,1,6,4],
			sentierb : [4,3,5,6],
			sentierc : [5,5,6,9],
		},
		{
			sentiera : [6,1,7,3],
			sentierb : [7,3,5,3],
			sentierc : [5,4,5,6],
			sentierd : [3,5,5,5],
			sentiere : [5,6,5,9],
		}
];


var divFin = document.querySelectorAll('.divFin');
var plateaux = document.querySelectorAll('.plateau');
var numPiks = new Array();
numPiks = [3, 2, 1, 0];

var test = 0;
var NumPlateau = 0;

function shuffle(){ //shuffle un numéro dans numPiks puis l'enlève.

	console.log("Lancement Shuffle : ");

	var choix = Math.random() * ((numPiks.length) - 0) + 0;
	choix = Math.floor(choix);
	console.log("Choix : ", choix);

	var choixAenvoyer = numPiks[choix];
	console.log("numPiks[choix] : ", choixAenvoyer);

	let removed = numPiks.splice(choix, 1);
	console.log("numPiks.splice(choix) : ", numPiks);
	
	return choixAenvoyer;
}

function randomLevel(){ //Cache les anciens niveaux  et construit les niveaux au hasard.

	while( test <= 3 ){

		var choix = shuffle();

		console.log("Numéro choix tiré : ", choix);

		if( choix == 0 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
			}

			console.log("Labyrinthe 0 crée ! au lvl : ", NumPlateau);

			ex[0].style.gridArea = balades[0].sentiera[0]+"/"+balades[0].sentiera[1]+"/"
								  +balades[0].sentiera[2]+"/"+balades[0].sentiera[3];
				
			plateaux[NumPlateau].insertBefore(ex[0], divFin[NumPlateau]);
		

		}
		else if( choix == 1 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
			}

			console.log("Labyrinthe 1 crée ! au lvl : ", NumPlateau);

			ex[0].style.gridArea = balades[1].sentiera[0]+"/"+balades[1].sentiera[1]+"/"
								  +balades[1].sentiera[2]+"/"+balades[1].sentiera[3];
			ex[1].style.gridArea = balades[1].sentierb[0]+"/"+balades[1].sentierb[1]+"/"
								  +balades[1].sentierb[2]+"/"+balades[1].sentierb[3];
			ex[2].style.gridArea = balades[1].sentierc[0]+"/"+balades[1].sentierc[1]+"/"
								  +balades[1].sentierc[2]+"/"+balades[1].sentierc[3];

			plateaux[NumPlateau].insertBefore(ex[0], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[1], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[2], divFin[NumPlateau]);
							 
		}

		else if( choix == 2 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
			}

			console.log("Labyrinthe 2 crée ! au lvl : ", NumPlateau);

			ex[0].style.gridArea = balades[2].sentiera[0]+"/"+balades[2].sentiera[1]+"/"
							  	  +balades[2].sentiera[2]+"/"+balades[2].sentiera[3];
			ex[1].style.gridArea = balades[2].sentierb[0]+"/"+balades[2].sentierb[1]+"/"
								  +balades[2].sentierb[2]+"/"+balades[2].sentierb[3];
			ex[2].style.gridArea = balades[2].sentierc[0]+"/"+balades[2].sentierc[1]+"/"
								  +balades[2].sentierc[2]+"/"+balades[2].sentierc[3];

			plateaux[NumPlateau].insertBefore(ex[0], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[1], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[2], divFin[NumPlateau]);
		}

		else if( choix == 3 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
			}

			console.log("Labyrinthe 3 crée ! au lvl : ", NumPlateau);

			ex[0].style.gridArea  = balades[3].sentiera[0]+"/"+balades[3].sentiera[1]+"/"
								   +balades[3].sentiera[2]+"/"+balades[3].sentiera[3];
			ex[1].style.gridArea = balades[3].sentierb[0]+"/"+balades[3].sentierb[1]+"/"
								  +balades[3].sentierb[2]+"/"+balades[3].sentierb[3];
			ex[2].style.gridArea = balades[3].sentierc[0]+"/"+balades[3].sentierc[1]+"/"
								  +balades[3].sentierc[2]+"/"+balades[3].sentierc[3];
			ex[3].style.gridArea = balades[3].sentierd[0]+"/"+balades[3].sentierd[1]+"/"
								  +balades[3].sentierd[2]+"/"+balades[3].sentierd[3];
			ex[4].style.gridArea = balades[3].sentiere[0]+"/"+balades[3].sentiere[1]+"/"
								  +balades[3].sentiere[2]+"/"+balades[3].sentiere[3];

			plateaux[NumPlateau].insertBefore(ex[0], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[1], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[2], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[3], divFin[NumPlateau]);
			plateaux[NumPlateau].insertBefore(ex[4], divFin[NumPlateau]);
		}

		NumPlateau++;

		test++;
	}
};

function deleteOldPath(){
	originPaths = document.querySelectorAll('.originPath');

	for(var path of originPaths){
		console.log(path);
		path.classList.add('hide');
	}
};




/*
EXEMPLE

	grid-column-start: 4;
    grid-column-end: 6;
    grid-row-start: 2;
    grid-row-end: 2;

*/


//idée choix .plateau formes :

/*    background-color: indianred;
    background: radial-gradient(circle farthest-corner at center center, #ff0000 0%, #540000 130%);
    box-shadow: 38px -9px 29px 3px rgba(95,0,0,0.73);
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    background: radial-gradient(circle farthest-corner at center center, #ff0000 30%, #000000 100%);
    grid-template-rows: repeat(5, 1fr);
    position: relative; */