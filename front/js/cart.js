// recuperer l'array via localstorage
// check if its null or not ??? json.parse we need to check null or not before parse it
let cart = JSON.parse(localStorage.getItem('cart'));

async function takeItemInLocalStorage(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
    } else{
        console.log(err);
    }
}
//creer la requete GET pour recuperer les info du produit 
async function getPrice(){
    fetch('http://localhost:3000/api/products',{
        method: 'GET',       // for a GET request, we just write fetch(URL).then???? If there's no body , it seems fine
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        if(response.ok){   //console.log(response.json()); to check
        return response.json();
        }
    })    
    .then(function(products){  //le parametre entre() est le resultat de l'appel API = products info
        for (let product of products){
            document.getElementById('productPrice').innerHTML = product.price + " €";
        }
        let price = {id , price};
        console.log(products.price);
    })
    .catch(function(err){
        console.log(err)
    
    });
}
//Creer des articles pour les produits selectionnes du cart
//cart[0]=ID,[1]=QUANTITY,[2]=COLOR,[3]=IMGURL,[4]=ALTTXT,[5]=NAME,[6]=PRICE
async function cartItemArt(){
    await takeItemInLocalStorage();
    await getPrice();
    for (let product of cart){
        console.log(product.name); //it was id's 5th letter not as a 5th data String because of lack of JSON.parse

/*Attention de ne pas dupliquer inutilement les éléments dans le
tableau récapitulatif (le panier). S’il y a plusieurs produits identiques
(même id + même couleur), cela ne doit donner lieu qu’à une seule
ligne dans le tableau */
        
  /*      function findDuplicatedItem(product) {
            if(product.id == product[0] && product.color == product[2]){
                let n = cart.indexOf(product.id);
                let replaceItem = n -1;
                cart.splice(n, 1, replaceItem)
            }
        }
        cart.find(findDuplicatedItem)
        
        findDuplicatedItem();
        console.log();                     */
                 
        let cartItemArticle = document.createElement('div')
        cartItemArticle.innerHTML = //LOOP cart.map((priduct)=>`ALL HTML`)???product.id
            `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">  <!--color incorrect-->
                <div class="cart__item__img">
                  <img src="${product.imgUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p id="productPrice">${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" id=="itemQuantity" name="itemQuantity" min="1" max="100" value="${product[1]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `

        document.getElementById('cart__items').appendChild(cartItemArticle); 
    }
    let quantityInput = document.getElementById('#itemQuantity');
    console.log(quantityInput);
    changeItemQuantity();

};
cartItemArt();

//Counter la quantite totale et le prix total
async function showTotalQuantitynPrice(){
let totalQuantity = 0; 
let totalPrice =0;
let pricePerProduct = [];
pricePerProduct = getPrice();

for(let product of cart){
    totalQuantity += 1 * product.quantity;        ///on peut laisser la numero bizzare 1* ?
    totalPrice += product.quantity * pricePerProduct;  ///??????? can i take the price like this? YES!!:)
    console.log("The totalQuantity in cart is "+ totalQuantity, "The total price in cart is "+ totalPrice);
    }
document.getElementById('totalQuantity').textContent = totalQuantity; 
document.getElementById('totalPrice').textContent = totalPrice;
}
showTotalQuantitynPrice();

