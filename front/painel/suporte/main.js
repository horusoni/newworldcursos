const blackground = document.querySelectorAll(".blackground")

document.addEventListener("click", async(e)=>{

    if(e.target.id === "bug-btn"){
        blackground[0].classList.remove("hidden")
    }

    if(e.target.id === "mail-btn"){
        blackground[1].classList.remove("hidden")
    }

    if(e.target.classList[0] === "closeWin" || e.target.classList[0] === "blackground"){
        blackground[0].classList.add("hidden")
        blackground[1].classList.add("hidden")


    }
    if(e.target.classList[0] === "sendBug"){
        let message = {
            font:"Alerta de bug",
            message:document.querySelector(".bug-name").value
        }

        await  sendMail(message)
    }

    if(e.target.classList[0] === "sendMail"){
          let message = {
            font:"Alerta de bug",
            titulo:document.querySelector(".title-email").value,
            message:document.querySelector(".text-email").value

        }
        await sendMail(message)

      
        
    }
    if(e.target.id === "redirect"){
        if(innerWidth > 1000){
            location.href = "https://wa.link/hkml4q"
        }else{
            location.href = "https://api.whatsapp.com/send?phone=556136136666&text=Vim%20pelo%20suporte%20do%20AVA"
        }
    }
  
})



async function sendMail(message){
    let dados = {
        fonte:message.fonte,
        titulo:message.titulo,
        message:message.message
    }

    const res = await fetch("https://jsonmail.vercel.app/data",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {message}
        )
    })

    const data = await res.json()
    if(!res.ok){
        return alert("erro ao enviar formulário")
    }
    alert("Formulario enviado com sucesso!")
    location.reload()
}


