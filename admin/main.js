document.addEventListener("click",async (e)=>{
    if(e.target.id === "entrar"){
      login()
    }
})

document.addEventListener("keypress",(e)=>{
  
  if(e.key==="Enter"){
    login()
  }
})


async function login() {
    let email = document.querySelector("#email").value.trim()
    let senha = document.querySelector("#senha").value.trim()

    let admin = {email : email,senha : senha}

    let response = await sendLogin(admin)
    console.log(response)
    if(response.ok){ return location.href="/admin/curso/" }
    alert("Credenciais incorreta")
}



async function sendLogin(data) {
  try {
    const response = await fetch(domain + "/login-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return { ok: false, erro: "Credenciais inválidas" };
    }

    const dados = await response.json();
  
    return { ok: true, dados };
    

  } catch (err) {
    console.log("Erro de rede:", err);
    return { ok: false, erro: "Falha de conexão" };
  }
}

