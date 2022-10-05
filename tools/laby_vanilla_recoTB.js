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
var regex_PlayerName2 = /^([a-z_?]{3,15})$|^([a-z]{3,12})([0-9]{0,3})$|^(([a-z_?]){1,12})([0-9]{0,3})$/i;
var regex_mehdi = /(mehdi)|(elmehdi)|(yousssef)|(youyou)/gi;
var regex_sylvain = /(sylvain)|(maitre)|(Brakebein)/gi;
var regex_volo = /(volo)/gi;
var regex_christophe = /(christophe)|(tof)|(tophe)/gi;
var regex_michel = /(michel)|(magny)/gi;
var regex_christopher = /(christopher)/gi;
var regex_teddy = /(teddy)|(ted)|(shooter)/gi;
var regex_ff7 = /(aeris)|(cloud)|(tifa)/gi;
var regex_fred = /(fred)|(frederique)|(craspouille)/gi;
var regex_marc = /(marc)|(sophie)/gi;
var regex_chris = /(chris)/gi;
var regex_mrd = /(bob)|(bob34)/gi;

var formPlayerID = document.querySelector('#formPlayerID');
var welcome = document.querySelector('#welcome');
var boutonSkipWelcome = document.querySelector('#boutonSkipWelcome');

var welcomeMessage = document.querySelector('#welcomeMessage');

var newPlayerInput = document.querySelector('input[name="playerID"]');

newPlayerInput.addEventListener('keypress', function(){
	
	if(event.keyCode == 13){
		event.preventDefault();
		askPlayerName();
	}
});

newPlayerInput.addEventListener('change', askPlayerName);

function normalizedFullName(newPlayerF) {
    return newPlayerF.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
    
    }).join(' ')
};

function askPlayerName(){

		console.log('change !' +newPlayer);
		newPlayer = newPlayerInput.value;
		newPlayer = normalizedFullName(newPlayer);

		console.log('Pseudo mis en Majuscule : ', normalizedFullName(newPlayer));

		displayPlayer();
		hideGifRule();

		console.log(regex_PlayerName2.test(newPlayer));
		hide();
	
};

function hide(){
	
		hideGifRule();
/*		if(regex_PlayerName2.test(newPlayer)){*/
			console.log('regex OK ' +newPlayer);

			helloYou(newPlayer);
			formPlayerID.classList.add('Hide');
			formPlayerID.classList.add('Hide2');

			setTimeout(function(){
				
				welcome.classList.add('Hide');

			}, 6000);
			setTimeout(function(){
				
				welcome.classList.add('Hide2');

			}, 6500);
/*		}else{
			formPlayerID.classList.add('Hide');
			formPlayerID.classList.add('Hide2');
			welcome.classList.add('Hide');
			welcome.classList.add('Hide2');
			hideGifRule();
		}*/
}

function hideGifRule(){
	gifExo.classList.add('Hide');
	rules.classList.add('Hide');
}

boutonSkipWelcome.addEventListener('click', function(){
	formPlayerID.classList.add('Hide');
	formPlayerID.classList.add('Hide2');
	welcome.classList.add('Hide');
	welcome.classList.add('Hide2');
	hideGifRule();
});

function displayPlayer(){

	var playerScreen = document.querySelector('#playerScreen');
	playerScreen.innerHTML = newPlayer;
	return newPlayer;

};


function helloYou(newPlayer){

/*	for( var lettre of pseudo ){
console.log('lettre : ' +lettre[0]);
		lettre[0].toUpperCase();
console.log('lettre : ' +lettre[0]);
		pseudo = lettre[0] +(pseudo -lettre[0]);
	}*/
	console.log('helloYou ' +newPlayer);

/*	regex_mehdi.lastIndex = 0;*/ // pour reset le test() au début de la recherche.

	
	regex_mehdi.lastIndex = 0;
	regex_volo.lastIndex = 0;
	regex_sylvain.lastIndex = 0;
	regex_christophe.lastIndex = 0;
	regex_teddy.lastIndex = 0;
	regex_christopher.lastIndex = 0;
	regex_ff7.lastIndex = 0;
	regex_michel.lastIndex = 0;
	regex_fred.lastIndex = 0;
	regex_marc.lastIndex = 0;
	regex_chris.lastIndex = 0;
	regex_mrd.lastIndex = 0;

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
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Hello Master ^^7 Arriveras-tu à tout trouver ?";
		animeStarWars();

	}else if(regex_teddy.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Alors Shooter, prêt à t'occuper de ton double ?";
		animeStarWars();
	}else if(regex_christophe.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Nom d'un Chocobo doré, arriveras-tu à finir à 100% ce jeux aussi ?";
		animeStarWars();

	}else if(regex_christopher.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Merci pour tes idées ! Arriveras-tu à finir à 100% ce jeux aussi ?";
		animeStarWars();

	}else if(regex_michel.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +".C'est Michèl ? Merci de t'intèresser aux jeux vidéo :-)";
		animeStarWars();

	}else if(regex_ff7.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +" ! C'est vous les rebelles contre la Shinra ?";
		animeStarWars();

	}else if(regex_fred.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +" ! Primo-Phénix qui vient tester mon jeu ? C'est un honneur ! =D";
		animeStarWars();

	}else if(regex_marc.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +" ! Tiens un ancien 'voisin' ? =D";
		animeStarWars();

	}else if(regex_chris.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +" ! Chriiiis mes rangeeeers !!! ^^7";
		animeStarWars();

	}else if(regex_mrd.test(newPlayer)){

		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +" ! Trouveras-tu les secrets comme à l'époque où on jouait à Roger Wilco ?";
		animeStarWars();

	}
	else{
		console.log('message perso pour : ' +newPlayer);
		welcomeMessage.innerHTML = "Bonjour " +newPlayer +". Un inconnu ? Bonne chance pour finir à 100% :)";
		animeStarWars();
	}

	recScores();
	function recScores(){

		if((localStorage.getItem(newPlayer)) == null){
			
			console.log('pas de score dans le locale storage');

		}else{

			welcomeMessage.innerHTML += '<br>' +' votre meilleur temps est : ' +localStorage.getItem(newPlayer) +' sec';

			console.log('bienvenue : ', newPlayer, 'Score temps est : ', localStorage.getItem(newPlayer));
		}
	};


	function animeStarWars(){
		
		welcomeMessage.classList.add('animeStarWars');

	};
};



//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//---------------------------------------END RECO TeamBlue----------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//