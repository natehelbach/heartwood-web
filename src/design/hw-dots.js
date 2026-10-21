// <hw-dots mode="rings|ring|scatter">, ported verbatim from the design's ui_kits/website/hw-dots.js.
(function(){
if (customElements.get('hw-dots')) return;
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function gauss(r){return (r()+r()+r()-1.5)/1.5;}
class HWDots extends HTMLElement{
  static get observedAttributes(){return ['mode','count','color','seed','spread','size'];}
  connectedCallback(){
    Object.assign(this.style,{display:'block',position:'absolute',inset:'0',pointerEvents:'none',overflow:'hidden'});
    if(!this.canvas){this.canvas=document.createElement('canvas');Object.assign(this.canvas.style,{width:'100%',height:'100%',display:'block'});this.appendChild(this.canvas);}
    this.reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ro=new ResizeObserver(()=>this.layout());this.ro.observe(this);
    this.io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&this.t0==null)this.t0=performance.now();},{threshold:.2});this.io.observe(this);
    // Heartwood change: skip drawing while the element is well off-screen (the design draws every frame).
    this.vio=new IntersectionObserver(es=>{this.vis=es.some(e=>e.isIntersecting);},{rootMargin:'200px'});this.vio.observe(this);this.vis=true;
    this._fb=setTimeout(()=>{if(this.t0==null)this.t0=performance.now();},1500);
    var loop=t=>{if(this.vis)this.draw(t);this.raf=requestAnimationFrame(loop);};this.raf=requestAnimationFrame(loop);
    this.layout();this._lt=setTimeout(()=>{this.layout();this.draw(performance.now());},100);
  }
  disconnectedCallback(){cancelAnimationFrame(this.raf);clearTimeout(this._fb);clearTimeout(this._lt);this.ro&&this.ro.disconnect();this.io&&this.io.disconnect();this.vio&&this.vio.disconnect();}
  attributeChangedCallback(){this.layout();}
  get opts(){return{mode:this.getAttribute('mode')||this.mode||'ring',count:+(this.getAttribute('count')||this.count||240),color:this.getAttribute('color')||this.color||'#C5DCEA',seed:+(this.getAttribute('seed')||this.seed||7),spread:+(this.getAttribute('spread')||.09),size:+(this.getAttribute('size')||1)};}
  layout(){
    if(!this.canvas)return;var w=this.clientWidth,h=this.clientHeight;if(!w||!h)return;
    var dpr=Math.min(2,window.devicePixelRatio||1);this.canvas.width=w*dpr;this.canvas.height=h*dpr;this.dpr=dpr;this.w=w;this.h=h;
    var o=this.opts,r=rng(o.seed),R=Math.min(w,h)*(o.mode==='rings'?.48:.4),cx=w/2,cy=h/2,ax=o.mode==='rings'?1:1.08;this.ax=ax;
    this.dots=[];for(var i=0;i<o.count;i++){
      var a=r()*Math.PI*2,rr=R*(1+gauss(r)*o.spread);
      if(o.mode==='rings'){var q=r();if(q<.4)rr=R*.95*(1+gauss(r)*.05);else if(q<.68)rr=R*.68*(1+gauss(r)*.03);else if(q<.82)rr=R*.42*(1+gauss(r)*.03);else rr=R*.16*Math.sqrt(r());}
      var ring=o.mode==='ring'||o.mode==='rings';
      var tx=ring?cx+Math.cos(a)*rr*ax:r()*w,ty=ring?cy+Math.sin(a)*rr:r()*h;
      this.dots.push({sx:r()*w,sy:r()*h,tx:tx,ty:ty,a:a,rr:rr,d:r()*.45,ph:r()*6.28,sp:.4+r()*.8,s:(2.6+r()*1.6)*o.size});
    }
  }
  draw(t){
    if(!this.dots)return;var c=this.canvas.getContext('2d'),o=this.opts,dpr=this.dpr;
    c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,this.w,this.h);c.fillStyle=o.color;
    var el=this.t0==null?0:(t-this.t0)/1000,k=this.reduce?1:Math.min(1,el/3.2),rot=this.reduce?0:el*.015,cx=this.w/2,cy=this.h/2;
    for(var i=0;i<this.dots.length;i++){var p=this.dots[i];
      var ki=Math.max(0,Math.min(1,(k-p.d)/.55)),e=ki<.5?4*ki*ki*ki:1-Math.pow(-2*ki+2,3)/2;
      var tx=p.tx,ty=p.ty;if(o.mode==='ring'||o.mode==='rings'){var a=p.a+rot;tx=cx+Math.cos(a)*p.rr*this.ax;ty=cy+Math.sin(a)*p.rr;}
      var wob=this.reduce?0:3,x=p.sx+(tx-p.sx)*e+Math.sin(el*p.sp+p.ph)*wob,y=p.sy+(ty-p.sy)*e+Math.cos(el*p.sp*.8+p.ph)*wob;
      if(o.mode==='scatter'){x=p.sx+Math.sin(el*p.sp*.3+p.ph)*14;y=p.sy+Math.cos(el*p.sp*.25+p.ph)*10;}
      c.beginPath();c.arc(x,y,p.s,0,6.283);c.fill();}
  }
}
customElements.define('hw-dots',HWDots);
})();
