
    var listItem = document.querySelectorAll('.form-item')
    var length = listItem.length
    var currentLength = 8
    var listItemUnable = []
    var moreBtn = document.querySelector('.page-next_btn')

    if(length <= 8)
    {
        moreBtn.style.display = 'none'
    }

    for (let i = 8; i < listItem.length; i++) {
        listItem[i].style.display ='none'
    }

    moreBtn.addEventListener('click', function() {  
        
        if(currentLength > length - 4 ){
            moreBtn.style.display = 'none'
        }
        for (let i = currentLength; i < currentLength + 4;  i++) {
            listItem[i].style.display = 'block'
        }
       currentLength += 4
        

    })
