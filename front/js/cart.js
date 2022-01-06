// recuperer l'array via localstorage
// check if its null or not ??? json.parse we need to check null or not before parse it
let cart = [];
if(localStorage.getItem('cart') == null){
    console.log(err);
} else{
    cart = localStorage.getItem('cart');
    console.log(cart);
}
//cart[0]=ID,[1]=QUANTITY,[2]=COLOR,[3]=IMGURL,[4]=ALTTXT,[5]=NAME,[6]=PRICE


for(let product of cart){

    let cartItemArticle = document.createElement('article');
        cartItemArticle.classList.add('cart__item');
        cartItemArticle.setAttribute('data-id', cart[0]); //{product-ID} itemId
        cartItemArticle.setAttribute('data-color', cart[2]); //{product-color}
    
    let divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');
        let img = document.createElement('img');
            img.setAttribute('src', cart[3]); //??????imageUrl
            img.setAttribute('alt', cart[4]);  //??????altTxt
        divImg.appendChild(img);
    
    let divContent = document.createElement('div');
        divContent.classList.add('cart__item__content');
            let divDescription = document.createElement('div');
                divDescription.classList.add('cart__item__content__description');
            
            let productName = document.createElement('h2');
                productName.innerHTML = cart[5];  //??????name
            let color = document.createElement('p');
                color.innerHTML = cart[2];  //??????colorChosen
            let price = document.createElement('p');
                price.innerHTML = cart[6];  //??????price
    
            divDescription.appendChild(productName, color, price);
    
            let divSetting = document.createElement('div');
                divSetting.classList.add('cart__item__content__settings');
            let divSetQuantity = document.createElement('div');
                divSetQuantity.classList.add('cart__item__content__settings__quantity');
            let quantity = document.createElement('p');
                quantity.innerHTML = 'Qté : ';
            let quantityInput = document.createElement('input');
                quantityInput.setAttribute(('type', 'number'),('name', 'itemQuantity'), ('min', 1), ('max', 100), ('value', '42'));
                quantityInput.classList.add('itemQuantity');
            divSetting.appendChild(divSetQuantity, quantityInput);
    
            let divDelete = document.createElement('div');
                divDelete.classList.add('cart__item__content__settings__delete');
        //    let deleteItem = document.createElement('p');
            //    deleteItem.classList.add('deleteItem');
            //    deleteItem.innerHTML = 'Supprimer';
                let deleteItem = document.createElement('input');
                deleteItem.classList.add('deleteItem');
                deleteItem.setAttribute(('type','button'),('value','Supprimer'), ('name', 'deletebutton'));     

            divDelete.appendChild(deleteItem);
    
        divContent.appendChild(divDescription, divSetting, divDelete);
    
    cartItemArticle.appendChild(divImg, divContent);
   
    document.getElementById('cart__items').appendChild(cartItemArticle);
}

document.querySelector('.deleteItem').addEventListener('click', function(){
    localStorage.removeItem('cart');  //localStorage.clear(); ->all delete
    console.log(cart)
});