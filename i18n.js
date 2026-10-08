/* Shared language state. Loaded synchronously before the body to prevent a language flash. */
(() => {
  let language='en';
  try { if(localStorage.getItem('nova-language')==='fr') language='fr'; } catch {}
  const root=document.documentElement;
  root.lang=language==='fr'?'fr-CA':'en-CA';
  if(language==='fr') {root.style.visibility='hidden';setTimeout(()=>{root.style.visibility='';},2500);}
  function t(key,values={}) {let value=window.NOVA_TRANSLATIONS[language][key]||window.NOVA_TRANSLATIONS.en[key]||key;for(const [name,replacement] of Object.entries(values))value=value.replaceAll('{'+name+'}',String(replacement));return value;}
  function apply(scope=document) {
    scope.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=(el.dataset.i18nPrefix||'')+t(el.dataset.i18n)+(el.dataset.i18nSuffix||'');});
    ['alt','aria-label','placeholder','title','content'].forEach(attr=>scope.querySelectorAll('[data-i18n-'+attr+']').forEach(el=>el.setAttribute(attr,t(el.getAttribute('data-i18n-'+attr)))));
    scope.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===language)));
  }
  function setLanguage(next) {
    if(!['en','fr'].includes(next))return;
    // Keep the same element at the same viewport offset while text reflows.
    const anchor=[...document.querySelectorAll('main section')].find(el=>el.getBoundingClientRect().bottom>100);
    const top=anchor?.getBoundingClientRect().top;
    language=next;try{localStorage.setItem('nova-language',language);}catch{}
    root.lang=language==='fr'?'fr-CA':'en-CA';apply();
    document.dispatchEvent(new CustomEvent('nova:language',{detail:{language}}));
    if(anchor&&scrollY>20) {const delta=anchor.getBoundingClientRect().top-top;scrollBy({top:delta,behavior:'instant'});}
  }
  window.NovaI18n={t,apply,setLanguage,get language(){return language;}};
  document.addEventListener('DOMContentLoaded',()=>{apply();root.style.visibility='';document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.language)));});
})();
