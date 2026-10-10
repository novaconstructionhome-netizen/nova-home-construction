(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const scene=document.querySelector('.living-story');
  const articles=[...document.querySelectorAll('.journey .cards article')];
  const clamp=n=>Math.max(0,Math.min(1,n));
  let scheduled=false;
  function render(){
    scheduled=false;
    const max=document.documentElement.scrollHeight-innerHeight;
    document.documentElement.style.setProperty('--read',max>0?clamp(scrollY/max):0);
    if(scene&&!reduced.matches){const rect=scene.getBoundingClientRect();if(rect.bottom>=0&&rect.top<=innerHeight){const p=clamp(-rect.top/Math.max(1,rect.height-innerHeight));scene.style.setProperty('--scene',p.toFixed(4));scene.style.setProperty('--wipe',clamp((p-.18)/.64).toFixed(4));}}
    articles.forEach(a=>{const r=a.getBoundingClientRect();a.classList.toggle('is-current',r.top<innerHeight*.65&&r.bottom>innerHeight*.35)});
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(render)}}
  function configure(){scene?.classList.toggle('is-enhanced',!reduced.matches);schedule()}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',configure);document.addEventListener('nova:language',schedule);addEventListener('load',schedule,{once:true});document.fonts?.ready.then(schedule);configure();
  // Preserve ordinary links, history, keyboard shortcuts, and browser navigation.
  // Cross-document transitions are progressively enhanced through CSS.
})();
