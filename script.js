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

log('out-pr',"⚡ Código síncrono continúa...", 'info')

}

// async / await

async function runAsync() {
    clearOut('out-aw')
    const btn = document.getElementById('btn-aw')
    btn.disabled = true
    setDo('aw-dot', 'running')

    function esperar(ms){
        return new Promise(res => setTimeout(res, ms))
    }

async function procesarDatos() {
    try{
        log('out-aw', 'Paso 1 conectando...', 'warn')
        await esperar(1200)
        log('out-aw', 'Paso 1 Conexion ok...', 'ok')

        log('out-aw', 'Paso 2 descargando...', 'warn')
        await esperar(1500)
        log('out-aw', 'Paso 2 Descarga ok...', 'ok')

        log('out-aw', 'Paso 3 Procesando...', 'warn')
        await esperar(800)
        log('out-aw', 'Paso 3 Proceso ok...', 'ok')

        setDo('aw-dot', 'done')
    }catch (e){
        log('out-aw', `X Error: ${e}`, 'err')
        btn.disabled = false
    }
}

procesarDatos()
log('out-aw', 'Esto se muestra antes de los pasos', 'info')
    
}

//timeline

function animateTimeLine(){
    const bars = ['tl-sync', 'tl-cb','tl-pr', 'tl-aw']
    bars.forEach(id=> document.getElementById(id).classList.remove('animate'))
    setTimeout(()=> {
        bars.forEach((id, i) => {
            setTimeout(() => document.getElementById(id).classList.add('animate'), i * 180)
        })
    }, 50)
}

window.addEventListener('load', () => setTimeout(animateTimeLine, 600))