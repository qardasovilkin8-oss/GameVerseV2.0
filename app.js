/*
 GameVerse catalog: url = official platform page; embedUrl must be a publisher-approved direct HTTPS embed URL.
 Do not use ordinary platform homepages as iframe URLs. Third-party sites may block embedding.
*/
const games = [
 {name:"Neon Drift",genre:"racing",label:"Yarış",emoji:"🏎️",desc:"Sürətli arcade yarışları",colors:"linear-gradient(135deg,#ff6a5f,#7d35d8)",source:"Poki",url:"https://poki.com/",embedUrl:null},
 {name:"Pixel Quest",genre:"action",label:"Aksiyon",emoji:"🗡️",desc:"Piksel dünyasında macəra",colors:"linear-gradient(135deg,#29c6ad,#2367bb)",source:"Yandex Games",url:"https://yandex.com/games/",embedUrl:null},
 {name:"Brain Blocks",genre:"puzzle",label:"Puzzle",emoji:"🧩",desc:"Məntiqini sına",colors:"linear-gradient(135deg,#f6b94b,#e65a83)",source:"Poki",url:"https://poki.com/",embedUrl:null},
 {name:"Sky Jumper",genre:"arcade",label:"Arcade",emoji:"🚀",desc:"Göylərə doğru tullan",colors:"linear-gradient(135deg,#38c8ff,#6848dc)",source:"Yandex Games",url:"https://yandex.com/games/",embedUrl:null},
 {name:"Goal Legends",genre:"action",label:"Aksiyon",emoji:"⚽",desc:"Futbol həyəcanı",colors:"linear-gradient(135deg,#52d681,#187c80)",source:"Poki",url:"https://poki.com/",embedUrl:null},
 {name:"Drift City",genre:"racing",label:"Yarış",emoji:"🚘",desc:"Şəhərdə drift et",colors:"linear-gradient(135deg,#ff7b54,#ad2b69)",source:"Yandex Games",url:"https://yandex.com/games/",embedUrl:null},
 {name:"Mystic Match",genre:"puzzle",label:"Puzzle",emoji:"💎",desc:"Uyğun daşları tap",colors:"linear-gradient(135deg,#4f70e9,#b24de0)",source:"Poki",url:"https://poki.com/",embedUrl:null},
 {name:"Tiny Arcade",genre:"arcade",label:"Arcade",emoji:"👾",desc:"Klassik arcade əyləncəsi",colors:"linear-gradient(135deg,#fc668f,#7a52d5)",source:"Yandex Games",url:"https://yandex.com/games/",embedUrl:null}
];
const grid=document.querySelector('#game-grid'), search=document.querySelector('#search'), count=document.querySelector('#count');
const backdrop=document.querySelector('#player-backdrop'), playerArea=document.querySelector('#player-area'), playerMessage=document.querySelector('#player-message');
const playerTitle=document.querySelector('#player-title'), openOfficial=document.querySelector('#open-official'), retry=document.querySelector('#retry-embed');
let active='all', selected=null, embedTimer=null;
function render(){
 const q=search.value.trim().toLowerCase();
 const items=games.filter(g=>(active==='all'||g.genre===active)&&(`${g.name} ${g.label} ${g.desc} ${g.source}`).toLowerCase().includes(q));
 grid.innerHTML=items.map(g=>`<article class="game-card"><button class="game-launch" data-game="${g.name}" aria-label="${g.name} oyununu aç"><div class="cover" style="background:${g.colors}"><span>${g.emoji}</span></div><div class="card-info"><strong>${g.name}</strong><p>${g.desc}</p><div class="card-bottom"><span class="tag">${g.label}</span><span class="play">Oyna →</span></div><small class="source-label">${g.source} kataloqu</small></div></button></article>`).join('');
 count.textContent=`${items.length} oyun göstərilir`; if(!items.length)grid.innerHTML='<p class="muted">Uyğun oyun tapılmadı. Başqa söz yoxla.</p>';
}
function message(text,type='warning'){playerMessage.hidden=false;playerMessage.className=`player-message ${type}`;playerMessage.textContent=text;}
function clearPlayer(){if(embedTimer)clearTimeout(embedTimer);embedTimer=null;playerArea.innerHTML='';playerMessage.hidden=true;retry.hidden=true;}
function launch(g){selected=g;clearPlayer();backdrop.hidden=false;document.body.classList.add('modal-open');playerTitle.textContent=g.name;openOfficial.href=g.url;
 if(!g.embedUrl){message(`${g.source} üçün bu oyunla bağlı təsdiqlənmiş, birbaşa embed ünvanı əlavə edilməyib. Platformanın adi səhifəsini iframe-də açmaq çox vaxt bloklanır. Buna görə oyun hazırda daxildə başlaya bilmir. “Rəsmi oyun səhifəsini aç” düyməsi ilə platformaya keçə bilərsən.`);return;}
 let u;try{u=new URL(g.embedUrl);if(u.protocol!=='https:')throw new Error();}catch(e){message('Embed ünvanı düzgün deyil. Yalnız etibarlı HTTPS ünvanı əlavə et.');return;}
 const frame=document.createElement('iframe');frame.src=u.href;frame.title=g.name;frame.allow='fullscreen; autoplay; gamepad';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';frame.loading='eager';frame.addEventListener('load',()=>message('Çərçivə yükləndi. Əgər oyun görünmürsə, oyun sahibi iframe girişini bloklaya bilər.','info'));playerArea.appendChild(frame);retry.hidden=false;
 embedTimer=setTimeout(()=>message('Oyun görünmür? Sayt iframe daxilində açılmağa icazə verməyə bilər. Bu bloklamanı GameVerse-dən aradan qaldırmaq mümkün deyil; rəsmi səhifəni aç.'),7000);
}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(b){const g=games.find(x=>x.name===b.dataset.game);if(g)launch(g);}});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.filter;render();}));
search.addEventListener('input',render);
document.querySelector('#close-player').addEventListener('click',()=>{backdrop.hidden=true;document.body.classList.remove('modal-open');clearPlayer();});
backdrop.addEventListener('click',e=>{if(e.target===backdrop){backdrop.hidden=true;document.body.classList.remove('modal-open');clearPlayer();}});
retry.addEventListener('click',()=>{if(selected)launch(selected);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!backdrop.hidden){backdrop.hidden=true;document.body.classList.remove('modal-open');clearPlayer();}});
render();if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
