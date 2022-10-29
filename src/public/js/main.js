let arrow = document.querySelectorAll(".arrow");
        for( var i = 0; i < arrow.length; i++){
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement;
                arrowParent.classList.toggle("showMenu");
            });
        }

const formBusinessName = document.getElementById('form-business-name')
formBusinessName.style.display = 'none'
const formInfo = document.getElementById('')