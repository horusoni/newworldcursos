
//na situação real vou passar o userId do usuário para buscar somente pelos ID dos cursos que o usuário obte

(async () => {

    const cursos = await meusCursos()

    cursos.forEach(curso => {        
        document.querySelector("#curse-cont").innerHTML += `
            <div class="curse-card">
                <img src="${curso.capa}">
                <h1>${curso.titulo}</h1>
                <p>${curso.tutor}</p>
                <button id=${curso._id} class="view-curse-btn">Ir a aula</button>
            </div>
        `
    })

    document.addEventListener("click",(e)=>{
        if(e.target.classList[0] === "view-curse-btn"){
            let cursoId = e.target.id
            aulas(cursoId)
        }
    })
})()

async function meusCursos() {

   const response = await fetch(domain+"/meus-cursos", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ page: "curso" })
    })

    const data = await response.json()
    return data;
}

function aulas(cursoId){
    const params = new URLSearchParams({ cursoId: cursoId })
    location.href = `/front/painel/aula/index.html?${params.toString()}`
}

