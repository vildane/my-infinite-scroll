const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count= 5;
const apiKey = '6XAfceLPpiju_qjMXTFeoGqbxm2rOgw5r3CCokaLDpI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('imagesLoaded');
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30
       
    }
}


// Helper function to set attribute on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Element s for Links & photos, add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
  
// Run function for each object in photosArray
    photosArray.forEach((photo)=> {

// Create <a> to link to Unsplash
        const item = document.createElement('a');
       setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
       });
 // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
// Event Listener, check when each is finished
        img.addEventListener('load', imageLoaded);

// Put <img> inside <a>, then
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // catch error here
    }
}

// Ckeck to see if scrolling near bottom of page, Load more phots
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
        console.log('load more');
    }
});
// on Load
getPhotos();