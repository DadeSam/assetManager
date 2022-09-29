
async function getAssets(page=1, limit=20){
    const response = await fetch(`/asset/assets?page=${page}&limit=${limit}`)
    data = await response.json();
    return data
}

async function getOneAsset(asset_id){
    const response = await fetch(`/asset/assets?asset_id=${asset_id}`,{headers: {'Content-Type': 'application/json'}});
    data = await response.json();
    return data
}

async function getAllAssets(){
    const response = await fetch(`/asset/all`)
    data = await response.json()
    return data
}

function delAsset(del_id){
    fetch(`/asset/assets?del_id=${del_id}`).then(function(data){
        if(data.statusText == 'OK') {
            location.reload();
        }else{
            console.log('Could not delete asset')
        }
    })
}

    