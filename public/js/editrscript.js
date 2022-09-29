        setSelected('asset_cat', 'hasset_cat');
		setSelected('asset_type', 'hasset_type');
		setSelected('datacenter', 'hdat');
		setSelected('status', 'hstatus');
		setSelected('support', 'hsupport');
		displaySuccess();
		let edit_button = document.getElementById('edit_asset');
		edit_button.addEventListener('click', ()=>{
				document.querySelector('.loader').style.display = 'block';
			})

	function setSelected(id, selectValue){
		Array.from(document.getElementById(id)).forEach((option, index) => {
			if (option.value == document.getElementById(selectValue).value){
				document.getElementById(id).value = option.value;
				console.log(option.value)
			}
		});
	}

    function displaySuccess(){
        let msg = document.getElementById('msg');
        if (msg.textContent===''){
            msg.classList.add('hide')
        }else{
            msg.classList.remove('hide');
            msg.classList.add('show');
            setTimeout(function(){
                msg.classList.remove('show');
                msg.classList.add('hide');
        }, 3000)
    }}