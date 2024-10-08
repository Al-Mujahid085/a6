
const sortByPrice = (data)=>{
    
    
    const sortButton = document.getElementById("sort-btn")
    console.log(data);
    sortButton.addEventListener("click", () => {
        
       const sortData =   data.sort((a,b)=>b.price - a.price);
       console.log(sortData)
       
       displayAllPets(sortData);
    })


}