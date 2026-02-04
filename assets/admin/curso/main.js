(async ()=>{
    let getCursos = await buscarCursos()
    let cursos = getCursos.cursos

    for(let i = 0 ; i < cursos.length ; i++){
        document.querySelector("#cursos-cont").innerHTML += `
        <div class="cursos">
            <button id="edit" class="edit-${cursos[i]._id}">Editar</button>
            <button id="delete" class="del-${cursos[i]._id}">Deletar</button>
            <div>
                <img src="${cursos[i].capa}" alt="">
            </div>
            <h1>${cursos[i].titulo}</h1>
            <p>${cursos[i].tutor}</p>
            <button id="nova-aula-btn" class="${cursos[i]._id}">+ Adicionar Aulas</button>
        </div>
        
        `
    } 
})()

document.addEventListener("click",(e)=>{
    if(e.target.id==="clicable"){
        console.log(e.target.id)
        document.querySelector("#cad-curso-cont").classList.remove("winOff")
        document.querySelector("#save-curse").classList = "save-curse"
        document.querySelector("#cad-title").textContent = "Cadastrar curso"
    }
    if(e.target.id ==="edit"){
        let cursoId = e.target.classList[0].replace("edit-","")
        document.querySelector("#cad-curso-cont").classList.remove("winOff")
        document.querySelector("#save-curse").classList = "save-edit"
        document.querySelector("#save-curse").classList.add(cursoId) 
        document.querySelector("#cad-title").textContent = "Editar curso"
        
    }

    if(e.target.classList[0] === "save-edit"){
        let cursoId = e.target.classList[1]
         
        editarCurso(cursoId)
        
    }

    if(e.target.id === "cancel-curse"){
        document.querySelector("#cad-curso-cont").classList.add("winOff")
    }

    if(e.target.id === "delete"){
        let delId = e.target.classList[0].replace("del-","")

        let randomNum = Math.floor(Math.random() * 999) + 1000
        let askDel = prompt("Para confirmar a exclusão deste curso digite: "+randomNum)

        askDel === randomNum.toString() ? deletarCurso(delId) : alert("Os digitos não coincidem.")      
    }

    if(e.target.classList[0] ==="save-curse"){
        cadastrarCurso()
    }

    if(e.target.classList[0] === "delete-aula"){
        let id = e.target.id
        deletarAula(id)
    }

    
    if(e.target.id ==="nova-aula-btn"){
        let cursoId = e.target.classList[0]
        document.querySelector("#criar-aula-cont").classList.remove("winOff")
        document.querySelector("#save-aula").classList.add(cursoId)

        document.querySelector("#aulas-cont").innerHTML = ""
        buscarAula(cursoId)
        
        
    }
    if(e.target.id === "cancel-aula"){
        document.querySelector("#criar-aula-cont").classList.add("winOff")
    }
    if(e.target.id === "save-aula"){
        let cursoId = e.target.classList[0]
        cadastrarAula(cursoId)
    }
})

async function deletarCurso(delId){

    const response = await fetch(domain+"/delete-curso",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            delId:delId
        })
    })

    const data = await response.json()
    
    alert('curso deletado!')
    if(data.delete){
        location.reload()
    }
}

async function buscarCursos() {
    const response = await fetch(domain+"/admin-curso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            cursos:'/admin-curso'
        })
    });
    
    const data = await response.json();
    return data;
}


async function buscarAula(id) {
    const response = await fetch(domain+"/admin-aulas",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            cursoId:id
        })
    })
    const data = await response.json()
    await listarAulas(data.aulas)
    
}


async function cadastrarCurso(){
    let titulo = document.querySelector("#titulo");
    let desc = document.querySelector("#desc");
    let tutor = document.querySelector("#tutor");
    let capa = document.querySelector("#capa")
    let price = document.querySelector("#price")
    let materia = document.querySelector("#materia")

    let carga_horaria = document.querySelector("#cargaHoraria")


    let curso = {
        titulo: titulo.value,
        desc: desc.value,
        materia:materia.value,
        tutor: tutor.value,
        capa: capa.value,
        preco: price.value,
        carga_horaria: carga_horaria.value,
    }

    let verify = formatData(curso)
    if(!verify){return alert("PREENCHA TODOS OS DADOS.")}
    
    const response = await fetch(domain+"/cadastrar-curso",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            curso:curso
        })
    })
    const data = await response.json()
   
   if(data.cad){
    alert("Curso cadastrado com sucesso!")
    location.reload()
   }
}

