//get product id to show on the screen etape5
 /*             var url = new URL('http://localhost:3000/api/products');  //表示Urlを取得。
                var params = new URLSearchParams(url.search); //Urlについてるパラメータを取得。
                if(params.has('_id')){                        //パラがあったらのIf文
                    var itemId = params.get('_id');
                    console.log(itemId);
                }  */
    
    var search_params = new URLSearchParams(document.location.search); //document.location.search = URL de cette page
    var itemId = search_params.get('id');  //id OR _id -> follow the one you can see <a href>on inspector google
    var itemName = search_params.get('name');          //its not working here
    var itemImgUrl = search_params.get('imageUrl');   //its not working here
    var itemAltTxt = search_params.get('altTxt');     //its not working here
    var itemPrice = search_params.get('price');       //its not working here
  /*  for (var value of search_params.values()){
        console.log(value);                            ->same as a sonsole.log(itemId);
    }*/
    console.log(itemId,itemName,itemImgUrl);
//etape6 Afficher une seule article, get request takes specific id's info

let url = 'http://localhost:3000/api/products/' + itemId;    //get--parametre:/{product-ID}  =fetch('http..../' + {product-ID} )
//async function showSelectedProduct(){
//await
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
    .then(function(product){  // Search_Params.get('_id')のデータGETした上で、返ってくる１商品のProductInfoを使ってく
        //etape6 return l'element correspondant a {product-ID}　１商品のProductInfoしかないけん各情報をproduct.nameみたいに引っ張れる
        document.getElementById('title').innerHTML = product.name;  //itemName
        document.getElementById('price').innerHTML = product.price;  //itemPrice
        document.getElementById('description').textContent = product.description;   

        let imgDiv = document.createElement('img');
            imgDiv.setAttribute('src', product.imageUrl);  
            imgDiv.setAttribute('alt', product.altTxt); 
            document.querySelector('.item__img').appendChild(imgDiv); 
        for (let color of product.colors){
            console.log(color);
            let colorOption = document.createElement('option');
            colorOption.setAttribute('value', color);
            colorOption.innerHTML = color;    //dont forget to show on screen as a string
            document.getElementById('colors').appendChild(colorOption);
        }
    })
    .catch(function(err){
        console.log(err)
    });
//}
//showSelectedProduct();


//etape7 store info(color,quantity,) in a localstorage ----if ( color && id == same product) ++; eventListener('click', ) store []; in localstorage???
    
// avant modif-> let cart = []; apres (et mettre dans eventListener->let cart = localStorage.getItem('cart');
/*EX:Ne pas faire de push car elles vont etre stockees dans le cart) 
      cart.push(['ID', 'QUANTITY', 'COLOR','IMGURL','ALTTXT','NAME','PRICE']);  // .push(); ->define what you wanna put in the array
 this push look like this..
   [//cart
    ['123456', 50, 'red'], //product
    ['123456', 100, 'white'], //product with different color variation = same ID but color, quantity different
    []
   ]
   */
// verifier si 'cart' n'est pas 'null' ??????
/*let colorChosen = document.getElementById('colors').value; //'option'->ne peux pas recuperer la valeur choisi ...choisir <select>
let quantityChosen = document.getElementById('quantity').value; //recuperer??
let isProductInCart = false; 
if(cart){
    for (let product of cart){       //o-product[0] x-cart[0] each product in the cart , we talk about
        if(cart[0] == product.itemId && cart[2] == product.colorChosen){  // if(cart[0] == itemId && cart[2] == colorChosen){
            cart[1] += product.quantityChosen;   //cart[1] += quantityChosen;
            let isProductInCart = true; 
        } 
    }
} else {
    cart = [];
}
if(!isProductInCart){
    cart.push = [itemId, quantityChosen, colorChosen, itemImgUrl, itemAltTxt, itemName, itemPrice];
}
document.getElementById('addToCart').addEventListener('click', function(){
    cart = localStorage.getItem('cart');
    localStorage.setItem('cart', cart); //('cart', JSON.stringify(cart)); var array = JSON.parse( localStorage.getItem('cart') );
    console.log(cart);
})*/
//    localStorage.getItem('ID'); //page panier?

document.getElementById('addToCart').addEventListener('click',async function(){
    let cart = localStorage.getItem('cart');
    let colorChosen = await document.getElementById('colors').value; //'option'->ne peux pas recuperer la valeur choisi ...choisir <select>
    let quantityChosen = await document.getElementById('quantity').value; 
    let isProductInCart = false; 
    if(cart){
        for (let product of cart){       
            if(product[0] == itemId && product[2] == colorChosen){ 
                product[1] += quantityChosen;  
                let isProductInCart = true; 
            } 
        }
    } else {
        cart = [];
    }
    if(!isProductInCart){
        cart.push = ([itemId, quantityChosen, colorChosen, itemImgUrl, itemAltTxt, itemName, itemPrice]);
    }
    localStorage.setItem('cart', cart);
    console.log(cart);
})