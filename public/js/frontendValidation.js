
let assetform = document.querySelector('#add-form')

let requiredFields = assetform.querySelectorAll('input[data-cbe]');
assetform.addEventListener('submit', function(e){
    requiredFields.forEach(elem =>{
        if(elem.value === ''){        
            e.preventDefault();
            elem.classList.add('dirty');
        }else{
            document.querySelector('.loader').style.display = 'block';
        }
    })
})

console.log(document.getElementById('add_asset').attributes)

function ValidateIPaddress(ipaddress) { 
    sipadd.addEventListener('input', function(){
        if (ipaddress.value != ''){
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress.value.trim())) {  
                ipaddress.classList.remove('dirty');
                ipaddress.style.borderBottom = '2px solid green'
                return (true)  
            }else{
                ipaddress.classList.add('dirty');
                return (false) 
            } 
        }else{
            return false
        }
    }) 
    
  }

let device_name = document.getElementById('device_name')
//let model = document.getElementById('model')
let install_date = document.getElementById('install_date')
let os_version = document.getElementById('os_version')
let sipadd = document.getElementById('sipadd')
//let manufacturer = document.getElementById('manufacturer')
let role = document.getElementById('role')
let gateway = document.getElementById('gateway')
//let s_admin = document.getElementById('s_admin')
let s_owner = document.getElementById('s_owner')
let services = document.getElementById('services')


function checkDeviceName(devicename){
    devicename.addEventListener('input', function(e){
        if (e.target.value != ""){ 
                fetch('/asset/track', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({payload: e.target.value})
                }).then(res => res.json()).then(data => {
                    if (data.payload.length == 1){
                        document.querySelector('#devicetaken').textContent = 'Device exists';
                        devicename.style.background = '#ffa8a8'
                        
                        //console.log('this device exists')
                    }else{
                        document.querySelector('#devicetaken').innerHTML = '';
                        devicename.style.background = 'none'
                        device_name.style.borderBottom = '2px solid green'
                    } 
                })
            }else{
                device_name.style.borderBottom = '1px solid grey'
                console.log('this')
                console.log(device_name)
                return false
            }
        })           
}

function checkInputs(field){
    field.addEventListener('input', function(e){
        if (e.target.value != ""){ 
            document.getElementById('add_asset').disabled = false; 
            document.getElementById('add_asset').style.cursor = 'pointer'; 
            field.classList.remove('dirty')
            field.style.borderBottom = '1px solid green'
            field.style.background = '';
        }else{
            field.style.background = '#ffa8a8'
            field.style.borderBottom = '1px solid grey' 
            document.getElementById('add_asset').disabled = true; 
            document.getElementById('add_asset').style.cursor = 'default';  
        }
    })  
}

checkDeviceName(device_name);
checkInputs(install_date);
checkInputs(os_version);
//checkInputs(model);
checkInputs(os_version);
checkInputs(s_admin);
checkInputs(s_owner);
//checkInputs(sipadd);
checkInputs(services);
ValidateIPaddress(sipadd)
//checkInputs(gateway);

function decorateRequiredLabels(){
    let labels = document.getElementsByTagName('label')
    for ( let label of labels){
        let labelfor = label.getAttribute('for');
        if (labelfor){
            let field = document.getElementById(labelfor);
            if (field && field.hasAttribute('data-cbe')){
                label.classList.add('required')
            }
        }
    }
}

function addDirtyListeners(){
    let inputs = assetform.getElementsByTagName('input');
    for ( var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        input.addEventListener('input', dirtyInput);
        input.addEventListener('blur', dirtyInput);
    }
}

function dirtyInput(evt){
    element = evt.srcElement;
    if (elem.nodeName = 'INPUT'){
        elem.classList.add('dirty')
    }
}



decorateRequiredLabels()
//addDirtyListeners