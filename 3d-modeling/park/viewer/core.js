/* Map30: shared map coordinates/terrain; original building grids remain unchanged. */
(function(root){'use strict';
 function seg(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);}
 function inside(p,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
 function local(site,n,x,y){const t=site.buildings[n],a=-t.rotation_deg*Math.PI/180,dx=x-t.translation[0],dy=y-t.translation[1];return[Math.cos(a)*dx-Math.sin(a)*dy,Math.sin(a)*dx+Math.cos(a)*dy];}
 function terrain(x,y,site){const m=site.calibration.world_to_pixel,v=m[1][0]*x+m[1][1]*y+m[1][2];let h=-.04+Math.min(8,Math.max(0,(440-v)/40));for(const[poly,level,falloff]of[[site.zones.find(z=>z.id==='free').polygon,2,8],[site.water.find(w=>w.id==='head_pool').polygon,6.8,4]]){const d=inside([x,y],poly)?0:Math.min(...poly.map((a,i)=>seg([x,y],a,poly[(i+1)%poly.length])));let w=Math.max(0,1-d/falloff);w=w*w*(3-2*w);h=h*(1-w)+level*w;}for(const[n,b]of[['rest',[-3,22,-7,14]],['management',[-3,20,-7,21]]]){const[a,c]=local(site,n,x,y),dist=Math.hypot(Math.max(b[0]-a,0,a-b[1]),Math.max(b[2]-c,0,c-b[3]));let w=Math.max(0,1-dist/12);w=w*w*(3-2*w);h=h*(1-w)+(site.buildings[n].translation[2]-.04)*w;}return h;}
 function water(site,x,y){return site.water.some(w=>inside([x,y],w.polygon))||site.stream.points.slice(1).some((p,i)=>seg([x,y],site.stream.points[i],p)<site.stream.width/2);}
 function legacyTerrain(x,y){return -.04+Math.max(0,y-20)*.045+Math.max(0,-y-62)*.013;}
 function legacyGround(nav,x,y){
  for(const [name,b]of Object.entries(nav.buildings)){
   const a=-b.transform.rotation_deg*Math.PI/180,dx=x-b.transform.translation[0],dy=y-b.transform.translation[1],xx=Math.cos(a)*dx-Math.sin(a)*dy,yy=Math.sin(a)*dx+Math.cos(a)*dy,g=b.grid,ix=Math.round((xx-g.origin[0])/g.step),iy=Math.round((yy-g.origin[1])/g.step);
   if(ix>=0&&iy>=0&&ix<g.width&&iy<g.height){const h=g.heights[iy*g.width+ix];return h===null?null:{height:h+b.transform.translation[2],chunk:name};}
  }
  if(((x+22)/12)**2+((y-45)/17)**2<1.15)return null;
  for(const f of nav.site.facilities)if(Math.abs(x-f.position[0])<f.size[0]/2+.2&&Math.abs(y-f.position[1])<f.size[1]/2+.2)return null;
  for(const p of nav.site.paths)for(let i=1;i<p.points.length;i++)if(seg([x,y],p.points[i-1],p.points[i])<p.width/2-.18)return {height:legacyTerrain(x,y)+.035,chunk:'park'};
  for(const z of nav.site.zones)if(((x-z.center[0])/z.radii[0])**2+((y-z.center[1])/z.radii[1])**2<.92)return {height:legacyTerrain(x,y)+.04,chunk:'park'};
  return null;
 }
 function mappedGround(nav,x,y){
  if(nav.site.revision<30)return legacyGround(nav,x,y);
  for(const[name,b]of Object.entries(nav.buildings)){const[xx,yy]=local(nav.site,name,x,y),g=b.grid,ix=Math.round((xx-g.origin[0])/g.step),iy=Math.round((yy-g.origin[1])/g.step);if(ix>=0&&iy>=0&&ix<g.width&&iy<g.height){const h=g.heights[iy*g.width+ix];if(h!==null)return{height:h+b.transform.translation[2],chunk:name};const envelope=name==='rest'?[-.3,18.5,-.3,11.2]:[-.3,16.5,-.3,18];if(xx>envelope[0]&&xx<envelope[1]&&yy>envelope[2]&&yy<envelope[3])return null;}}
  for(const f of nav.site.facilities){const a=-f.rotation_deg*Math.PI/180,dx=x-f.position[0],dy=y-f.position[1],xx=dx*Math.cos(a)-dy*Math.sin(a),yy=dx*Math.sin(a)+dy*Math.cos(a);if(Math.abs(xx)<f.size[0]/2+.2&&Math.abs(yy)<f.size[1]/2+.2)return null;}
  for(const p of nav.site.paths)for(let i=1;i<p.points.length;i++)if(seg([x,y],p.points[i-1],p.points[i])<p.width/2-.18){if(water(nav.site,x,y)&&p.type!=='bridge')return null;return{height:terrain(x,y,nav.site)+.035,chunk:'park'};}
  if(water(nav.site,x,y))return null;
  for(const z of nav.site.zones)if(inside([x,y],z.polygon))return{height:terrain(x,y,nav.site)+.04,chunk:'park'};
  return null;
 }
 function step(nav,position,dx,dy){let[x,y,z]=position;const parts=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.025));let last=ground(nav,x,y);if(!last)return position.slice();for(let i=0;i<parts;i++)for(const[sx,sy]of[[dx/parts,0],[0,dy/parts]]){const xx=x+sx,yy=y+sy,next=ground(nav,xx,yy);if(next&&Math.abs(next.height-last.height)<.22){x=xx;y=yy;last=next;}}return[x,y,last.height+nav.eye_height];}
 function decode(data){const text=atob(data),bytes=new Uint8Array(text.length);for(let i=0;i<text.length;i++)bytes[i]=text.charCodeAt(i);return bytes.buffer;}
 // §49: only solid obstacles, water and the park boundary limit outdoor walking.
 const spatialCache=new WeakMap();
 function obstacleData(nav){
  let data=spatialCache.get(nav);if(data)return data;
  const outdoor=nav.outdoor||{},polygons=(outdoor.polygons||[]).slice(),trees=new Map();
  for(const f of nav.site.facilities){const a=f.rotation_deg*Math.PI/180,c=Math.cos(a),s=Math.sin(a);polygons.push({id:f.id,margin:.2,polygon:[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>[f.position[0]+x*f.size[0]/2*c-y*f.size[1]/2*s,f.position[1]+x*f.size[0]/2*s+y*f.size[1]/2*c])});}
  for(const t of outdoor.trees||[]){const [x,y]=t.center,r=t.radius;for(let ix=Math.floor((x-r)/4);ix<=Math.floor((x+r)/4);ix++)for(let iy=Math.floor((y-r)/4);iy<=Math.floor((y+r)/4);iy++){const k=ix+','+iy;if(!trees.has(k))trees.set(k,[]);trees.get(k).push(t);}}
  data={polygons,trees};spatialCache.set(nav,data);return data;
 }
 function nearPolygon(p,poly,margin=0){return inside(p,poly)||(margin>0&&poly.some((a,i)=>seg(p,a,poly[(i+1)%poly.length])<=margin));}
 function inBuilding(nav,x,y){
  for(const [name,b]of Object.entries(nav.buildings))if(b.footprint&&nearPolygon(local(nav.site,name,x,y),b.footprint,.16))return name;
  return null;
 }
 function outdoorBlocked(nav,x,y){
  const {polygons,trees}=obstacleData(nav);
  return polygons.some(p=>nearPolygon([x,y],p.polygon,p.margin))||(trees.get(Math.floor(x/4)+','+Math.floor(y/4))||[]).some(t=>Math.hypot(x-t.center[0],y-t.center[1])<=t.radius);
 }
 function onPath(nav,x,y){return nav.site.paths.some(p=>p.points.slice(1).some((b,i)=>seg([x,y],p.points[i],b)<p.width/2-.18));}
 function withinGround(nav,x,y){return inside([x,y],nav.site.boundary)||onPath(nav,x,y);}
 function onBridge(nav,x,y){return nav.site.paths.some(p=>p.type==='bridge'&&p.points.slice(1).some((b,i)=>seg([x,y],p.points[i],b)<p.width/2-.18));}
 function ground(nav,x,y){
  if(!nav.outdoor)return mappedGround(nav,x,y);
  if(!Number.isFinite(x)||!Number.isFinite(y)||!withinGround(nav,x,y)||outdoorBlocked(nav,x,y))return null;
  if(water(nav.site,x,y)&&!onBridge(nav,x,y))return null;
  const building=inBuilding(nav,x,y);
  for(const [name,b]of Object.entries(nav.buildings)){
   const [xx,yy]=local(nav.site,name,x,y),g=b.grid,ix=Math.round((xx-g.origin[0])/g.step),iy=Math.round((yy-g.origin[1])/g.step);
   if(ix>=0&&iy>=0&&ix<g.width&&iy<g.height){const h=g.heights[iy*g.width+ix];if(h!==null)return{height:h+b.transform.translation[2],chunk:name};}
   if(building===name)return null;
  }
  // Preserve path heights; paths no longer gate outdoor walkability.
  return{height:terrain(x,y,nav.site)+(onPath(nav,x,y)?.035:.04),chunk:'park'};
 }
 function nearestWalkable(nav,point,maxDistance,allowOutside=false){
  if(!Array.isArray(point)||point.length<2||!point.slice(0,2).every(Number.isFinite)||(maxDistance!==undefined&&(!Number.isFinite(maxDistance)||maxDistance<0)))return null;
  const boundary=nav.site.boundary;if(!allowOutside&&!withinGround(nav,...point))return null;
  const candidates=[];
  function landing(p){
   if(inBuilding(nav,...p))return null;
   const g=ground(nav,...p);if(!g)return null;
   const distance=Math.hypot(p[0]-point[0],p[1]-point[1]);if(maxDistance!==undefined&&distance>maxDistance)return null;
   const position=[...p,g.height+nav.eye_height];
   if(![[.15,0],[-.15,0],[0,.15],[0,-.15]].some(d=>{const q=step(nav,position,...d);return Math.hypot(q[0]-p[0],q[1]-p[1])>.1;}))return null;
   return{position,chunk:g.chunk,distance};
  }
  const direct=landing(point.slice(0,2));if(direct)return direct;
  function add(p){const d=Math.hypot(p[0]-point[0],p[1]-point[1]);if(maxDistance===undefined||d<=maxDistance)candidates.push({p,d});}
  function project(a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((point[0]-a[0])*dx+(point[1]-a[1])*dy)/(dx*dx+dy*dy||1)));return[a[0]+t*dx,a[1]+t*dy];}
  function edge(a,b,r){const p=project(a,b);for(let k=0;k<16;k++)add([p[0]+r*Math.cos(k*Math.PI/8),p[1]+r*Math.sin(k*Math.PI/8)]);}
  const polygons=[{polygon:boundary,margin:.05},...nav.site.water.map(w=>({polygon:w.polygon,margin:.05})),...obstacleData(nav).polygons];
  for(const [name,b]of Object.entries(nav.buildings)){
   const t=nav.site.buildings[name],a=t.rotation_deg*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
   polygons.push({polygon:b.footprint.map(([x,y])=>[t.translation[0]+x*c-y*s,t.translation[1]+x*s+y*c]),margin:.2});
  }
  for(const p of polygons)for(let i=0;i<p.polygon.length;i++)edge(p.polygon[i],p.polygon[(i+1)%p.polygon.length],(p.margin||0)+.2);
  for(let i=1;i<nav.site.stream.points.length;i++)edge(nav.site.stream.points[i-1],nav.site.stream.points[i],nav.site.stream.width/2+.2);
  for(const t of nav.outdoor.trees){const a=Math.atan2(point[1]-t.center[1],point[0]-t.center[0]);for(let k=0;k<8;k++)add([t.center[0]+(t.radius+.2)*Math.cos(a+k*Math.PI/4),t.center[1]+(t.radius+.2)*Math.sin(a+k*Math.PI/4)]);}
  candidates.sort((a,b)=>a.d-b.d);
  for(const c of candidates){const result=landing(c.p);if(result)return result;}
  return null;
 }
 const api={seg,inside,terrain,ground,step,decode,water,nearestWalkable,inBuilding,outdoorBlocked,onBridge,onPath,withinGround};root.OkuraCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
