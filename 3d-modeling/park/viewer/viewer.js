/* Park viewer: offline classic scripts, embedded approved photos, lazy building chunks. */
'use strict';
const $=id=>document.getElementById(id),manifest=window.OKURA_MANIFEST,nav=manifest.navigation,V=THREE.Vector3;
let renderer,mirror=null,reflection=null,dirty=true,frameCount=0;
const scene=new THREE.Scene();scene.background=new THREE.Color(0xb5c3ca);
const camera=new THREE.PerspectiveCamera(62,1,.035,600);camera.rotation.order='YXZ';
const converted=p=>new V(p[0],p[2],-p[1]);
scene.add(new THREE.HemisphereLight(0xe9eef3,0x6f7357,1.05));scene.add(new THREE.AmbientLight(0xffffff,.24));const sun=new THREE.DirectionalLight(0xfff1d7,.95);sun.position.set(30,70,-50);scene.add(sun);
const loaded={},pending={},keys=new Set(),moves=new Set();let yaw=0,pitch=0,drag=null,busy=false,selected=null,request=0,station=null;
const pointers=new Map();let orbit=null,pinchDistance=null;
const minimap=window.OkuraMinimap.mount(document,nav,window.OKURA_MAPS,{select,canSelect:()=>!!selected&&!busy&&!(station&&station.mode!=='top')});
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
function applyOrbit(){
 const spec=nav.orbit;
 orbit.distance=clamp(orbit.distance,spec.min_distance,spec.max_distance);
 orbit.elevation=clamp(orbit.elevation,spec.min_elevation_deg*Math.PI/180,spec.max_elevation_deg*Math.PI/180);
 orbit.azimuth=Math.atan2(Math.sin(orbit.azimuth),Math.cos(orbit.azimuth));
 const radius=orbit.distance*Math.cos(orbit.elevation),centre=converted(orbit.target);
 camera.position.set(centre.x+radius*Math.sin(orbit.azimuth),centre.y+orbit.distance*Math.sin(orbit.elevation),centre.z+radius*Math.cos(orbit.azimuth));
 lookAt(orbit.target);dirty=true;
}
function startOrbit(v){
 camera.far=v.mode==='orbit'?900:600;camera.updateProjectionMatrix();
 if(v.mode!=='orbit'){orbit=null;return;}
 const offset=converted(v.position).sub(converted(nav.orbit.target)),distance=offset.length();
 orbit={target:nav.orbit.target.slice(),distance,elevation:Math.asin(offset.y/distance),azimuth:Math.atan2(offset.x,offset.z)};
 applyOrbit();
}
// Pan on a horizontal plane; the target is bounded by the map outline, not walkable paths.
function translateOrbit(dx,dy){
 if(!orbit||busy||!Number.isFinite(dx)||!Number.isFinite(dy))return;
 const p=[orbit.target[0]+dx,orbit.target[1]+dy],poly=nav.site.boundary;
 if(!OkuraCore.inside(p,poly)){
  let nearest=null,distance=Infinity;
  for(let i=0;i<poly.length;i++){
   const a=poly[i],b=poly[(i+1)%poly.length],x=b[0]-a[0],y=b[1]-a[1];
   const t=clamp(((p[0]-a[0])*x+(p[1]-a[1])*y)/(x*x+y*y||1),0,1),q=[a[0]+t*x,a[1]+t*y],d=Math.hypot(p[0]-q[0],p[1]-q[1]);
   if(d<distance){nearest=q;distance=d;}
  }
  [p[0],p[1]]=nearest;
 }
 orbit.target=[p[0],p[1],nav.orbit.target[2]];applyOrbit();
}
function planePoint(point){
 if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.y))return null;
 const rect=canvas.getBoundingClientRect();camera.updateMatrixWorld();
 const ray=new V((point.x-rect.left)/rect.width*2-1,1-(point.y-rect.top)/rect.height*2,.5).unproject(camera).sub(camera.position).normalize();
 const t=(orbit.target[2]-camera.position.y)/ray.y;
 // A near-horizon ray must not fling the map across the park.
 if(!Number.isFinite(t)||t<=0||t>orbit.distance*8)return null;
 const hit=camera.position.clone().addScaledVector(ray,t);return[hit.x,-hit.z];
}
function panOrbit(from,to){
 const a=planePoint(from),b=planePoint(to);
 if(a&&b){translateOrbit(a[0]-b[0],a[1]-b[1]);return;}
 const unit=2*orbit.distance*Math.tan(camera.fov*Math.PI/360)/canvas.getBoundingClientRect().height;
 const right=-(to.x-from.x)*unit,forward=(to.y-from.y)*unit/Math.sin(orbit.elevation),az=orbit.azimuth;
 translateOrbit(Math.cos(az)*right-Math.sin(az)*forward,Math.sin(az)*right+Math.cos(az)*forward);
}
function zoomOrbit(factor,anchor){
 if(!orbit||busy||!Number.isFinite(factor)||factor<=0)return;
 const distance=clamp(orbit.distance*factor,nav.orbit.min_distance,nav.orbit.max_distance);
 if(distance===orbit.distance)return; // At a zoom limit, do not creep the target.
 const before=planePoint(anchor);orbit.distance=distance;applyOrbit();const after=planePoint(anchor);
 if(before&&after)translateOrbit(before[0]-after[0],before[1]-after[1]);
}
function updateControls(){
 $('pad').hidden=false;
 $('controls-help').textContent=orbit?'ドラッグで回転 · 右／Shift＋ドラッグ・2本指で中心を移動 · ホイール／ピンチでズーム':'ドラッグで見回す · W/A/S/D／矢印で地形と室内を移動';
 for(const b of document.querySelectorAll('[data-move]'))b.setAttribute('aria-label',(orbit?'中心を':'')+({forward:'前へ',left:'左へ',back:'後へ',right:'右へ'}[b.dataset.move]));
}
function status(message){$('status').textContent=message;$('status').hidden=!message;}
function error(e){status('読み込みに失敗しました。ZIPをすべて展開し、park と viewer を同じ構成で置いてください。 '+e.message);$('retry').hidden=false;console.error(e);}
function script(name){return new Promise((resolve,reject)=>{if(window.OKURA_DATA&&window.OKURA_DATA[name])return resolve(window.OKURA_DATA[name]);const el=document.createElement('script');let done=false;const t=setTimeout(()=>finish(Error('assets/'+name+'.js の読み込み待ちが終了しました')),30000);function finish(e){if(done)return;done=true;clearTimeout(t);el.onload=el.onerror=null;if(e){el.remove();reject(e);}else resolve(window.OKURA_DATA[name]);}el.src='assets/'+name+'.js';el.onload=()=>finish(window.OKURA_DATA&&window.OKURA_DATA[name]?null:Error('モデルデータがありません'));el.onerror=()=>finish(Error('assets/'+name+'.js がありません'));document.head.appendChild(el);});}
async function load(name){if(loaded[name])return loaded[name];if(pending[name])return pending[name];pending[name]=(async()=>{const data=await script(name),parsed=readGLB(OkuraCore.decode(data.glb));await parsed.ready;scene.add(parsed.group);loaded[name]=parsed.group;if(parsed.meta.mirror)addMirror(parsed.meta.mirror);dirty=true;return parsed.group;})().finally(()=>delete pending[name]);return pending[name];}
function readGLB(buffer){
 const dv=new DataView(buffer);if(dv.getUint32(0,true)!==0x46546c67||dv.getUint32(4,true)!==2)throw Error('GLBヘッダーが不正です');
 const len=dv.getUint32(12,true),json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,20,len))),start=20+len+8;
 const images=json.images||[],textures=json.textures||[],maps=[];
 for(const im of images){const spec=manifest.approved_images[im.extras.sha256];if(!spec||spec.mime!==im.mimeType||spec.pixels.join(',')!==im.extras.pixels.join(','))throw Error('未登録の展示画像です');}
 for(const im of images){const texture=new THREE.Texture();texture.flipY=false;texture.encoding=THREE.sRGBEncoding;
  texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;texture.minFilter=texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;maps.push(texture);}
 const group=new THREE.Group();group.userData.cancelTextures=[];
 function attribute(i){const a=json.accessors[i],v=json.bufferViews[a.bufferView];const size={VEC2:2,VEC3:3,VEC4:4}[a.type];const Type=a.componentType===5126?Float32Array:a.componentType===5121&&a.normalized?Uint8Array:null;if(!Type||!size)throw Error('未対応の形状形式');return new THREE.BufferAttribute(new Type(buffer,start+(v.byteOffset||0)+(a.byteOffset||0),a.count*size),size,!!a.normalized);}
 for(const n of json.nodes){if(n.mesh===undefined)continue;const m=json.meshes[n.mesh];for(const p of m.primitives){
  const g=new THREE.BufferGeometry();g.addAttribute('position',attribute(p.attributes.POSITION));if(p.attributes.NORMAL!==undefined)g.addAttribute('normal',attribute(p.attributes.NORMAL));g.addAttribute('color',attribute(p.attributes.COLOR_0));if(p.indices!==undefined){const a=json.accessors[p.indices],v=json.bufferViews[a.bufferView];g.setIndex(new THREE.BufferAttribute(new Uint32Array(buffer,start+(v.byteOffset||0),a.count),1));}if(p.attributes.TEXCOORD_0!==undefined)g.addAttribute('uv',attribute(p.attributes.TEXCOORD_0));if(p.attributes.NORMAL===undefined)g.computeVertexNormals();g.computeBoundingSphere();
  const a=json.materials[p.material],b=a.pbrMetallicRoughness,c=b.baseColorFactor;
  const mat=new THREE.MeshStandardMaterial({color:new THREE.Color(c[0],c[1],c[2]),flatShading:p.attributes.NORMAL===undefined,roughness:b.roughnessFactor,metalness:Math.min(b.metallicFactor,.6),vertexColors:THREE.VertexColors,side:a.doubleSided?THREE.DoubleSide:THREE.FrontSide,transparent:a.alphaMode==='BLEND',opacity:c[3],depthWrite:a.alphaMode!=='BLEND',emissive:new THREE.Color(...(a.emissiveFactor||[0,0,0]))});
  if(b.baseColorTexture){if(!maps[b.baseColorTexture.index]||!g.attributes.uv)throw Error('画像のUVがありません');mat.map=maps[b.baseColorTexture.index];}
  const mesh=new THREE.Mesh(g,mat);mesh.name=n.name;if(n.name.endsWith('S02 optical mirror'))mesh.visible=false;group.add(mesh);
 }}
 // GLB bytes -> data URL. No fetch, Blob URL or file:// cross-origin image request.
 const ready=Promise.all(images.map((record,index)=>new Promise((resolve,reject)=>{
  const texture=maps[index],view=json.bufferViews[record.bufferView];
  if(!view||view.buffer!==0||view.byteOffset+view.byteLength>buffer.byteLength-start){reject(Object.assign(Error('Invalid approved image buffer'),{code:'MODEL_TEXTURE'}));return;}
  const bytes=new Uint8Array(buffer,start+(view.byteOffset||0),view.byteLength);let binary='';
  for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  const im=new Image();let finished=false;
  const timer=setTimeout(()=>fail(),15000);
  function fail(){if(finished)return;finished=true;clearTimeout(timer);im.onload=im.onerror=null;reject(Object.assign(Error('Approved image decode failed'),{code:'MODEL_TEXTURE'}));}
  group.userData.cancelTextures.push(fail);
  im.onerror=fail;im.onload=()=>{if(finished)return;if(im.naturalWidth!==record.extras.pixels[0]||im.naturalHeight!==record.extras.pixels[1]){fail();return;}finished=true;clearTimeout(timer);im.onload=im.onerror=null;texture.image=im;texture.needsUpdate=true;resolve();};
  im.src='data:'+record.mimeType+';base64,'+btoa(binary);
 }))); 
 return {group,meta:json.extras,ready};
}
function addMirror(m){
 if(!m)return;const point=new V(...m.point),normal=new V(...m.normal).normalize();reflection=new THREE.WebGLRenderTarget(1024,1024,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});
 const textureMatrix=new THREE.Matrix4();
 const mat=new THREE.ShaderMaterial({uniforms:{map:{value:reflection.texture},textureMatrix:{value:textureMatrix}},vertexShader:'uniform mat4 textureMatrix; varying vec4 uvMirror; void main(){uvMirror=textureMatrix*modelMatrix*vec4(position,1.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D map; varying vec4 uvMirror; void main(){vec3 c=texture2DProj(map,uvMirror).rgb;gl_FragColor=vec4(c*.97,1.0);}',side:THREE.FrontSide});
 mirror=new THREE.Mesh(new THREE.PlaneBufferGeometry(m.width,m.height),mat);mirror.position.copy(point);mirror.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new V(...m.right).normalize(),new V(...m.up).normalize(),normal));mirror.userData={point,normal,textureMatrix};scene.add(mirror);
}
const reflectedCam=new THREE.PerspectiveCamera(),bias=new THREE.Matrix4().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);
function render(){
 camera.updateMatrixWorld();
 if(mirror){const {point,normal,textureMatrix}=mirror.userData;
  if(camera.position.clone().sub(point).dot(normal)>0){
   const reflectPoint=p=>p.clone().sub(normal.clone().multiplyScalar(2*p.clone().sub(point).dot(normal)));
   reflectedCam.position.copy(reflectPoint(camera.position));
   const target=reflectPoint(camera.position.clone().add(camera.getWorldDirection(new V())));
   reflectedCam.up.copy(camera.up).reflect(normal);reflectedCam.lookAt(target);reflectedCam.near=camera.near;reflectedCam.far=camera.far;reflectedCam.projectionMatrix.copy(camera.projectionMatrix);reflectedCam.updateMatrixWorld();
   textureMatrix.copy(bias).multiply(reflectedCam.projectionMatrix).multiply(reflectedCam.matrixWorldInverse);
   mirror.visible=false;renderer.clippingPlanes=[new THREE.Plane(normal,-normal.dot(point)+.001)];renderer.setRenderTarget(reflection);renderer.render(scene,reflectedCam);renderer.setRenderTarget(null);renderer.clippingPlanes=[];mirror.visible=true;
  }
 }
 renderer.render(scene,camera);frameCount++;
 minimap.update({position:[camera.position.x,-camera.position.z,camera.position.y],direction:camera.getWorldDirection(new V()).toArray(),view:selected&&selected.id,area:$('area').value,orbit,station});dirty=false;
}

