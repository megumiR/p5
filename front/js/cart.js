// chercher la parametre de cette url et recuperer l'orderId pour inserer sur la page confirmation
let search_params = new URLSearchParams(document.location.search); 
let orderId = search_params.get('orderId');
let cart = JSON.parse(localStorage.getItem('cart'));

// affichier sur la page confirmation, s'il y a l'orderId. si non, on passe des boucles 'for', un eventListener et les functions pour la page panier 
if (orderId) {
    document.getElementById('orderId').innerText = orderId;
} else {
    cartItemArt();
    
/********************************** changer la quantité du produit **************************************************************/

const itemsQuantity = document.querySelectorAll('.itemQuantity');

for (let i = 0; i < itemsQuantity.length; i++){
    itemsQuantity[i].addEventListener('change', function(){  
    let itemToBeModified = itemsQuantity[i].closest('article');
    let itemId = itemToBeModified.dataset.id;
    let colorChosen = itemToBeModified.dataset.color;

//si l'utilisateur modifie la quantité du produit qui a le meme id et la meme couleur          
    for (let product of cart){       
        if(product.id == itemId && product.color == colorChosen){ 
            product.quantity = parseInt(this.value);
        } 
    }        
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
//conter la quantité totale encore une fois
    showTotalQuantitynPrice();
});
}

/********************************** FIN : changer la quantité du produit **************************************************************/


/********************************** effacer un produit dans le panier ******************************************************************* */

const itemsDelete = document.querySelectorAll('.deleteItem');

for (let i = 0; i < itemsQuantity.length; i++){
    itemsDelete[i].addEventListener('click', function(){ 
        let itemToBeDeleted = itemsDelete[i].closest('article');  
        let itemId = itemToBeDeleted.dataset.id;
        let colorChosen = itemToBeDeleted.dataset.color;

// trouver le produit selectionné dans le panier    
        cart = cart.filter(function(product){
            if(itemId == product.id && colorChosen == product.color){
                return false;
            }
            return true;
        })
        let el = document.querySelector(`[data-id="${itemId}"][data-color="${colorChosen}"]`);
        el.remove(); 
            
        localStorage.setItem('cart', JSON.stringify(cart));
//conter la quantité totale encore une fois        
        showTotalQuantitynPrice();
    });
}

/********************************** FIN : effacer un produit dans le panier ******************************************************************* */


/********************************** verifier les champs avec les regex et renvoyer le message d'erreur en cas d'erreur *******************************************************************/

document.querySelector('#order').addEventListener('click', function(event){
    event.preventDefault();
    let checkName = /^[a-zA-Z -]{2,}$/g;
    let checkFamilyName = /^[a-zA-Z -]{2,}$/g;
    let checkAddress = /^[\w. -]+$/g; 
    let checkCity = /^[a-zA-Z -]{2,}$/g;
    let checkEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;  
    const champs = [
        {champId : "#firstName", 
        regex : checkName,
        errMsgId : "firstNameErrorMsg", 
        errMsgName : "Le prénom", 
        errMsgReason : "des caractères et '-'.", 
        locoName : "firstName"},

        {champId : "#lastName", 
        regex : checkFamilyName, 
        errMsgId : "lastNameErrorMsg", 
        errMsgName : "Le nom", 
        errMsgReason : "des caractères et '-'.", 
        locoName : "lastName"},

        {champId : "#address", 
        regex : checkAddress, 
        errMsgId : "addressErrorMsg", 
        errMsgName : "L'adresse", 
        errMsgReason : "des caractères, des nombres et des caractères speciales '-', '.' et espace.", 
        locoName : "address"},

        {champId : "#city", 
        regex : checkCity, 
        errMsgId : "cityErrorMsg", 
        errMsgName : "Le nom de la ville", 
        errMsgReason : "des caractères et '-'.", 
        locoName : "city"},

        {champId : "#email", 
        regex : checkEmail, 
        errMsgId : "emailErrorMsg", 
        errMsgName : "L'adresse Email", 
        errMsgReason : "les types d'e-mails. Ecrivez comme abc@xxx.xx", 
        locoName : "email"}]; 
  
    let form = [];

    for (let element of champs){
        let value = document.querySelector(element.champId).value;
        if(value.match(element.regex)){  
            form.push({[element.locoName] : 'true' });
            document.getElementById(element.errMsgId).textContent = null; 
        } else {
            console.log(value +" doesn't much our regex");
            document.getElementById(element.errMsgId).textContent = element.errMsgName + " est invalide. Ce champ n'accepte que " + element.errMsgReason;
            form.push({[element.locoName]: 'false'}); 
        }
    }
    try{
       sessionStorage.setItem('form', JSON.stringify(form));
    } catch(err){    
//en cas d'espace manqué sur localstorage
        console.log(err)
    }
    console.log(form);

// si tout les chapms est validé(true), on envoie le formulaire avec la function 'sendForminfo'
    const formValidation = [
        {firstName : 'true'}, 
        {lastName: 'true'}, 
        {address: 'true'}, 
        {city: 'true'}, 
        {email: 'true'}];
    let result = JSON.stringify(form.concat().sort()) === JSON.stringify(formValidation.concat().sort()); 

    if (result){   
        sendForminfo();
    } else {        
        alert("form has not sent.");
    }
});  

/********************************** FIN : verifier les champs avec les regex et renvoyer le message d'erreur en cas d'erreur *******************************************************************/

}


