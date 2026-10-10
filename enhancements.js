(() => {
const I=window.NovaI18n, reduce=matchMedia('(prefers-reduced-motion: reduce)');
// Only approved destinations make contact cards visible.
document.querySelectorAll('[data-contact]').forEach(a=>{const kind=a.dataset.contact,value=(window.NOVA_CONTACT?.[kind]||'').trim();if(!value)return;if(kind==='email'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){a.href='mailto:'+value;a.removeAttribute('target');}else{try{const url=new URL(value);if(url.protocol!=='https:')return;a.href=url.href;}catch{return;}}a.hidden=false;});
const numbers=[...document.querySelectorAll('[data-count]')];let started=false;
function finish(){numbers.forEach(el=>el.textContent=el.dataset.count+el.dataset.suffix);}
function count(){if(started)return;started=true;document.querySelector(".nova-stats")?.classList.add("is-counting");if(reduce.matches){finish();return;}const start=performance.now();function frame(now){const p=Math.min((now-start)/2100,1),ease=1-Math.pow(1-p,3);numbers.forEach(el=>el.textContent=Math.round(+el.dataset.count*ease)+el.dataset.suffix);if(p<1&&!reduce.matches)requestAnimationFrame(frame);else finish();}requestAnimationFrame(frame);}
if(numbers.length){if(reduce.matches||!('IntersectionObserver'in window))count();else{numbers.forEach(el=>el.textContent='0'+el.dataset.suffix);const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){count();observer.disconnect();}},{threshold:.25});observer.observe(document.querySelector('.nova-stats'));}}
reduce.addEventListener('change',()=>{if(reduce.matches){started=true;finish();}});
const group=document.querySelector('.reviews-group');
if(group){
 for(let i=0;i<15;i++){const card=document.createElement('article');card.className='review-card';card.innerHTML='<span class="sample-label" data-i18n="review.sample"></span><div class="review-stars" role="img" data-i18n-aria-label="review.rating">★★★★★</div><p data-i18n="review.'+i+'"></p><b data-review-number="'+(i+1)+'"></b>';group.append(card);}
 const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.classList.add('review-clone');group.after(clone);
 const section=document.querySelector('.reviews-section'),toggle=section.querySelector('.reviews-toggle');toggle.dataset.i18n='review.pause';
 toggle.addEventListener('click',()=>{const paused=section.classList.toggle('is-paused');toggle.setAttribute('aria-pressed',String(paused));toggle.dataset.i18n=paused?'review.resume':'review.pause';I.apply(section);});
 function render(){I.apply(section);section.querySelectorAll('[data-review-number]').forEach(el=>el.textContent=I.t('review.customer',{number:el.dataset.reviewNumber}));}render();document.addEventListener('nova:language',render);
}
})();

// Accessible close and Escape handling for the new contact disclosure.
document.querySelectorAll('.floating-contact').forEach(menu=>{menu.querySelector('.contact-close')?.addEventListener('click',()=>{menu.open=false;menu.querySelector('summary').focus()});menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus()}})});

// Avoid spending animation frames on a hidden browser tab.
function novaVisibility(){document.documentElement.classList.toggle('nova-page-hidden',document.hidden)}
document.addEventListener('visibilitychange',novaVisibility);novaVisibility();
