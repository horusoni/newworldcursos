
document.querySelector("#insert-menu").innerHTML += `   
 <input type="checkbox" id="tougle-check" checked>

    <label for="tougle-check">

        <div id="tougle" class="tougle">
            <div id="bar1" class="bars bar1 "></div>
            <div id="bar2" class="bars bar2 "></div>
            <div id="bar3" class="bars bar3 "></div>
            <div id="click-area"></div>
        </div>
    </label>

    <section id="menu-mob" class="menu-closed">
    

        <div>
             <div class="sub-screen" id="logo-menu-cont">
                <img class="logo clickinicio" src="https://newworld-teste.netlify.app/assets/images/Logo%20Marca%20(1).png" alt="" width="150px">

            </div>

            <div class="sub-screen" id="menu-mob-cont">
                <ul>

                     <li>
                        <img src="https://img.icons8.com/?size=100&id=79387&format=png&color=e4e4e4" alt="" >
                        <p>CURSOS</p>
                        <div class="clickmenu clickCurso"></div>
                    </li>

                    <li>
                        <img src="https://img.icons8.com/?size=100&id=23265&format=png&color=FFFFFF" alt="" >
                        <p>ALUNOS</p>
                        <div class="clickmenu clickAluno"></div>
                    </li>

                    
                    <li>
                        <img src="https://img.icons8.com/?size=100&id=7977&format=png&color=FFFFFF" alt="" >
                        <p>FINANCEIRO</p>
                        <div class="clickmenu clickCoin"></div>
                    </li>
                    

                
                    <li>
                        <img src="https://img.icons8.com/?size=100&id=r4lEY0KAPprh&format=png&color=e4e4e4" alt="" >
                        <p>SAIR</p>
                        <div class="clickmenu clicksair"></div>
                    </li>

                </ul>
            </div>

        </div>

    </section>

`

const tougleCheck = document.querySelector("#tougle-check")
const menuMob = document.querySelector("#menu-mob")
const tougle = document.querySelector("#tougle")
const bars = document.querySelectorAll(".bars")


document.addEventListener("click",(e)=>{
    redirectMenu(e)

    if(e.target.id ==="click-area"){  
        if( tougleCheck.checked ){ abrirMenu() }else{fecharMenu()}
    }   
 })

 function abrirMenu(){
            tougle.classList.add("touglep")
            menuMob.classList.add("menu-open")
            bars[0].classList.add("bar1p")
            bars[1].classList.add("bar2p")
            bars[2].classList.add("bar3p")

 }

 function fecharMenu(){
            tougle.classList.remove("touglep")
            menuMob.classList.remove("menu-open")
            bars[0].classList.remove("bar1p")
            bars[1].classList.remove("bar2p")
            bars[2].classList.remove("bar3p")

 }

 async function redirectMenu(e){
 
    if(e.target.classList[1] === "clickCurso"){ location.href = "/admin/curso/"}
    if(e.target.classList[1] === "clickAluno"){ location.href = "/admin/aluno/"} 
    if(e.target.classList[1] === "clickCoin"){ location.href = "/admin/financeiro/"}
    if(e.target.classList[1] === "clicksair"){ await logout() }

 }

 async function logout() {
    const response = await fetch(domain+"/logout",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({logout:true})
    })

    const data = await response.json()
    console.log(data)
    if(response.ok){
        location.href = "/admin/"
    }
   
    return data

}