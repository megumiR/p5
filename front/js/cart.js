// recuperer l'array via localstorage
// check if its null or not ??? json.parse we need to check null or not before parse it
let cart = [];
//example  cart = ['id24558', 40, 'vert', 'http://localhost:3000/images/kanap01.jpeg', 'canape magnifique', 'Nalkou', '100,00'];
if(localStorage.getItem('cart') == null){
    console.log(err);
} else{
    cart = localStorage.getItem('cart');
    console.log(cart);
}
//cart[0]=ID,[1]=QUANTITY,[2]=COLOR,[3]=IMGURL,[4]=ALTTXT,[5]=NAME,[6]=PRICE


for(let product of cart){ //for in/of/while https://openclassrooms.com/en/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while

    let cartItemArticle = document.createElement('article');
        cartItemArticle.classList.add('cart__item');
        cartItemArticle.setAttribute('data-id', cart[0]); //{product-ID} itemId ..product.cart[0]??
        cartItemArticle.setAttribute('data-color', cart[2]); //{product-color}
/*      cartItemArticle.dataset.id = cart[0];  OR it's just to know if there is already the data-xxx??
        cartItemArticle.dataset.color = cart[2];
*/    
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
                price.innerHTML = cart[6] + '€';  //??????price centime et , entre € et cent
    
            divDescription.appendChild(productName, color, price);
    
            let divSetting = document.createElement('div');
                divSetting.classList.add('cart__item__content__settings');
            let divSetQuantity = document.createElement('div');
                divSetQuantity.classList.add('cart__item__content__settings__quantity');
            let quantity = document.createElement('p');
                quantity.innerHTML = 'Qté : '; // 'Qté : ' + <input  type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            let quantityInput = document.createElement('input');
                quantityInput.setAttribute(('type', 'number'),('name', 'itemQuantity'), ('min', 1), ('max', 100), ('value', '42???'));
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

/*Attention de ne pas dupliquer inutilement les éléments dans le
tableau récapitulatif (le panier). S’il y a plusieurs produits identiques
(même id + même couleur), cela ne doit donner lieu qu’à une seule
ligne dans le tableau -----encore sur cart.js?*/

//etape9 gerer la modif la suppression quantite-eventlistener'change'
let itemToBeModified = document.querySelector(input.itemQuantity).closest('');
let itemToBeDeleted = document.querySelector(input .deleteItem);
    itemToBeDeleted.closest('article'); 
/*etape9 la méthode Element.closest() devrait permettre de cibler le
produit que vous souhaitez supprimer (où dont vous souhaitez
    modifier la quantité) grâce à son identifiant et sa couleur. */


itemToBeModified.addEventListener('change',function(){  //'change'OR 'input' to see the change everytime
    cart[1] = this.value; //how can i get the quantity of input?????  https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
    console.log(cart[1]);
});
itemToBeDeleted.addEventListener('click', function(){ //p .deleteItem
    let itemToBeDeleted = document.querySelector(div .cart__item__content__settings__delete).closest('article');  //element.closest() ->target the element to change
    localStorage.removeItem(itemToBeDeleted);  //localStorage.clear(); ->all delete localStorage.removeItem('cart')
    console.log(cart)  
});

