
// view more button scripts 

// if you click view more button then you travel to adopt friend section smoothly
function scrollAdoptFriendSection() {
    const AdoptFriendSection = document.getElementById("adopt-friend");
    AdoptFriendSection.scrollIntoView({ behavior: "smooth" });

}


// categories button script 


const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategories(data))
}

const displayCategories = (data) => {
    const petcategories = document.getElementById("categories");
    data.categories.forEach(category => {
        // console.log(category)
        const button = document.createElement("button");
        button.classList = ("btn rounded-full sm:px-5 md:px-5 lg:px-16 h-fit py-3 bg-green-200");
        button.innerHTML = `
             <div class="flex items-center h-full gap-3" >
                <img src="${category.category_icon}" class="h-[80%]">
                <p class="font-bold text-2xl">${category.category}</p>
            </div>
        `;
        button.addEventListener("click", () => {
            const allButton = document.querySelectorAll(".btn")
            allButton.forEach(btn => {
                btn.classList.remove("bg-green-900")
            })
            button.classList.add("bg-green-900");
            // console.log(category.category)




            loadPetCategory(category.category);



        })
        petcategories.append(button);
        // console.log(category.category_icon) 
    }
    )
}
const loadPetCategory = (categoryName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        .then(res => res.json())
        .then(data => {displayAllPets(data.data);
            sortByPrice(data.data);
        })
        
}
loadCategories();

// all pets scripts 
const loadAllPets = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(pets => pets.json())
        .then(data => {displayAllPets(data.pets)
            sortByPrice(data.pets)
        })

}

