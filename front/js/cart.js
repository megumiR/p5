// recuperer l'array via localstorage
// check if its null or not ??? json.parse we need to check null or not before parse it
let cart = JSON.parse(localStorage.getItem('cart'));

//async 
function takeItemInLocalStorage(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
    } else{
        console.log(err);
    }
}

//Creer des articles pour les produits selectionnes du cart
//cart[0]=ID,[1]=QUANTITY,[2]=COLOR,[3]=IMGURL,[4]=ALTTXT,[5]=NAME,[6]=PRICE
async function cartItemArt(){
    //await 
    takeItemInLocalStorage();
    
    for (let product of cart){
        console.log(product.name); //it was id's 5th letter not as a 5th data String because of lack of JSON.parse

/*Attention de ne pas dupliquer inutilement les éléments dans le
tableau récapitulatif (le panier). S’il y a plusieurs produits identiques
(même id + même couleur), cela ne doit donner lieu qu’à une seule
ligne dans le tableau 
        
        function findDuplicatedItem(product) {
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
              </article> `  //in span, there was ${product.price}

        document.getElementById('cart__items').appendChild(cartItemArticle); 
    } 
    await getPrice();
};
cartItemArt();

//creer la requete GET pour recuperer les info du produit 
//async 
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
    .then(function(products){  //le parametre entre() est le resultat de l'appel API = products info
        for (let product of products) {
            let elements = document.querySelectorAll(`[data-id="${product._id}"]`);
            for (let element of elements){
                let productPrice = element.querySelector('.productPrice');
                productPrice.textContent = product.price;
            }
        }
        showTotalQuantitynPrice();
        /*        let itemsPrice = document.querySelectorAll('.productPrice');
        console.log(itemsPrice);
        for (let i in itemsPrice){
            let itemPrice = itemsPrice[i].closest('article');
            let itemId = itemPrice.dataset.id; 
            console.log("itemId(data-id of article) is"+ itemId);  

                for (let product of products){
                    if(product._id == itemId){
                        console.log(product.price);
                        itemsPrice[i].textContent = product.price;
                        break;
                    }
                }
        }       */
    })
    .catch(function(err){
        console.log(err)
    
    });
}

//Counter la quantite totale et le prix total
//async 
function showTotalQuantitynPrice(){
   // await cartItemArt();  --> 2 articles become 4 -o-  
    let totalQuantity = 0; 
    let totalPrice =0;
    let products =  document.querySelectorAll('article');

    for(let product of products){
        let productPrice = product.querySelector('.productPrice').textContent;
        let productQuantity = product.querySelector('.itemQuantity').value;
        
        totalQuantity += parseInt(productQuantity);        ///on peut laisser la numero bizzare 1* ?
        totalPrice += parseInt(productQuantity) * parseFloat(productPrice);  
        console.log("The totalQuantity in cart is "+ totalQuantity, "The total price in cart is "+ totalPrice);
        }
    document.getElementById('totalQuantity').textContent = totalQuantity; 
    document.getElementById('totalPrice').textContent = totalPrice;
}
//showTotalQuantitynPrice();

//Changement de quantite du produit
//function changeItemQuantity(){
    const itemsQuantity = document.querySelectorAll('.itemQuantity');

    for (let i = 0; i < itemsQuantity.length; i++){//(let i in itemsQuantity){
    itemsQuantity[i].addEventListener('change', function(){  //'change'OR 'input' to see the change everytime
        let itemToBeModified = itemsQuantity[i].closest('article');
        let itemId = itemToBeModified.dataset.id;
        let colorChosen = itemToBeModified.dataset.color;
        
        for (let product of cart){       
            if(product.id == itemId && product.color == colorChosen){ 
                //cart[1] = this.value;
                product.quantity = parseInt(this.value);
                
            } 
        }
        //how can i get the quantity of input?????  https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
        
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
            //calculate total quantity again
            showTotalQuantitynPrice();
});
    }
//}

    //.find or .indexOf https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    //OR .splice https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice


//effacement d'un produit
const itemsDelete = document.querySelectorAll('.deleteItem');

for (let i = 0; i < itemsQuantity.length; i++){//(let i in itemsDelete){
    itemsDelete[i].addEventListener('click', function(){ //p .deleteItem
        let itemToBeDeleted = itemsDelete[i].closest('article');  //element.closest() ->target the element to change
        let itemId = itemToBeDeleted.dataset.id;
        let colorChosen = itemToBeDeleted.dataset.color;
    
        cart = cart.filter(function(product){
            if(itemId == product.id && colorChosen == product.color){
                return false;
            }
            return true;
        })
        let el = document.querySelector(`[data-id="${itemId}"][data-color="${colorChosen}"]`);
        el.remove(); //->remove always the first product on DOM but localstorage is ok...
        
        
    
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
        
        showTotalQuantitynPrice();
    //localStorage.removeItem(itemToBeDeleted);  //localStorage.clear(); ->all delete localStorage.removeItem('cart') .find ->trouver les items
    });
}
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



/* Regex varifier    https://www.pierre-giraud.com/javascript-apprendre-coder-cours/regex-recherche-remplacement/
let a = /[a-zA-Z]/g;    ----> g : global if there are more than 2 matches by string.match(a), with g they show 2 of them
let b = new RegExp('[a-zA-Z]','g');  it is boolean so if there is no match, they return false 
*/
let checkName = /^[a-zA-Z -]{2,}$/g;
let checkFamilyName = /^[a-zA-Z -]{2,}$/g;
let checkAddress = /^[\w. -]+$/g; // ^[A-Za-z0-9_.]+$   ^[\w.]+ ->azAZ09_ included []? )? ->can be with ) + ou {1,}/ * ou {0,}
let checkCity = /^[a-zA-Z -]{2,}$/g;
let checkEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;    
//https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
//  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

