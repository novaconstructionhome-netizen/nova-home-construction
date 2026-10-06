const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-menu');
menu?.addEventListener('click',()=>mobile.classList.toggle('open'));
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
document.querySelectorAll('.navitem>button').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();const item=btn.parentElement;document.querySelectorAll('.navitem').forEach(x=>{if(x!==item)x.classList.remove('open')});item.classList.toggle('open')}));
document.addEventListener('click',e=>{if(!e.target.closest('.navitem'))document.querySelectorAll('.navitem').forEach(x=>x.classList.remove('open'))});
const form=document.querySelector('#estimate');form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hi Nova Home Construction, my name is ${d.get('name')}. I'm interested in: ${d.get('type')}. ${d.get('message')||''} My phone number is ${d.get('phone')}.`;location.href=`sms:+18252884475?&body=${encodeURIComponent(msg)}`});
