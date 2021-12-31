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
//document.getElementById('').addEventListener('submit',send);

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