const displayAllPets = (data) => {
    // console.log(data)
    const petsContainer = document.getElementById("all-pets")

    // petsContainer.innerHTML = "";
    if (data.length === 0) {
        console.log("gggg")
        petsContainer.classList.remove("grid")
        petsContainer.classList.add("py-32")
        petsContainer.classList.add("border-2")
        petsContainer.classList.add("px-14")
        petsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center ">
        <img src="./images/error.webp">
        <h3 class="text-2xl md:text-4xl font-bold">No Information Available</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
        </p>
        </div>
        `;
    }
    else {
        petsContainer.classList.add("grid")
        petsContainer.classList.remove("py-32")
        petsContainer.classList.remove("border-2")
        petsContainer.classList.remove("px-14")
        petsContainer.innerHTML = "";
    }
    showLoading()
    setTimeout(() => {
        data.forEach(pet => {
            const petCard = document.createElement("div");
            petCard.classList = ("pet-cards")

            petCard.innerHTML = `
                <div class="card card-compact  border-4">
                        <figure class=" h-[160px] rounded-lg">
                            <img
                            src="${pet.image}"
                            alt="Shoes" class="collection-img h-full w-full object-cover p-1" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-xl text-black font-bold">${pet.pet_name}</h2>
                            
                            <p class="flex items-center gap-3"><img src="./images/icons8-windows-11-24.png " class="w-6 h-6">${"Breed:  "}${pet.breed}</p>
                            <p class="flex items-center gap-3"><img src="./images/icons8-birthdate-48.jpg"  class="w-6 h-6">${"Birth:  "}${pet.date_of_birth}</p>
                            <p class="flex items-center gap-3"><img src="./images/icons8-gender-64.png"  class="w-6 h-6">${"Gender:  "}${pet.gender}</p>
                            <p class="flex items-center gap-3"><img src="./images/icons8-price-50.png"  class="w-6 h-6">${"Price:  "}${pet.price}</p>
                            <div class="card-actions text-lg font-bold grid grid-cols-3 ">
                                <button class="btn like-button"   ><img src="./images/icons8-like-24.png"></button>
                                <button class="btn px-8 text-[#0E7A81] adopt "  >Adopt</button>
                                <button class="btn px-8 text-[#0E7A81] details-btn">Details</button>
                            </div>
                        </div>
                </div>
    
           `
            const likesDiv = document.getElementById('likes')
            petCard.querySelector(".like-button").addEventListener("click", () => {
                const likeButtonImage = petCard.querySelector("figure img").src;
                const newImage = document.createElement("img");
                newImage.classList = (" ")
                newImage.src = likeButtonImage;
                likesDiv.appendChild(newImage);
            })

            const adoptButton = petCard.querySelector(".adopt")
            adoptButton.addEventListener("click",()=> {
                adoptButton.innerText = "Adopted";
                adoptButton.disabled = true;
                showCongrates();
            })

            

            petCard.querySelector(".details-btn").addEventListener("click", () => {
                const DetailsButtonModal = showPetDetails(pet.petId)
            })

            petsContainer.append(petCard)
        })

    }, 2000);
}

const showLoading = ()=>{
    const cardField = document.getElementById('load');
const alpet = document.getElementById("all-pets")
    alpet.classList.add("hidden")
    cardField.classList.remove("hidden")
    setTimeout(() => {
        alpet.classList.remove("hidden")
        cardField.classList.add("hidden")
    }, 2000);
    

}


// details button scripts 


const showPetDetails =(data) =>{

    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`)
    .then(res => res.json())
    .then(data => openDetails(data))
    // const modalBox = document.getElementById("modalBox");

    
}
const openDetails =(pet) =>{
    console.log(pet)
    const modalButton = document.getElementById("modalBtn");
    
    const modalBox = document.getElementById("modalBox");
    modalBox.innerHTML=`
                <div class="card card-compact  border-4 inter-font">
                        <figure class=" h-[250px] rounded-lg">
                            <img
                            src="${pet.petData.image}"
                            alt="Shoes" class="collection-img h-full w-full object-cover p-1" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-xl text-black font-bold">${pet.petData.pet_name}</h2>
                            
                            <div class="grid grid-cols-2 mb-3">
                                <p class="flex items-center gap-3"><img src="./images/icons8-windows-11-24.png " class="w-6 h-6">${"Breed:  "}${pet
                                .petData.breed}</p>
                                <p class="flex items-center gap-3"><img src="./images/icons8-birthdate-48.jpg"  class="w-6 h-6">${"Birth:  "}${pet.petData.date_of_birth}</p>
                                <p class="flex items-center gap-3"><img src="./images/icons8-gender-64.png"  class="w-6 h-6">${"Gender:  "}${pet.gender}</p>
                                <p class="flex items-center gap-3"><img src="./images/icons8-price-50.png"  class="w-6 h-6">${"Price:  "}${pet.petData.price}</p>
                                <p class="flex items-center gap-3"><img src="./images/icons8-price-50.png"  class="w-6 h-6">${"vaccinated:  "}${pet.petData.vaccinated_status}</p>
                            </div>
                            <h5 class="text-lg font-bold text-black">
                                    Details Information
                            </h5>
                            <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                            The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.
                            </p>
                            <div class="card-actions modal-action text-lg font-bold w-full">
                                
                               
                                <button class="btn  px-8 text-[#0E7A81] w-full" onclick="closeModal()">Cancel</button>
                            </div>
                            
                        </div>
                </div>
    `
    
    modalButton.click();
}


const closeModal =()=>{
    document.getElementById("modalBtn").click()
}
    

const showCongrates=()=>{
    const modalButton = document.getElementById("congrates")
    modalButton.click()
     let countdowntimer = document.getElementById("countDown")
     let countdownNumber =parseInt(countdowntimer.innerText)  
     const intervalId = setInterval(() => {
        countdownNumber --;        
        countDownString = countdownNumber.toString();
        countdowntimer.innerText = countDownString;
        
        if(countdownNumber <= 0){
            clearInterval(intervalId)
            // modal.classList.add('hidden')
            const closeModal =document.getElementById("closeButton");
            closeModal.click()
           setTimeout(() => {
            countdowntimer.innerText = 3;
           }, 0);
        }
     }, 1000);

   

     

};

loadAllPets();



