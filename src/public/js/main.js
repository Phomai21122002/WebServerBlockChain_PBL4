let arrow = document.querySelectorAll(".arrow");
        for( var i = 0; i < arrow.length; i++){
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement;
                arrowParent.classList.toggle("showMenu");
            });
        }

var formBusinessName = document.getElementById('form-business-name')
formBusinessName.style.display = 'none'
var formInfo = document.getElementById('form-info')

var inputEmail = document.getElementById('inputEmail')
var inputAddress = document.getElementById('inputPhone')
var inputPhone = document.getElementById('inputEmail')
var inputPassword = document.getElementById('inputPassword')
var inputConfirm = document.getElementById('inputConfirm')
var businessName = document.getElementById('businessName')



var nextBtn = document.getElementById('nextBtn')
nextBtn.addEventListener('click' , function() {

    if(inputAddress.value != '' && inputPhone.value != '' &&  inputEmail.value != '' && inputPassword.value != '' && inputConfirm.value !='' && inputEmail.value.includes('@gmail.com') == true){
        
        if(inputPassword.value !== inputConfirm.value)
        {
            alert('Mật Khẩu Không Trùng Khớp')
        }
        else{
            formInfo.style.display = 'none'
            formBusinessName.style.display = 'block'
        }
       
    }
    
})

var backBtn = document.querySelector('.back-btn')
backBtn.addEventListener('click', function() {  
    formInfo.style.display = 'block'
    formBusinessName.style.display = 'none'
})
