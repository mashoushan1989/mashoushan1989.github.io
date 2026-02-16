import{g as p,_ as f}from"./index-BjTrO-dv.js";import{w as y,m as h,o as g,l as b,a as k,r as v,q as w}from"./firebase-social-BPKIZFls.js";import"./firebase-r9EULPQu.js";let a,c;const d=(e,s,t)=>{const i=document.createElement(e);return s&&(i.className=s),i};function T(e,s,t,i){g(e);const o=(s||[]).map(n=>setTimeout(()=>{n.type==="text"?b(n.text,n.textColor||"#FFD700"):k({x:n.x,y:n.y,type:n.fireworkType,color:n.color,size:n.size})},(n.time||0)*1e3));return o.push(setTimeout(()=>i==null?void 0:i(),(t||8)*1e3+1500)),()=>{o.forEach(clearTimeout),w()}}function C(){f(()=>import("https://cdn.jsdelivr.net/npm/canvas-confetti@1/+esm"),[]).then(e=>e.default({particleCount:100,spread:80})).catch(()=>{})}function L(e){const s=Math.abs(e||0);return s>=1e4?(s/1e4).toFixed(1)+"万":String(s)}async function x(e,s,t){const i=p().uid;if(!i){s.textContent="请先登录";return}await v(e.id,i,e.uid)&&(C(),e.likedBy||(e.likedBy={}),e.likedBy[i]=!0),s.disabled=!0,s.textContent="✅ 已点赞",t&&(t.textContent=`已帮 ${e.authorName||"匿名"} 回血 ¥10,000 🪙`,t.classList.remove("hidden"))}async function q(e,s){var m;a=e,e.innerHTML='<div class="flex items-center justify-center h-screen text-gold">⏳ 加载中...</div>';const t=await y(s);if(!t){e.innerHTML=`<div class="flex items-center justify-center h-screen">
<div class="glass-panel p-8 text-center max-w-md animate-fade-in">
<h2 class="text-gold text-2xl mb-3">🎆 这场烟花秀已经消散了...</h2>
<p class="opacity-60 mb-6">也许是风太大，也许是贷款没还上</p>
<button onclick="location.hash='#/main'" class="btn-primary">🎆 进入烟花大会</button>
</div></div>`;return}const i=h(t.fireCoins??0),o=p().uid,n=(m=t.likedBy)==null?void 0:m[o];a.style.background="linear-gradient(180deg,#0a0e27,#1a1a3e 50%,#0d1117)",a.innerHTML="";const u=d("div","flex items-center justify-center h-screen px-4"),l=d("div","glass-panel p-8 text-center max-w-lg animate-fade-in");l.innerHTML=`
<h1 class="text-gold text-2xl font-bold mb-2">🎆 ${t.authorName||"匿名"} ${i.icon}</h1>
<p class="text-gold text-lg mb-4">负债 ¥${L(t.fireCoins)} 烟花币</p>
<p class="opacity-80 mb-1">为你点亮了这场烟花秀</p>
<p class="text-sm opacity-50 mt-4 mb-1">每一发烟花都是真金白银（假的）</p>
<p class="text-sm opacity-50 mb-4">每一帧浪漫都是贷款换来的</p>
<p class="opacity-70 mb-6">看完觉得值？点个赞，帮 TA 回回血</p>
<div class="flex gap-3 justify-center flex-wrap">
<button id="sp" class="btn-primary text-lg px-6 py-3">▶️ 开始观赏</button>
<button id="sl" class="btn-like text-lg px-6 py-3"${n?" disabled":""}>${n?"✅ 已赞":"❤️ 点赞回血"}</button>
</div><p id="sm" class="mt-3 text-sm text-gold hidden"></p>`,u.append(l),a.append(u),l.querySelector("#sp").onclick=()=>{a.innerHTML="";const r=d("div","absolute inset-0");r.id="spc",a.append(r),c=T("spc",t.timeline,t.duration,()=>F(t))},l.querySelector("#sl").onclick=r=>x(t,r.target,l.querySelector("#sm"))}function F(e){var o;const s=p().uid,t=(o=e.likedBy)==null?void 0:o[s],i=d("div","absolute inset-0 z-10 flex items-center justify-center animate-fade-in");i.innerHTML=`<div class="glass-panel p-8 text-center max-w-md">
<h2 class="text-gold text-2xl mb-5">✨ 烟花秀播放完毕</h2>
<div class="flex flex-col gap-3">
<button id="el" class="btn-like text-lg py-3"${t?" disabled":""}>${t?"✅ 已赞":"❤️ 点赞回血 · 帮TA还一万"}</button>
<button id="ee" class="btn-secondary">🎆 我也要来一发 → 进入烟花大会</button>
</div><p id="em" class="mt-3 text-sm text-gold hidden"></p></div>`,a.append(i),i.querySelector("#el").onclick=n=>x(e,n.target,i.querySelector("#em")),i.querySelector("#ee").onclick=()=>{c&&(c(),c=null),location.hash="#/main"}}export{q as renderSharePage};
