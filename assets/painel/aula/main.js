let aula = []; // escopo global para o click

(async () => {
  const videcont = document.querySelector("#video-cont");
  const listVideo = document.querySelector("#video-list-cont");

  const getAula = await aulas();
  aula = getAula.aula;

  // 🔹 renderiza o PRIMEIRO vídeo
  renderVideo(aula[0]);

  // 🔹 lista os vídeos
  aula.forEach(item => {
    listVideo.innerHTML += `
      <div class="videos">
        <input type="checkbox" class="aula-check">
        <img src="${item.thumbnail}" alt="thumbnail" />
        <div>
          <h3>${item.title}</h3>
          <button class="view-btn" data-id="${item._id}">Assistir</button>
        </div>
      </div>
    `;
  });

  listVideo.innerHTML+='<button id="certificado-btn" class="certificado-off">EMITIR CERTIFICADO</button>'

})();

let isCheck = false
document.addEventListener("click",async (e) => {

  if(e.target.classList[0] === "aula-check"){
    isCheck = verificarCheck()
  }
  if(e.target.classList[0] === "certificado-on"){
    if(isCheck){
        sendCheck()
      }
  }

  const btn = e.target.closest(".view-btn");
  if (!btn) return;

  const id = btn.dataset.id;

  const videoSelecionado = aula.find(v => v._id === id);
  if (!videoSelecionado) return;

  renderVideo(videoSelecionado);
 
  
  

});


// 🔹 função responsável por trocar o vídeo
function renderVideo(video) {
  const videcont = document.querySelector("#video-cont");

  videcont.innerHTML = `
    <iframe
      src="${video.videoUrl}"
      width="90%"
      height="100%"
      allowfullscreen>
    </iframe>

    <div id="info-video">
      <h1>${video.title}</h1>
      <p>${video.desc}</p>
    </div>
  `;
}

async function aulas() {
    const params = new URLSearchParams(window.location.search)
    const cursoId = params.get("cursoId")

   const response = await fetch(domain+"/aulas", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ cursoId: cursoId })
    })

    const data = await response.json()
    return data;
}


function verificarCheck() {
  let aulasChecks = document.querySelectorAll(".aula-check");
  let todosChecados = Array.from(aulasChecks).every(aulaCheck => aulaCheck.checked);
  
  
  document.querySelector("#certificado-btn").className = "certificado-off"
  if (todosChecados) {
    alert(`🎉 Parabéns! Curso concluído.\nClique abaixo para emitir seu certificado.`);
    document.querySelector("#certificado-btn").className = "certificado-on"
    return true
  }
}

async function sendCheck() {
  const params = new URLSearchParams(window.location.search)
  const cursoId = params.get("cursoId")

  try {
    const response = await fetch(domain + "/certificado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include",
      body: JSON.stringify({
        aulasCheck: true,
        cursoId: cursoId
      })
    })

    if (!response.ok) {
      throw new Error("Erro no envio")
    }

    // 🔥 PDF = BLOB
    const blob = await response.blob()

    // cria URL temporária
    const url = window.URL.createObjectURL(blob)

    // abre o certificado
    window.open(url)

    // opcional: retorno simbólico
    return true

  } catch (err) {
    console.error(err)
  }
}