/*etape9 gerer la modif la suppression quantite-eventlistener'change'
    la méthode Element.closest() devrait permettre de cibler le produit 
    que vous souhaitez supprimer (où dont vous souhaitez modifier la quantité) 
    grâce à son identifiant et sa couleur.
     
   var closestelement = element.closest('string --ex)p:hover, .toto + q'); 
   if (closestelement == null){ 
*/
//Changement de quantite du produit
function changeItemQuantity(){
    document.getElementById('#itemQuantity').addEventListener('change', function(){  //'change'OR 'input' to see the change everytime
        let itemToBeModified = document.getElementById('#itemQuantity').closest('article');
        let itemId = itemToBeModified.dataset.id;
        let colorChosen = itemToBeModified.dataset.color;
        
        for (let product of cart){       
            if(product[0] == itemId && product[2] == colorChosen){ 
                //cart[1] = this.value;
                product[1] = document.getElementById('#itemQuantity').value;
                
            } 
        }
        //how can i get the quantity of input?????  https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
        try{
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch(err){    
            console.log(err)
        }
});
}

    //.find or .indexOf https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    //OR .splice https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice


//effacement d'un produit
document.querySelector('input .deleteItem').addEventListener('click', function(){ //p .deleteItem
    let itemToBeDeleted = document.querySelector('input .deleteItem').closest('article');  //element.closest() ->target the element to change
    if(document.getElementsByClassName(cart__item).dataset.id == product[0]){
        document.getElementById('cart__items').removeChild(itemToBeDeleted);
    }
    
    //localStorage.removeItem(itemToBeDeleted);  //localStorage.clear(); ->all delete localStorage.removeItem('cart') .find ->trouver les items
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
//THERE IS A LINE WHICH SHOWS TOTAL QUANTITY N TOTAL PRICE :LINE 74 cart,js -->line7?

 //etape 10 valider la commande -->local storage? here , its for etape11 POST request to show orderId in confirmation
//passer une commande ,  La requête post ne prend pas encore en considération la quantité ni la couleur des produits achetés.
async function sendForminfo(event){
   await fetch('http://localhost:3000/api/products/order', {    //async await?????????
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody) //({value: document.getElementById('').value})POSTで返された値をどこに置くか 
    })
        .then(function(response){
            if(response.ok){
                console.log(response.json());
                //return response.json();
            }
        })
        .then(function(value){  //send the info of formula
            let orderIdInJson = JSON.parse(jsonBody);
            console.log(JSON.stringify(jsonBody));  //orderId???  How can I get????
            console.log(orderIdInJson);
            document.querySelector(form .cart__order__form).setAttribute('action','confirmation.html');
            document.getElementById('orderId').innerHTML = orderIdInJson;

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
let checkAddress = /^[\w.-]/g; // ^[A-Za-z0-9_.]+$   ^[\w.]+ ->azAZ09_ included []? )? ->can be with )
let checkCity = /[a-zA-Z]{2,}/g;
let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;    
//https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
//  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

/*let formCheckList = [[checkName, /[a-zA-Z]{2,}/g],[checkAddress, /[0-9][a-zA-Z]/g], [checkCity, /[a-zA-Z]{2,}/g], [checkEmail, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g]];
let champ = ['#firstName', '#lastName',''];
let errMsgId = [];
let errMsg = [];

let champs = document.querySelector(champ);
champs.forEach(element => {
    element.addEventListener('input', function(event){

    });
});
*/
//for(let i in ?????????){
document.querySelector('#firstName').addEventListener('input', function(event){
//document.querySelector(champ[i]).addEventListener('input', function(event){
    if(checkName.match(event.target.value) == false){  // boolean false = null = form is invalid .MATCH OR .TEST
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
        document.getElementById('addressErrorMsg').innerHTML = "L'adresse est invalide. Ce champ ne reçoit que des caractères, des nombres et '-'.";
    }
});
document.querySelector('#city').addEventListener('input', function(event){
    if(checkCity.match(event.target.value) == false){    
        document.getElementById('cityErrorMsg').innerHTML = "Le nom de la ville est invalide. Ce champ ne reçoit que des caractères.";
    }
});
document.querySelector('#email').addEventListener('input', function(event){
    if(checkEmail.match(event.target.value) == false){    
        document.getElementById('emailErrorMsg').innerHTML = "L'adresse Email est invalide. Ecrivez comme abc@xxx.xx";
    }
});
function b(){
    const a = input.value === xxx
    if(a){
        errMessages.classList.add('hidden');
    } else{
        errMessages.classList.remove('hidden');
    }
return a
}
document.querySelector('#order').addEventListener('click', function(event){
    
    if(checkName.match(event.target.value) == true){ //All of input are valid = function 'sendForminfo' IF NOT errMsg / alert
        sendForminfo();
        
    } else {
        event.preventDefault();
        alert("Il y a d'info manqué!");
    }
});

//document.querySelector('#order').addEventListener('click', sendForminfo);

/*etape11   take the command ID by POST request 
            affichier le numero de command sur confirmation.html (addEventlistener - innerHtML )
    */

/*QUESTIONS
    totalQuantity += 1 * product[1];        ///on peut laisser la numero bizzare 1* ?

    document.querySelector('input .itemQuantity'); //we see the value but it's null so function doesnt work

    line134: const orderIdInJson = JSON.parse(jsonBody);
            console.log(JSON.stringify(jsonBody));  //orderId???  How can I get????
            console.log(orderIdInJson);
    line81-: 
    document.getElementById('totalQuantity').innerHTML = ; 
    document.getElementById('totalPrice').innerHTML = ;
    //with for we count? sum of quantity n price

    line208: i dont  know what i should put in if()
    line160:let checkAddress = /^[\w.-]/g;  need to change n check
    
    same color,same id -> change the quantity n dont show them separately
            */