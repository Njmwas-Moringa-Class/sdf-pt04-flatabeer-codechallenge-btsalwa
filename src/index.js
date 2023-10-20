// Code here
const baseApi = "http://localhost:3000" 


function getAndLoadAllBeers(){
    fetch(`${baseApi }/beers`) 

    .then(resp=>resp.json()) 

    .then(beers=>{ 

    document.getElementById('beer-list').innerHTML = beers 

    .map(beer=>`<li onClick="getAndLoadBeerDetails(${beer.id})">${beer.name}</li>`) 

    .join(''); 

    })


}
    
    