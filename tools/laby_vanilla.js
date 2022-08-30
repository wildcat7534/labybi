var chrono = document.querySelector('#chrono');
var perdus = document.querySelectorAll(".perdu");
var level = document.querySelector('#level');
var check = document.querySelector("#check");
var checks = document.querySelectorAll('#game input[name="check"]');
var labyMenu = document.querySelector('#labyMenu');
var retourMenu = document.querySelector('#retourMenu');
var reload = document.querySelector('#reload');
var reloadSpan = document.querySelector('#reloadSpan');
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
var oldScore = document.querySelector('#oldScoreScreen');
var oldPlayer = document.querySelector('#oldPlayer');
var oldScore1 = document.querySelector('#oldScoreScreen2');
var oldPlayer1 = document.querySelector('#oldPlayer2');
var oldScore2 = document.querySelector('#oldScoreScreen3');
var oldPlayer2 = document.querySelector('#oldPlayer3');
var newScore;
var newPlayer = "PhéNiX77";
var metalTop = document.querySelector('#metalTop');
var metalBottom = document.querySelector('#metalBottom');

var label_gagner = document.querySelector("#label_gagner");
var interval;
var timesUP = 5; 
var temps = 0;
var win = null;
var chronoDisplay;
var chronoRunning = false;
var chronoTimerRunning = false;
var mondeRond = false;
var bouton_menu = document.querySelector('#menu button');
var ul_menu = document.querySelector('#menu ul');
var menu_chrono = document.querySelector('#optionChrono');
var menu_timeUP = document.querySelector('#optionVSmontre');
var menuChangeWorld = document.querySelector('#boutonChangeWorld');
var finavecEE = 0;
var goMarioKartColor;
var colorDivBestScore = document.querySelector('#infoScreen #score div:nth-child(2)');
colorDivBestScore.classList.add('marioKartColorDivs');

transiMetal();
displayPlayer();

for( var choixOpt of choixOptions ){
	choixOpt.addEventListener('click', function(){
		if( this.id == 'formePlateau' ){

			deleteNewPath();
			changeWorld();

		}else if( this.id == 'shufflePlateau' ){

			 deleteOldPath();
			 deleteNewPath();
			 var copyNumPiks = copyTabNumPiks();
			 numPlateau = 0;
			 randomLevel();

		}else if( this.id == 'optionLibre' ){
			transiMetal();

			setTimeout(function(){

				reloadGame();
			
			}, 1000);
		}else if( this.id == 'optionChrono' ){
			transiMetal();

			setTimeout(function(){

				reloadGame();
				chronos();
		
			}, 1000);
		}else if( this.id == 'optionVSmontre' ){
			transiMetal();

			setTimeout(function(){

				reloadGame();

				gameEnCour();
				chronoTimer();

			}, 1000);
		}else if( this.id == 'optionRetourPartie' ){

			labyMenu.style.display = 'none';

			if( chronoRunning == true ){

				chronos();
				
			}else if( chronoTimerRunning == true ){

				chronoTimer();	
			}


		}else if( this.id == 'effaceScore' ){

			localStorage.removeItem(newPlayer);
			console.log('Effacement de la mémoire locale.');
		}
	});
};


retourMenu.addEventListener('click', function(){ // retour menu AVEC jeu en pause que l'on peut reprendre

	transiMetal();
	clearTimeout(interval);
	clearInterval(chronoDisplay);

	setTimeout(function(){

		labyMenu.style.display = 'flex';
		
	}, 1000)

});

function reloadGo(){

	// reload.style.height = '40px';
	reload.classList.add('reloadOpen');

	reload.addEventListener('click', function(){

		reloadGame();
		gameEnCour();
		chronoTimer();

/*		reload.style.height = '7px';
*/		reload.classList.remove('reloadOpen');
			
	});
};
	