/*let formCheckList = [checkName, checkAddress, checkAddress, checkCity, checkEmail];
let champ = ['#firstName', '#lastName','#address', '#city', '#email'];
let errMsgId = ['firstNameErrorMsg', 'lastNameErrorMsg', 'addressErrorMsg', 'cityErrorMsg', 'emailErrorMsg'];
let errMsgName = ["Le prénom", "Le nom", "L'adresse", "Le nom de la ville", "L'adresse Email"];
let errMsgReason = ["des caractères et '-'.", "des caractères et '-'.", "des caractères, des nombres et des caractères speciales '-', '.' et espace.",
 "des caractères et '-'.", "les types d'e-mails. Ecrivez comme abc@xxx.xx"];

let champs = document.querySelectorAll('.cart__order__form__question').closest(input);
//let champs = document.querySelector(champ);
champs.forEach(element => {
    element.addEventListener('input', function(event){

    });
});

*/
/*
//for(let i in ?????????){
document.querySelector('#firstName').addEventListener('input', function(event){
//document.querySelector(champ[i]).addEventListener('input', function(event){
    let value = event.target.value;
    if(value.match(checkName) == false){  // boolean false = null = form is invalid .MATCH OR .TEST
    //if(formCheckList[i].match(value) == false){     
        document.getElementById('firstNameErrorMsg').innerHTML = "Le prénom est invalide. Ce champ n'accepte que des caractères.";
    } else {
        console.log('Prénom valide')
    }
});*/
//}

document.querySelector('#order').addEventListener('click', function(event){
    event.preventDefault();

    // vérifier les champs avec les regex
    // faire une isOK = true
    // a chaque vérification, si il y a une erreur, mettre isOK = false
    const champs = [
        {champId : "#firstName", regex : checkName, errMsgId : "firstNameErrorMsg", errMsgName : "Le prénom", errMsgReason : "des caractères et '-'."},
        {champId : "#lastName", regex : checkFamilyName, errMsgId : "lastNameErrorMsg", errMsgName : "Le nom", errMsgReason : "des caractères et '-'."},
        {champId : "#address", regex : checkAddress, errMsgId : "addressErrorMsg", errMsgName : "L'adresse", errMsgReason : "des caractères, des nombres et des caractères speciales '-', '.' et espace."},
        {champId : "#city", regex : checkCity, errMsgId : "cityErrorMsg", errMsgName : "Le nom de la ville", errMsgReason : "des caractères et '-'."},
        {champId : "#email", regex : checkEmail, errMsgId : "emailErrorMsg", errMsgName : "L'adresse Email", errMsgReason : "les types d'e-mails. Ecrivez comme abc@xxx.xx"}]; 
    let isOk = false;

    for (let element of champs){
        console.log(element.champId);
        let value = document.querySelector(element.champId).value;
        if(element.regex.test(value)){  
            isOk = true;
            console.log(element.champId + " : "+ value +" is valid");
        } else {
            isOk = false;
            console.log(""+ value +" exsists but doesn't much our regex");
            document.getElementById(element.errMsgId)
                .textContent = element.errMsgName + " est invalide. Ce champ n'accepte que " + element.errMsgReason;
        }
    }

/*Marche pas    champs.forEach(element => {
        let value = document.querySelector(element.champId).value;
        console.log("The value is: "+ value +", the regex for this value is: "+ element.regex );
        if(element.regex.test(value)){  //        if(value.match(element.regex) == true){
            isOk = true;
            console.log(element.champId + " : "+ value +"is valid");
        } else {
            isOk = false;
            console.log(""+ value +" exsists but doesn't much our regex");
            document.getElementById(element.errMsgId)
                .textContent = element.errMsgName + " est invalide. Ce champ n'accepte que " + element.errMsgReason;
        }    
    });*/
    
    // si isOK est true alors on envoie le formulaire

    if(isOk = true){   //All of input are valid = function 'sendForminfo' 
        sendForminfo();
        console.log("form is sent");
    } else {        
    }
});

 //etape 10 valider la commande -->local storage? here , its for etape11 POST request to show orderId in confirmation
//passer une commande ,  La requête post ne prend pas encore en considération la quantité ni la couleur des produits achetés.
//async 
function sendForminfo(){
    //await 
     fetch('http://localhost:3000/api/products/order', {    //async await?????????
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({value: document.getElementById('orderId').value}) //(jsonBody)?({value: document.getElementById('').value})POSTで返された値をどこに置くか 
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
             //let form = document.querySelector(form .cart__order__form);
             //form.action = "confirmation.html"; form.method = "POST";  form.submit();
             //document.forms["myform"].submit();
             //.target -> send the result to the place you wanna put
             //.method -> show the method you use for sending the form
         //    document.getElementById('orderId').textContent = orderIdInJson;
 
         })
         .catch(function(err){
             console.log(err)
         });  
}
//document.querySelector('#order').addEventListener('click', sendForminfo);


/*etape11   take the command ID by POST request 
            affichier le numero de command sur confirmation.html (addEventlistener - innerHtML )
    */

/*QUESTIONS
    


    line134: const orderIdInJson = JSON.parse(jsonBody);
            console.log(JSON.stringify(jsonBody));  //orderId???  How can I get????
            console.log(orderIdInJson);
    

    line208: i dont  know what i should put in if()


    CSS selector: https://developer.mozilla.org/fr/docs/Web/CSS/Attribute_selectors
    to submit formkkk : https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit
    */
