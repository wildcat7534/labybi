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
var inavecEE = 0;
var finavecEE;
transiMetal();
displayPlayer()

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


		};
	});
};


retourMenu.addEventListener('click', function(){
	transiMetal();
	clearTimeout(interval);
	clearInterval(chronoDisplay);

	setTimeout(function(){

		labyMenu.style.display = 'flex';
		
	}, 1000)

});

	

function transiMetal(){

	metalTop.style.animationName = "topDown";
	metalBottom.style.animationName = "bottomTop";

	setTimeout(function(){
		metalTop.style.animationName = "";
		metalBottom.style.animationName = "";
	}, 2500)
}
function transiMetalCLOSE(){
	
	metalTop.style.animationName = "topDownCLOSE";
	metalBottom.style.animationName = "bottomTopCLOSE";
	metalTop.style.animationFillMode = "forwards";
	metalBottom.style.animationFillMode = "forwards";
}
function transiMetalCLOSEopen(){

	metalTop.style.animationName = "topDownCLOSEopen";
	metalBottom.style.animationName = "bottomTopCLOSEopen";
}
function changeWorld(){ //le monde rond
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
			cssRond.removeAttribute('href', 'laby_vanilla_rond.css');

		}else{

			cssRond.setAttribute('href', 'laby_vanilla_rond.css');
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
		}
	}
}

function reloadGame(){
	
	regex_mehdi.lastIndex = 0;
	if(regex_mehdi.test(newPlayer)){

		timesUP = 10;
		console.log(timesUP)

	}else{
		timesUP = 5;
	}
	finavecEE = 0;
	oldScore.innerHTML = "";
	oldPlayer.innerHTML = "";
	oldScore1.innerHTML = "";
	oldPlayer1.innerHTML = "";
	oldScore2.innerHTML = "";
	oldPlayer2.innerHTML = "";
	clearTimeout(marioKartColor);
	chronoRunning = false;
	chronoTimerRunning = false;
	clearTimeout(interval);
	clearTimeout(gameEnCour);
	clearTimeout(chronoDisplay);
	numPlateau = 0;
	win = null;
	temps = 0;
	
	level.style.color = "deepskyblue";
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

		chrono.innerHTML = "bravo ! en : "
							+temps +" secondes !";

		displayScoreScreen(temps);
		clearInterval(chronoDisplay);
		saucer();
		marioKartColor();
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

			level.innerHTML = "Level " +( j + 1 );


			if( j == theLabels.length ){
				win = true;
				level.style.color = "gold";
				level.innerHTML = "*Gold Level*";
				plateauAnnimeFin();
			};
	});
});

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

function plateauAnnimeFin(){

	gamePlateau.style.animationName = 'plateauAnnimeFin';

};




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

var numPlateau = 0;
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

})
optionLibre.addEventListener('mouseenter', function(){
	
		pasFin.style.display = 'inline';
})
optionLibre.addEventListener('mousemove', function(e){

	 pos = {"x": e.clientX, "y": e.clientY};
	 pos.y += 15;
	 pos.x += 15;
	 pasFin.style.top = pos.y + "px";
	 pasFin.style.left = pos.x + "px";
})

var optionChrono = document.querySelector('#optionChrono');

optionChrono.addEventListener('mouseout', function(){

	pasFin.style.display = 'none';

})
optionChrono.addEventListener('mouseenter', function(){
	
		pasFin.style.display = 'inline';
})
optionChrono.addEventListener('mousemove', function(e){

	 pos = {"x": e.clientX, "y": e.clientY};
	 pos.y += 15;
	 pos.x += 15;
	 pasFin.style.top = pos.y + "px";
	 pasFin.style.left = pos.x + "px";
})
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//-----------menu contextuel-------------pas de Fin dispo---------END--------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//

function displayScoreScreen(tempsReceived){
	
	oldScore.innerHTML = "*" +tempsReceived +" secondes*";
	oldPlayer.innerHTML = displayPlayer();

	oldScore1.innerHTML =  "*" +15 +"secondes*";
	oldPlayer1.innerHTML = "Duke3D";

	oldScore2.innerHTML = "*" +14 +"secondes*";
	oldPlayer2.innerHTML = "MaJoR_34";

}

var color = document.querySelector('#infoScreen #score div:nth-child(2)');
var iDeg = 0;
function marioKartColor(){

	iDeg = (iDeg+30)%360;

	setTimeout(marioKartColor, 200);
	color.style.filter = "hue-rotate(" + iDeg +"deg)";
}
marioKartColor_menuChangeWorld();
function marioKartColor_menuChangeWorld(){

	iDeg = (iDeg+15)%360;
	
	setTimeout(marioKartColor_menuChangeWorld, 1000);
	menuChangeWorld.style.filter = "hue-rotate(" + iDeg +"deg)";
}




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
eggSaucer.addEventListener('click', function(){

	egg++;

	if(egg == 5){

		divDebug.style.display = "flex";
		eggSaucer.style.display = "none";

		finavecEE += 25;
	}
})
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
labelPhilipsHUE.innerHTML = 'HUE_light -->';

inputDebug.addEventListener('click', function(){

	debug();

});
inputPhilipsHUE.addEventListener('click', function(){

	debug();

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
saucerMetalEGG.addEventListener('click', function(){
	saucerEgg++;
	if(saucerEgg == 5){

		transiMetalCLOSEopen();
		saucerEgg = 15;
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
	}else if( !inputPhilipsHUE.checked ){

			clearTimeout(marioKartColor);

	};
	
};
//----------------------------- END - Dev Mode -------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------//




var saucerMenuOption = document.querySelector('#saucerMenuOption');
var saucerMenuOptionClick = 0;

saucerMenuOption.addEventListener('click', function(){

	saucerMenuOptionClick++;

		if(saucerMenuOptionClick == 5){

			saucerMenuOption.style.width = "20px";
			saucerMenuOption.style.height = "20px";

			finavecEE += 15;

			saucerMenuOptionClick = 0;
		}
});
var labymenuH1 = document.querySelector('#labyMenu h1');
var labymenuH1Click = 0;

labymenuH1.addEventListener('click', function(){

	labymenuH1Click++;

		if(labymenuH1Click == 5){

			labymenuH1.style.transform = "rotate(28deg)";
			labymenuH1.style.color = "#b55d38";

			finavecEE += 15;

			labymenuH1Click = 0;
		}
});

var labymenuH2 = document.querySelector('#labyMenu h2');
var labymenuH2Click = 0;
var labymenuH2Rotate = 0;
var compteur = 0;

labymenuH2.addEventListener('click', function(){

	labymenuH2Click++;


		if(labymenuH2Click == 5){

			rotateMM;
/*			labymenuH2.style.color = "#ec46be";*/

			var rotateMM = setInterval(function(){

				compteur++;

				labymenuH2Rotate = (labymenuH2Rotate +20);
				labymenuH2.style.transform = "rotateX("+labymenuH2Rotate +"deg)";

				finavecEE += 15;

				if(compteur >= 9){

					clearInterval(rotateMM);
					labymenuH2Click = 0;
					labymenuH2.style.color = "darkkhaki";
				}
			}, 500);
			
		}
		compteur = 0;
});



/*var tabTest = { "Sylvain": 200; };
tabTest.Sylvain=700;
tabTest["Sylvain"]=800;
var test = new Intl.locale();
*/




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