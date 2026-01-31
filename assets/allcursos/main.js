document.addEventListener("click",(e)=>{
    if(e.target.classList[0] === "btn-nw"){
        matricular()   
    }
    if(e.target.id === "aluno"){
        location.href="/front/login"
    }

    if(e.target.id === "logo"){
        location.href="/" 
    }
})




async function allCursosDB() {
    try { const response = await fetch(domain+"/all-cursos") 
        if (!response.ok) { 
            throw new Error("Erro na requisição: " + response.status)
        } 
        const data = await response.json() 
            console.log("Cursos recebidos:", data) 
            return data
    } catch (err) {
        console.error("Erro:", err)
    }
}



async function renderCursos() {
    const list = document.getElementById('course-list');
    let cursosDB = await allCursosDB()
    list.innerHTML = cursosDB.map(curso => `
        <div class="course-card rounded-2xl overflow-hidden flex flex-col">
            <img src="${curso.capa}" alt="${curso.titulo}" class="w-full h-52 object-cover">
            <div class="p-8 flex flex-col flex-grow">
                <h3 class="text-2xl font-bold mb-2 text-[#1a2a3a]">${curso.titulo}</h3>
                <p class="text-sm leading-relaxed mb-6 text-slate-500 flex-grow">
                    ${curso.desc}
                </p>
                
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-8 h-8 rounded-full bg-[#ff6b6b] flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        ${curso.tutor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span class="text-xs font-bold text-[#1a2a3a] opacity-80">${curso.tutor}</span>
                </div>

                <div class="pt-6 border-t border-slate-100 flex justify-between items-center">
                    <div>
                        <span class="block text-[10px] uppercase text-slate-400 font-bold">Investimento</span>
                        <span class="text-xl font-bold text-[#1a2a3a]">R$ ${parseFloat(curso.preco).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="btn-nw px-6 py-3 rounded-xl font-bold text-sm">
                        Matricular
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function matricular(){
    let whatsapp_url
    let msg = " "
   
     if(innerWidth > 1000){
            whatsapp_url = "https://api.whatsapp.com/send?phone=556136136666&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20cursos"
    }else{
        whatsapp_url = "https://api.whatsapp.com/send?phone=556136136666&text="+msg
    }

    location.href=whatsapp_url

}

renderCursos();
