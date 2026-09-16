/* §43: north-up SVG map. Coordinates remain independent of the Three renderer. */
(function(root){
 'use strict';
 const labels={park:'公園全体',rest:'休憩棟',management:'管理棟'},W=280,H=224,PAD=21;
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
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=v=>Number(v.toFixed(3));
 function scene(nav,data,name){
  const floor=data.buildings[name],transform=nav.site.buildings[name];
  const world=p=>floor?toWorld(p,transform):p;
  const views=nav.views.filter(v=>(v.chunk||'park')===name&&!v.mode);
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
  for(const v of views)dot(v.position,'map-view',v.label);
  parts.push('<g class="map-north"><path d="M260 31V11m0 0l-4 7m4-7l4 7"/><text x="260" y="44">北</text></g>');
  return{name,label:labels[name],map,svg:parts.join('')};
 }
 function marker(scene,state){
  const raw=scene.map.point(state.position),x=Math.max(9,Math.min(W-9,raw[0])),y=Math.max(9,Math.min(H-9,raw[1])),outside=x!==raw[0]||y!==raw[1],d=direction(state.direction),length=Math.hypot(d[0],d[1]);
  const heading=length>.015?Math.atan2(d[0],d[1])*180/Math.PI:null;
  return{raw,position:[x,y],outside,heading,focus:state.orbit?scene.map.point(state.orbit.target):null,height:state.position[2]};
 }
 function mount(doc,nav,data){
  const get=id=>doc.getElementById(id),choice=get('map-choice'),toggle=get('map-toggle'),body=get('map-body'),cache={};
  let last=null,current=null,folded=false;
  const draw=state=>{
   if(!state||!state.view)return;last=state;
   const name=area(nav,data,state,choice.value||'auto');
   if(!current||current.name!==name){current=cache[name]||(cache[name]=scene(nav,data,name));get('map-drawing').innerHTML=current.svg;get('map-title').textContent=current.label;get('minimap').dataset.area=name;}
   const m=marker(current,state),point=get('map-marker'),arrow=get('map-direction'),focus=get('map-focus');
   point.setAttribute('transform','translate('+m.position.map(num).join(' ')+')');point.setAttribute('class',m.outside?'map-marker map-outside':'map-marker');
   arrow.setAttribute('display',m.heading===null?'none':'inline');arrow.setAttribute('transform','rotate('+num(m.heading||0)+')');
   focus.setAttribute('display',m.focus?'inline':'none');if(m.focus)focus.setAttribute('transform','translate('+m.focus.map(num).join(' ')+')');
   const note=(m.outside?'視点は地図の外':'現在位置')+(state.orbit?' · ＋は見ている中心':state.station?' · 梯子の'+(state.station.mode==='top'?'上':state.station.mode==='up'?'上り':'下り'):'');
   get('map-note').textContent=note;get('map-svg').setAttribute('aria-label',current.label+'の略図。'+note+'。北が上。');
   get('minimap').dataset.outside=String(m.outside);
  };
  choice.addEventListener('change',()=>draw(last));
  toggle.addEventListener('click',()=>{folded=!folded;body.hidden=folded;toggle.setAttribute('aria-expanded',String(!folded));toggle.textContent=folded?'開く':'たたむ';});
  return{update:draw,get state(){return last&&current?{area:current.name,choice:choice.value||'auto',folded,...marker(current,last)}:null;}};
 }
 const api={toWorld,toLocal,direction,area,projection,scene,marker,mount};
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.OkuraMinimap=api;
})(typeof window==='object'?window:globalThis);
