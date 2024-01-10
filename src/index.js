//Log a styled message to the console
console.log('%c HI', 'color: firebrick')

//API URLs for fetching dog images and breeds
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

//Function to be executed when the window has finished loading
window.onload = function() {
//To fetch and display dog images and breeds
 fetchDogImages()
 fetchDogBreeds()
}

//Async function to fetch and display dog images
async function fetchDogImages() {
 try {
    const response = await fetch(imgUrl)
    const data = await response.json()
    data.message.forEach(url => {
        //To create an image element for each URL and append it to the container
        const img = document.createElement('img')
      img.src = url
      document.getElementById('dog-image-container').appendChild(img)
    })
 } catch (error) {
    //Log an error message if fetching images fails
    console.error('Error fetching dog images:', error)
 }
}

// Async function to fetch and display dog breeds
async function fetchDogBreeds() {
 try {
    const response = await fetch(breedUrl)
    const data = await response.json()
    const breeds = Object.keys(data.message)
    breeds.forEach(breed => {
        // Create a list item for each breed, add click event listener to change color
      const li = document.createElement('li')
      li.textContent = breed
      li.addEventListener('click', () => {
        li.style.color = 'blue'
      })
      document.getElementById('dog-breeds').appendChild(li)
    })
    // Add a change event listener to the dropdown for filtering breeds
    document.getElementById('breed-dropdown').addEventListener('change', filterBreeds)
 } catch (error) {
     // Log an error message if fetching breeds fails
    console.error('Error fetching dog breeds:', error)
 }
}

// Function to filter dog breeds based on the selected dropdown option
function filterBreeds() {
 const dropdown = document.getElementById('breed-dropdown')
 const letter = dropdown.options[dropdown.selectedIndex].value
 const breedListItems = document.getElementById('dog-breeds').getElementsByTagName('li')
 for (let i = 0; i < breedListItems.length; i++) {
    const breed = breedListItems[i].textContent
     // Show or hide breeds based on the selected letter
    if (breed.charAt(0).toLowerCase() === letter) {
      breedListItems[i].style.display = ''
    } else {
      breedListItems[i].style.display = 'none'
    }
 }
}