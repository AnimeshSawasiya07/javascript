function galleryComponent() {
    let main = document.getElementById("main")

    let addImgbtn = document.createElement("button")
    addImgbtn.innerHTML = "Add image"
    addImgbtn.setAttribute("class","btn text-white bg-danger ml-2")

    addImgbtn.addEventListener("click",()=>{

        let fileInput = document.createElement("input")
        fileInput.type="file"
        fileInput.accept="image/*"
        fileInput.setAttribute("style","display:none")


        fileInput.addEventListener("change",function(){
            const file = this.files[0]

            if(file){
                const reader = new FileReader();
                reader.onload = function(e){

                    let images = JSON.parse(localStorage.getItem("images"))
                    images.push(e.target.result)
                    localStorage.setItem("images",JSON.stringify(images))
                    location.reload();

                }
                reader.readAsDataURL(file)
            }
        })

        main.appendChild(fileInput)

        fileInput.click()

    })
    main.appendChild(addImgbtn)

    
}


function addImages(){
    let main = document.getElementById("main")

    let table = document.createElement("table")
    table.setAttribute("class","container mt-5")
    

    let images = JSON.parse(localStorage.getItem("images"))
      let row
    for(let i=0;i<images.length;i++){
         if(i%5==0)
            row = document.createElement("tr")
        
            let col = document.createElement("td")
            col.setAttribute("class","p-3")

            let imgDiv = document.createElement("div")
            imgDiv.setAttribute("style","height:250px;width:200px;")
            imgDiv.setAttribute("class","d-flex flex-column align-items-center ")

            let img = document.createElement("img")
            img.src = images[i];
            img.setAttribute("style","height:200px;width:200px;border-radius:5px")
            imgDiv.appendChild(img)

            let deleteImg = document.createElement("button")
            deleteImg.innerHTML = "Delete"
            deleteImg.setAttribute("class","btn text-white bg-danger mt-1")
            deleteImg.setAttribute("style","width:100%")
            deleteImg.addEventListener("click",(e)=>{
                console.log(e.target);
                console.log(images[i]);

                images.splice(i, 1);
                localStorage.setItem("images",JSON.stringify(images))
                location.reload();
                
            })
            imgDiv.appendChild(deleteImg)

            col.appendChild(imgDiv)


            row.appendChild(col)

        table.appendChild(row)

    }

    main.appendChild(table);

}

function rakeTask(){
    !localStorage.getItem("images") && localStorage.setItem("images","[]")
}






// function galleryComponent() {
//     let main = document.getElementById("main")

//     let addImgbtn = document.createElement("button")
//     addImgbtn.innerHTML = "Add image"
//     addImgbtn.setAttribute("class","btn text-white bg-danger ml-2")
//     addImgbtn.addEventListener("click",()=>{
//         alert("add image clicked")

//         let fileInput = document.createElement("input")
//         fileInput.type="file"
//         fileInput.accept="image/*"
//         fileInput.setAttribute("style","display:none")
//         // addImgbtn.appendChild(fileInput)

//         let img = document.createElement("img")

//         fileInput.addEventListener("change",function(){
//             const file = this.files[0]

//             if(file){
//                 const reader = new FileReader();
//                 reader.onload = function(e){
//                     img.src = e.target.result
//                     //img.src = reader.result;
//                 }
//                 reader.readAsDataURL(file)
//             }
//         })

//         main.appendChild(img)
//         main.appendChild(fileInput)

//         fileInput.click()

//     })
//     main.appendChild(addImgbtn)

//     let deleteImgbtn = document.createElement("button")
//     deleteImgbtn.innerHTML = "Delete image"
//     deleteImgbtn.setAttribute("class","btn text-white bg-danger ml-1")
//     main.appendChild(deleteImgbtn)

//     let table = document.createElement("table");
//     table.setAttribute("class", "container bg-secondary")
//     table.setAttribute("style", "height:500px")
//     main.appendChild(table)

    
// }