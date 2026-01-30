let imgs = document.querySelectorAll(".imgs")
let time = 6000
let i = 0

setInterval(() => {
    console.log(i)
    imgs[i].classList.remove("img-on")
    
    i+=1
    if( i > 2){ i = 0}
    
    imgs[i].classList.add("img-on")
}, time);


document.addEventListener("click",(e)=>{
    if(e.target.id === "iniciar"){
        location.href = "/front/allcursos/"
    }
})