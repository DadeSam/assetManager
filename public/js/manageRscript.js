    //////////////////////////
    let page = document.getElementById('page_number').value;
	let returned;
	if (page){
	returned = getAssets(page);
	}else{
		returned = getAssets();
	}	
	returned.then(function(data){
		//console.log(data.results)
		createTable(data.results);
	}).then(function(){
		document.getElementById('table-search').addEventListener('input', filtr)
	});

		function createTable(data){
			let table = document.getElementById('myTable');
			for ( let i=0; i < data.length; i++){
				let row = `<tr>
							<td>${data[i]["device name"]}</td>
							<td>${data[i]["asset type"]}</td>
							<td>${data[i].os}</td>
							<td>${data[i]["service ip"]}</td>
							<td>${data[i].status}</td>
							<td>${data[i]["system owner"]}</td>
							<td>${data[i].services}</td>
							<td><a class="view" id="${data[i]["asset id"]}" href="/asset/view/${data[i]["asset id"]}">
									<svg class="view-icon">
										<use xlink:href="/images/sprite.svg#icon-eye"></use>
									</svg>
									View
								</a>
								<a class="edit" href="/asset/edit/${data[i]["asset id"]}">
								<svg class="edit-icon">
									<use xlink:href="/images/sprite.svg#icon-pencil"></use>
								</svg>
									Edit
								</a>
						
								<a class="delete" href="#" data-asset_id="${data[i]['asset id']}">
								<svg class="delete-icon">
								<use xlink:href="/images/sprite.svg#icon-bin"></use>
								</svg>
								Delete
								</a>
							</td>
							</tr>`
				table.innerHTML += row;
			}
		}

		returned.then(() => {
			let ab = document.querySelectorAll('.delete')
		    for (let i=0; i<ab.length; i++){
				ab[i].addEventListener('click', function(e){
					let r = confirm('Becareful! You are about to delete an Entry. Are you sure?');
					if(r == true){
						let del_id =ab[i].dataset.asset_id
						delAsset(del_id)
					}else{
						e.preventDefault();
					}	
				})
			}
		})

		//print button
		let printer = document.getElementById('print');
		printer.addEventListener('click', function(){
			window.print();
		});


		returned.then(function(data){
			createNavigator(data);
		})

		function createNavigator(data){
			//console.log(data)
			let nav=""
			for (let i=0; i<data.totalPages; i++){
				nav += `<li><a href="/asset/manage?page=${(i+1)}">${(i+1)}</a></li>`
			}
			
			document.getElementById('navigate').innerHTML = nav;	
		}



//filter table
function exportToExcel(ext, filename){
    let table_data = document.getElementById('myTable');
    let wb = XLSX.utils.table_to_book(table_data, { sheet: 'sheet1' });
    return XLSX.writeFile(wb, filename+"."+ext);
}

function filtr(e){ 
	let table = document.getElementById('myTable');
	//console.log(e.target.value);
	tr = table.getElementsByTagName("tr");
	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 1; i <= tr.length; i++) {
		  if (tr[i].getElementsByTagName("td")[0].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
		  tr[i].getElementsByTagName("td")[1].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
		  tr[i].getElementsByTagName("td")[2].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
		  tr[i].getElementsByTagName("td")[3].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 || 
		  tr[i].getElementsByTagName("td")[4].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
		  tr[i].getElementsByTagName("td")[5].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
		  tr[i].getElementsByTagName("td")[6].textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
			tr[i].style.display = "";
		  } else {
			tr[i].style.display = "none";
		  }
	
	  }
    }

	//document.getElementById('table-search').addEventListener('input', filtr);