// Des functions utilisés /////////////////////////////////////////////////////////////////


/*************************** recuperer l'array via localstorage **************************/

function takeItemInLocalStorage(){
// verifier s'il est null avant JSON.parse     
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'));
    } else{
        console.log('err');
    }
}

/*************************** FIN : recuperer l'array via localstorage **************************/


/****************************** creer des articles pour les produits selectionnes du cart *****************************/

async function cartItemArt(){
// recuperer l'info du panier     
    takeItemInLocalStorage();
    
// affichier tout les produits du panier  
    if(cart !== null){  
        for (let product of cart){
            let cartItemArticle = document.createElement('div')
            cartItemArticle.innerHTML = 
            `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">  
                <div class="cart__item__img">
                    <img src="${product.imgUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p><span class="productPrice"></span> €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article> `  

        document.getElementById('cart__items').appendChild(cartItemArticle); 
        } 
// recuperer et affichier les prix 
        await getPrice();
    }
};

/****************************** FIN : creer des articles pour les produits selectionnes du cart *****************************/


/********************** creer la requete GET pour recuperer les prix du produit et les affichier ***********************/

function getPrice(){
    fetch('http://localhost:3000/api/products',{
        method: 'GET',      
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        if(response.ok){   
        return response.json();
        }
    })    
// recuperer les prix du produits seletionnes dans tout les produits
    .then(function(products){  
        for (let product of products) {
            let elements = document.querySelectorAll(`[data-id="${product._id}"]`);
            for (let element of elements){
                let productPrice = element.querySelector('.productPrice');
                productPrice.textContent = product.price;
            }
        }
// counter la quantite totale et le prix total et les affichier
        showTotalQuantitynPrice();
    })
    .catch(function(err){
        console.log(err)   
    });
}

/********************** FIN : creer la requete GET pour recuperer les prix du produit et les affichier ***********************/


/********************************** counter la quantite totale et le prix total **********************************************/

function showTotalQuantitynPrice(){
    let totalQuantity = 0; 
    let totalPrice =0;
    let products =  document.querySelectorAll('article');

    for(let product of products){
        let productPrice = product.querySelector('.productPrice').textContent;
        let productQuantity = product.querySelector('.itemQuantity').value;
        totalQuantity += parseInt(productQuantity);        
        totalPrice += parseInt(productQuantity) * parseFloat(productPrice);  
    }
    document.getElementById('totalQuantity').textContent = totalQuantity; 
    document.getElementById('totalPrice').textContent = totalPrice;
}

/********************************** FIN : counter la quantite totale et le prix total *******************************************/


/********************************** passer une commande avec la requete POST ********************************************************/ 

function sendForminfo(){
    let productIds = [];
    for (let product of cart){
        productIds.push(product.id);
    }
    let newOrder =  
    {
        contact: {
            firstName : document.getElementById('firstName').value, 
            lastName: document.getElementById('lastName').value, 
            address: document.getElementById('address').value, 
            city: document.getElementById('city').value, 
            email: document.getElementById('email').value
        },
        products: productIds
    };

    let url = 'http://localhost:3000/api/products/order';   
     
    fetch(url, {    
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder) 
    })
    .then(function(response){
        if(response.ok){        
            return response.json();
        }
    }) 
    .then(function(value){  
        let orderId = value.orderId;
        let form = document.querySelector('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'confirmation.html?orderId=' + orderId)
        form.submit();         
    })
    .catch(function(err){
        console.log(err)
    });   
}

/********************************** FIN : passer une commande avec la requete POST ********************************************************/ 