getAllAssets().then((res) =>{
    for (key in res){
        let dashboardView = document.querySelector('.dashboard-view');
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        let result = `<p class="show-count"><span>${res[key]} ${key}</span></p>`;
        div.innerHTML = result;
        dashboardView.appendChild(div);
    }
})
//////////////////////////
