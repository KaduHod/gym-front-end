const setAllInitialHidden = () => {
    const els = [...document.getElementsByTagName('main')[0].children]
    
    els.forEach( el => {
        el.classList.add('hidden')
    })
}
const setModalAlunoHidden = () => {
    const els = [...document.getElementById('modalsAlunos').children]
    console.log(els)
    els.forEach( el => {
        el.classList.add('hidden')
    })
}

export {setAllInitialHidden, setModalAlunoHidden};