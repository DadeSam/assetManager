let viewTable = document.getElementById('view-table')
let oneAsset;

oneAsset = getOneAsset(document.getElementById('ass').value);

//console.log(document.getElementById('ass').value)

oneAsset.then(function(data){
 Object.keys(data.results[0]).forEach(function(key){
     //console.log(key)
     if (key == 'id' || key == 'device name' || 
     key == 'service ip' || key == 'role' || 
     key == 'system owner' || key == 'os' || key == 'asset type') {
         return
     }

     if (data.results[0][key]) {
      let row = '<tr>'
          row += `<th>${key}</th>`
          row += `<td>${data.results[0][key]}</th>`
          viewTable.innerHTML += row;
     }		 
 })

    document.getElementById('device_name').innerHTML = data.results[0]["device name"];
    document.getElementById('sipadd').innerHTML = data.results[0]["service ip"];
    document.getElementById('s_owner').innerHTML = data.results[0]["system owner"];
    document.getElementById('platform').innerHTML = data.results[0].os;
    document.getElementById('asset_type').innerHTML = data.results[0]["asset type"];
    document.getElementById('role').innerHTML = data.results[0].role;
    document.getElementById('asset-image').setAttribute('src', `/images/small/${data.results[0]["asset category"]}.jpg`)
})