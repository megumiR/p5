// recuperer l'array via localstorage
// check if its null or not ??? json.parse we need to check null or not before parse it
let cart = [];
//example  cart = ['id24558', 40, 'vert', 'http://localhost:3000/images/kanap01.jpeg', 'canape magnifique', 'Nalkou', '100,00'];
if(localStorage.getItem('cart') !== null){
    cart = localStorage.getItem('cart');
    console.log(cart);
} else{
    console.log(err);
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

/*etape9 gerer la modif la suppression quantite-eventlistener'change'
    la méthode Element.closest() devrait permettre de cibler le produit 
    que vous souhaitez supprimer (où dont vous souhaitez modifier la quantité) 
    grâce à son identifiant et sa couleur.
     
   var closestelement = element.closest('string --ex)p:hover, .toto + q'); 
   if (closestelement == null){ 
*/

let itemToBeModified = document.querySelector(input.itemQuantity).closest('');
itemToBeModified.addEventListener('change',function(){  //'change'OR 'input' to see the change everytime
    cart[1] = this.value; //how can i get the quantity of input?????  https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
    console.log(cart[1]);
});


let itemToBeDeleted = document.querySelector(input .deleteItem);
    itemToBeDeleted.closest('article'); 
itemToBeDeleted.addEventListener('click', function(){ //p .deleteItem
    let itemToBeDeleted = document.querySelector(div .cart__item__content__settings__delete).closest('article');  //element.closest() ->target the element to change
    localStorage.removeItem(itemToBeDeleted);  //localStorage.clear(); ->all delete localStorage.removeItem('cart')
    console.log(cart)  
});
/*   
    let itemToBeDeleted = [];
    itemToBeDeleted = localStorage.getItem('cart', cart[0] == itemID && cart[2] == colorChosen); /*?????
            <-article which contains specific id n color / [] in cart which contains the id n color
            [] includes 'itemID == a && colorChosen == b' How can i take a specific element with condition? */
/*    let itemToBeDeletedArticle = ;
    var closestDeletebtn = itemToBeDeletedArticle.closest('input .deleteItem'); //delete button /p .deleteItem
    if(closestDeletebtn !== null){
        closestDeletebtn.addEventListener('click', function(){
            localStorage.removeItem(itemToBeDeleted); //delete specific item from the cart
        });
    } else {
        console.log('delete button is null');
    }
    */
//THERE IS A LINE WHICH SHOWS TOTAL QUANTITY N TOTAL PRICE :LINE 74 cart,js

 //etape 10 valider la commande
function sendForminfo(event){
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody) //({value: document.getElementById('').value})POSTで返された値をどこに置くか 
    })
        .then(function(response){
            if(response.ok){
                return response.json();
            }
        })
        .then(function(value){

        })
        .catch(function(err){
            console.log(err)
        });  
    }
/* Regex varifier    https://www.pierre-giraud.com/javascript-apprendre-coder-cours/regex-recherche-remplacement/
let a = /[a-zA-Z]/g;    ----> g : global if there are more than 2 matches by string.match(a), with g they show 2 of them
let b = new RegExp('[a-zA-Z]','g');  it is boolean so if there is no match, they return false 
*/
let checkName = /[a-zA-Z]{2,}/g;
let checkAddress = /[0-9][a-zA-Z]/g;
let checkCity = /[a-zA-Z]{2,}/g;
let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;    
//https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
//  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

/*let formCheckList = [[checkName, /[a-zA-Z]{2,}/g],[checkAddress, /[0-9][a-zA-Z]/g], [checkCity, /[a-zA-Z]{2,}/g], [checkEmail, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g]];
let champ = ['#firstName', '#lastName',''];
let errMsgId = [];
let errMsg = [];*/

//for(let i in ?????????){
document.querySelector('#firstName').addEventListener('input', function(event){
//document.querySelector(champ[i]).addEventListener('input', function(event){
    if(checkName.match(event.target.value) == false){  // boolean false = null = form is invalid
    //if(formCheckList[i].match(value) == false){     
        document.getElementById('firstNameErrorMsg').innerHTML = 'Le prénom est invalide. Ce champ ne reçoit que des caractères.';
    } else {
        console.log('Prénom valide')
    }
});
//}
//repeat for all of the input
document.querySelector('#lastName').addEventListener('input', function(event){
    if(checkName.match(event.target.value) == false){    
        document.getElementById('lastNameErrorMsg').innerHTML = 'Le nom est invalide. Ce champ ne reçoit que des caractères.';
    }
});
document.querySelector('#address').addEventListener('input', function(event){
    if(checkAddress.match(event.target.value) == false){    
        document.getElementById('addressErrorMsg').innerHTML = "L'adresse est invalide.";
    }
});
document.querySelector('#city').addEventListener('input', function(event){
    if(checkCity.match(event.target.value) == false){    
        document.getElementById('cityErrorMsg').innerHTML = "Le nom de la ville est invalide. Ce champ ne reçoit que des caractères.";
    }
});
document.querySelector('#email').addEventListener('input', function(event){
    if(checkEmail.match(event.target.value) == false){    
        document.getElementById('emailErrorMsg').innerHTML = "L'adresse Email est invalide.";
    }
});


document.querySelector('#order').addEventListener('click', function(event){
    event.preventDefault();
    if(document.querySelector(form p).value == null ){ //All of input are valid = function 'sendForminfo' IF NOT errMsg / alert
        sendForminfo();
    } else {
        alert("Il y a d'info manqué!");
    }
});
//document.querySelector('#order').addEventListener('click', sendForminfo);