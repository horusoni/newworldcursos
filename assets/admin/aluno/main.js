(async ()=>{
    let alunos = await buscarAlunos()
    let aluno = alunos.alunos
   
    for(let i = 0 ; i < aluno.length ; i++){
        
        document.querySelector("#alunos-cont").innerHTML += `
            <div class="alunos-list">
            <div>${aluno[i].nome}</div>
            <div>${aluno[i].email}</div>
            <div>
                <button id="${aluno[i]._id}" class="curso-user">CURSOS</button> 
                <button id="${aluno[i]._id}" class="edit-user">Editar</button>
                <button id="${aluno[i]._id}" class="delete-user">DELETAR</button>
             </div>
        </div>
        `
    }
})()

document.addEventListener("click",(e)=>{
    if(e.target.id === "add-aluno"){
        document.querySelector("#cad-aluno").classList.remove("hidden")
        document.querySelector("#cadastrar").classList = "cadastrar"
        document.querySelector("#title-cad").textContent = "Cadastrar aluno"
    }

    if(e.target.id === "cancelar"){
        document.querySelector("#cad-aluno").classList.add("hidden")
    }
    if(e.target.classList[0] === "cadastrar"){
        enviarCadastro()
    }
    if(e.target.classList[0] === "delete-user"){
        let userId = e.target.id

        let randomNum = Math.floor(Math.random() * 999) + 1000
        let askDel = prompt("Para confirmar a exclusão deste curso digite: "+randomNum)

        askDel === randomNum.toString() ? deletarAluno(userId) : alert("Os digitos não coincidem.")   
    }

    if(e.target.classList[0] === "edit-btn"){
        let userId = e.target.classList[1]
        atualizarCadastro(userId)
    }

    if(e.target.classList[0] === "edit-user"){
        let userId = e.target.id
        
        document.querySelector("#cad-aluno").classList.remove("hidden")
        document.querySelector("#cadastrar").classList = "edit-btn"
        document.querySelector("#title-cad").textContent = "Editar aluno"
        document.querySelector("#cadastrar").classList.add(userId)
    }

    if(e.target.classList[0] === "curso-user"){
        abrirVinculo(e)
    }

    if(e.target.id === "vincular-btn"){
        sendVinculo(e)
    }

    if(e.target.id === "voltar"){
          document.querySelector("#cursos-user-cont").classList.add("hidden")
          document.querySelector(".cursos-aluno").innerHTML =""
          document.querySelector("#all-curse").innerHTML = ""

    }
    if(e.target.classList[0] === "remove-btn"){
        let inscId = e.target.id
        desvincular(inscId)
    }
})

async function buscarAlunos() {
    try{
        const response = await fetch(domain+"/buscar-alunos-adm",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            user:true
        })
    })

    const data = await response.json()
    return data;

    }
    catch(e){
        console.log(e)
    }

}

function enviarCadastro(){
    let nome = document.querySelector("#nome")
    let email = document.querySelector("#email")
    let senha = document.querySelector("#senha")

    let cadastro = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }
    let msg = tratarCadastro(cadastro) 
    if(!msg.send){
        return alert(msg.msg)
    }
    sendCad(cadastro)
    
}


function tratarCadastro (cadastro){
    if(cadastro.nome.length < 10) {return {msg:"Nome muito pequeno"}}
    if(cadastro.email.length < 6 || !cadastro.email.includes("@") ) {return {msg:"Inserir um email válido"}}
    if(cadastro.senha.length < 8 ){ return { msg:"Senha precisa conter no mínimo 8 caracteres"}}
    return{ send:true}
}

async function sendCad( dados ){
    try{
        const response = await fetch(domain+"/cadastrar-aluno",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            dados:dados
        })
    })

    const data = await response.json()
    console.log(data)
    if(!data.receivd){
        return alert("Email de usuário já existente.")
    }
    alert("Usuário cadastrado com sucesso!")
    location.reload()
    
    }
    catch(e){
        console.log(e)
    }
}

async function deletarAluno(id){
    try{
        const response = await fetch(domain+"/deletar-aluno",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                action:"click",
                userId:id
            })
        })

        const data = await response.json()
        if(data.delete){location.reload()}
      
    }
    catch(err){
        console.log(err)
    }
}


async function buscarCursos(uid) {
    try{
        const response = await fetch(domain+"/admin-curso",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            
        },
        credentials:"include",
        body:JSON.stringify({
            uid:uid
        })
    })
    const data = await response.json()
    return data
    
    }
    catch(err){
        console.log(err)
    }
}

async function abrirVinculo(e){
    console.log(document.querySelector("#all-curse").value)
   let cursos = await buscarCursos("teste")

   let curso = cursos.cursos
   let userName = e.target.parentNode.parentNode.childNodes[1].textContent//nome da pessoa na tabela
   let userId = e.target.id

   let cursosAluno = await buscarCursoAluno(userId)

   document.querySelector("#vincular-btn").className = userId
   
   document.querySelector("#cursos-user-cont").classList.remove("hidden")
   document.querySelector("#aluno-name").innerText="Vincular cursos para "+userName

    console.log(cursosAluno)

   for(let i = 0 ; i < cursosAluno.length ; i++ ){
    
        document.querySelector(".cursos-aluno").innerHTML += `
    <div class="cursos">
                    <p>${cursosAluno[i].titulo}</p> <button id="${cursosAluno[i].inscricaoId}" class="remove-btn">Remover</button>
                </div>
   
   `
   }
   

   for(let i = 0 ; i < curso.length ; i++){
        document.querySelector("#all-curse").innerHTML+=`
            <option value="${curso[i]._id}">${curso[i].titulo} <strongo>R$${curso[i].preco}</strong></option>
        `   
   }
}


async function sendVinculo(e){

    let cursoId = document.querySelector("#all-curse").value
    let userId = e.target.className
    let valorPago = document.querySelector("#valor-pago").value

    if(valorPago.length <= 0 ){return alert("Necessário incluir um valor.")}

    let dados = {
        cursoId : cursoId,
        userId: userId,
        valorPago: valorPago
    }
    let vinculo = await enviarVinculo(dados)
    
    if(vinculo.vinculado){
        alert("vinculado")
        location.reload()
    }    
}

async function buscarCursoAluno(dados){
    const response = await fetch(domain+"/cursos-do-aluno",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            
        },
        credentials:"include",  
        body:JSON.stringify({
            userId:dados
        })
    })
    const data = await response.json()
    return data
}

async function enviarVinculo(dados) {
    const response = await fetch(domain+"/vincular-curso",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"   
        },
        credentials:"include",
        body:JSON.stringify({
            dados
        })
    })

    const data = await response.json();
    return data;
 
}

async function desvincular(inscId) {
    try{
        const response = await fetch (domain+"/desvincular-curso",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                inscId:inscId
            }),
            
        })

        const data = await response.json()
        console.log(data)
        if(data.receivd){location.reload()}
        return data
    }catch(err){
        console.log(err)
    }

    
}


function atualizarCadastro(userId){
    let nome = document.querySelector("#nome")
    let email = document.querySelector("#email")
    let senha = document.querySelector("#senha")

    let cadastro = {
        userId:userId,
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }
    let msg = tratarCadastro(cadastro) 
    if(!msg.send){return alert(msg.msg)}
    sendUpdate(cadastro)
    
    location.reload()
    
}

async function sendUpdate(dados){
    const response = await fetch(domain+"/edit-user",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            dados
        })
    })

    if(!response.ok){return}
    const data = await response.json()
    alert("Usuário atualizado com sucesso!")
    return data
}