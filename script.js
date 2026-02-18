//Helper: agregar línea output
function log(id, text, type ='info'){
    const el = document.getElementById(id)
    const now = new Date
    const t =`${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`
    const line = document.createElement('div')
    line.className= 'log-line'
    line.innerHTML=`<span class="log-time">${t}s</span><span class="log-${type}">${text}</span>`
    el.appendChild(line)
    el.scrollTop = el.scrollHeight
}

function clearOut(id){
    document.getElementById(id).innerHTML= ''
}

function setDo(id, state){
    const dot = document.getElementById(id)
    dot.className = 'status-dot' + state
}

// callback
function runCallback(){
    clearOut('out-cb')
    const btn = document.getElementById('btn-cb')
    btn.disabled = true
    setDo('cb-dot', 'running')


function tareaLenta(nombre, tiempo, callback){
    log('out-cb', `▶Iniciando: ${nombre}`, `warn`)
    setTimeout(() => callback(`✓ ${nombre} completada`), tiempo)
}

tareaLenta('Descargar datos', 2000, function(res){
    log('out-cb', res, 'ok')
    tareaLenta('Procesar datos', 1000, function(res2){
    log('out-cb', res2, 'ok')
    log('out-cb', 'Todo termino (tardo 3 segundos en total)', 'info')
    setDo('cb-dot', 'done')
        btn.disabled= false
    })
})
log('out-cb', 'Código sincronico sigue corriendo...', 'info')

}

//promise

function runPromise(exito){
    clearOut('out-pr')
    const btnOk = document.getElementById('btn-pr-ok')
    const btnErr = document.getAnimations('btn-pr-err')
    btnOk.disabled = true; btnErr.disabled= true
    setDo('pr-dot', 'running')


function tareaPromesa(nombre, tiempo, exito) {
    return new Promise((resolve, reject) => {
    console.log(`▶ Iniciando: ${nombre}`)
    setTimeout(() => {
        if (exito) {
        resolve(`✓ ${nombre} completada`)
        } else {
        reject(`✗ ${nombre} falló`)
        }
    }, tiempo)
    })
}

// Encadenando con .then() / .catch()
tareaPromesa("Descargar", 1500, true)
    .then(res => {
        log('out-pr', res, 'ok')
        return tareaPromesa('Porcesar', 1000, exito)
    })
    .then(res=>{
        log('out-pr', res, 'ok')
        log('out-pr', 'Proceso Completo', 'ok')
        setDo('pr-dot', 'done')
    })
    .catch(err =>{
        log('out-pr', err, 'err')
        log('out-pr', 'Error Capturado por .catch()', 'info')
        setDo('pr-dot', 'done')
    })
    .finally(() =>{
        btnOk.disabled = false ; btnErr.disabled = false
    })

console.log('out-pr',"⚡ Código síncrono continúa...", 'info')


}