function areaOf(v){return v.chunk||'park';}
function fillViews(area){$('area').value=area;const select=$('view');select.textContent='';for(const v of nav.views.filter(v=>areaOf(v)===area)){const o=document.createElement('option');o.value=v.id;o.textContent=v.label.replace(/^(休憩棟|管理棟)：/,'');select.appendChild(o);}}
function ladderData(){return nav.stations&&nav.stations.rest_barrel_ladder;}
function clearInput(){keys.clear();moves.clear();drag=null;pointers.clear();pinchDistance=null;}
function lookAt(target){camera.lookAt(converted(target));yaw=camera.rotation.y;pitch=camera.rotation.x;}
function updateLadder(){const data=ladderData(),close=data&&camera.position.distanceTo(converted(data.path[0]))<1.25;$('ladder').hidden=!data||(!station&&!(selected&&areaOf(selected)==='rest'));$('ladder').disabled=busy||!!(station&&station.mode!=='top');$('ladder').textContent=station?(station.mode==='top'?'梯子を下りる':station.mode==='down'?'下りています…':'上っています…'):(close?'梯子を上る':'樽の梯子へ');}
function beginLadder(){const data=ladderData();if(!data)return;clearInput();camera.position.copy(converted(data.path[0]));lookAt(data.target);station={mode:'up',elapsed:0};dirty=true;updateLadder();}
function advanceLadder(dt){if(!station||station.mode==='top')return;const data=ladderData();station.elapsed=Math.min(data.duration,station.elapsed+dt);const t=station.elapsed/data.duration,p=station.mode==='down'?1-t:t,q=p*(data.path.length-1),i=Math.min(data.path.length-2,Math.floor(q));camera.position.copy(converted(data.path[i]).lerp(converted(data.path[i+1]),q-i));lookAt(data.target);dirty=true;if(t>=1){if(station.mode==='down'){station=null;selected=nav.views.find(v=>v.id==='rest_barrel');$('view').value=selected.id;$('place').textContent='樽の梯子の下';}else{station.mode='top';$('place').textContent='樽の中 — ドラッグで見回せます';}updateLadder();}}
async function select(id,{focusScene=false,walkPoint=null}={}){let v=nav.views.find(x=>x.id===id);if(!v)return;
 if(walkPoint){const landing=OkuraCore.nearestWalkable(nav,walkPoint);if(!landing||(v.chunk||'park')!=='park')return;v={...v,position:landing.position,fixed:false,mode:undefined,mapWalk:true};}
 const token=++request;clearInput();station=null;busy=true;updateLadder();status('会場を読み込み中…');$('retry').hidden=true;try{await load('park');await load('rest');await load('management');if(token!==request)return;selected=v;fillViews(areaOf(v));$('view').value=id;camera.position.copy(converted(v.position));lookAt(v.target);startOrbit(v);updateControls();dirty=true;$('place').textContent=orbit?'WASD／矢印でも中心を移動。「全体」で位置・角度・距離を戻せます。':(v.mapWalk||areaOf(v)==='park')?'屋外は自由に歩けます。園路外の地形は推定です。':v.fixed?'鑑賞視点：見回しできます。移動は園路や室内の場所を選んでください。':v.label;status('');if(v.id==='rest_barrel_peek')beginLadder();
 // Pointer map jumps hand keys back to the scene only after successful selection.
 // Do this before the next map redraw can preserve focus on a removed map target.
 if(focusScene)$('scene').focus({preventScroll:true});
 window.okuraReady=true;}catch(e){error(e);}finally{if(token===request){busy=false;updateLadder();}}}
