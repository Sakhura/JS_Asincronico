// SIMULAR UNA BD (SERVIDOR)

const usuarios= {
    1: {id: 1, nombre: "Sebastian Maya", email: "sebastian.maya@tucorreo.cl", rol: "Admin", color: "#6366f1", initials: "SM"}, 
    2: {id: 2, nombre: "Paulina Villegas", email: "paulina.villegas@tucorreo.cl", rol: "Editor", color: "#0ea5e9", initials: "PV"}, 
    3: {id: 3, nombre: "Maximiliano Vilugron", email: "Maximiliano.Vilugron@tucorreo.cl", rol: "Viwer", color: "#10b981", initials: "MV"}, 
}

// obtenerUsuario -> Promise

function obtenerUsuario(id){
    return new Promise((resolve, reject)=> {
        if(typeof id !== 'number' || id < 1){
            reject(` ID: inválido: ${id}. Debe ser un número >= 1`)
            return
        }
        setTimeout(()=>{
            const usuario = usuarios[id]
            if(usuario){
                return(usuario)
            }else{
                reject(`No existe usuario con id ${id} en la base de datos`) 
            }
        }, 1500)
    })
}

async function mostrarUsuario(id) {
    addLog(`Buscando usuario con el id : ${id}...`, 'info')
    setStatus('loading', 'Peding')
    updateRespUrl(id)
    showRespLoanding(id)
    hideResults()

    try{
        const usuario = await obtenerUsuario(id)
        //exito
        addLog(`Usuario encontrado: ${usuario.nombre}`, ok)
        addLog(`    email: ${usuario.email}`, ok)
        addLog(`    rol: ${usuario.rol}`, ok)
        setStatus('200', '200 OK')
        showRespJson(usuario)
        showUserCard(usuario)
       //falla
    }catch (error){
        addLog( error, 'err')
        const code= String(id).match(/^-?\d+$/) && Number(id) < 1 ? '400' : '404'
        setStatus(code, `${code} ERROR`)
        showRespError(error)
        showErrorCard(error)

    }
    
} 

 // =============================================
  // UI HELPERS
  // =============================================
  function buscar() {
    const raw = document.getElementById('inputId').value.trim()
    const id = isNaN(raw) || raw === '' ? raw : Number(raw)
    mostrarUsuario(id)
  }

  function setId(val) {
    document.getElementById('inputId').value = val
    const id = typeof val === 'string' ? val : Number(val)
    mostrarUsuario(id)
  }

  function updateRespUrl(id) {
    document.getElementById('respUrl').textContent = `/api/usuarios/${id}`
  }

  function setStatus(type, text) {
    const el = document.getElementById('respStatus')
    el.className = 'resp-status status-' + type
    el.textContent = text
  }

  function showRespLoading(id) {
    document.getElementById('respBody').className = 'response-body has-content'
    document.getElementById('respBody').innerHTML =
      `<span class="spinner"></span><span style="color:#f59e0b">Consultando base de datos...</span>`
  }

  function showRespJson(u) {
    const rolColors = { Admin: '#fca5a5', Editor: '#fde68a', Viewer: '#86efac' }
    const rc = rolColors[u.rol] || '#cbd5e1'
    document.getElementById('respBody').innerHTML = `<span class="j-brace">{</span>
  <span class="j-key">"id"</span><span class="j-brace">:</span>      <span class="j-num">${u.id}</span><span class="j-brace">,</span>
  <span class="j-key">"nombre"</span><span class="j-brace">:</span>  <span class="j-str">"${u.nombre}"</span><span class="j-brace">,</span>
  <span class="j-key">"email"</span><span class="j-brace">:</span>   <span class="j-str">"${u.email}"</span><span class="j-brace">,</span>
  <span class="j-key">"rol"</span><span class="j-brace">:</span>     <span style="color:${rc}">"${u.rol}"</span>
<span class="j-brace">}</span>`
  }

  function showRespError(msg) {
    document.getElementById('respBody').innerHTML =
      `<span style="color:#ef4444">${msg}</span>`
  }

  function showUserCard(u) {
    const rolClass = { Admin: 'rol-admin', Editor: 'rol-editor', Viewer: 'rol-viewer' }
    const card = document.getElementById('userResult')
    card.innerHTML = `
      <div class="ur-header">
        <div class="ur-avatar" style="background:${u.color}">${u.initials}</div>
        <div>
          <div class="ur-name">${u.nombre}</div>
          <div class="ur-id">id: ${u.id} · <span class="rol-tag ${rolClass[u.rol]}">${u.rol}</span></div>
        </div>
      </div>
      <div class="ur-fields">
        <div class="ur-field">
          <div class="ur-field-label">Email</div>
          <div class="ur-field-value">${u.email}</div>
        </div>
        <div class="ur-field">
          <div class="ur-field-label">Rol</div>
          <div class="ur-field-value">${u.rol}</div>
        </div>
      </div>`
    card.className = 'user-result-card show'
  }

  function showErrorCard(msg) {
    document.getElementById('errorMsg').textContent = msg
    document.getElementById('errorResult').className = 'error-card show'
  }

  function hideResults() {
    document.getElementById('userResult').className = 'user-result-card'
    document.getElementById('errorResult').className = 'error-card'
  }

  // ---- LOG ----
  function addLog(text, type = 'info') {
    const el = document.getElementById('logEntries')
    const now = new Date()
    const t = `${String(now.getSeconds()).padStart(2,'0')}.${String(now.getMilliseconds()).padStart(3,'0')}s`
    const div = document.createElement('div')
    div.className = 'log-entry'
    div.innerHTML = `<span class="log-ts">${t}</span><span class="log-${type}">${text}</span>`
    el.appendChild(div)
    el.scrollTop = el.scrollHeight
  }

  function clearLog() {
    document.getElementById('logEntries').innerHTML =
      `<div class="log-entry"><span class="log-ts">--</span><span class="log-info">// Log limpiado</span></div>`
  }

  // ---- TABS ----
  function showTab(id, btn) {
    document.querySelectorAll('.code-content').forEach(el => el.classList.remove('active'))
    document.querySelectorAll('.code-tab').forEach(el => el.classList.remove('active'))
    document.getElementById(id).classList.add('active')
    btn.classList.add('active')
  }

  // Enter para buscar
  document.getElementById('inputId').addEventListener('keydown', e => {
    if (e.key === 'Enter') buscar()
  })