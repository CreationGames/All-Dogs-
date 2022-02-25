let timer
let deleteFirstPhotoDelay


async function start(){
    const responce = await fetch("https://dog.ceo/api/breeds/list/all")
    const datas = await responce.json()
    Data(datas.message)
}

function Data(breedList){
    const breed = document.querySelector("#breed")
    breed.innerHTML = `
    <select onchange="loadByBreed(this.value)" class="text-center" name="breeds" id="breedselect">
        <option class="text-center">Choose a Dog Breed!</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option class="text-center">${breed}</option>`
        }).join("")}
    </select>
    `
}

async function loadByBreed(Currbreed){
    if(Currbreed != "Choose a Dog Breed!"){
        const image = await fetch(`https://dog.ceo/api/breed/${Currbreed}/images`)
        const CurrbreedImage = await image.json()
        createSlideshow(CurrbreedImage.message)
    }
}

function createSlideshow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPosition += 2
  if (images.length == 2) currentPosition = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}

start()