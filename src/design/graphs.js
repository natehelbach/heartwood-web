// Dot-chart renderer from the design's ui_kits/heartwood-tool/graphs.js (window.HWGraph.render).
// render(graph, { ink, dotSize }) returns { svg, W, H }: SVG markup for a viewBox of W x H.
// (One no-op line from the original, `bu._gap=gap`, is dropped: it throws in strict-mode modules.)
function nice(max){if(max<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(max))),f=max/p;return(f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p}
function niceStep(span){if(span<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(span))),f=span/p;return(f<=1?1:f<=2?2:f<=5?5:10)*p}
const fmtN=(v,sx)=>(Math.abs(v)>=1000?Math.round(v).toLocaleString():(+v.toFixed(2)).toLocaleString())+(sx||'');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
export function render(g,o){
 g.series.forEach(se=>{se.values=se.values.map(v=>v==null||v===''?NaN:+v)});
 const W=1000,H=g.aspect==='wide'?562:1000,ink=o.ink,mono=(sz,fill,extra='')=>`font-family="PP Right Serif Mono, monospace" font-size="${sz}" fill="${fill}" ${extra}`;
 const ser=g.series.filter(s=>s.on),cats=g.categories,nC=cats.length,dots=[];let s='';
 const rot=nC>8&&!g.tickEvery,L=g.style==='hbars'?220:90,R=g.labelsOut?120:g.style==='combo'?100:50,T=g.aspect==='wide'?130:170,B=H-(rot?120:95);
 if(g.title)s+=`<text x="${L-20>40?40:L}" y="${g.aspect==='wide'?52:70}" ${mono(g.aspect==='wide'?22:26,ink)}>${esc(g.title.toUpperCase())}</text>`;
 let lx=40;ser.forEach(se=>{const ly=g.aspect==='wide'?88:112;s+=`<circle cx="${lx+7}" cy="${ly-5}" r="7" fill="${se.color}"/><text x="${lx+22}" y="${ly}" ${mono(14,ink)}>${esc(se.name.toUpperCase())}</text>`;lx+=se.name.length*9+56});
 if(g.source)s+=`<text x="40" y="${H-22}" ${mono(12,ink,'fill-opacity=".7"')}>${esc(g.source.toUpperCase())}</text>`;
 if(!ser.length||!nC)return{svg:s,dots,W,H};
 const plotW=W-L-R,plotH=B-T,dr=f=>(f*o.dotSize/100).toFixed(2);
 const catLabel=(x,y,t)=>rot?`<text transform="translate(${x},${y}) rotate(45)" ${mono(13,ink)}>${esc(t)}</text>`:`<text x="${x}" y="${y+6}" text-anchor="middle" ${mono(13,ink)}>${esc(t)}</text>`;
 const barSer=g.style==='combo'?ser.slice(0,1):g.style==='lines'?[]:ser,lineSer=g.style==='combo'?ser.slice(1):g.style==='lines'?ser:[];
 if(g.style==='hbars'){
  const per=barSer.length*2+1,gap=Math.min(18,plotH/(nC*per)),colsAvail=Math.floor(plotW/gap),mx=Math.max(...barSer.flatMap(x=>x.values.filter(v=>!isNaN(v))),1),u=g.unit||Math.max(1e-9,nice(mx/(colsAvail*2)));
  cats.forEach((c,i)=>{const y0=T+i*per*gap;s+=`<text x="${L-14}" y="${y0+gap*(per-1)/2+4}" text-anchor="end" ${mono(12,ink)}>${esc(String(c).toUpperCase())}</text>`;
   barSer.forEach((se,j)=>{const n=Math.max(0,Math.round((se.values[i]||0)/u));for(let k=0;k<n;k++){const x=L+Math.floor(k/2)*gap+gap/2,y=y0+(j*2+k%2)*gap+gap/2;dots.push([x,y,se.color]);s+=`<circle cx="${x}" cy="${y}" r="${dr(gap*.38)}" fill="${se.color}"/>`}})});
  {const cap=colsAvail*2*u,st=niceStep(cap/4);for(let t=0,tv=0;tv<=cap+1e-9;t++,tv=st*t){const x=L+tv/(2*u)*gap;s+=`<line x1="${x}" y1="${T-6}" x2="${x}" y2="${B}" stroke="${ink}" stroke-opacity="${t?0.12:0.5}"/><text x="${x}" y="${T-14}" text-anchor="middle" ${mono(12,ink)}>${fmtN(tv,g.suffix)}</text>`}}
  s+=`<text x="${W-R}" y="${H-22}" text-anchor="end" ${mono(12,ink,'fill-opacity=".7"')}>1 DOT = ${fmtN(u,g.suffix)}</text>`;return{svg:s,dots,W,H}}
 const gw=plotW/nC,xAt=i=>L+gw*(i+.5);
 // gridlines + left axis (lines domain if lines exist, else bar domain)
 let bu=1,rows=1;const cols=3;
 if(barSer.length){const gap=Math.min(18,gw*.8/(barSer.length*cols+(barSer.length-1)*.6));rows=Math.floor(plotH/gap);const mx=Math.max(...barSer.flatMap(x=>x.values.filter(v=>!isNaN(v))),1);bu=g.unit||Math.max(1e-9,nice(mx/(rows*cols)));
  const bw=cols*gap,groupW=barSer.length*bw+(barSer.length-1)*gap*.6;
  cats.forEach((c,i)=>{barSer.forEach((se,j)=>{const n=Math.max(0,Math.round((se.values[i]||0)/bu)),x0=xAt(i)-groupW/2+j*(bw+gap*.6);for(let k=0;k<n;k++){const x=x0+(k%cols)*gap+gap/2,y=B-Math.floor(k/cols)*gap-gap/2;dots.push([x,y,se.color]);s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${dr(gap*.4)}" fill="${se.color}"/>`};if(g.barLabels&&!isNaN(se.values[i])){const ty=B-Math.ceil(n/cols)*gap-12,tx=x0+bw/2,lab=(g.barText&&g.barText[i])||fmtN(se.values[i],g.suffix);s+=`<text x="${tx}" y="${ty}" text-anchor="middle" ${mono(18,ink)}>${esc(lab)}</text>`}})});
  var barGap=gap}
 let lmin=0,lmax=1,lstep=1;if(lineSer.length){const all=lineSer.flatMap(x=>x.values.filter(v=>!isNaN(v))),mn=Math.min(...all),mx=Math.max(...all);
  if(g.zero!=='zero'&&mn>0&&mn/mx>.5){lstep=niceStep((mx-mn)/6);lmin=Math.floor(mn/lstep)*lstep-lstep;lmax=Math.ceil(mx/lstep)*lstep+lstep}
  else{lmin=Math.min(0,mn);lmax=Math.max(0,mx);lstep=niceStep((lmax-lmin)/5);lmin=Math.floor(lmin/lstep)*lstep;lmax=Math.ceil(lmax/lstep)*lstep;if(lmax<=lmin)lmax=lmin+lstep}}
 const yL=v=>B-(v-lmin)/(lmax-lmin)*plotH,fmtL=v=>(+v.toFixed(1)).toLocaleString()+(g.suffix||'');
 const fIdx=g.forecastFrom?cats.findIndex(c=>String(c).trim()===String(g.forecastFrom).trim()):-1,fx=fIdx>=0?xAt(fIdx):Infinity;
 if(fIdx>=0){s=`<rect x="${fx}" y="${T}" width="${W-R-fx}" height="${B-T}" fill="${ink}" fill-opacity=".07"/><line x1="${fx}" y1="${T}" x2="${fx}" y2="${B}" stroke="${ink}" stroke-opacity=".5" stroke-dasharray="4 4"/>`+s;
  s+=`<text x="${fx+10}" y="${T+22}" ${mono(13,ink)}>${esc((g.forecastLabel||'FORECASTED').toUpperCase())}</text>`}
 if(lineSer.length)for(let t=0,v=lmin;v<=lmax+1e-9;t++,v=lmin+lstep*t){const y=yL(v);s=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${ink}" stroke-opacity="${t?0.18:0.6}"/>`+s;s+=`<text x="${L-12}" y="${y+4}" text-anchor="end" ${mono(13,ink)}>${fmtN(v,g.suffix)}</text>`}
 if(barSer.length){const cap=rows*cols*bu,st=niceStep(cap/4);
  for(let t=0,v=0;v<=cap+1e-9;t++,v=st*t){const y=B-(v/(cols*bu))*barGap;
   if(!lineSer.length)s=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${ink}" stroke-opacity="${t?0.18:0.6}"/>`+s;
   s+=`<text x="${lineSer.length?W-R+12:L-12}" y="${y+4}" text-anchor="${lineSer.length?'start':'end'}" ${mono(13,ink)}>${fmtN(v,lineSer.length?'':g.suffix)}</text>`}}
 if(lmin<0&&lineSer.length){const y0=yL(0);s+=`<line x1="${L}" y1="${y0}" x2="${W-R}" y2="${y0}" stroke="#BC532D" stroke-dasharray="2 4" stroke-width="1.5"/>`}
 const ends=[];lineSer.forEach(se=>{
  const K=se.values.map((v,i)=>isNaN(v)?null:{x:xAt(i),y:yL(v),v,i}).filter(Boolean);if(!K.length)return;
  let dense;if(g.curve==='straight')dense=K.map(k=>[k.x,k.y]);else{dense=[];for(let j=0;j<K.length-1;j++){const p0=K[j-1]||K[j],p1=K[j],p2=K[j+1],p3=K[j+2]||K[j+1];
   for(let u=0;u<1;u+=.05){const u2=u*u,u3=u2*u,cr=(a,b,c,d)=>.5*(2*b+(-a+c)*u+(2*a-5*b+4*c-d)*u2+(-a+3*b-3*c+d)*u3);dense.push([cr(p0.x,p1.x,p2.x,p3.x),cr(p0.y,p1.y,p2.y,p3.y)])}}
   dense.push([K[K.length-1].x,K[K.length-1].y])}
  const sp=Math.max(5,12*o.dotSize/100),lr=dr(3.6);const put=(x,y)=>{s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${lr}" fill="${se.color}"${x>fx+.5?' fill-opacity=".55"':''}/>`;dots.push([x,y,se.color])};
  let carry=0;for(let i=1;i<dense.length;i++){const a=dense[i-1],b=dense[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(!len)continue;let t=carry;while(t<=len){put(a[0]+(b[0]-a[0])*t/len,a[1]+(b[1]-a[1])*t/len);t+=sp}carry=t-len}
  const last=dense[dense.length-1];if(dense.length===1||carry>sp*.4)put(last[0],last[1]);
  const pick=new Set(),lm=g.labelsOut?'last':g.labels&&g.labels!=='auto'?g.labels:(K.length<=12?'all':'ends');if(lm==='last')pick.add(K[K.length-1]);else if(lm==='all')K.forEach(k=>pick.add(k));else if(lm!=='none'){pick.add(K[0]);pick.add(K[K.length-1]);if(fIdx>=0){const pre=K.filter(k=>k.i<fIdx).pop();if(pre)pick.add(pre)}}
  pick.forEach(k=>ends.push(g.labelsOut?{x:W-R+14,y:k.y+5,t:fmtL(k.v),c:se.color,out:1}:{x:k.x,y:k.y-16,t:fmtL(k.v),c:se.color}))});
 ends.sort((a,b)=>a.y-b.y);for(let i=1;i<ends.length;i++)for(let j=0;j<i;j++)if(Math.abs(ends[i].x-ends[j].x)<60&&Math.abs(ends[i].y-ends[j].y)<22)ends[i].y=ends[j].y+22;
 ends.forEach(e=>{const r=!e.out&&e.x>W-R-50,l=e.out||e.x<L+40;s+=`<text x="${e.out?e.x:r?e.x-12:l?e.x+4:e.x}" y="${e.y}" text-anchor="${r?'end':l?'start':'middle'}" ${mono(16,e.c)}>${e.t}</text>`});
 cats.forEach((c,i)=>{if(g.tickEvery&&i%g.tickEvery)return;s+=catLabel(xAt(i)-(rot&&!g.tickEvery?6:0),B+26,String(c).toUpperCase())});
 if(barSer.length)s+=`<text x="${W-R}" y="${H-22}" text-anchor="end" ${mono(12,ink,'fill-opacity=".7"')}>1 DOT = ${fmtN(bu,lineSer.length?'':g.suffix)}</text>`;
 return{svg:s,dots,W,H}}
