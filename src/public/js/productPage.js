
    var listItem = document.querySelectorAll('.form-item')
    var listItemUnable = []
    for (let i = 8; i < listItem.length; i++) {
        listItemUnable.push(listItem[i])
    }
    for(let i = 0; i< listItemUnable.length ; i++){
        listItemUnable[i].style.display = 'none'
    }

    var moreBtn = document.querySelector('.page-next_btn')
    moreBtn.addEventListener('click', function() {
        for (let i = 0; i < listItemUnable.length; i++) {
            const element = listItemUnable[i];
            element.style.display = 'block'
            moreBtn.style.display = 'none'
            
        }
    })
