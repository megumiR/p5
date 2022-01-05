//get product id to show on the screen etape5
 /*             var url = new URL('http://localhost:3000/api/products');  //表示Urlを取得。
                var params = new URLSearchParams(url.search); //Urlについてるパラメータを取得。
                //パラがあったらのIf文
                if(params.has('_id')){
                    var itemId = params.get('_id');
                    console.log(itemId)
                    //send the choice to product page??
                }  */
    
    var search_params = new URLSearchParams(document.location.search); //document.location.search = URL de cette page
    var itemId = url.searchParams.get('_id');
    /*var itemName = url.searchParams.get('name');
    var itemImgsrc = url.searchParams.get('imageUrl');
    var itemAltTxt = url.searchParams.get('altTxt');
    var itemPrice = url.searchParams.get('price');
    var itemDescription = url.searchParams.get('description');
*/
    /*for (var value of searchParams.values()){
        console.log(value);
    }*/
    console.log(itemId);
//etape6 une seule article affiche, get request takes specific id's info
//get--parametre:{product-ID}
fetch('http://localhost:3000/api/products', {
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
    .then(function(itemId){  // .then(function(url.searchParams.get('_id')){
        //etape6 return l'element correspondant a {product-ID}　何番目のデータか確認して名前つけたらproduct.nameみたいに引っ張れる？
        document.getElementById('title').innerHTML =  url.searchParams.get('name');  //itemName
        document.getElementById('price').innerHTML = itemId.price;  //itemPrice
        document.getElementById('description').textContent = itemId.description;  //itemDescription  

        let imgDiv = document.createElement('img');
            imgDiv.setAttribute('src', itemId.imageUrl);  //itemImgsrc
            imgDiv.setAttribute('alt', itemId.altTxt);  //itemAltTxt
            document.querySelector('.item__img').appendChild(imgDiv); 
        for (let option of itemId.option){
            let colorOption = document.createElement('option');
            colorOption.setAttribute('value', option);
            document.getElementById('colors').appendChild(colorOption);
        }
    })
    .catch(function(err){
        console.log(err)
    });