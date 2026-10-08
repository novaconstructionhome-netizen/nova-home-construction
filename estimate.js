(()=>{
const form=document.querySelector('#estimateForm');if(!form)return;
const I=window.NovaI18n,cfg=window.NOVA_FORM||{},status=form.querySelector('#form-status'),button=form.querySelector('[type=submit]');let key='',token='',requestId=crypto.randomUUID(),widget;
function show(k){key=k;status.textContent=I.t('estimate.'+k)}
document.addEventListener('nova:language',()=>{if(key)show(key)});
if(!cfg.endpoint||!cfg.sitekey){show('unconfigured');button.disabled=true;return}
window.novaCaptchaReady=()=>{widget=turnstile.render('#captcha',{sitekey:cfg.sitekey,action:'estimate',language:I.language,callback:t=>token=t,'expired-callback':()=>token='','error-callback':()=>{token='';show('captcha')}})};
document.addEventListener('nova:language',()=>{if(window.turnstile&&widget!==undefined){turnstile.remove(widget);token='';window.novaCaptchaReady()}});
const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=novaCaptchaReady&render=explicit';script.async=true;script.onerror=()=>show('captcha');document.head.append(script);
form.addEventListener('input',()=>{requestId=crypto.randomUUID()});
form.addEventListener('submit',async e=>{e.preventDefault();
const fields=[...form.querySelectorAll('[required]')];const bad=fields.find(f=>!f.value.trim()||!f.validity.valid);if(bad||form.elements.phone.value.replace(/\D/g,'').length<7){show('invalid');(bad||form.elements.phone).focus();return}
const photos=[...form.elements.photos.files];if(photos.length>5||photos.some(f=>!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>3*1024*1024)||photos.reduce((s,f)=>s+f.size,0)>6*1024*1024){show('photosError');return}
if(!token){show('captcha');return}const body=new FormData(form);body.set('token',token);body.set('requestId',requestId);body.set('language',I.language);button.disabled=true;show('sending');
try{const r=await fetch(cfg.endpoint,{method:'POST',body,signal:AbortSignal.timeout(30000)});const data=await r.json();if(r.ok&&data.accepted===true){show('success');form.reset();requestId=crypto.randomUUID()}else show(r.status===429?'rate':'error')}catch{show('error')}finally{button.disabled=false;token='';window.turnstile?.reset(widget)}
});})();
