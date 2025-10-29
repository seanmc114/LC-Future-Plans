// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
  // GAME 5 — Technology & Social Media (Present Continuous + Connector: además)
// Direction: English -> Spanish
// Rules applied:
// - Only final ? is used in answers (no inverted ¿)
// - Accents required
// - Capitals NOT required (script will handle)
// - Pronouns not required EXCEPT "usted" must appear when marked (formal)
// - Connector: además

// ===================================
// GAME 9 DATASET (FINAL GAME)
// Theme: Future Plans, Dreams & Ambition
// Style: Short, motivational, LC-ready Spanish
// NO QUESTIONS | FAST GAMEPLAY
// ===================================

const PRESENT = {
  1: [
    { en: "In the future I am going to study at university.", es: "En el futuro voy a estudiar en la universidad." },
    { en: "I am going to work hard.", es: "Voy a trabajar duro." },
    { en: "I am going to have a good life.", es: "Voy a tener una buena vida." },
    { en: "I am going to travel more.", es: "Voy a viajar más." },
    { en: "I am going to learn new skills.", es: "Voy a aprender nuevas habilidades." },
    { en: "I am going to improve my Spanish.", es: "Voy a mejorar mi español." },
    { en: "I am going to study every day.", es: "Voy a estudiar cada día." },
    { en: "I am going to help my family.", es: "Voy a ayudar a mi familia." },
    { en: "I am going to be happy.", es: "Voy a ser feliz." },
    { en: "I am going to follow my dreams.", es: "Voy a seguir mis sueños." },
    { en: "I am going to save money.", es: "Voy a ahorrar dinero." },
    { en: "I am going to stay positive.", es: "Voy a mantenerme positivo." },
    { en: "I am going to get good grades.", es: "Voy a sacar buenas notas." },
    { en: "I am going to be successful.", es: "Voy a tener éxito." },
    { en: "I am going to make good choices.", es: "Voy a tomar buenas decisiones." }
  ],
  2: [
    { en: "I am going to study hard to have a good future.", es: "Voy a estudiar mucho para tener un buen futuro." },
    { en: "I am going to work to earn money.", es: "Voy a trabajar para ganar dinero." },
    { en: "I am going to travel to new countries.", es: "Voy a viajar a nuevos países." },
    { en: "I am going to buy a car one day.", es: "Voy a comprar un coche algún día." },
    { en: "I am going to move to another city.", es: "Voy a mudarme a otra ciudad." },
    { en: "I am going to take care of my health.", es: "Voy a cuidar mi salud." },
    { en: "I am going to learn to drive.", es: "Voy a aprender a conducir." },
    { en: "I am going to work in a good job.", es: "Voy a trabajar en un buen trabajo." },
    { en: "I am going to build a good life.", es: "Voy a construir una buena vida." },
    { en: "I am going to buy a house one day.", es: "Voy a comprar una casa algún día." },
    { en: "I am going to go to college.", es: "Voy a ir a la universidad." },
    { en: "I am going to have a good career.", es: "Voy a tener una buena carrera." },
    { en: "I am going to help other people.", es: "Voy a ayudar a otras personas." },
    { en: "I am going to make good friends.", es: "Voy a hacer buenos amigos." },
    { en: "I am going to live my best life.", es: "Voy a vivir mi mejor vida." }
  ],
  3: [
    { en: "I want to go to university.", es: "Quiero ir a la universidad." },
    { en: "I want to study science.", es: "Quiero estudiar ciencias." },
    { en: "I want to become a teacher.", es: "Quiero ser profesor." },
    { en: "I want to be a doctor.", es: "Quiero ser médico." },
    { en: "I want to be an engineer.", es: "Quiero ser ingeniero." },
    { en: "I want to be a nurse.", es: "Quiero ser enfermero." },
    { en: "I want to study in Dublin.", es: "Quiero estudiar en Dublín." },
    { en: "I want to get a good job.", es: "Quiero conseguir un buen trabajo." },
    { en: "I want to earn good money.", es: "Quiero ganar buen dinero." },
    { en: "I want to travel the world.", es: "Quiero viajar por el mundo." },
    { en: "I want to learn languages.", es: "Quiero aprender idiomas." },
    { en: "I want to meet new people.", es: "Quiero conocer a gente nueva." },
    { en: "I want to live in another country.", es: "Quiero vivir en otro país." },
    { en: "I want to have a good life.", es: "Quiero tener una buena vida." },
    { en: "I want to be happy in the future.", es: "Quiero ser feliz en el futuro." }
  ],
  4: [
    { en: "I would like to go to university.", es: "Me gustaría ir a la universidad." },
    { en: "I would like to study medicine.", es: "Me gustaría estudiar medicina." },
    { en: "I would like to have a good job.", es: "Me gustaría tener un buen trabajo." },
    { en: "I would like to earn good money.", es: "Me gustaría ganar buen dinero." },
    { en: "I would like to help people.", es: "Me gustaría ayudar a la gente." },
    { en: "I would like to travel a lot.", es: "Me gustaría viajar mucho." },
    { en: "I would like to speak Spanish well.", es: "Me gustaría hablar bien español." },
    { en: "I would like to live in another country.", es: "Me gustaría vivir en otro país." },
    { en: "I would like to learn new skills.", es: "Me gustaría aprender nuevas habilidades." },
    { en: "I would like to buy a house one day.", es: "Me gustaría comprar una casa algún día." },
    { en: "I would like to work abroad.", es: "Me gustaría trabajar en el extranjero." },
    { en: "I would like to be independent.", es: "Me gustaría ser independiente." },
    { en: "I would like to meet new people.", es: "Me gustaría conocer a gente nueva." },
    { en: "I would like to be successful in life.", es: "Me gustaría tener éxito en la vida." },
    { en: "I would like to make my family proud.", es: "Me gustaría hacer sentir orgullosa a mi familia." }
  ],
  5: [
    { en: "I am going to study hard because I want a good future.", es: "Voy a estudiar mucho porque quiero un buen futuro." },
    { en: "I want to go to college because education is important.", es: "Quiero ir a la universidad porque la educación es importante." },
    { en: "I would like to travel because I want to see the world.", es: "Me gustaría viajar porque quiero ver el mundo." },
    { en: "I am going to work because I want to save money.", es: "Voy a trabajar porque quiero ahorrar dinero." },
    { en: "I want to learn languages because they are useful.", es: "Quiero aprender idiomas porque son útiles." },
    { en: "I am going to train because I want to be fit.", es: "Voy a entrenar porque quiero estar en forma." },
    { en: "I want to help people because it is important.", es: "Quiero ayudar a la gente porque es importante." },
    { en: "I will work hard because I want to reach my goals.", es: "Trabajaré duro porque quiero alcanzar mis metas." },
    { en: "I am going to save money because I want to travel.", es: "Voy a ahorrar dinero porque quiero viajar." },
    { en: "I want to study science because I like technology.", es: "Quiero estudiar ciencias porque me gusta la tecnología." },
    { en: "I am going to go to university because I want a good job.", es: "Voy a ir a la universidad porque quiero un buen trabajo." },
    { en: "I want to be successful because I have big dreams.", es: "Quiero tener éxito porque tengo grandes sueños." },
    { en: "I am going to read more because I want to learn.", es: "Voy a leer más porque quiero aprender." },
    { en: "I want to be strong because life is not easy.", es: "Quiero ser fuerte porque la vida no es fácil." },
    { en: "I will stay positive because attitude is important.", es: "Me mantendré positivo porque la actitud es importante." }
  ],
  6: [
    { en: "My goal is to finish school.", es: "Mi meta es terminar el colegio." },
    { en: "My dream is to travel the world.", es: "Mi sueño es viajar por el mundo." },
    { en: "I want to study in Ireland.", es: "Quiero estudiar en Irlanda." },
    { en: "I want to go to university in Dublin.", es: "Quiero ir a la universidad en Dublín." },
    { en: "I am going to work part time.", es: "Voy a trabajar a tiempo parcial." },
    { en: "In the future I will buy a house.", es: "En el futuro compraré una casa." },
    { en: "I will have a good life.", es: "Tendré una buena vida." },
    { en: "I am going to improve my Spanish.", es: "Voy a mejorar mi español." },
    { en: "I want to study business.", es: "Quiero estudiar negocios." },
    { en: "I want to become a mechanic.", es: "Quiero ser mecánico." },
    { en: "I would like to be a nurse.", es: "Me gustaría ser enfermera." },
    { en: "I would like to be a teacher.", es: "Me gustaría ser profesor." },
    { en: "I am going to train every day.", es: "Voy a entrenar cada día." },
    { en: "I want to stay healthy.", es: "Quiero mantenerme sano." },
    { en: "I will never give up.", es: "Nunca me rendiré." }
  ],
  7: [
    { en: "In my opinion the future is important.", es: "En mi opinión el futuro es importante." },
    { en: "I believe in myself.", es: "Creo en mí mismo." },
    { en: "I am going to follow my dreams.", es: "Voy a seguir mis sueños." },
    { en: "I want to have a good career.", es: "Quiero tener una buena carrera." },
    { en: "I will work hard to reach my goals.", es: "Trabajaré duro para alcanzar mis metas." },
    { en: "I want to go to college in Ireland.", es: "Quiero ir a la universidad en Irlanda." },
    { en: "I am going to study because I want a good life.", es: "Voy a estudiar porque quiero una buena vida." },
    { en: "I would like to live in Spain one day.", es: "Me gustaría vivir en España algún día." },
    { en: "I want to travel because the world is interesting.", es: "Quiero viajar porque el mundo es interesante." },
    { en: "I will not give up.", es: "No me rendiré." },
    { en: "I want to improve every year.", es: "Quiero mejorar cada año." },
    { en: "I am going to make my dreams a reality.", es: "Voy a hacer realidad mis sueños." },
    { en: "I believe the future will be good.", es: "Creo que el futuro será bueno." },
    { en: "I am going to stay focused.", es: "Voy a mantenerme enfocado." },
    { en: "I want to live a happy life.", es: "Quiero vivir una vida feliz." }
  ],
  8: [
    { en: "I am going to work hard to have a good future.", es: "Voy a trabajar duro para tener un buen futuro." },
    { en: "I want to travel and learn from other cultures.", es: "Quiero viajar y aprender de otras culturas." },
    { en: "I would like to speak many languages.", es: "Me gustaría hablar muchos idiomas." },
    { en: "I am going to study every day to improve.", es: "Voy a estudiar cada día para mejorar." },
    { en: "I want to be independent in the future.", es: "Quiero ser independiente en el futuro." },
    { en: "I will have a good job if I work hard.", es: "Tendré un buen trabajo si trabajo duro." },
    { en: "I want to help my family in the future.", es: "Quiero ayudar a mi familia en el futuro." },
    { en: "I am going to stay positive always.", es: "Voy a mantenerme positivo siempre." },
    { en: "I believe that education is important.", es: "Creo que la educación es importante." },
    { en: "I am going to save money for my future.", es: "Voy a ahorrar dinero para mi futuro." },
    { en: "I would like to study in UCD or TUD.", es: "Me gustaría estudiar en UCD o TUD." },
    { en: "I want to grow as a person.", es: "Quiero crecer como persona." },
    { en: "I am going to improve my life step by step.", es: "Voy a mejorar mi vida paso a paso." },
    { en: "I will reach my goals someday.", es: "Alcanzaré mis metas algún día." },
    { en: "I believe effort brings success.", es: "Creo que el esfuerzo trae éxito." }
  ],
  9: [
    { en: "In the future I want to live my dreams.", es: "En el futuro quiero vivir mis sueños." },
    { en: "I am going to build a good life.", es: "Voy a construir una buena vida." },
    { en: "I would like to travel around the world.", es: "Me gustaría viajar por el mundo." },
    { en: "I will follow my goals with determination.", es: "Seguiré mis metas con determinación." },
    { en: "I want to have a job that I love.", es: "Quiero tener un trabajo que me guste." },
    { en: "I am going to work hard for my future.", es: "Voy a trabajar duro por mi futuro." },
    { en: "I want to make a difference in the world.", es: "Quiero hacer una diferencia en el mundo." },
    { en: "I will study because I want a good career.", es: "Estudiaré porque quiero una buena carrera." },
    { en: "I am going to stay strong and positive.", es: "Voy a mantenerme fuerte y positivo." },
    { en: "I want to be happy and successful.", es: "Quiero ser feliz y tener éxito." },
    { en: "I am going to travel and learn.", es: "Voy a viajar y aprender." },
    { en: "I will never stop improving.", es: "Nunca dejaré de mejorar." },
    { en: "I want to live with passion.", es: "Quiero vivir con pasión." },
    { en: "I am going to create my own future.", es: "Voy a crear mi propio futuro." },
    { en: "My dreams are important to me.", es: "Mis sueños son importantes para mí." }
  ],
  10: [
    { en: "In the future I am going to follow my dreams and work hard.", es: "En el futuro voy a seguir mis sueños y trabajar duro." },
    { en: "I want to study what I love and be happy.", es: "Quiero estudiar lo que me gusta y ser feliz." },
    { en: "I would like to travel and see the world.", es: "Me gustaría viajar y ver el mundo." },
    { en: "I believe the future will be full of opportunities.", es: "Creo que el futuro estará lleno de oportunidades." },
    { en: "I will fight for my dreams.", es: "Lucharé por mis sueños." },
    { en: "I am going to help my family and make them proud.", es: "Voy a ayudar a mi familia y hacerlos sentir orgullosos." },
    { en: "I am going to learn and grow every day.", es: "Voy a aprender y crecer cada día." },
    { en: "I want to improve my life step by step.", es: "Quiero mejorar mi vida paso a paso." },
    { en: "I will stay positive because attitude is everything.", es: "Me mantendré positivo porque la actitud lo es todo." },
    { en: "I want to live a good life with good people.", es: "Quiero vivir una buena vida con buena gente." },
    { en: "I am going to choose my own path.", es: "Voy a elegir mi propio camino." },
    { en: "I will never stop dreaming.", es: "Nunca dejaré de soñar." },
    { en: "I am going to create my future with effort.", es: "Voy a crear mi futuro con esfuerzo." },
    { en: "I will be strong and brave in life.", es: "Seré fuerte y valiente en la vida." },
    { en: "I am ready for the future.", es: "Estoy listo para el futuro." }
  ]
};