async function editarCurso(cursoId){
    let titulo = document.querySelector("#titulo");
    let desc = document.querySelector("#desc");
    let tutor = document.querySelector("#tutor");
    let capa = document.querySelector("#capa")
    let price = document.querySelector("#price")
    let materia = document.querySelector("#materia")
    let carga_horaria = document.querySelector("#cargaHoraria")

    let curso = {
        cursoId,cursoId,
        titulo: titulo.value,
        desc: desc.value,
        materia:materia.value,
        tutor: tutor.value,
        capa: capa.value,
        preco: price.value,
        carga_horaria: carga_horaria.value,
    }
    

    console.log(curso)
   
    let verify = formatData(curso)
    if(!verify){return alert("PREENCHA TODOS OS DADOS.")}
   
    const response = await fetch(domain+"/editar-curso",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            curso:curso
        })
    })
    
    const dados = await response.json()
    console.log(dados)
    alert(dados.message)
    location.reload();
    return dados;
   
}

function formatData(data) {

    try {
        // Campos obrigatórios
        const fields = ["titulo", "desc", "tutor", "capa"];

        for (const field of fields) {
            if (!data[field] || typeof data[field] !== "string") {
                return false;
            }
        }

        // Bloqueio básico de NoSQL Injection
        const forbidden = /\$ne|\$gt|\$lt|\$gte|\$lte|\$regex/i;
        if (forbidden.test(JSON.stringify(data))) {
            return false;
        }

        // Sanitização dos textos
        data.titulo = data.titulo
            .replace(/<script.*?>.*?<\/script>/gi, "")
            .replace(/[<>="'`;(){}]/g, "")
            .trim();

        data.desc = data.desc
            .replace(/<script.*?>.*?<\/script>/gi, "")
            .replace(/[<>="'`;(){}]/g, "")
            .trim();

        data.tutor = data.tutor
            .replace(/<script.*?>.*?<\/script>/gi, "")
            .replace(/[<>="'`;(){}]/g, "")
            .trim();

        // Valida tamanhos
        if (data.titulo.length <= 3) return false;
        if (data.desc.length   <= 3) return false;
        if (data.tutor.length  <= 3) return false;

        // Validação da capa (URL)
        try {
            const url = new URL(data.capa);
            if (!["http:", "https:"].includes(url.protocol)) return false;
        } catch {
            return false;
        }

   
        return true;

    } catch {
        return false;
    }
}


async function cadastrarAula(cursoId){
    let  titulo = document.querySelector("#title-aula")
    let desc = document.querySelector("#desc-aula")
    let thumbnail = document.querySelector("#thumbnail-aula")
    let videoUrl = document.querySelector("#videoUrl-aula")

    let aula = {
        cursoId:cursoId,
        titulo: titulo.value,
        desc: desc.value,
        thumbnail: thumbnail.value,
        videoUrl: videoUrl.value
    }

    const response = await fetch(domain+"/cadastrar-aula",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify(aula)
    })

    const data = await response.json()
    if(data.cad){
        alert("AULA CADASTRADA COM SUCESSO!")
        location.reload()
    }
    console.log(data)
}


async function listarAulas(data){
    
    for(let i = 0 ; i < data.length ; i++){
        document.querySelector("#aulas-cont").innerHTML += `
             <div class="aulas">
                    <div>
                        <img src="${data[i].thumbnail}" width="50px">
                    </div>
                    <div><p>${data[i].title}</p></div>
                    <div><a href="${data[i].videoUrl}" target="_blank">video</a></div>
                    <div><button class="delete-aula" id="${data[i]._id}">DELETAR</button></div>
                </div>
        `
    }
}

async function deletarAula(id){
    const response = await fetch(domain+"/delete-aula",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify({
            delId:id
        })
    })

    const data = await response.json()
    console.log(data)
    if(data.deleteAula){
        alert("Aula deletada com sucesso.")
        location.reload()
    }

}