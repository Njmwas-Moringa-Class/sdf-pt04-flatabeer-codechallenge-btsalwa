const beerName = document.getElementById('beer-name');
const beerImage = document.getElementById('beer-image');
const beerDescription = document.getElementById('beer-description');
const beerReviewForm = document.getElementById('review-form');
const beerReviewText = document.getElementById('review');

function beerDisplay(beer) {

    const beerDescriptionForm = document.getElementById('description-form');
    const beerEditDescription = document.getElementById('description');
 
    const beerReviewList = document.getElementById('review-list');
    while (beerReviewList.firstElementChild) {
        beerReviewList.removeChild(beerReviewList.lastElementChild)
    };

    beerName.textContent = beer.name,
        beerImage.src = beer.image_url,
        beerDescription.textContent = beer.description,
        beerEditDescription.value = beer.description

     

    for (let review of beer.reviews) {
        let beerReview = document.createElement('li');
        beerReview.textContent = review;
        beerReviewList.appendChild(beerReview);
    }

    
    beerDescriptionForm.addEventListener('submit', updateDescription);

    
    function updateDescription(event) {
        
        event.preventDefault();
        beer.description = beerEditDescription.value;
        updateBeer(beer)
    };
    
    beerReviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (beerReviewText.value !== '') {

            beer.reviews.push(beerReviewText.value)
            updateBeer(beer)
        } else {
            alert('Please add Review!')
        }
    });
};



function updateBeer(beer) {
    
    fetch(`http://localhost:3150/beers/${beer.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(beer)
        })
        .then(response => response.json())
        .then(data => beerDisplay(data))

};

function fetchData(beer = null) {
    let baseURL = 'http://localhost:3510/beers/'
        
    return new Promise((resolve, ) => {
        let url = beer == null ? baseURL : `${baseURL + beer}`
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))

    })
};



function navDisplay(beers) {

    
    const navBeerList = document.querySelector('#beer-list');
    while (navBeerList.firstElementChild) {
        
        navBeerList.removeChild(navBeerList.lastElementChild)
    };

    beers.forEach(beer => {
        const navElement = document.createElement('li');
        navElement.textContent = beer.name;
        navElement.setAttribute('index', beer.id);
        navBeerList.append(navElement)

        
        navElement.addEventListener('click', (event) => {
            
            fetchData(event.target.getAttribute('index'))
                .then(beer => {
                    beerDisplay(beer);
                });
        });
    });


};

function initializeFlataBeer() {
    
    fetchData()
        .then(beers => navDisplay(beers))
        
    fetchData(1)
        .then(beers => beerDisplay(beers))

};
initializeFlataBeer()