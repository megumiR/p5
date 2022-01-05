//resourse webiner ${article.id}--23:40 , 
/*fetch('http://localhost:3000/api/products')
    .then(function(data){
        return data.json();
    })
    .then(function(jsonListArticle){
        for (let jsonArticle of jsonListArticle){
            let article = new Article(jsonArticle); 
     //je dois creer un fichier article.js?????class article constructor...webinar 24:22
        document.querySelector('.items').innerHTML += 
          `<a href="./product.html?id=${article.id}">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>` ;
        }
        console.log(jsonListArticle);
    });
*/
// from the course bloc3-3fr
/*async function getPostRequests(){
    getResults = await Promise.all([get(URL1), get(URL2)]);
    const postResult = await post(URL3);
    return [getResults, postResult];          //get post両方の結果待ってから返す 
}
getPostRequests().then(function(allResults){
    //do sth with the results
});
*/

//send POST request via Ajax bloc2-4fr all shoud be inside a -> 
function send(event){
    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)//({value: document.getElementById('').value})POSTで返された値をどこに置くか
    })
        .then(function(response){
            if(response.ok){
                return response.json();    //response.text()  + .then(function(text){ Element.innerText = text; });...MDN
            }
        })
        .then(function(value){
            //like return the result as a innerText = value.postData.text: >>check postData.text 
            //we wanna put the result in a product page =by post, send the id and get at product page??(etape4)
            //console.log('post request works ')
                var url = new URL('http://localhost:3000/api/products');  //表示Urlを取得。
                var params = url.searchParams; //Urlについてるパラメータを取得。パラがあったらのIf文
                if(params.has('id')){
                    var itemId = params.get('id');
                    console.log(itemId)
                    //send the choice to product page??
                }
                
            
        })   
        .catch(function(err){
            console.log('error occurd')
        });
/*}
//document.getElementByTagName('article').addEventListener('click',send); アイテムのリンクをクリックしたらプロダクトページに飛ぶ。

//Etape3: page d'accueil, inserer produits
//freecodecamp  Working with Headers https://www.freecodecamp.org/news/javascript-fetch-api-tutorial-with-js-fetch-post-and-header-examples/
    /*
function requestGet(){ 
    fetch('http://localhost:3000/api/products'{
        method: 'GET',       // for a GET request, we just write fetch(URL).then???? 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json)
    });
    .catch(function(err){
        console.log(err)
    });
}
*/


function requestGet(){ 
    fetch('http://localhost:3000/api/products',{
        method: 'GET',       // for a GET request, we just write fetch(URL).then???? 
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
    .then(function(products){  //le parametre entre() est le resultat de l'appel API = products 
       // const products = [response.json];  localhost product list should be the array...the URL
        for (let product of products) {
            //let OR const? -> image changes every time so let is better 
            let productImage = document.createElement('img');
               // productImage.textContent = img;  n'a pas besoin?
                productImage.setAttribute('src', product.imageUrl);
                productImage.setAttribute('alt', product.altTxt);
            let productName = document.createElement('h3');
                productName.innerHTML = product.name; 
                productName.classList.add('productName');
            let productDescription = document.createElement('p');
                productDescription.innerHTML = product.description;
                productDescription.classList.add('productDescription');

            let newItem = document.createElement('article');
            newItem.appendChild('productImage');
            newItem.appendChild('productName');
            newItem.appendChild('productDescription');
//Etape4 creer un lien
            let newItemLink = document.createElement('a');
            let eachLinkWithId = './product.html?id=' + product._id;
            newItemLink.setAttribute('href', eachLinkWithId);
            newItemLink.appendChild('newItem');

            //newItemのカードをセクションItemsに最後子要素として挿入する newItem--> with link: newItemLink
            document.getElementById('items').appendChild('newItemLink'); 
        }
    })
    .catch(function(err){
        console.log('get request error occured');
    });  
}



document.getElementByTagName('article').addEventListener('click',send);