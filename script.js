const motion=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-menu');
function closeMenu(){mobile?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label',window.NovaI18n.t('nav.open'))}
menu?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?window.NovaI18n.t('nav.close'):window.NovaI18n.t('nav.open'))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();document.querySelectorAll('.navitem[data-open]').forEach(n=>{delete n.dataset.open;n.querySelector('button').setAttribute('aria-expanded','false');n.querySelector('button').blur()})}});
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('.navitem').forEach((n,i)=>{const b=n.querySelector('button'),d=n.querySelector('.dropdown');d.id='nav-dropdown-'+i;b.setAttribute('aria-controls',d.id);b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const open=!n.hasAttribute('data-open');document.querySelectorAll('.navitem[data-open]').forEach(x=>{delete x.dataset.open;x.querySelector('button').setAttribute('aria-expanded','false')});if(open)n.dataset.open='';b.setAttribute('aria-expanded',String(open))})});
document.addEventListener('click',e=>{if(!e.target.closest('.navitem'))document.querySelectorAll('.navitem[data-open]').forEach(n=>{delete n.dataset.open;n.querySelector('button').setAttribute('aria-expanded','false')})});
const nav=document.querySelector('.nav'),hero=document.querySelector('.hero-bg');let ticking=false;
function updateScroll(){nav?.classList.toggle('is-scrolled',scrollY>35);if(hero&&!motion.matches&&scrollY<innerHeight)hero.style.setProperty('--hero-shift',Math.min(scrollY*.12,100)+'px');ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});updateScroll();
if('IntersectionObserver' in window&&!motion.matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');io.unobserve(e.target)}}),{threshold:.05});document.querySelectorAll('.sectiontitle,.content.split>div,.cards article,.home-grid>a,.process-list article,.cta>h2').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal','pending');io.observe(el)}})}
motion.addEventListener('change',()=>{if(motion.matches){document.querySelectorAll('.pending').forEach(el=>el.classList.remove('pending'));hero?.style.removeProperty('--hero-shift')}});

document.addEventListener('nova:language',()=>menu?.setAttribute('aria-label',window.NovaI18n.t(mobile?.classList.contains('open')?'nav.close':'nav.open')));
