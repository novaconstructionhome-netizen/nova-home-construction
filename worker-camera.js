// Fit the entire animated scene in camera space, including feet and raised tools.
import {Vector3} from './vendor/three.module.js';
export const sceneBounds={min:[-5.5,-.65,-1],max:[3.5,3.6,2.5]};
export function fitSceneCamera(camera,width,height){
 const aspect=Math.max(1,width)/Math.max(1,height);
 camera.updateMatrixWorld(true);
 let extentX=0,extentY=0;
 for(const x of [sceneBounds.min[0],sceneBounds.max[0]])for(const y of [sceneBounds.min[1],sceneBounds.max[1]])for(const z of [sceneBounds.min[2],sceneBounds.max[2]]){
  const point=new Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse);
  extentX=Math.max(extentX,Math.abs(point.x));extentY=Math.max(extentY,Math.abs(point.y));
 }
 const halfHeight=Math.max(extentY,extentX/aspect)*1.1;
 camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;
 camera.top=halfHeight;camera.bottom=-halfHeight;
 camera.updateProjectionMatrix();
}
