/* Static GLB reader with authorized poster, S08 and S12 textures and first-person viewer. Vendored Three r102.
   Only this exporter's triangle subset and embedded approved JPEG/PNG images are accepted. */
'use strict';
const $=id=>document.getElementById(id);
function showLoading(message, failed=false){
 $('loading').hidden=false;$('loading-message').textContent=message;$('loading-actions').hidden=!failed;
 $('standalone').hidden=!!window.WEIJI_STANDALONE;
}
function showFailure(error){
 const message=window.WeijiModelLoader ? window.WeijiModelLoader.errorMessage(error) : '表示に必要なスクリプトを読み込めません。ZIPをすべて展開し、viewerフォルダ全体を一緒に置いて開き直してください。';
 showLoading(message,true);console.error(error);
}
try {
if(!window.THREE || !window.WeijiModelLoader)throw Object.assign(new Error('Missing viewer dependency'),{code:'DEPENDENCY'});
const V=THREE.Vector3,canvas=$('scene');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});}
catch(error){error.code='WEBGL';throw error;}
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));renderer.gammaOutput=true;renderer.gammaFactor=2.2;
renderer.toneMapping=THREE.ReinhardToneMapping;renderer.toneMappingExposure=1.45;
const scene=new THREE.Scene();scene.background=new THREE.Color(0xb7beb0);
const camera=new THREE.PerspectiveCamera(66,1,.035,250);camera.rotation.order='YXZ';
scene.add(new THREE.HemisphereLight(0xe1ebf4,0x73644f,.92));scene.add(new THREE.AmbientLight(0xffffff,.25));
const sun=new THREE.DirectionalLight(0xfff0d2,.9);sun.position.set(-8,18,7);scene.add(sun);
let station=null;
let model=null,nav=null,mirror=null,reflection=null,building='',yaw=0,pitch=0,drag=null,token=0,dirty=true,requestedBuilding='rest';
const keys=new Set(),moves=new Set(),clock=new THREE.Clock();let lastMap=0,frameCount=0;
const converted=p=>new V(p[0],p[2],-p[1]);
function readGLB(buffer){
 const dv=new DataView(buffer);if(dv.getUint32(0,true)!==0x46546c67||dv.getUint32(4,true)!==2)throw Error('GLBヘッダーが不正です');
 const len=dv.getUint32(12,true),json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,20,len))),start=20+len+8;
 const images=json.images||[],textures=json.textures||[],maps=[];
 const approved={
  'Authorized exhibition poster - front':{flag:'authorized_poster',mime:'image/jpeg',pixels:[724,1024]},
  'Authorized S08 rotating snakes - front':{flag:'authorized_s08',mime:'image/png',pixels:[2048,2048]},
  'Authorized S12 Eden fish - front':{flag:'authorized_s12',mime:'image/jpeg',pixels:[2048,1536]}
 };
 const texturedMaterials=json.materials.filter(m=>m.pbrMetallicRoughness.baseColorTexture);
 const expected=json.extras.building==='management'?3:1;
 if(images.length!==expected||textures.length!==expected||texturedMaterials.length!==expected)throw Error('内蔵画像の数が不正です');
 const seen=new Set();
 for(const m of texturedMaterials){
  const spec=approved[m.name],i=m.pbrMetallicRoughness.baseColorTexture.index,t=textures[i],im=t&&images[t.source];
  if(!spec||m.doubleSided||!m.extras||!m.extras[spec.flag]||seen.has(m.name)||!im||im.uri||im.mimeType!==spec.mime||t.source!==i||!im.extras||im.extras.authorization!==spec.flag||im.extras.pixels.join(',')!==spec.pixels.join(','))throw Error('許可画像の前面材質が不正です');
  seen.add(m.name);
 }
 for(const im of images){const texture=new THREE.Texture();texture.flipY=false;texture.encoding=THREE.sRGBEncoding;
  texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;texture.minFilter=texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;maps.push(texture);}
 const group=new THREE.Group();group.userData.cancelTextures=[];
 function attribute(i){const a=json.accessors[i],v=json.bufferViews[a.bufferView];const size=a.type==='VEC2'?2:a.type==='VEC3'?3:0;if(a.componentType!==5126||!size)throw Error('未対応の形状形式');return new THREE.BufferAttribute(new Float32Array(buffer,start+(v.byteOffset||0)+(a.byteOffset||0),a.count*size),size);}
 for(const n of json.nodes){if(n.mesh===undefined)continue;const m=json.meshes[n.mesh];for(const p of m.primitives){
  const g=new THREE.BufferGeometry();g.addAttribute('position',attribute(p.attributes.POSITION));g.addAttribute('normal',attribute(p.attributes.NORMAL));g.addAttribute('color',attribute(p.attributes.COLOR_0));if(p.indices!==undefined){const a=json.accessors[p.indices],v=json.bufferViews[a.bufferView];g.setIndex(new THREE.BufferAttribute(new Uint32Array(buffer,start+(v.byteOffset||0),a.count),1));}if(p.attributes.TEXCOORD_0!==undefined)g.addAttribute('uv',attribute(p.attributes.TEXCOORD_0));g.computeBoundingSphere();
  const a=json.materials[p.material],b=a.pbrMetallicRoughness,c=b.baseColorFactor;
  const mat=new THREE.MeshStandardMaterial({color:new THREE.Color(c[0],c[1],c[2]),roughness:b.roughnessFactor,metalness:Math.min(b.metallicFactor,.6),vertexColors:THREE.VertexColors,side:a.doubleSided?THREE.DoubleSide:THREE.FrontSide,transparent:a.alphaMode==='BLEND',opacity:c[3],depthWrite:a.alphaMode!=='BLEND',emissive:new THREE.Color(...(a.emissiveFactor||[0,0,0]))});
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
function disposeGroup(group){for(const cancel of group.userData.cancelTextures||[])cancel();const maps=new Set();group.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)maps.add(o.material.map);o.material.dispose();}});for(const map of maps)map.dispose();}
function disposeModel(){if(model){scene.remove(model);disposeGroup(model);}if(mirror){scene.remove(mirror);mirror.geometry.dispose();mirror.material.dispose();}if(reflection)reflection.dispose();model=mirror=reflection=null;}
function addMirror(m){
 if(!m)return;const point=new V(...m.point),normal=new V(...m.normal).normalize();reflection=new THREE.WebGLRenderTarget(1024,1024,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});
 const textureMatrix=new THREE.Matrix4();
 const mat=new THREE.ShaderMaterial({uniforms:{map:{value:reflection.texture},textureMatrix:{value:textureMatrix}},vertexShader:'uniform mat4 textureMatrix; varying vec4 uvMirror; void main(){uvMirror=textureMatrix*modelMatrix*vec4(position,1.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D map; varying vec4 uvMirror; void main(){vec3 c=texture2DProj(map,uvMirror).rgb;gl_FragColor=vec4(c*.97,1.0);}',side:THREE.FrontSide});
 mirror=new THREE.Mesh(new THREE.PlaneBufferGeometry(m.width,m.height),mat);mirror.position.copy(point);mirror.quaternion.setFromUnitVectors(new V(0,0,1),normal);mirror.userData={point,normal,textureMatrix};scene.add(mirror);
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
 renderer.render(scene,camera);frameCount++;dirty=false;
}
function resize(){const r=$('stage').getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();dirty=true;}
function cell(x,y){const g=nav.grid,ix=Math.round((x-g.origin[0])/g.step),iy=Math.round((y-g.origin[1])/g.step);if(ix<0||iy<0||ix>=g.width||iy>=g.height)return -1;return iy*g.width+ix;}
function ground(x,y){const k=cell(x,y);return k<0?null:nav.grid.heights[k];}
function clearInput(){keys.clear();moves.clear();drag=null;}
function setView(id){if(!nav)return;clearInput();station=null;const v=nav.views.find(v=>v.id===id)||nav.views[0];camera.position.copy(converted(v.station?nav.stations[v.station].path[0]:v.position));const target=converted(v.target),d=target.sub(camera.position).normalize();yaw=Math.atan2(-d.x,-d.z);pitch=Math.asin(d.y);camera.rotation.set(pitch,yaw,0);$('viewpoint').value=v.id;$('place').textContent=v.label;dirty=true;drawMap();if(v.station)beginStation(v.station);else updateLadderButton();}
function move(dx,dz){if(!nav||station||!$('loading').hidden)return false;const old=camera.position.clone();let x=old.x,y=-old.z;const speed=Math.hypot(dx,dz),parts=Math.max(1,Math.ceil(speed/.025));
 for(let i=0;i<parts;i++){const xx=x+dx/parts,yy=y-dz/parts,h=ground(xx,yy),h0=ground(x,y);if(h!==null&&h0!==null&&Math.abs(h-h0)<=.225){x=xx;y=yy;}else{let h1=ground(xx,y);if(h1!==null&&h0!==null&&Math.abs(h1-h0)<=.225)x=xx;h1=ground(x,yy);if(h1!==null&&h0!==null&&Math.abs(h1-h0)<=.225)y=yy;}}
 const h=ground(x,y);if(h===null)return false;camera.position.set(x,h+nav.eye_height,-y);const moved=old.distanceTo(camera.position)>.00001;if(moved){dirty=true;$('place').textContent=nearestRoom();updateLadderButton();}return moved;
}
function updateLadderButton(){
 const data=nav&&nav.stations&&nav.stations.barrel_ladder;
 const close=data&&camera.position.distanceTo(converted(data.path[0]))<1.25;
 $('ladder').hidden=!data||(!station&&!close);$('ladder').disabled=!!(station&&station.mode!=='top');
 $('ladder').textContent=station?(station.mode==='top'?'梯子を下りる':station.mode==='down'?'下りています…':'上っています…'):'梯子を上る';
}
function beginStation(id){
 if(!nav.stations||!nav.stations[id])return;clearInput();const data=nav.stations[id];camera.position.copy(converted(data.path[0]));station={id,mode:'up',elapsed:0};updateLadderButton();dirty=true;
}
function advanceStation(dt){
 if(!station||station.mode==='top')return;
 const data=nav.stations[station.id];station.elapsed=Math.min(data.duration,station.elapsed+dt);
 const t=station.elapsed/data.duration,progress=station.mode==='down'?1-t:t,scaled=progress*(data.path.length-1),index=Math.min(data.path.length-2,Math.floor(scaled));
 camera.position.copy(converted(data.path[index]).lerp(converted(data.path[index+1]),scaled-index));
 const d=converted(data.target).sub(camera.position).normalize();yaw=Math.atan2(-d.x,-d.z);pitch=Math.asin(d.y);camera.rotation.set(pitch,yaw,0);dirty=true;
 if(t>=1){if(station.mode==='down'){station=null;$('place').textContent='樽の梯子の下';}else{station.mode='top';$('place').textContent='樽の中 — ドラッグで見回せます';}updateLadderButton();drawMap();}
}
$('ladder').onclick=()=>{if(station&&station.mode==='top'){clearInput();station.mode='down';station.elapsed=0;updateLadderButton();}else if(!station)beginStation('barrel_ladder');};
function nearestRoom(){let best=nav.views[0],dist=Infinity;for(const v of nav.views){const d=(camera.position.x-v.position[0])**2+(-camera.position.z-v.position[1])**2;if(d<dist){dist=d;best=v;}}return best.label;}
function drawMap(){if(!nav)return;const c=$('map'),ctx=c.getContext('2d'),g=nav.grid;ctx.fillStyle='#edeedc';ctx.fillRect(0,0,c.width,c.height);const sx=c.width/g.width,sy=c.height/g.height;ctx.fillStyle='#96a18b';for(let k=0;k<g.heights.length;k++)if(g.heights[k]!==null)ctx.fillRect((k%g.width)*sx,c.height-(Math.floor(k/g.width)+1)*sy,Math.max(1,sx),Math.max(1,sy));
 ctx.fillStyle='#334330';ctx.font='11px sans-serif';for(let i=0;i<nav.views.length;i++){const v=nav.views[i];ctx.fillText(String(i+1),(v.position[0]-g.origin[0])/g.step*sx,c.height-(v.position[1]-g.origin[1])/g.step*sy);}
 const x=(camera.position.x-g.origin[0])/g.step*sx,y=c.height-(-camera.position.z-g.origin[1])/g.step*sy;ctx.fillStyle='#a95235';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();const d=camera.getWorldDirection(new V());ctx.strokeStyle='#a95235';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+d.x*13,y+d.z*13);ctx.stroke();}
