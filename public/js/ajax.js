			
// function showSearchResult(str){
	// let xhttp;
	// if (str == ""){
		// document.getElementById('result').innerHTML = "";
		// return;
	// }
	// xhttp = new XMLHttpRequest();
	// xhttp.onreadystatechange = function(){
		// if (this.readyState == 4 && this.status == 200){
			// document.getElementById('result').innerHTML = responseText;
		// }
	// };
	// xhttp.open('GET', 'getresults.js?q='+str, true);
	// xhttp.send();
// }

// document.getElementById('search-input').onkeyup = function(){showSearchResult(document.getElementById('search-input').value);}

var x = document.activeElement.type;

document.getElementById('demo').innerText = x;
