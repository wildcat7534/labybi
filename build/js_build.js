var tab = document.querySelector('#tableau');
var plateau = document.querySelector('#plateau');

tab.addEventListener("click", function(e){
	let cib = e.target;	
	if (cib.tagName == "TD") {
		let x = Array.prototype.indexOf.call(cib.parentNode.children, cib);
		let par = cib.parentNode;
		let y = Array.prototype.indexOf.call(par.parentNode.children, par)+1;
		console.log("[",x, "-",  y,"]");
		
		var rowStart = document.querySelector('#rowStart');
		var colStart = document.querySelector('#colStart');
		var rowEnd = document.querySelector('#rowEnd');
		var colEnd = document.querySelector('#colEnd');

		rowStart.innerHTML = y;
		colStart.innerHTML = x;
		rowEnd.innerHTML = y + 1;
		colEnd.innerHTML = x + 1;


		var div = document.querySelector('#chemin1');
		div.style.gridRowStart = y;
		div.style.gridColumnStart = x;
		div.style.gridRowEnd = y + 1;
		div.style.gridColumnEnd = x + 1;
		div.style.backgroundColor = "blue";

	}
});

plateau.createElement('div');


/*for( var chemin of chemins ){
	
	chemin.addEventListener('click', function(){

		this.style.backgroundColor = 'red';



	});
};*/



/*    grid-row-start: ;
    grid-column-start: ;
    grid-row-end: ;
    grid-column-end: ;*/


var app2 = new vue({
	el: "#app-2",
	data: {
		message: "you loaded this page on" +new Date().toLocaleString()
	}
})