const menu=document.querySelector('.menu'), nav=document.querySelector('.nav nav');
menu.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex'; if(nav.style.display==='flex'){Object.assign(nav.style,{position:'absolute',top:'72px',left:'0',right:'0',background:'#fff',padding:'25px',flexDirection:'column',alignItems:'center'})}});
