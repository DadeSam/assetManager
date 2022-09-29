// Unique ID generator
function uniqueid(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);

    return (idstr);
}// end uique id generator

//auto ID assignment
let code = 'VF' + uniqueid().substring(1, 8);
document.getElementById('asset_id').value = code;
console.log(code)

//set device image according to changing dropdown
document.getElementById('asset_cat').addEventListener('change', 
    function(){
        let tool = document.getElementById('asset_cat').value;
        document.getElementById('img-change').src = "/images/" +tool+ ".jpg";
    });

//prevent support date and company entry if asset is not under support    
document.getElementById('support').addEventListener('change', 
function(){
    let s_value = document.getElementById('support').value;
    if(s_value == 'Yes'){
        document.getElementById('support_name').readOnly = false;
        document.getElementById('support_end_date').readOnly = false;
    } else {
        document.getElementById('support_name').value = '';
        document.getElementById('support_name').readOnly = true;
        document.getElementById('support_end_date').readOnly = true;
    }	
        
});

// set readonly attribute on lane, rack and iloipadd to false if device is physical
document.getElementById('asset_type').addEventListener('change', 
    function(){
        let s_value = document.getElementById('asset_type').value;
        console.log(s_value)
        if(s_value == 'Physical'){
            document.getElementById('lane').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('lane').style.display = 'inline-block';
            document.getElementById('rack').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('rack').style.display = 'inline-block';
            document.getElementById('iloipadd').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('iloipadd').style.display = 'inline-block';
            document.getElementById('position').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('position').style.display = 'inline-block';
            document.getElementById('serial_no').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('serial_no').style.display = 'inline-block';
            document.getElementById('model').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('model').style.display = 'inline-block';
            document.getElementById('manufacturer').parentElement.firstElementChild.style.display = 'inline-block';
            document.getElementById('manufacturer').style.display = 'inline-block';
        } else {
            document.getElementById('lane').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('lane').style.display = 'none';
            document.getElementById('rack').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('rack').style.display = 'none';
            document.getElementById('iloipadd').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('iloipadd').style.display = 'none';
            document.getElementById('position').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('position').style.display = 'none';
            document.getElementById('serial_no').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('serial_no').style.display = 'none';
            document.getElementById('model').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('model').style.display = 'none';
            document.getElementById('manufacturer').parentElement.firstElementChild.style.display = 'none';
            document.getElementById('manufacturer').style.display = 'none';
        }
            
    });

function displaySuccess(msg){
        //msg.classList.remove('hide');
        msg.forEach(function(msg){
            console.log(msg)
            msg.classList.add('show');
            setTimeout(function(){
                msg.classList.remove('show');
                msg.classList.add('hide');
            }, 5000)
        })
    }
 
 let msg
    if (document.querySelector('.message-caption') != undefined){
        let msg = document.querySelectorAll('.message-caption')
        displaySuccess(msg);
    }



//ADD Data attribute of cannot be empty (CBE) to all required input fields
//document.querySelectorAll('input').forEach((e) => {
   // console.log()
//})

// display a loading animation when data is being fetched from the db
/* let add_button = document.getElementById('add_asset');
    add_button.addEventListener('click', (e)=>{
        document.querySelector('.loader').style.display = 'block';
    }) */