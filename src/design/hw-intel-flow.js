// <hw-intel-flow icons="A|B|C|D|E">, ported verbatim from the design's ui_kits/website/hw-intel-flow.js.
// Icons come from hw-icons.js (window.HW_ICONS), imported here instead of the design's script injection.
import './hw-icons.js'

(function () {
if (customElements.get('hw-intel-flow')) return;
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function gs(r){return (r()+r()+r()-1.5)/1.5;}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
function hex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
var C0=hex('#212121'),C1=hex('#C5DCEA'),C2=hex('#2697AA');
// [hold icons, to band, hold band, to charts, hold charts, back to icons]
var PH=[2.4,1.8,1.4,1.8,3.2,1.6],TOT=PH.reduce(function(a,b){return a+b;},0);
function cells(rows){var out=[],nn;if(typeof rows[0]==='string'){nn=Math.max(rows.length,rows[0].length);rows.forEach(function(row,y){for(var x=0;x<row.length;x++)if(row[x]==='#')out.push([x,y]);});}else{nn=25;rows.forEach(function(c){out.push([c[0],c[1]]);});}return{c:out,nn:nn};}
var CH={
  map:function(n,b,r){var p=[],cl=[[.28,.38],[.7,.3],[.52,.72]];for(var i=0;i<n;i++){if(r()<.75){var k=cl[i%3];p.push([b.x+b.w*(k[0]+gs(r)*.13),b.y+b.h*(k[1]+gs(r)*.16)]);}else p.push([b.x+b.w*(.06+r()*.88),b.y+b.h*(.06+r()*.88)]);}return p;},
  bars:function(n,b,r,d){var H=[.35,.55,.45,.8,.62,.95],sum=H.reduce(function(a,c){return a+c;},0),cols=2,rows=Math.max(3,Math.ceil(n/(cols*sum))),s=Math.min(b.h/rows,b.w/(H.length*3)),p=[],bw=b.w/H.length;
    var slots=[];H.forEach(function(h,i){var rr=Math.round(h*rows);for(var y=0;y<rr;y++)for(var c=0;c<cols;c++)slots.push([b.x+bw*(i+.5)+(c-.5)*s,b.y+b.h-s*(y+.5)]);});
    for(var j=0;j<n;j++)p.push(slots[j%slots.length]);return p;},
  line:function(n,b,r){var p=[];for(var i=0;i<n;i++){var t=i/(n-1),y=1/(1+Math.exp(-(t-.5)*9));p.push([b.x+b.w*(.04+t*.92),b.y+b.h*(.94-y*.86)+gs(r)*1.2]);}return p;},
  rings:function(n,b,r){var p=[],R=Math.min(b.w,b.h)*.48,cx=b.x+b.w/2,cy=b.y+b.h/2,n1=Math.round(n*.6);for(var i=0;i<n;i++){var outer=i<n1,k=outer?i/n1:(i-n1)/(n-n1),a=k*6.283+(outer?0:.3),rr=R*(outer?1:.6);p.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]);}return p;},
  trend:function(n,b,r){var p=[];for(var i=0;i<n;i++){var t=r();p.push([b.x+b.w*(.04+t*.92),b.y+b.h*(.9-t*.78+gs(r)*.12)]);}return p;}
};
var ORDER=['map','bars','line','rings','trend'];
class HWIntelFlow extends HTMLElement{
  connectedCallback(){
    Object.assign(this.style,{display:'block',position:'absolute',inset:'0',pointerEvents:'none'});
    if(!this.cv){this.cv=document.createElement('canvas');Object.assign(this.cv.style,{width:'100%',height:'100%',display:'block'});this.appendChild(this.cv);}
    this.reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ro=new ResizeObserver(()=>this.layout());this.ro.observe(this);
    this.vis=false;this.io=new IntersectionObserver(es=>{this.vis=es.some(e=>e.isIntersecting);if(this.vis&&this.t0==null)this.t0=performance.now();},{threshold:.15});this.io.observe(this);
    var loop=t=>{if(this.vis||this.t0==null)this.draw(t);this.raf=requestAnimationFrame(loop);};this.raf=requestAnimationFrame(loop);
    this._try=setInterval(()=>{if(!this.dots)this.layout();else clearInterval(this._try);},200);
  }
  disconnectedCallback(){cancelAnimationFrame(this.raf);clearInterval(this._try);this.ro&&this.ro.disconnect();this.io&&this.io.disconnect();}
  layout(){
    var host=this.closest('[data-intel]'),I=window.HW_ICONS;if(!host||!I)return;
    var w=this.clientWidth,h=this.clientHeight;if(!w||!h)return;
    var dpr=Math.min(2,devicePixelRatio||1);this.cv.width=w*dpr;this.cv.height=h*dpr;this.dpr=dpr;this.w=w;this.h=h;
    var me=this.getBoundingClientRect(),z=function(n){var e=host.querySelector('[data-zone="'+n+'"]');if(!e)return null;var b=e.getBoundingClientRect();return{x:b.left-me.left,y:b.top-me.top,w:b.width,h:b.height};};
    var zi=z('in'),zb=z('band'),zo=z('out');if(!zi||!zb||!zo)return;
    var names=(this.getAttribute('icons')||'MONEY|CONSTRUCTION|PEOPLE|THERMOSTAT|SOLAR ENERGY').split('|'),N=names.length,cw=zi.w/N,r=rng(+(this.getAttribute('seed')||7));
    var box=Math.min(cw*.62,zi.h*.92),dots=[],cellMin=99;
    names.forEach(function(nm,i){var ox=zi.x+cw*(i+.5)-box/2,oy=zi.y+zi.h/2-box/2;
      if(nm==='GRAPH'){var gb={x:ox,y:oy+box*.08,w:box,h:box*.84},H=[.3,.45,.4,.62,.78,1],cols=2,s=box/(6*3),rows=Math.max(6,Math.floor(box*.84/s)),bw=box/6;cellMin=Math.min(cellMin,s*.9);
        H.forEach(function(hh,bi){var rr=Math.max(1,Math.round(hh*rows));for(var y=0;y<rr;y++)for(var c=0;c<cols;c++)dots.push({a:[gb.x+bw*(bi+.5)+(c-.5)*s,gb.y+gb.h-s*(y+.5)],s:[ox+r()*box,oy+r()*box]});});return;}
      var rows=I[nm];if(!rows)return;var g=cells(rows),cell=box/g.nn;cellMin=Math.min(cellMin,cell);
      g.c.forEach(function(c){dots.push({a:[ox+(c[0]+.5)*cell,oy+(c[1]+.5)*cell]});});});
    if(!dots.length)return;
    var rad=Math.max(1.3,Math.min(3.2,cellMin*.36));this.rad=rad;
    var bx=zb.x+zb.w*.03,bw=zb.w*.94,by=zb.y+zb.h*.34,bh=zb.h*.56;
    dots.forEach(function(d){d.b=[bx+r()*bw,by+r()*bh];d.d=r()*.4;d.ph=r()*6.28;d.sp=.5+r()*.8;});
    var idx=dots.map(function(_,i){return i;});for(var i=idx.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=idx[i];idx[i]=idx[j];idx[j]=t;}
    var oc=zo.w/N,per=Math.ceil(dots.length/N);
    for(var k=0;k<N;k++){var grp=idx.slice(k*per,(k+1)*per);if(!grp.length)continue;var cb={x:zo.x+oc*k+oc*.14,y:zo.y+zo.h*.06,w:oc*.72,h:zo.h*.88},pts=CH[ORDER[k%ORDER.length]](grp.length,cb,r,rad);grp.forEach(function(di,q){dots[di].c=pts[q];});}
    this.dots=dots;this.draw(performance.now());
  }
  draw(now){
    if(!this.dots)return;var c=this.cv.getContext('2d');c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.w,this.h);
    var el=this.t0==null?0:(now-this.t0)/1000,T=this.reduce?PH[0]+PH[1]+PH[2]+PH[3]+.1:el%TOT,ph=0,acc=0;
    while(ph<PH.length-1&&T>acc+PH[ph]){acc+=PH[ph];ph++;}var u=(T-acc)/PH[ph];
    var R=this.rad;
    for(var i=0;i<this.dots.length;i++){var d=this.dots[i],P,Q,cp,cq,k;
      if(ph===0){if(d.s){P=d.s;Q=d.a;cp=cq=C0;k=Math.min(1,u*1.6);}else{P=Q=d.a;cp=cq=C0;k=0;}}
      else if(ph===1){P=d.a;Q=d.b;cp=C0;cq=C1;k=u;}
      else if(ph===2){P=Q=d.b;cp=cq=C1;k=0;}
      else if(ph===3){P=d.b;Q=d.c;cp=C1;cq=C2;k=u;}
      else if(ph===4){P=Q=d.c;cp=cq=C2;k=0;}
      else{P=d.c;Q=d.s||d.a;cp=C2;cq=C0;k=u;}
      var e=k===0?0:ease(Math.max(0,Math.min(1,(k-d.d)/.6)));
      var x=P[0]+(Q[0]-P[0])*e,y=P[1]+(Q[1]-P[1])*e;
      var inBand=ph===2||(ph===1&&e>.98)||(ph===3&&e<.02);if(inBand&&!this.reduce){x+=Math.sin(el*d.sp+d.ph)*6;y+=Math.cos(el*d.sp*.8+d.ph)*4;}
      c.fillStyle='rgb('+Math.round(cp[0]+(cq[0]-cp[0])*e)+','+Math.round(cp[1]+(cq[1]-cp[1])*e)+','+Math.round(cp[2]+(cq[2]-cp[2])*e)+')';
      c.beginPath();c.arc(x,y,R,0,6.283);c.fill();}
  }
}
customElements.define('hw-intel-flow',HWIntelFlow);
})();