function resize(){const r=$('scene').parentElement.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();dirty=true;}
function move(dx,dy){if(busy||orbit||station||!selected||selected.fixed)return false;const old=[camera.position.x,-camera.position.z,camera.position.y],next=OkuraCore.step(nav,old,dx,dy);camera.position.copy(converted(next));dirty=true;updateLadder();return old.some((v,i)=>v!==next[i]);}
for(const credit of new Set(Object.values(manifest.approved_images).map(x=>x.credit))){const li=document.createElement('li');li.textContent=credit;$('credits').appendChild(li);}
fillViews('park');
$('area').addEventListener('change',()=>{const area=$('area').value;fillViews(area);const id=area==='rest'?'rest_entrance':area==='management'?'management_entrance':'park_overview';select(id);});
$('ladder').addEventListener('click',()=>{if(station&&station.mode==='top'){clearInput();station.mode='down';station.elapsed=0;updateLadder();}else if(!station)select('rest_barrel_peek');});
$('view').addEventListener('change',()=>select($('view').value));$('home').addEventListener('click',()=>select('park_overview'));$('retry').addEventListener('click',()=>select($('view').value||'park_overview'));
function offset(n){const views=nav.views.filter(v=>areaOf(v)===$('area').value);const i=views.findIndex(v=>v.id===$('view').value);select(views[(i+n+views.length)%views.length].id);}
$('previous').addEventListener('click',()=>offset(-1));$('next').addEventListener('click',()=>offset(1));
const canvas=$('scene');
function pointerMid(){const [a,b]=Array.from(pointers.values());return b?{x:(a.x+b.x)/2,y:(a.y+b.y)/2}:null;}
function pointerSpan(){const [a,b]=Array.from(pointers.values());return b?Math.hypot(a.x-b.x,a.y-b.y):null;}
canvas.addEventListener('pointerdown',e=>{
 if(busy||!selected||(e.button!==undefined&&e.button!==0&&!(orbit&&e.button===2))||pointers.size>=2)return;
 canvas.focus();const point={x:e.clientX,y:e.clientY,pan:e.button===2};pointers.set(e.pointerId,point);
 if(pointers.size===1)drag={...point};
 pinchDistance=pointerSpan();canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
 if(busy||!pointers.has(e.pointerId))return;
 const oldMid=pointerMid(),point={...pointers.get(e.pointerId),x:e.clientX,y:e.clientY};pointers.set(e.pointerId,point);
 if(pointers.size===2){
  const span=pointerSpan();
  if(orbit){if(pinchDistance>1&&span>1)zoomOrbit(pinchDistance/span,oldMid);panOrbit(oldMid,pointerMid());}
  pinchDistance=span;drag=null;return;
 }
 if(drag){
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(orbit){if(point.pan||e.shiftKey)panOrbit(drag,point);else{orbit.azimuth-=dx*.004;orbit.elevation+=dy*.004;applyOrbit();}}
  else{yaw-=dx*.004;pitch=clamp(pitch-dy*.004,-1.53,1.53);camera.rotation.set(pitch,yaw,0);dirty=true;}
 }
 drag={...point};
});
for(const ev of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(ev,e=>{
 if(!pointers.delete(e.pointerId))return;
 drag=pointers.size===1?{...pointers.values().next().value}:null;pinchDistance=pointerSpan();
});
canvas.addEventListener('contextmenu',e=>{if(orbit)e.preventDefault();});
canvas.addEventListener('wheel',e=>{
 if(!orbit||busy)return;
 e.preventDefault();
 const unit=e.deltaMode===1?16:e.deltaMode===2?canvas.getBoundingClientRect().height:1;
 zoomOrbit(Math.exp(clamp(e.deltaY*unit*.0015,-4,4)),{x:e.clientX,y:e.clientY});
},{passive:false});
window.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){if(!busy)keys.add(e.code);e.preventDefault();}});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',clearInput);
for(const b of document.querySelectorAll('[data-move]')){b.addEventListener('pointerdown',e=>{if(busy)return;canvas.focus();moves.add(b.dataset.move);b.setPointerCapture(e.pointerId);e.preventDefault();});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>moves.delete(b.dataset.move));}
let previous=0;function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-previous)/1000,.05);previous=now;advanceLadder(dt);let fw=(keys.has('KeyW')||keys.has('ArrowUp')||moves.has('forward')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')||moves.has('back')?1:0),side=(keys.has('KeyD')||keys.has('ArrowRight')||moves.has('right')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')||moves.has('left')?1:0);if(fw||side){const len=Math.hypot(fw,side);fw/=len;side/=len;if(orbit){const speed=clamp(orbit.distance*.18,12,65),az=orbit.azimuth;translateOrbit((-Math.sin(az)*fw+Math.cos(az)*side)*dt*speed,(Math.cos(az)*fw+Math.sin(az)*side)*dt*speed);}else move((-Math.sin(yaw)*fw+Math.cos(yaw)*side)*dt*1.4,(Math.cos(yaw)*fw+Math.sin(yaw)*side)*dt*1.4);}if(dirty)render();}
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.gammaOutput=true;renderer.gammaFactor=2.2;renderer.toneMapping=THREE.ReinhardToneMapping;renderer.toneMappingExposure=1.5;resize();window.addEventListener('resize',resize);requestAnimationFrame(animate);select('park_overview');}catch(e){status('WebGLを開始できません。ブラウザのハードウェアアクセラレーション設定をご確認ください。 '+e.message);}
window.okura={select,move,get minimap(){return minimap.state;},get state(){return{position:[camera.position.x,-camera.position.z,camera.position.y],view:selected&&selected.id,mapWalk:!!(selected&&selected.mapWalk),area:$('area').value,orbit:orbit?{...orbit,target:orbit.target.slice()}:null,station:station?{...station}:null,mirror:mirror?{position:mirror.position.toArray(),width:mirror.geometry.parameters.width,height:mirror.geometry.parameters.height,quaternion:mirror.quaternion.toArray()}:null,loaded:Object.keys(loaded),busy,far:camera.far,frameCount,direction:camera.getWorldDirection(new V()).toArray()};}};
