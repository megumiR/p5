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
        });
    //    .catch(function(err){
    //        return thrrow new Error;
    //    });
}
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
    fetch('http://localhost:3000/api/products'  /*{
        method: 'GET',       // for a GET request, we just write fetch(URL).then???? 
        headers: {
            'Content-Type': 'application/json'
        }
    })*/)
    .then(function(response){
        if(response.ok){
        return response.json();
        }
    })    
    .then(function(){
        const products = [response.json];  //localhost product list should be the array...the URL
        for (let product of products) {
            const productImage = document.createElement('img');
                productImage.textContent = img;
                productImage.setAttribute('src', product.imageUrl);
                productImage.setAttribute('alt', product.altTxt);
            const productName = document.createElement('h3');
                productName.innerHTML = product.name; 
                productName.classList.add('productName');
            const productDescription = document.createElement('p');
                productDescription.innerHTML = product.description;
                productDescription.classList.add('productDescription');

            const newItem = document.createElement('article');
            newItem.appendChild('productImage');
            newItem.appendChild('productName');
            newItem.appendChild('productDescription');
/*          const newItemLink = document.createElement('a');
            newItemLink.setAttribute('href', objectURL????);
            newItemLink.appendChild('newItem');
*/
            //newItemのカードをセクションItemsに最後子要素として挿入する with link-> newItemLink
            document.getElementById('items').appendChild('newItem'); 
        }
    });
/*    .catch(function(err){
        console.log('get request error occured');
    });  */
}

document.getElementByTagName('article').addEventListener('click',send);