/************************************ creer la requete GET pour recuperer et inserer les info du produit ***********************************************/

fetch('http://localhost:3000/api/products', {
    method: 'GET',                               
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
// verifier si la requete GET est reussi
.then(function (response) {
    if (response.ok) {   
        return response.json();
    }
})    
// creer des elements pour affichier des infos de produits (le parametre entre() est le resultat de l'appel API = products info)
.then(function(products){  
    for (let product of products) {
        let productImage = document.createElement('img');
        productImage.setAttribute('src', product.imageUrl);
        productImage.setAttribute('alt', product.altTxt);

        let productName = document.createElement('h3');
        productName.textContent = product.name;   
        productName.classList.add('productName');

        let productDescription = document.createElement('p');
        productDescription.textContent = product.description;
        productDescription.classList.add('productDescription');

        // inserer des elements creés
        let newItem = document.createElement('article');
        newItem.appendChild(productImage);
        newItem.appendChild(productName);
        newItem.appendChild(productDescription);

        //creer un lien pour redigirer à la page produit
        let eachLinkWithId = './product.html?id=' + product._id;
        let newItemLink = document.createElement('a');
        newItemLink.setAttribute('href', eachLinkWithId);
        newItemLink.appendChild(newItem);

        document.getElementById('items').appendChild(newItemLink); 
    }
})
.catch(function (err) {
    console.log(err);
});  

/************************************ FIN : creer la requete GET pour recuperer les info du produit ***********************************************/