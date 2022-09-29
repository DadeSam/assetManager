window.addEventListener('DOMContentLoaded', function(e){

	//accordion for side bar
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
		  panel.style.maxHeight = null;
		} else {
		  panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	  });
	}

	//search data function
	function sendSearchData(query){
		//let display = document.getElementById('display');
		let searchResults = document.getElementById('search-results');
		//searchResults.setAttribute('id', 'search-results');
		let match = query.value.match(/^[\w-_.]*$/)
		//let match = query.value.match(/^[a-zA-Z0-9]*/);
		let match2 = query.value.match(/\s*/);
		//console.log(query.value)
	
		if (match2[0] === query.value){
			searchResults.innerHTML = '';
			//display.appendChild(searchResults);  
			return;
		}else if (match[0] === query.value){
			//console.log(match[0])
		fetch('/asset/assets', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({payload: query.value})
		}).then(res => res.json()).then(data => {
				let payload = data.payload;
				searchResults.innerHTML = '';
				//display.appendChild(searchResults)
				if (payload.length < 1){
					searchResults.innerHTML = "<p class='danger'>Sorry. Nothing Found</p>"
					return;
				}
				payload.forEach((item, index) => {
					if(index > 0) searchResults.innerHTML += '<br><hr><br>';
					let str = `<a href="/asset/view/${item["asset id"]}">${item["device name"]} | ${item.os} | ${item["system owner"]}</a>`
					searchResults.innerHTML += str;
					searchResults.innerHTML += '<br>';
					//console.log(item)
					
				   //display.appendChild(searchResults);   
				});
				return;
			})
		}
		searchResults.innerHTML = '';
		//display.appendChild(searchResults)
	}

  

//Main search code to run on every page
	let search = document.getElementById('search-input');
	search.addEventListener('input', function(e){
		if (e.target.value){
		document.getElementById('search-results').style.visibility = 'visible';
	}else{
		document.getElementById('search-results').style.visibility = 'hidden';
	}
		sendSearchData(e.target)
	})

	document.getElementById('search-button').addEventListener('click', function(e){
		e.preventDefault();
	})

	//logout button
	document.addEventListener('click', (e)=>{
		//console.log(e.target.id)
		let logout = document.getElementById('logout')
			if(logout.classList.contains('shown') && e.target.id == 'profile-holder'){
				logout.classList.remove('shown')
			}else {
				logout.classList.add('shown')
			}
	})

});