async function load(name){
 const n=++token;requestedBuilding=name;clearInput();station=null;updateLadderButton();window.weijiReady=false;
 showLoading((name==='rest'?'休憩棟':'管理棟')+'のデータを読み込んでいます…');$('building').disabled=true;$('viewpoint').disabled=true;
 try{
  const data=await window.WeijiModelLoader.load(name);if(n!==token)return;
  showLoading('3D表示を準備しています…');
  let r;try{r=readGLB(data.buffer);await r.ready;}catch(error){if(r)disposeGroup(r.group);error.code=error.code||'MODEL_DATA';throw error;}
  if(n!==token){disposeGroup(r.group);return;}
  disposeModel();model=r.group;nav=data.navigation;building=name;scene.add(model);addMirror(r.meta.mirror);
  $('building').value=name;$('viewpoint').replaceChildren(...nav.views.map((v,i)=>{const o=document.createElement('option');o.value=v.id;o.textContent=(i+1)+' '+v.label;return o;}));
  setView('entrance');$('loading').hidden=true;resize();render();window.weijiReady=true;
 }catch(error){if(n===token){showFailure(error);if(building)$('building').value=building;}}
 finally{if(n===token){$('building').disabled=false;$('viewpoint').disabled=!nav;}}
}
$('retry').onclick=()=>load(requestedBuilding);
$('building').addEventListener('change',()=>load($('building').value));$('viewpoint').addEventListener('change',()=>setView($('viewpoint').value));$('entrance').onclick=()=>setView('entrance');
$('help').onclick=()=>{clearInput();$('about').showModal();};$('closehelp').onclick=()=>$('about').close();
canvas.addEventListener('pointerdown',e=>{canvas.focus();drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw-=(e.clientX-drag.x)*.004;pitch-=(e.clientY-drag.y)*.004;pitch=Math.max(-1.3,Math.min(1.3,pitch));drag={x:e.clientX,y:e.clientY};camera.rotation.set(pitch,yaw,0);dirty=true;});canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
window.addEventListener('keydown',e=>{if(e.target.matches('select,button')||$('about').open)return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',clearInput);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInput();});
for(const b of document.querySelectorAll('[data-move]')){b.addEventListener('pointerdown',e=>{moves.add(b.dataset.move);b.setPointerCapture(e.pointerId);e.preventDefault();});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>moves.delete(b.dataset.move));}
$('lookleft').onclick=()=>{yaw+=Math.PI/6;camera.rotation.set(pitch,yaw,0);dirty=true;};$('lookright').onclick=()=>{yaw-=Math.PI/6;camera.rotation.set(pitch,yaw,0);dirty=true;};
$('mapbox').addEventListener('toggle',drawMap);window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);advanceStation(dt);let fw=(keys.has('KeyW')||keys.has('ArrowUp')||moves.has('forward')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')||moves.has('back')?1:0),side=(keys.has('KeyD')||keys.has('ArrowRight')||moves.has('right')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')||moves.has('left')?1:0);if(fw||side){const length=Math.hypot(fw,side);fw/=length;side/=length;move((-Math.sin(yaw)*fw+Math.cos(yaw)*side)*dt*1.15,(-Math.cos(yaw)*fw-Math.sin(yaw)*side)*dt*1.15);}if(dirty)render();if(performance.now()-lastMap>400&&$('mapbox').open){drawMap();lastMap=performance.now();}}
// Read-only state is useful for reviewing routes and browser verification.
window.weiji={get state(){return {building,station:station?{id:station.id,mode:station.mode}:null,position:camera.position.toArray(),view: $('viewpoint').value,direction:camera.getWorldDirection(new V()).toArray(),loading:!$('loading').hidden,frameCount,meshes:model?model.children.length:0,mirror:!!mirror,posterTextures:model?model.children.filter(o=>o.name==='Authorized exhibition poster - front'&&o.material.map&&o.material.map.image).length:0,snakesTextures:model?model.children.filter(o=>o.name==='Authorized S08 rotating snakes - front'&&o.material.map&&o.material.map.image).length:0,edenTextures:model?model.children.filter(o=>o.name==='Authorized S12 Eden fish - front'&&o.material.map&&o.material.map.image).length:0,cell:nav?cell(camera.position.x,-camera.position.z):null,walkable:nav?ground(camera.position.x,-camera.position.z)!==null:false};}};
resize();load('rest');animate();

} catch(error) { showFailure(error);$('retry').onclick=()=>window.location.reload(); }