// === DATASETS bootstrap (paste directly under the PRESENT dataset) ===
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

// Make a global datasets object built from PRESENT
window.DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };

// Legacy alias for code that uses bare DATASETS (not namespaced)
// Using 'var' at top-level ensures a true global in non-module scripts
var DATASETS = window.DATASETS;

  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

 // ===================== Compare =====================
// ===================== Compare =====================
const norm = s => (s || "").trim();
const endsWithQM = s => norm(s).endsWith("?");

// Accents REQUIRED; ñ ≡ n; CAPITALS IGNORED; ignore final "." or leading "¿"
function coreKeepAccents(s) {
  let t = norm(s);

  // Remove leading inverted question mark if used
  if (t.startsWith("¿")) t = t.slice(1);

  // Remove only final punctuation ? or .
  if (t.endsWith("?") || t.endsWith(".")) t = t.slice(0, -1);

  // Treat ñ as n
  t = t.replace(/ñ/gi, "n");

  // ✅ Ignore capital letters
  t = t.toLowerCase();

  // Remove extra spaces
  return t.replace(/\s+/g, " ");
}

// Require ? only if expected answer is a question
function cmpAnswer(user, expected) {
  const expIsQ = endsWithQM(expected);
  if (expIsQ && !endsWithQM(user)) return false;
  return coreKeepAccents(user) === coreKeepAccents(expected);
}


  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input,onStatus){
    const r=ensureRecognizer(); if(!r){onStatus&&onStatus(false);return;}
    if(recActive){try{r.stop();}catch{} recActive=false; onStatus&&onStatus(false);}
    try{
      r.onresult=e=>{ const txt=(e.results[0]&&e.results[0][0]&&e.results[0][0].transcript)||""; const v=txt.trim(); input.value = v.endsWith("?")?v:(v+"?"); input.dispatchEvent(new Event("input",{bubbles:true})); };
      r.onend=()=>{recActive=false; onStatus&&onStatus(false);};
      recActive=true; onStatus&&onStatus(true); r.start();
    }catch{ onStatus&&onStatus(false); }
  }
  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const qwrap=$("#questions"); if(!qwrap) return; qwrap.innerHTML="";
    quiz.forEach((q,i)=>{
      const row=document.createElement("div"); row.className="q";

      const p=document.createElement("div"); p.className="prompt"; p.textContent=`${i+1}. ${q.prompt}`;
      const controls=document.createElement("span");
      Object.assign(controls.style,{display:"inline-block",marginLeft:"6px",verticalAlign:"middle"});

      const enBtn=miniBtn("🔈 EN","Read English prompt"); enBtn.onclick=()=>speak(q.prompt,"en-GB");
      const esBtn=miniBtn("🔊 ES","Read Spanish target (uses 1 this attempt)"); esBtn.setAttribute("data-role","es-tts");
      esBtn.onclick=()=>{ if (attemptRemaining()<=0){ updateESButtonsState(qwrap); return; } speak(q.answer,"es-ES"); cheatsUsedThisRound+=1; updateESButtonsState(qwrap); };
      const micBtn=miniBtn("🎤","Dictate into this answer"); micBtn.onclick=()=>{ startDictationFor(input,(on)=>{ micBtn.style.borderColor=on?"#f39c12":"#ddd"; micBtn.style.boxShadow=on?"0 0 0 2px rgba(243,156,18,0.25)":"none"; }); };

      controls.appendChild(enBtn); controls.appendChild(esBtn); controls.appendChild(micBtn); p.appendChild(controls);

      const input=document.createElement("input"); input.type="text"; input.placeholder="Type the Spanish here (must end with ?)";
      input.oninput=e=>{ quiz[i].user=e.target.value; };
      input.addEventListener("keydown",(e)=>{ if(e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ if(e.code==="KeyR"){e.preventDefault();enBtn.click();} else if(e.code==="KeyS"){e.preventDefault();esBtn.click();} else if(e.code==="KeyM"){e.preventDefault();micBtn.click();} }});

      row.appendChild(p); row.appendChild(input); qwrap.appendChild(row);
    });
    updateESButtonsState(qwrap);

    const submit=$("#submit"); if(submit){ submit.disabled=false; submit.textContent="Finish & Check"; submit.onclick=finishAndCheck; }
    const back=$("#back-button"); if(back){ back.style.display="inline-block"; back.onclick=backToLevels; }
  }

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    renderLevels();
  });
})();
