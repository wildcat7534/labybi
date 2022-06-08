//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//--------------------------------------Reco TeamBlue--------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
var regex_lettre = /^([a-z]{7})([0-9]{3})/;
var regex_codepostal = /^([0-9]{5})$/;
var regex_nom_composé = /^([a-z]+)(-)([a-z]+)$/;
var regex_PlayerName = /^([a-z]{3,7})$|^([a-z]{3,7})([0-9]{0,3})$/;
var regex_PlayerName2 = /^([a-z_?]{3,7})$|^([a-z]{3,7})([0-9]{0,3})$|^(([a-z_?]){1,5})([0-9]{0,3})$/i;
var regex_mehdi = /(mehdi)|(elmehdi)|(yousssef)|(youyou)/gi;
var regex_sylvain = /(sylvain)|(maitre)|(Brakebein)/gi;
var regex_volo = /(volo)/gi;
var regex_christophe = /(christophe)|(tof)/gi;
var regex_michel = /(michel)|(magny)/gi;
var regex_christopher = /(chris)/gi;
var regex_teddy = /(teddy)|(ted)|(shooter)/gi;

var formPlayerID = document.querySelector('#formPlayerID');
var welcome = document.querySelector('#welcome');


askPlayerName();
function askPlayerName(){

	var newPlayerInput = document.querySelector('input[name="playerID"]');

	newPlayerInput.addEventListener('change', function(){
		console.log('change !' +newPlayer);
		newPlayer = newPlayerInput.value;
		displayPlayer();

		if(regex_PlayerName2.test(newPlayer)){
			console.log('regex OK ' +newPlayer);

			helloYou(newPlayer);
			formPlayerID.classList.add('Hide2');

			setTimeout(function(){
				
				welcome.classList.add('Hide');

			}, 5000);
			setTimeout(function(){
				
				welcome.classList.add('Hide2');

			}, 5500);
		};
		
	});
};

function displayPlayer(){

	var playerScreen = document.querySelector('#playerScreen');
	playerScreen.innerHTML = newPlayer;
	return newPlayer;

}

var welcomeMessage = document.querySelector('#welcomeMessage');

function helloYou(newPlayer){

/*	for( var lettre of pseudo ){
console.log('lettre : ' +lettre[0]);
		lettre[0].toUpperCase();
console.log('lettre : ' +lettre[0]);
		pseudo = lettre[0] +(pseudo -lettre[0]);
	}*/
	console.log('helloYou ' +newPlayer);

/*	regex_mehdi.lastIndex = 0;*/ // pour reset le test() au début de la recherche.


	if(regex_mehdi.test(newPlayer)){

		console.log(regex_mehdi.test(newPlayer), newPlayer);


		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Hello " +newPlayer +" mon voisin !";
		animeStarWars();
	}
	else if(regex_volo.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour maître " +newPlayer +". Comment allez vous ?";
		animeStarWars();
	}
	else if(regex_sylvain.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Arriveras-tu à tout trouver ?";
		animeStarWars();

	}else if(regex_sylvain.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Alors Shooter, prêt à t'occuper de ton double ? Un contrat et un contrat.";
		animeStarWars();
	}else if(regex_christophe.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Non d'un Chocobo doré, arriveras-tu à finir à 100% ce jeux aussi ?";
		animeStarWars();

	}else{
		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +".Tu ne fais pas partie de la BlueTeam mais je te bonne chance pour finir à 100% :)";
		animeStarWars();
	}
};

function animeStarWars(){
	
	welcomeMessage.classList.add('animeStarWars');

}

function totalFin(){

	var labyMenu = document.querySelector('#labyMenu');
/*	labyMenu.style.display = 'flex';
*/
	setTimeout(function(){

		welcome.classList.remove('Hide', 'Hide2');

	}, 2000)
/*	welcome.classList.remove('Hide2');
*/
	welcomeMessage.style.transition = 'opacity 2s linear';
	welcomeMessage.style.fontSize = '6em';
	welcomeMessage.innerHTML = 'Bravo ' +newPlayer +' vous avez finit le jeu en trouvant '+finavecEE +'% des secrets !';
}




//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//---------------------------------------END RECO TeamBlue----------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//