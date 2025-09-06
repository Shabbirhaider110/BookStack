const pubform = document.getElementById("publish-form");
const successBox = document.getElementById("publish-success");
pubform.onsubmit = (e)=>{ e.preventDefault(); successBox.classList.remove('hidden'); setTimeout(()=> successBox.classList.add('hidden'), 2500); pubform.reset(); };