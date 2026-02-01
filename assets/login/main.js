const res = document.querySelector("#res")
let email = document.querySelector("#email")
let senha = document.querySelector("#senha")

document.addEventListener("click",(e)=>{
  if(e.target.id === "email" || e.target.id === "senha"){res.innerHTML = ""}
})

document.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    logar()
  }
})

async function logar(){
    let emailValue = email.value
    let senhaValue = senha.value

    let result = await autenticar(emailValue,senhaValue)
   
   if (!result.login) {
    res.innerHTML = result.message;
    return;
  }
  setTimeout(() => {
    location.href = "/front/painel/home";
  }, 100);


  
     
}

async function autenticar(email, senha) {
  const login = { email, senha };

  try {
    const res = await fetch(domain+"/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", //obrigatório
      body: JSON.stringify(login)
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
