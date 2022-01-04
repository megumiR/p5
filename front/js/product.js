//get product id to show on the screen etape5
/*function getIdClicked(){
    var url = new URL('http://localhost:3000/api/products');  //表示Urlを取得。
    var params = url.searchParams; //Urlについてるパラメータを取得。パラがあったらのIf文
    if(params.has('id')){
        var itemId = params.get('id');
        console.log(itemId)
        //send the choice to product page??
    }
}*/

//etape6 une seule article affiche
const imgDiv = document.querySelector('.item__img').createElement('img');
imgDiv.setAttribute('src', product.imageUrl);
imgDiv.setAttribute('alt', product.altTxt)

document.getElementById('title').innerHTML = product.name;
document.getElementById('price').innerHTML = product.price;

document.getElementById('description').textContent = product.description;
