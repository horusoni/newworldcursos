//const host = "http://192.168.100.12:5500"

(async ()=>{
    let nome = await pushName()
    console.log(nome)
    let firstName = nome.split(" ")[0]
   
    document.querySelector("#header-aluno").innerHTML+=`
     <div id="hi-cont">
            <h2>Ambiente Virtual do Aluno</h2>
            <div>
                <strong>${firstName} </strong>
                <img src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"/>
            </div>
        </div>`

})()    


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
                        <img src="https://img.icons8.com/?size=100&id=2797&format=png&color=e4e4e4" alt="" >
                        <p>INÍCIO</p>
                        <div class="clickmenu clickinicio"></div>
                    </li>

                    <li>
                        <img src="https://img.icons8.com/?size=100&id=9492&format=png&color=e4e4e4" alt="" >
                        <p>MEUS CURSOS</p>
                        <div class="clickmenu clickcurso"></div>
                    </li>

                    <!--
                    <li>
                        <img src="https://img.icons8.com/?size=100&id=79387&format=png&color=e4e4e4" alt="" >
                        <p>APRENDER MAIS</p>
                        <div class="clickmenu clickmore"></div>
                    </li>
                    -->

                    <li>
                        <img src="https://img.icons8.com/?size=100&id=61397&format=png&color=e4e4e4" alt="" >
                        <p>SUPORTE</p>
                        <div class="clickmenu clicksuporte"></div>
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

<section class="screens" id="menu">
            <div class="sub-screen" id="logo-menu-cont">
                <img class="logo clickinicio" src="https://newworld-teste.netlify.app/assets/images/Logo%20Marca%20(1).png" alt="" width="150px">

            </div>

            <div class="sub-screen" id="menu-cont">
                <ul>

                     <li>
                        <img src="https://img.icons8.com/?size=100&id=2797&format=png&color=e4e4e4" alt="" >
                        <p>INÍCIO</p>
                        <div class="clickmenu clickinicio"></div>
                    </li>

                    <li>
                        <img src="https://img.icons8.com/?size=100&id=9492&format=png&color=e4e4e4" alt="" >
                        <p>MEUS CURSOS</p>
                        <div class="clickmenu clickcurso"></div>
                    </li>

                    <!--
                    <li>
                        <img src="https://img.icons8.com/?size=100&id=79387&format=png&color=e4e4e4" alt="" >
                        <p>APRENDER MAIS</p>
                        <div class="clickmenu clickmore"></div>
                    </li>

                    -->
                    <li>
                        <img src="https://img.icons8.com/?size=100&id=61397&format=png&color=e4e4e4" alt="" >
                        <p>SUPORTE</p>
                        <div class="clickmenu clicksuporte"></div>
                    </li>

                    <li>
                        <img src="https://img.icons8.com/?size=100&id=r4lEY0KAPprh&format=png&color=e4e4e4" alt="" >
                        <p>SAIR</p>
                        <div class="clickmenu clicksair"></div>
                    </li>

                </ul>
            </div>

        </section>`

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
    if(e.target.classList[1] === "clickinicio"){ location.href = "/front/painel/home/"}
    if(e.target.classList[1] === "clickcurso"){ location.href = "/front/painel/curso/"} 
    if(e.target.classList[1] === "clicksuporte"){ location.href = "/front/painel/suporte/"}
    if(e.target.classList[1] === "clickmore"){ alert("em desenvolvimento") /*location.href = "/front/painel/more/" */}
    if(e.target.classList[1] === "clicksair"){ await logout()  }

 }


async function pushName() {
  try {
    const res = await fetch(domain+"/whoami", {
      method: "POST",
      credentials: "include", // 🔥 ESSENCIAL
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "whoami" })
    });

    const data = await res.json();
    
    return data.username;
  } catch (err) {
    console.error(err);
    return null;
  }
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
    
    if(response.ok){
        location.reload()
    }
    console.log(data)
    return data

}