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

var nextBtn = document.getElementById('nextBtn')
nextBtn.addEventListener('click' , function() {
    formInfo.style.display = 'none'
    formBusinessName.style.display = 'block'
})

var backBtn = document.querySelector('.back-btn')
backBtn.addEventListener('click', function() {  
    formInfo.style.display = 'block'
    formBusinessName.style.display = 'none'
})
