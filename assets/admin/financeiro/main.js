(async()=>{
    const listCont = document.querySelector("#list-cont")

    const res = await fetch(domain+"/financeiro",{
        credentials:"include"
    })

    let data = await res.json()
   
    let colorList = ""
    let valor_ref = 0

    let soma = data.reduce((acc, item) => acc + Number(item.valorPago), 0)
    let calc = soma + valor_ref

    for(let i in data){
        i % 2 === 0 ? colorList = "corsim" : colorList = "cornao"

        listCont.innerHTML += `
        <div class="ref-aluno ${colorList}">
        <div>${data[i].email}</div> <div>${data[i].curso}</div> <div>${data[i].data.split("T")[0]}</div> <div>R$${Number(data[i].valorPago).toFixed(2)}</div>
        </div>
        `
    }
    document.querySelector("#vtotal").innerText = ""+calc.toFixed(2)
})()
