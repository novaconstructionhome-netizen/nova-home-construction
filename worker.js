import * as T from './vendor/three.module.js';
const host=document.querySelector('#worker-scene');
try{
const scene=new T.Scene(),camera=new T.OrthographicCamera(-6,6,4,-3,0.1,100);camera.position.set(1,4.5,12);camera.lookAt(0,1.7,0);
const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;host.append(renderer.domElement);host.classList.add('ready');
scene.add(new T.HemisphereLight(0xfff1d4,0x30394a,3));const sun=new T.DirectionalLight(0xffe1ad,4);sun.position.set(-3,8,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
const mat=c=>new T.MeshStandardMaterial({color:c,roughness:.55});const gold=mat('#c6a36a'),navy=mat('#263139'),skin=mat('#c89068'),black=mat('#171d20'),silver=mat('#aeb5b7'),yellow=mat('#e0b455');
function mesh(g,m,parent,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
const box=(w,h,d,m,parent,x=0,y=0,z=0)=>mesh(new T.BoxGeometry(w,h,d),m,parent,x,y,z);
const ball=(r,m,parent,x=0,y=0,z=0)=>mesh(new T.SphereGeometry(r,24,16),m,parent,x,y,z);
const floor=mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({opacity:.28}),scene,0,-.07,0);floor.rotation.x=-Math.PI/2;
const sign=new T.Group();scene.add(sign);sign.position.set(.1,.1,0);
const segments=[[0,2.8,1.1,.22],[0,1.5,1.1,.22],[0,.2,1.1,.22],[-.6,2.15,.22,1.2],[.6,2.15,.22,1.2],[-.6,.85,.22,1.2],[.6,.85,.22,1.2]];
let panel;[[-1.8,[1,3,4,6]],[0,[0,2,3,4,5,6]],[1.8,[1,3,4,6]]].forEach(([x,ids],digit)=>{ids.forEach(i=>{const [a,b,w,h]=segments[i];if(digit===2&&i===1){panel=new T.Group();panel.position.set(x-.55,b,0);sign.add(panel);box(w,h,.32,gold,panel,.55,0,0)}else box(w,h,.32,gold,sign,x+a,b,0)})});
const screw=mesh(new T.CylinderGeometry(.08,.08,.13,16),silver,sign,2.15,1.5,.23);screw.rotation.x=Math.PI/2;
const worker=new T.Group();scene.add(worker);worker.position.set(-2.7,0,1.1);
box(.75,1.05,.43,navy,worker,0,1.48,0);box(.78,.16,.48,black,worker,0,1.05,0);for(const x of [-.34,.34])box(.14,.7,.08,yellow,worker,x,1.55,.25);
const head=new T.Group();head.position.y=2.25;worker.add(head);ball(.35,skin,head);const helmet=mesh(new T.SphereGeometry(.39,24,16,0,Math.PI*2,0,Math.PI/2),yellow,head,0,.12,0);box(.91,.07,.68,yellow,head,0,.1,.05);for(const x of [-.12,.12]){ball(.046,black,head,x,.02,.315);box(.12,.035,.025,navy,head,x,.13,.33)}const mouth=box(.12,.024,.03,black,head,0,-.13,.34);
const legs=[];for(const x of [-.22,.22]){const leg=new T.Group();leg.position.set(x,1,0);worker.add(leg);mesh(new T.CapsuleGeometry(.14,.49,4,12),navy,leg,0,-.35,0);box(.31,.2,.55,black,leg,0,-.88,.1);legs.push(leg)}
const arms=[];for(const x of [-.5,.5]){const arm=new T.Group();arm.position.set(x,1.85,0);worker.add(arm);mesh(new T.CapsuleGeometry(.13,.48,4,12),navy,arm,0,-.35,0);ball(.145,yellow,arm,0,-.73,0);arms.push(arm)}
const tool=new T.Group();arms[1].add(tool);tool.position.set(0,-.79,.07);box(.13,.28,.13,yellow,tool,0,-.08,0);mesh(new T.CylinderGeometry(.026,.026,.48,10),silver,tool,0,-.45,0);const hammer=box(.38,.12,.14,silver,tool,0,-.67,0);hammer.visible=false;
new T.TextureLoader().load('nova-logo-transparent.png',texture=>{texture.colorSpace=T.SRGBColorSpace;mesh(new T.PlaneGeometry(.48,.30),new T.MeshBasicMaterial({map:texture,transparent:true}),worker,0,1.56,.232)});
const toolbox=new T.Group();scene.add(toolbox);toolbox.position.set(-1.9,.19,1.5);box(.72,.35,.43,black,toolbox);const lid=new T.Group();lid.position.set(0,.2,-.22);toolbox.add(lid);box(.75,.07,.46,gold,lid,0,0,.22);box(.25,.14,.05,black,lid,0,.08,.23);
scene.attach(tool);
function pose(t){const phase=Math.floor(t/4),u=(t%4)/4;arms[1].scale.y=1;worker.position.x=phase===0?-4.3+u*1.6:phase===5?-2.7-u*1.6:-2.7;worker.rotation.y=phase===5?-.5:.5;worker.rotation.z=0;head.rotation.z=0;arms[0].rotation.z=.15;arms[1].rotation.z=-.15;arms[1].rotation.x=0;legs.forEach((l,i)=>l.rotation.x=(phase===0||phase===5)?Math.sin(t*9+i*Math.PI)*.4:0);lid.rotation.x=phase===2?-Math.sin(u*Math.PI)*1.4:0;panel.rotation.z=phase===4?Math.sin(u*Math.PI*2)*.38:0;hammer.visible=phase===4;tool.rotation.y=phase===3?t*16:0;screw.rotation.y=phase===3?t*16:0;screw.position.z=phase===3?.3-u*.12:.2;
if(phase===1){head.rotation.z=Math.sin(u*Math.PI)*-.23;arms[1].rotation.z=-.8}if(phase===2){worker.rotation.z=-.27;arms[1].rotation.z=-1}if(phase===3){worker.position.x=.9;worker.rotation.y=.1;arms[1].rotation.z=-1.7;arms[1].rotation.x=-.7;tool.rotation.z=.7}if(phase===4){worker.position.x=.8;worker.rotation.z=Math.sin(u*Math.PI)*-.18;arms[0].rotation.z=1.6;arms[1].rotation.z=-1.7+Math.sin(t*12)*.22;mouth.scale.y=4}else mouth.scale.y=1;
worker.updateMatrixWorld(true);
if(phase===3){
 worker.position.x=1.3;worker.rotation.y=0;worker.updateMatrixWorld(true);
 const grip=new T.Vector3(2.25,1.6,1.03),local=worker.worldToLocal(grip.clone()).sub(arms[1].position);
 arms[1].quaternion.setFromUnitVectors(new T.Vector3(0,-1,0),local.clone().normalize());arms[1].scale.y=local.length()/.79;worker.updateMatrixWorld(true);
 tool.position.copy(grip);const tip=new T.Vector3(2.25,1.6,.3);
 tool.quaternion.setFromUnitVectors(new T.Vector3(0,-1,0),tip.sub(grip).normalize());tool.rotateY(t*16);
}else{tool.position.copy(arms[1].localToWorld(new T.Vector3(0,-.79,.07)));arms[1].getWorldQuaternion(tool.quaternion)}
}
const motion=matchMedia('(prefers-reduced-motion: reduce)');let visible=true,start=performance.now(),frame;
function render(now){cancelAnimationFrame(frame);pose(motion.matches?5:((now-start)/1000)%24);renderer.render(scene,camera);if(visible&&!document.hidden&&!motion.matches)frame=requestAnimationFrame(render)}
function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);const aspect=w/h;camera.left=-5.8;camera.right=5.8;camera.top=1.7+5.8/aspect;camera.bottom=1.7-5.8/aspect;camera.updateProjectionMatrix();render(performance.now())}new ResizeObserver(resize).observe(host);new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)render(performance.now());else cancelAnimationFrame(frame)}).observe(host);document.addEventListener('visibilitychange',()=>render(performance.now()));motion.addEventListener('change',()=>render(performance.now()));resize();
}catch(error){host.classList.remove('ready');host.querySelector('canvas')?.remove()}
