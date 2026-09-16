/* §43: north-up SVG map. Coordinates remain independent of the Three renderer. */
(function(root){
 'use strict';
 const labels={park:'公園全体',rest:'休憩棟',management:'管理棟'},W=280,H=224,PAD=21;
 const HIT_RADIUS_PX=12,DRAG_LIMIT_PX=8,MAX_DISTANCE={park:24,rest:2.5,management:2.5};
 const angle=t=>t.rotation_deg*Math.PI/180;
 function toWorld(p,t){const a=angle(t),c=Math.cos(a),s=Math.sin(a);return[t.translation[0]+c*p[0]-s*p[1],t.translation[1]+s*p[0]+c*p[1],(t.translation[2]||0)+(p[2]||0)];}
 function toLocal(p,t){const a=angle(t),c=Math.cos(a),s=Math.sin(a),x=p[0]-t.translation[0],y=p[1]-t.translation[1];return[c*x+s*y,-s*x+c*y,(p[2]||0)-(t.translation[2]||0)];}
 function direction(d){return[d[0],-d[2],d[1]];}
 function inside(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
 function area(nav,data,state,choice){
  if(choice&&choice!=='auto'&&labels[choice])return choice;
  if(state.orbit)return'park';
  for(const name of ['rest','management'])if(inside(toLocal(state.position,nav.site.buildings[name]),data.buildings[name].footprint))return name;
  const name=state.area;
  if(data.buildings[name]){const p=toLocal(state.position,nav.site.buildings[name]),points=data.buildings[name].footprint,xs=points.map(v=>v[0]),ys=points.map(v=>v[1]);if(p[0]>=Math.min(...xs)-4&&p[0]<=Math.max(...xs)+4&&p[1]>=Math.min(...ys)-4&&p[1]<=Math.max(...ys)+4)return name;}
  return'park';
 }
 function rect(b){return[[b[0],b[1]],[b[2],b[1]],[b[2],b[3]],[b[0],b[3]]];}
 function projection(points){
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys),scale=Math.min((W-2*PAD)/(xmax-xmin||1),(H-2*PAD)/(ymax-ymin||1));
  const cx=(xmin+xmax)/2,cy=(ymin+ymax)/2;
  return{scale,point:p=>[W/2+(p[0]-cx)*scale,H/2-(p[1]-cy)*scale],unproject:p=>[cx+(p[0]-W/2)/scale,cy-(p[1]-H/2)/scale]};
 }
 function candidates(nav,name){return nav.views.filter(v=>!v.mode&&((v.chunk||'park')===name||(name==='park'&&['rest_entrance','management_entrance'].includes(v.id))));}
 // SVG uses xMidYMid meet; account for responsive scaling and any letterboxing.
 function clientPoint(rect,x,y){
  if(![rect.left,rect.top,rect.width,rect.height,x,y].every(Number.isFinite)||rect.width<=0||rect.height<=0)return null;
  const scale=Math.min(rect.width/W,rect.height/H),point=[(x-rect.left-(rect.width-W*scale)/2)/scale,(y-rect.top-(rect.height-H*scale)/2)/scale];
  return point[0]<0||point[0]>W||point[1]<0||point[1]>H?null:{point,scale};
 }
 function nearest(sc,nav,point,pixelsPerUnit=1){
  if(!point||!point.every(Number.isFinite)||point[0]<0||point[0]>W||point[1]<0||point[1]>H||!Number.isFinite(pixelsPerUnit)||pixelsPerUnit<=0)return null;
  const world=sc.map.unproject(point);let best=null,distance=Infinity;
  for(const v of sc.views){
   const d=Math.hypot(world[0]-v.position[0],world[1]-v.position[1]);
   // An entrance and a park view share XY. Prefer entering the building on an exact tie.
   if(d<distance-1e-7||(Math.abs(d-distance)<=1e-7&&['rest_entrance','management_entrance'].includes(v.id))){best=v;distance=d;}
  }
  if(!best)return null;
  const hit=distance*sc.map.scale*pixelsPerUnit<=HIT_RADIUS_PX;
  if(hit)return best;
  if(sc.name==='park'&&!inside(world,nav.site.boundary))return null;
  return distance<=MAX_DISTANCE[sc.name]?best:null;
 }
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=v=>Number(v.toFixed(3));
 function scene(nav,data,name){
  const floor=data.buildings[name],transform=nav.site.buildings[name];
  const world=p=>floor?toWorld(p,transform):p;
  const views=candidates(nav,name);
  const bounds=floor?floor.footprint.map(world).concat(views.map(v=>v.position)):nav.site.boundary;
  const map=projection(bounds),parts=[];
  const points=ps=>ps.map(p=>map.point(p).map(num).join(',')).join(' ');
  const polygon=(ps,cls)=>parts.push('<polygon class="'+cls+'" points="'+points(ps)+'"/>');
  const line=(ps,cls,width)=>parts.push('<polyline class="'+cls+'" points="'+points(ps)+'"'+(width?' stroke-width="'+num(width)+'"':'')+'/>');
  const text=(p,s,cls='map-label')=>{const q=map.point(p),rows=s.split('\n');parts.push('<text class="'+cls+'">'+rows.map((r,i)=>'<tspan x="'+num(q[0])+'" y="'+num(q[1]+(i-(rows.length-1)/2)*12)+'">'+esc(r)+'</tspan>').join('')+'</text>');};
  const dot=(p,cls,title)=>{const q=map.point(p);parts.push('<circle class="'+cls+'" cx="'+num(q[0])+'" cy="'+num(q[1])+'" r="2"><title>'+esc(title)+'</title></circle>');};
  if(!floor){
   polygon(nav.site.boundary,'map-park');
   for(const path of nav.site.paths)line(path.points,'map-path',Math.max(1.8,path.width*map.scale));
   for(const water of nav.site.water)polygon(water.polygon,'map-water');
   if(nav.site.stream&&nav.site.stream.points)line(nav.site.stream.points,'map-stream',Math.max(1.8,nav.site.stream.width*map.scale));
   for(const name of ['rest','management']){
    const f=data.buildings[name],t=nav.site.buildings[name],poly=f.footprint.map(p=>toWorld(p,t));polygon(poly,'map-building');
    const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);text([(Math.min(...xs)+Math.max(...xs))/2,Math.max(...ys)+4],f.label);
   }
   for(const g of Object.values(nav.site.gates)){
    const t={rotation_deg:g.rotation_deg||0,translation:g.position};polygon(rect([-g.width/2,-g.depth/2,g.width/2,g.depth/2]).map(p=>toWorld(p,t)),'map-gate');
   }
  }else{
   polygon(floor.footprint.map(world),'map-floor');
   for(const r of floor.rooms)polygon(rect(r.bounds).map(world),'map-room map-'+r.kind);
   // Outline is last, then openings cut it. Thin room boundaries are a schematic, not solid walls.
   line(floor.footprint.concat([floor.footprint[0]]).map(world),'map-outline');
   for(const wall of floor.walls)line(wall.map(world),'map-partition');
   for(const o of floor.openings){const [x,y]=o.xy,h=o.width/2;line((o.axis==='x'?[[x,y-h],[x,y+h]]:[[x-h,y],[x+h,y]]).map(world),'map-opening');}
   for(const r of floor.rooms)if(r.label)text(world(r.label_point||[(r.bounds[0]+r.bounds[2])/2,(r.bounds[1]+r.bounds[3])/2]),r.label);
   const q=world(floor.entrance);dot(q,'map-entrance','正式な入口');text([q[0]+2.1,q[1]],'入口','map-entry-label');
  }
  for(const v of views){const q=map.point(v.position);parts.push('<g class="map-target" tabindex="0" role="button" data-view="'+esc(v.id)+'" aria-label="'+esc(v.label)+'へ移動" transform="translate('+q.map(num).join(' ')+')"><circle class="map-hit" r="2" vector-effect="non-scaling-stroke"/><circle class="map-view" r="2.5"/></g>');}
  parts.push('<g class="map-north"><path d="M260 31V11m0 0l-4 7m4-7l4 7"/><text x="260" y="44">北</text></g>');
  return{name,label:labels[name],map,views,svg:parts.join('')};
 }
 function marker(scene,state){
  const raw=scene.map.point(state.position),x=Math.max(9,Math.min(W-9,raw[0])),y=Math.max(9,Math.min(H-9,raw[1])),outside=x!==raw[0]||y!==raw[1],d=direction(state.direction),length=Math.hypot(d[0],d[1]);
  const heading=length>.015?Math.atan2(d[0],d[1])*180/Math.PI:null;
  return{raw,position:[x,y],outside,heading,focus:state.orbit?scene.map.point(state.orbit.target):null,height:state.position[2]};
 }
 function mount(doc,nav,data,actions={}){
  const get=id=>doc.getElementById(id),choice=get('map-choice'),toggle=get('map-toggle'),body=get('map-body'),svg=get('map-svg'),feedback=get('map-feedback'),cache={},pointers=new Set();
  let last=null,current=null,folded=false,gesture=null,released=null,pointerAttempt=false,epoch=0;
  const stop=e=>e.stopPropagation();
  const clearHover=()=>get('map-hover').setAttribute('display','none');
  function reset(){gesture=null;released=null;pointers.clear();clearHover();}
  function eligible(){return !folded&&!!current&&!!last&&typeof actions.select==='function'&&actions.canSelect();}
  function jump(v,pointer=false){
   if(!eligible())return;
   if(!v){feedback.textContent='近くに視点がありません';return;}
   const walkPoint=current.name==='park'&&(v.chunk||'park')==='park'?(v.walkPoint||v.position):null;
   const landing=walkPoint&&root.OkuraCore.nearestWalkable(nav,walkPoint,MAX_DISTANCE.park,!pointer);
   if(walkPoint&&!landing){feedback.textContent='近くに歩ける園路・広場がありません';return;}
   feedback.textContent='';actions.select(v.id,{focusScene:pointer,walkPoint:landing?landing.position:null});
  }
  const atEvent=e=>{
   const p=clientPoint(svg.getBoundingClientRect(),e.clientX,e.clientY);if(!p||!current)return null;
   const v=nearest(current,nav,p.point,p.scale);if(current.name!=='park')return v;
   const world=current.map.unproject(p.point);
   // The two entrance targets retain their original building selection.
   if(v&&(v.chunk||'park')!=='park'&&Math.hypot(world[0]-v.position[0],world[1]-v.position[1])*current.map.scale*p.scale<=HIT_RADIUS_PX)return v;
   const hit=v&&Math.hypot(world[0]-v.position[0],world[1]-v.position[1])*current.map.scale*p.scale<=HIT_RADIUS_PX;
   const landing=root.OkuraCore.nearestWalkable(nav,world,MAX_DISTANCE.park,!!hit);if(!landing)return null;
   const anchor=current.views.filter(v=>(v.chunk||'park')==='park').reduce((best,v)=>!best||Math.hypot(world[0]-v.position[0],world[1]-v.position[1])<Math.hypot(world[0]-best.position[0],world[1]-best.position[1])?v:best,null);
   return anchor&&{...anchor,position:landing.position,walkPoint:landing.position};
  };
  function targetView(e){const t=e.target.closest&&e.target.closest('[data-view]');return t&&current&&current.views.find(v=>v.id===t.dataset.view);}
  const draw=state=>{
   if(!state||!state.view)return;
   if(last&&last.view!==state.view){reset();epoch++;feedback.textContent='';}last=state;
   const name=area(nav,data,state,choice.value||'auto');
   get('map-hint').textContent=name==='park'?'地図を押すと近くの園路・広場へ':'地図を押すと近くの視点へ';
   if(!current||current.name!==name){
    const heldFocus=svg.contains(doc.activeElement);reset();epoch++;
    current=cache[name]||(cache[name]=scene(nav,data,name));get('map-drawing').innerHTML=current.svg;get('map-title').textContent=current.label;get('minimap').dataset.area=name;
    if(heldFocus)svg.focus({preventScroll:true});
   }
   const m=marker(current,state),point=get('map-marker'),arrow=get('map-direction'),focus=get('map-focus');
   point.setAttribute('transform','translate('+m.position.map(num).join(' ')+')');point.setAttribute('class',m.outside?'map-marker map-outside':'map-marker');
   arrow.setAttribute('display',m.heading===null?'none':'inline');arrow.setAttribute('transform','rotate('+num(m.heading||0)+')');
   focus.setAttribute('display',m.focus?'inline':'none');if(m.focus)focus.setAttribute('transform','translate('+m.focus.map(num).join(' ')+')');
   const note=(m.outside?'視点は地図の外':'現在位置')+(state.orbit?' · ＋は見ている中心':state.station?' · 梯子の'+(state.station.mode==='top'?'上':state.station.mode==='up'?'上り':'下り'):'');
   get('map-note').textContent=note;svg.setAttribute('aria-label',current.label+'の略図。'+note+'。北が上。');
   get('minimap').dataset.outside=String(m.outside);
  };
  svg.addEventListener('pointerdown',e=>{
   stop(e);released=null;pointerAttempt=true;pointers.add(e.pointerId);
   if(eligible()&&pointers.size===1&&(e.button===0||e.button===undefined)&&!e.ctrlKey&&!e.metaKey)gesture={id:e.pointerId,x:e.clientX,y:e.clientY,epoch,invalid:false};else gesture=null;
  });
  svg.addEventListener('pointermove',e=>{
   stop(e);
   if(gesture&&gesture.id===e.pointerId&&Math.hypot(e.clientX-gesture.x,e.clientY-gesture.y)>DRAG_LIMIT_PX)gesture.invalid=true;
   clearHover();
   if(e.pointerType!=='touch'&&eligible()&&(!gesture||!gesture.invalid)){
    const v=atEvent(e);if(v){get('map-hover').setAttribute('transform','translate('+current.map.point(v.position).map(num).join(' ')+')');get('map-hover').setAttribute('display','inline');}
   }
  });
  svg.addEventListener('pointerup',e=>{
   stop(e);released=gesture&&gesture.id===e.pointerId&&!gesture.invalid&&Math.hypot(e.clientX-gesture.x,e.clientY-gesture.y)<=DRAG_LIMIT_PX&&pointers.size===1&&gesture.epoch===epoch?{epoch}:null;
   pointers.delete(e.pointerId);gesture=null;
  });
  svg.addEventListener('pointercancel',e=>{stop(e);reset();});
  // Touch can leave and release implicit capture between pointerup and click. Keep a completed tap.
  for(const type of ['lostpointercapture','pointerleave'])svg.addEventListener(type,e=>{stop(e);clearHover();if(pointers.size)reset();});
  svg.addEventListener('click',e=>{
   stop(e);e.preventDefault();const tap=released,wasPointer=pointerAttempt;released=null;pointerAttempt=false;
   if(tap&&tap.epoch===epoch)jump(atEvent(e),true);
   else if(!wasPointer&&e.detail===0){const v=targetView(e);if(v)jump(v);} // Assistive activation has no pointer sequence.
  });
  svg.addEventListener('keydown',e=>{
   stop(e); // Map focus must not also operate the viewer's WASD/arrow handler.
   if(['Enter',' ','Spacebar'].includes(e.key)){
    e.preventDefault();reset();pointerAttempt=false;if(e.repeat)return;const v=targetView(e);if(v)jump(v);
   }
  });
  svg.addEventListener('contextmenu',e=>{stop(e);e.preventDefault();reset();});
  choice.addEventListener('change',()=>{reset();epoch++;feedback.textContent='';draw(last);});
  toggle.addEventListener('click',()=>{reset();epoch++;folded=!folded;body.hidden=folded;toggle.setAttribute('aria-expanded',String(!folded));toggle.textContent=folded?'開く':'たたむ';});
  if(root.addEventListener)root.addEventListener('blur',()=>{reset();pointerAttempt=false;});
  return{update:draw,get state(){return last&&current?{area:current.name,choice:choice.value||'auto',folded,...marker(current,last)}:null;}};
 }

 const api={toWorld,toLocal,direction,area,projection,candidates,clientPoint,nearest,scene,marker,mount};
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.OkuraMinimap=api;
})(typeof window==='object'?window:globalThis);
