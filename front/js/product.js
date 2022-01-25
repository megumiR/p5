/**************************************** recuperer l'id du produit sur url de cette page(document.location.search) ****************************************/    

let search_params = new URLSearchParams(document.location.search);       
let itemId = search_params.get('id');  

/**************************************** FIN : recuperer l'id du produit ***************************************************/   

    
/***************************** affichier une seule article de produit selectionné avec la requete GET **********************/

let url = 'http://localhost:3000/api/products/' + itemId;    

fetch(url, {
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
// retourner des elements corresondants à l'id du produit (les données recuperées)
.then(function(product){  
    document.getElementById('title').textContent = product.name;  
    document.getElementById('price').innerHTML = product.price;  
    document.getElementById('description').textContent = product.description;   

    let imgDiv = document.createElement('img');
    imgDiv.setAttribute('src', product.imageUrl); 
    imgDiv.setAttribute('id', 'imgId'); 
    imgDiv.setAttribute('alt', product.altTxt);     
    document.querySelector('.item__img').appendChild(imgDiv); 
        
    for (let color of product.colors){
        let colorOption = document.createElement('option');
        colorOption.setAttribute('value', color);
        colorOption.textContent = color;    
        document.getElementById('colors').appendChild(colorOption);
    }
})
.catch(function(err){
    console.log(err)
});

/***************************** FIN : affichier une seule article de produit selectionné avec la requete GET **********************/


/******************** stocker les infos(du coleur, la quantité) dans le localstorage lorsque l'utilisateur clique *********************************************/

document.getElementById('addToCart').addEventListener('click',async function(){
    let cart = JSON.parse(localStorage.getItem('cart'));
// nomer pour les infos 
    let colorChosen = await document.getElementById('colors').value; 
    let quantityChosen =  document.getElementById('quantity').value; 
    let itemImgUrl = document.getElementById('imgId').getAttribute('src');
    let itemAltTxt = document.getElementById('imgId').getAttribute('alt');
    let itemName = document.getElementById('title').textContent;  

    let isProductInCart = false;
// verifier s'il y a deja des produits du meme id et de la meme couleur dans le panier 
    if(cart){
        for (let product of cart){     
            if(product.id == itemId && product.color == colorChosen){      
                product.quantity += parseInt(quantityChosen);    
                isProductInCart = true; 
                break;                               
            } 
        }
    } else {
        cart = [];
    }
    
    if(!isProductInCart){
        cart.push({
            id : itemId, 
            quantity: parseInt(quantityChosen), 
            color: colorChosen, 
            imgUrl: itemImgUrl, 
            altTxt: itemAltTxt, 
            name: itemName
        });
    }
    try{
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch(err){    
//en cas d'espace manqué sur localstorage
        console.log(err)
    }
    console.log(cart);
})

/******************** FIN : stocker les infos(du coleur, la quantité) dans le localstorage lorsque l'utilisateur clique *********************************************/