function transiMetal(){ // portes metaliques animation

	metalTop.style.animationName = "topDown";
	metalBottom.style.animationName = "bottomTop";

	setTimeout(function(){
		metalTop.style.animationName = "";
		metalBottom.style.animationName = "";
	}, 2500)
};
function transiMetalCLOSE(){ // portes metaliques
	
	metalTop.style.animationName = "topDownCLOSE";
	metalBottom.style.animationName = "bottomTopCLOSE";
	metalTop.style.animationFillMode = "forwards";
	metalBottom.style.animationFillMode = "forwards";
};
function transiMetalCLOSEopen(){ // portes metaliques

	metalTop.style.animationName = "topDownCLOSEopen";
	metalBottom.style.animationName = "bottomTopCLOSEopen";
};
var letsGo;
function changeWorld(){ //le monde rond ou pas !
	for(var plateau of plateaux ){
		if( plateau.classList.contains('plateauRond') ){

			plateau.classList.replace('plateauRond', 'plateauNormal');
			mondeRond = false;

			for( var perdu of perdus ){
				perdu.classList.remove('perduRond');
			}
			for( var chemin of chemins ){
				chemin.classList.remove('cheminRond');
			}
			for( var nextLevel of nextLevels ){
				nextLevel.style.top = '0';
			}
			bordDroite.style.display = 'block';
			bordGauche.style.display = 'block';
			divWin.style.borderRadius = '0%';
			cssRond.removeAttribute('href', 'tools/laby_vanilla_rond.css');
			console.log('tourne plus');
			clearTimeout(letsGo);
			plateau.classList.remove('tourneTourne');

		}else if( plateau.classList.contains('plateauNormal')){

			cssRond.setAttribute('href', 'tools/laby_vanilla_rond.css');
			plateau.classList.replace('plateauNormal', 'plateauRond');
			mondeRond = true;
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
			console.log('tourne !');
			plateau.classList.add('tourneTourne');

			tourneTourne();
		}
	}
}

var gameTourne = document.querySelector('#game'); // fait tourner le monde rond !
var tour = 0;

function tourneTourne(){

	letsGo = setTimeout(tourneTourne, 1000);
	tour += 2;
	gameTourne.style.transform = 'rotate(' +tour +'deg)';

};
function reloadGame(){  // reload tous pour rejouer !
	
	regex_mehdi.lastIndex = 0;
	regex_volo.lastIndex = 0;
	if(regex_mehdi.test(newPlayer)){

		timesUP = 10;
		console.log('bonus temps pour Mehdi : ', timesUP)


	}else if(regex_volo.test(newPlayer)){

		timesUP = 50;
		console.log('bonus temps concepteur: ', timesUP)

	}else{
		timesUP = 7;
	}
	for(var plateau of plateaux ){

		if(plateau.classList.contains('plateauRond')){
			timesUP = 20;

	}};

	reload.classList.remove('reloadOpen');
	oldScore.innerHTML = "";
	oldPlayer.innerHTML = "";
	oldScore1.innerHTML = "";
	oldPlayer1.innerHTML = "";
	oldScore2.innerHTML = "";
	oldPlayer2.innerHTML = "";
	clearTimeout(goMarioKartColor);
	chronoRunning = false;
	chronoTimerRunning = false;
	clearTimeout(interval);
	clearTimeout(gameEnCour);
	clearTimeout(chronoDisplay);
	numPlateau = 0;
	win = null;
	temps = 0;
	
	level.style.color = "";
	level.innerHTML = "Level 1";
	labyMenu.style.display = 'none';
	gamePlateau.style.animationName = '';
	chrono.innerHTML = '';
	chrono.style.color = '';
	chrono.classList.remove('urgent');
	var copyNumPiks = copyTabNumPiks();

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
	chronoRunning = true;

	if( win == true ){

		clearTimeout(interval);

	}
}

//pour le VS la montre
function gameEnCour(){
	
	if( win == false ){ // Lose
		
		clearInterval(chronoDisplay);

		chrono.style.color = 'red';

		chrono.innerHTML = "Temps écoulé ! PERDU";

		chrono.classList.remove('urgent');

		reloadGo();

		for( var perdu of perdus){
			perdu.style.display = "flex";
		}

	}else if( win == true ){ // Victory

		chrono.classList.remove('urgent');

		chrono.innerHTML = "bravo ! en : "
							+temps +" secondes !";

		displayScoreScreen(temps);
		clearInterval(chronoDisplay);
		saucer();

		totalFin();

	}else{
		
		setTimeout(gameEnCour, 500);
	}	
}

//l'affichage du Chrono
function chronoTimer(){

	chronoDisplay = setTimeout(chronoTimer, 1000);

	chronoTimerRunning = true;

	temps++

	if( temps > timesUP ){

		win = false;
	}

	let rest = ( timesUP - temps );
	
	chrono.innerHTML = "Time : "
						+temps
						+" / "
						+timesUP
						+" secondes !";

	if( rest > 3 ){
	
		chrono.classList.remove('urgent');
	}
	else if( rest <= 3 && rest > 0 ){

		chrono.classList.add('urgent');

	}
};

theLabels.forEach(function(labelCliquer, j){  //animation end game !

	j = j + 1;

	labelCliquer.addEventListener('click', function(){

			timesUP += 5;

			level.innerHTML = "Level " +j ;


			if( j == theLabels.length ){
				
				win = true;
				level.style.color = "gold";
				level.innerHTML = "*Gold Level*";

				plateauAnnimeFin();
			};
	});
});

function plateauAnnimeFin(){

	gamePlateau.style.animationName = 'plateauAnnimeFin';

};

function saucer(){  //animation end game !

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



//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//
//------------------------------END OF GAME-----------Fin du jeu--------------------------------//
//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//

function totalFin(){



	var labyMenu = document.querySelector('#labyMenu');
	var rules = document.querySelector('#rules');
	var gifExo = document.querySelector('#gifExo');

	rules.classList.add('hide', 'hide2');
	gifExo.classList.add('hide', 'hide2');

	setTimeout(function(){

		welcome.classList.remove('Hide', 'Hide2');

	}, 2500);

	welcomeMessage.classList.add('endMessage');
	welcomeMessage.classList.remove('animeStarWars');

	var boutonSkipWelcome = document.querySelector('#boutonSkipWelcome');
	boutonSkipWelcome.style.display = 'none';

	if(  finavecEE < 100 && finavecEE > 0 ){

		welcomeMessage.innerHTML = 'Bravo ' +newPlayer +' vous avez finit le jeu en trouvant '
									+finavecEE +'% des secrets !';
	}else if( finavecEE >= 100){

		regex_christophe.lastIndex = 0;
		if(regex_christophe.test(newPlayer)){
			console.log('Fin pour :' +newPlayer);
			welcomeMessage.innerHTML = "Bravo !!!! " +newPlayer +" Non d'un Chocobo doré !!!"
									+"Tu as fais" +finavecEE +" % des secrets trouvés ! Je suis pas étonné venant de toi !\
									Félicitation ;D ";

		}else if(regex_fred.test(newPlayer)){
			console.log('Fin pour :' +newPlayer);
			welcomeMessage.innerHTML = "Bravo !!!! " +newPlayer
									+"Tu as fais" +finavecEE +" % des secrets trouvés ! Et en plus tu finis le jeu à 100% !";

		}else{

			welcomeMessage.innerHTML = 'Bravo !!!! ' +newPlayer +' vous avez trouvé tous les secrets !! '
									+'avec '+finavecEE +'% des secrets trouvés ! Félicitation xD ';
		}
	}else if( finavecEE == 0 ){

		welcomeMessage.innerHTML = 'Bravo ' +newPlayer +' vous avez finit le jeu mais vous avez trouvé aucun secret ( '+finavecEE +' % )'
	}

	var h1Laby = document.querySelector('#theTitle');
	var credits = document.querySelector('#credits');
	var creditsP = document.querySelector('#credits p');

	setTimeout(function(){

		welcome.classList.add('Hide', 'Hide2');

		h1Laby.classList.add('marioKartColorAnimeCssLent');
		h1Laby.classList.add('creditsEnd');

		credits.style.display = 'flex';


		setTimeout(function(){

			creditsP.classList.add('animationCredits');

			
		}, 2000);


	}, 8000);

	setTimeout(function(){

		h1Laby.classList.remove('creditsEnd');
		h1Laby.classList.remove('marioKartColorAnimeCssLent');

		creditsP.classList.remove('animationCredits');
		credits.style.display = 'none';
		
	},30000);
};


//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//
//------------------------------END OF GAME----------------------------------------------------//
//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//






//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//------------------------------ RANDOM LEVEL ! -----------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//

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

var numPiks = [3, 2, 1, 0];
var copyNumPiks = copyTabNumPiks();

function shuffle(){ //shuffle un numéro dans numPiks puis l'enlève.
	
	console.log("Lancement Shuffle : ");

	var choix = Math.random() * ((copyNumPiks.length) - 0) + 0;
	choix = Math.floor(choix);
	console.log("Choix : ", choix);

	var hasardNumber = copyNumPiks[choix];
	console.log("copyNumPiks[choix] : ", hasardNumber);

	let removed = copyNumPiks.splice(choix, 1); // CHOIX ou HASARDNUMBER to avoid repeat lvl
	console.log("copyNumPiks.splice(choix) : ", copyNumPiks);
	
	return hasardNumber;
}

function copyTabNumPiks(){
	 copyNumPiks = numPiks.slice();
	 return copyNumPiks;
}

var numPlateau  = 0;
function randomLevel(){ //Cache les anciens niveaux  et construit les niveaux au hasard.

	while( numPlateau <= 4 && mondeRond == false  ){

		var choix = shuffle();

		console.log("Numéro choix tiré : ", choix);

		if( choix == 0 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');

			}

			console.log("Labyrinthe 0 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = balades[0].sentiera[0]+"/"+balades[0].sentiera[1]+"/"
								  +balades[0].sentiera[2]+"/"+balades[0].sentiera[3];
				
			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
		

		}
		else if( choix == 1 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 1 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = balades[1].sentiera[0]+"/"+balades[1].sentiera[1]+"/"
								  +balades[1].sentiera[2]+"/"+balades[1].sentiera[3];
			ex[1].style.gridArea = balades[1].sentierb[0]+"/"+balades[1].sentierb[1]+"/"
								  +balades[1].sentierb[2]+"/"+balades[1].sentierb[3];
			ex[2].style.gridArea = balades[1].sentierc[0]+"/"+balades[1].sentierc[1]+"/"
								  +balades[1].sentierc[2]+"/"+balades[1].sentierc[3];

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
							 
		}

		else if( choix == 2 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 2 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = balades[2].sentiera[0]+"/"+balades[2].sentiera[1]+"/"
							  	  +balades[2].sentiera[2]+"/"+balades[2].sentiera[3];
			ex[1].style.gridArea = balades[2].sentierb[0]+"/"+balades[2].sentierb[1]+"/"
								  +balades[2].sentierb[2]+"/"+balades[2].sentierb[3];
			ex[2].style.gridArea = balades[2].sentierc[0]+"/"+balades[2].sentierc[1]+"/"
								  +balades[2].sentierc[2]+"/"+balades[2].sentierc[3];

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
		}

		else if( choix == 3 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(balades[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 3 crée ! au lvl : ", numPlateau);

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

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[3], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[4], divFin[numPlateau]);
		}

		numPlateau++;
		
	}
	while( numPlateau <= 4 && mondeRond == true ){


		var choix = shuffle();

		console.log("Numéro choix tiré : ", choix);

		if( choix == 0 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(baladesRondes[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 0 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = baladesRondes[0].sentiera[0]+"/"+baladesRondes[0].sentiera[1]+"/"
								  +baladesRondes[0].sentiera[2]+"/"+baladesRondes[0].sentiera[3];
				
			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
		

		}
		else if( choix == 1 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(baladesRondes[choix]).length; nbDiv++ ){
				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 1 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = baladesRondes[1].sentiera[0]+"/"+baladesRondes[1].sentiera[1]+"/"
								  +baladesRondes[1].sentiera[2]+"/"+baladesRondes[1].sentiera[3];
			ex[1].style.gridArea = baladesRondes[1].sentierb[0]+"/"+baladesRondes[1].sentierb[1]+"/"
								  +baladesRondes[1].sentierb[2]+"/"+baladesRondes[1].sentierb[3];
			ex[2].style.gridArea = baladesRondes[1].sentierc[0]+"/"+baladesRondes[1].sentierc[1]+"/"
								  +baladesRondes[1].sentierc[2]+"/"+baladesRondes[1].sentierc[3];

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
							 
		}

		else if( choix == 2 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(baladesRondes[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 2 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea = baladesRondes[2].sentiera[0]+"/"+baladesRondes[2].sentiera[1]+"/"
							  	  +baladesRondes[2].sentiera[2]+"/"+baladesRondes[2].sentiera[3];
			ex[1].style.gridArea = baladesRondes[2].sentierb[0]+"/"+baladesRondes[2].sentierb[1]+"/"
								  +baladesRondes[2].sentierb[2]+"/"+baladesRondes[2].sentierb[3];
			ex[2].style.gridArea = baladesRondes[2].sentierc[0]+"/"+baladesRondes[2].sentierc[1]+"/"
								  +baladesRondes[2].sentierc[2]+"/"+baladesRondes[2].sentierc[3];

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
		}

		else if( choix == 3 ){

			let ex = new Array();
			for( var nbDiv = 0; nbDiv < Object.keys(baladesRondes[choix]).length; nbDiv++ ){

				ex.push(document.createElement('div'));
				ex[nbDiv].style.backgroundColor = 'aliceblue';
				ex[nbDiv].classList.add('chemin');
				ex[nbDiv].classList.add('newPaths');
			}

			console.log("Labyrinthe 3 crée ! au lvl : ", numPlateau);

			ex[0].style.gridArea  = baladesRondes[3].sentiera[0]+"/"+baladesRondes[3].sentiera[1]+"/"
								   +baladesRondes[3].sentiera[2]+"/"+baladesRondes[3].sentiera[3];
			ex[1].style.gridArea = baladesRondes[3].sentierb[0]+"/"+baladesRondes[3].sentierb[1]+"/"
								  +baladesRondes[3].sentierb[2]+"/"+baladesRondes[3].sentierb[3];
			ex[2].style.gridArea = baladesRondes[3].sentierc[0]+"/"+baladesRondes[3].sentierc[1]+"/"
								  +baladesRondes[3].sentierc[2]+"/"+baladesRondes[3].sentierc[3];
			ex[3].style.gridArea = baladesRondes[3].sentierd[0]+"/"+baladesRondes[3].sentierd[1]+"/"
								  +baladesRondes[3].sentierd[2]+"/"+baladesRondes[3].sentierd[3];
			ex[4].style.gridArea = baladesRondes[3].sentiere[0]+"/"+baladesRondes[3].sentiere[1]+"/"
								  +baladesRondes[3].sentiere[2]+"/"+baladesRondes[3].sentiere[3];

			plateaux[numPlateau].insertBefore(ex[0], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[1], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[2], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[3], divFin[numPlateau]);
			plateaux[numPlateau].insertBefore(ex[4], divFin[numPlateau]);
		}

		numPlateau++;
		

	}
};

function deleteOldPath(){
	originPaths = document.querySelectorAll('.originPath');

	for(var path of originPaths){
		console.log("Suppression originPath : ", path);
		path.classList.add('hide');
	}
};
function deleteNewPath(){
	newPaths = document.querySelectorAll('.newPaths');

	for(var path of newPaths){
		console.log("Suppression newPath : ", path);
		path.classList.add('hide');
	}
};
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//-------------------------END------RANDOM-----------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------//
//-----------menu contextuel-------------pas de Fin dispo----------------------------
//---------------------------------------------------------------------------------//

var pos;
var optionLibre = document.querySelector('#optionLibre');
var pasFin = document.querySelector('#pasFin');


optionLibre.addEventListener('mouseout', function(){

	pasFin.style.display = 'none';

});
optionLibre.addEventListener('mouseenter', function(){
	
		pasFin.style.display = 'inline';
});
optionLibre.addEventListener('mousemove', function(e){

	 pos = {"x": e.clientX, "y": e.clientY};
	 pos.y += 15;
	 pos.x += 15;
	 pasFin.style.top = pos.y + "px";
	 pasFin.style.left = pos.x + "px";
});

var optionChrono = document.querySelector('#optionChrono');

optionChrono.addEventListener('mouseout', function(){

	pasFin.style.display = 'none';

});
optionChrono.addEventListener('mouseenter', function(){
	
		pasFin.style.display = 'inline';
});
optionChrono.addEventListener('mousemove', function(e){

	 pos = {"x": e.clientX, "y": e.clientY};
	 pos.y += 15;
	 pos.x += 15;
	 pasFin.style.top = pos.y + "px";
	 pasFin.style.left = pos.x + "px";
});



//-------------BONUS "+5" A FAIRE --------------------------------//

var gameLabels = document.querySelectorAll('#game label'); // BONUS "+5 SEC" suit le curseur !
var bonus = document.querySelector('#bonus');
var boite = document.querySelector('#boite');
var recupPosition = false;

for(var label of gameLabels){

	// cursorPo = cursorPosition();

	label.addEventListener('click', function(){

		cursorPosition();

		setTimeout(function(){

			bonus.classList.add('animationBonus');
			
		}, 100);


		setTimeout(function(){

			bonus.classList.remove('animationBonus');

			recupPosition = false;

		}, 2000);
		
	});
};

function cursorPosition(){

	recupPosition = true;

	boite.addEventListener('mousemove', function(e){
		
		if( recupPosition == true ){

			pos = {"x": e.clientX, "y": e.clientY};
			pos.y -= 25;
			pos.x += 17;
			bonus.style.top = pos.y + "px";
			bonus.style.left = pos.x + "px";

			console.log(pos.x, pos.y);
		}
	});

	
};
//-------------BONUS "+5" A FAIRE -------------END-------------------//



//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//-----------menu contextuel-------------pas de Fin dispo---------END--------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//




//---------------------------------DISPLAY SCORE------------------------------------------------//


		
var scoreBefore = 10;
var playerBefore = "Guillaume";

function displayScoreScreen(tempsReceived){
	
	oldScore.innerHTML = "*" +tempsReceived +" secondes*";
	oldPlayer.innerHTML = displayPlayer();

	if(tempsReceived < localStorage.getItem(newPlayer) ||  localStorage.getItem(newPlayer) == null ){

		localStorage.setItem(newPlayer, tempsReceived);	

		console.log('meileur temps : ', localStorage.getItem(newPlayer));

		marioKartColor();
	}

	if( localStorage.getItem(newPlayer) < scoreBefore ){

		oldScore1.innerHTML = "*" +localStorage.getItem(newPlayer) +" secondes*";
		oldPlayer1.innerHTML = displayPlayer();

	}else{

		oldScore1.innerHTML =  "*" +scoreBefore +" secondes*";
		oldPlayer1.innerHTML = playerBefore;

		console.log('enregistrement score : ', newPlayer, localStorage.getItem(newPlayer));
	}

		oldScore2.innerHTML = "*" +12 +" secondes*";
		oldPlayer2.innerHTML = "Mehdi";

}


var iDeg = 0;

function marioKartColor(){

	var marioKartColorDivs = document.querySelectorAll('.marioKartColorDivs');

		iDeg = (iDeg+30)%360;

		for( var divColor of marioKartColorDivs ){

			
			divColor.style.filter = "hue-rotate(" + iDeg +"deg)";

			}

		goMarioKartColor = setTimeout(marioKartColor, 200);
};

marioKartColor_menuChangeWorld();
function marioKartColor_menuChangeWorld(){

	iDeg = (iDeg+15)%360;
	
	setTimeout(marioKartColor_menuChangeWorld, 1000);
	menuChangeWorld.style.filter = "hue-rotate(" + iDeg +"deg)";
};

//------------------------------Fin display score----------------------------------------------------------//



//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//
// ------------------------------------- Dev MODE ------------------------------------------------------ //
//---------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//


var divDebug = document.createElement('div');
divDebug.id = 'debug';
divDebug.style.display = "none";

var eggSaucer = document.querySelector('#eggSaucer');
var egg = 1;
var countEggSaucer = 0;
eggSaucer.addEventListener('click', function(){
	console.log('[DEV]mode');
	egg++;

	if(egg == 5){

		divDebug.style.display = "flex";
		eggSaucer.style.display = "none";

		if(countEggSaucer == 0){

			finavecEE += 45;
			console.log('EGG : ',finavecEE );
			countEggSaucer = 1;
		}
	}
});
var divDev = document.createElement('div');
var labelDebug = document.createElement('label');
var labelClose = document.createElement('label');
var labelPhilipsHUE = document.createElement('label');
var inputDebug = document.createElement('input');
var inputClose = document.createElement('input');
var inputPhilipsHUE = document.createElement('input');
labelDebug.setAttribute('for', 'godMod');
inputDebug.id = 'godMod'

labelClose.setAttribute('for', 'closeDoor');
inputClose.id = 'closeDoor'

labelDebug.setAttribute('for', 'PhilipsHUE');
inputDebug.id = 'PhilipsHUE'

inputDebug.setAttribute('type', 'checkbox');
inputClose.setAttribute('type', 'checkbox');
inputPhilipsHUE.setAttribute('type', 'checkbox');

document.body.appendChild(divDebug);

divDebug.appendChild(divDev);
divDev.innerHTML = '[DEV mode]';
divDev.style.margin = '-2px auto 8px';

divDebug.appendChild(labelDebug);
divDebug.appendChild(inputDebug);

divDebug.appendChild(labelClose);
divDebug.appendChild(inputClose);

divDebug.appendChild(labelPhilipsHUE);
divDebug.appendChild(inputPhilipsHUE);

labelDebug.style.width = "50%";


labelDebug.innerHTML = 'GodMod    -->';
labelClose.innerHTML = 'closeDoor -->';
labelPhilipsHUE.innerHTML = 'stopMarioColor -->';

inputDebug.addEventListener('click', function(){

	debug();

});
inputPhilipsHUE.addEventListener('click', function(){
	console.log('clic HUE');

	clearTimeout(goMarioKartColor);

});
var tag = false;
inputClose.addEventListener('click', function(){

	transiMetalCLOSE();
	if(tag == false){
		tag = true;
		var spanOutOfOrder = document.createElement('span');
		var spanOutOfOrder2 = document.createElement('span');
		var spanOutOfOrder3 = document.createElement('span');
		var spanOutOfOrder4 = document.createElement('span');
		spanOutOfOrder.id = "outOfOrder";
		spanOutOfOrder2.id = "outOfOrder2";
		spanOutOfOrder3.id = "outOfOrder3";
		spanOutOfOrder4.id = "outOfOrder4";
		spanOutOfOrder.innerHTML = "OUT OF ORDER";
		spanOutOfOrder2.innerHTML = "CodePhéniX is a lie !";
		spanOutOfOrder3.innerHTML = "Brieuc = Big Brother";
		spanOutOfOrder4.innerHTML = "Guillaume is a reptilian";
		var metalTop = document.querySelector('#metalTop');
		var metalBottom = document.querySelector('#metalBottom');
		metalTop.appendChild(spanOutOfOrder);
		metalBottom.appendChild(spanOutOfOrder2);
		metalTop.appendChild(spanOutOfOrder3);
		metalTop.appendChild(spanOutOfOrder4);
	}

});
var saucerMetalEGG = document.querySelector('#saucerMetal');
var saucerEgg = 1;
var countSaucerMetalEgg = 0;
saucerMetalEGG.addEventListener('click', function(){
	saucerEgg++;
	if(saucerEgg == 5){

		transiMetalCLOSEopen();
		saucerEgg = 0;

		if(countSaucerMetalEgg == 0){

			finavecEE += 25;
			console.log('EGG : ',finavecEE );
			countSaucerMetalEgg = 1;
		}

	}
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
	
};
//----------------------------- END - Dev Mode -------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------EGGS-------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//

var saucerMenuOption = document.querySelector('#saucerMenuOption');
var saucerMenuOptionClick = 0;
var countSaucerMenuOption = 0;
saucerMenuOption.addEventListener('click', function(){

	saucerMenuOptionClick++;

		if(saucerMenuOptionClick == 5){

			saucerMenuOption.style.width = "20px";
			saucerMenuOption.style.height = "20px";

		if(countSaucerMenuOption == 0){

			finavecEE += 15;
			console.log('EGG : ',finavecEE );
			countSaucerMenuOption = 1;
		}


			saucerMenuOptionClick = 0;
		}
});
var labymenuH1 = document.querySelector('#labyMenu h1');
var labymenuH1Click = 0;
var countLabymenuH1 = 0;
labymenuH1.addEventListener('click', function(){

	labymenuH1Click++;

		if(labymenuH1Click == 5){

			labymenuH1.style.transform = "rotate(28deg)";
			labymenuH1.style.color = "#b55d38";

		if(countLabymenuH1 == 0){

			finavecEE += 10;
			console.log('EGG : ',finavecEE );
			countLabymenuH1 = 1;
		}

			labymenuH1Click = 0;
		}
});

var titreLabyMenu = document.querySelector('#titreLabyMenu');
var labymenuH2Click = 0;
var labymenuH2Rotate = 0;
var compteur = 0;
var countTitreLabyMenu =0;
titreLabyMenu.addEventListener('click', function(){

	labymenuH2Click++;

		if(labymenuH2Click == 5){

			if(countTitreLabyMenu == 0){

				finavecEE += 5;
				console.log('EGG : ',finavecEE );
				countTitreLabyMenu = 1;
			}

			rotateMM;
/*			titreLabyMenu.style.color = "#ec46be";*/

			var rotateMM = setInterval(function(){

				compteur++;

				labymenuH2Rotate = (labymenuH2Rotate +40);
				titreLabyMenu.style.transform = "rotateX("+labymenuH2Rotate +"deg)";

				if(labymenuH2Rotate >= 200){

					clearInterval(rotateMM);
					labymenuH2Click = 0;
					titreLabyMenu.style.color = "darkkhaki";
				}
			}, 500);
			
		}
		compteur = 0;
});

var optionOptions = document.querySelector('#optionOptions'); // Option supplemtentaire avec plateau rond et aléatoire
var menuLabyMenu = document.querySelector('#menuLabyMenu');
var optionLabyMenu = document.querySelector('#optionLabyMenu');
var optionLabyMenuRetour = document.querySelector('#optionLabyMenuRetour');

optionOptions.addEventListener('click', function(){

	optionLabyMenu.style.display = 'flex';
	menuLabyMenu.style.display = 'none';

});
optionLabyMenuRetour.addEventListener('click', function(){

	optionLabyMenu.style.display = 'none';
	menuLabyMenu.style.display = 'flex';

});

var dateAnnee = document.querySelector('#dateAnnee');
dateAnnee.style.color = "red";
var laDate = new Date();

dateAnnee.innerHTML = "Wow my game is stil playing in " +laDate.getFullYear() +" !!! =}";

//------------------------------EGGS END---------------------------------------------------------------//

//------------------------------Vue Start---------------------------------------------------------------//

var app1 = new Vue({

	el: '#readme',


})










//------------------------------Vue END---------------------------------------------------------------//




var myWindow = window.open('Readme.md','Readme','height=800,width=600');

/*var file_to_read = document.getElementById("test_json").files[0];
*/var file_to_read = document.getElementById("test_json").files[0];
var fileread = new FileReader();
fileread.readAsText(file_to_read);
fileread.onload = function (e) {

	var content = e.target.result;
	console.log(content)
}


/*var blob = new Blob;*/
/*var text = new Blob(Blob.prototype.text('Readme.md'));
*/
/*var myWindow = window.open("data:text/html;charset=utf-8,"+newWin, "", "_blank")
*/
/*newWin.document.write('html to write...');*/

/* myWindow.onload = function(){
     let content = "<button class='btn btn-primary' onclick='window.print();'>Confirm</button>";
   myWindow.document.getElementById('mainBody').innerHTML = content;
    } 

myWindow.window.close();*/


/*var tabTest = { "Sylvain": 200; };
tabTest.Sylvain=700;
tabTest["Sylvain"]=800;
var test = new Intl.locale();
*/




/*function Marsupilami(nom, couleur){

	this.nom = nom;
	this.couleur = couleur;
	this.nbpattes = 2;
	this.crier = function(){

		return 'Houba houba !';

	}
}

function Chien(nom, couleur){
	let puce = "oui";
	this.nom = nom;
	this.couleur = couleur;
	Object.defineProperty(this, 'nbpattes', {
		//enumerable: true,
		writable: false,
		value: 4
	});
	//this.nbpattes = 4;
	//Object.freeze(this.nbpattes, true);
	this.crier = function(){

		return 'Ouaf ouaf !';

	}
}

var animaux = new Array();

animaux.push(new Chien('Snoopy', 'Blanc'));
animaux.push(new Chien('Pluto', 'orange'));
animaux.push(new Marsupilami('Mars', 'noir'));
animaux.push(new Marsupilami('Marsupilaminette', 'jaune et noir'));

function crier(){

	animaux.forEach(function(animal){

		console.log(animal.nom + ' :', animal.crier());
	});
	
}

var dingo = new Chien('Dingo', 'noir');*/
