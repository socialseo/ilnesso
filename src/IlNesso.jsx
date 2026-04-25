import { useState, useCallback, useEffect, useRef } from "react";

// ─────────────────────────── CONFIG ──────────────────────────────────────────
const LEVELS = [
  { n:1, wins:3,  attempts:10, switches:0, diff:1, label:"Principiante" },
  { n:2, wins:4,  attempts:10, switches:0, diff:1, label:"Apprendista" },
  { n:3, wins:5,  attempts:10, switches:1, diff:2, label:"Giocatore" },
  { n:4, wins:6,  attempts:10, switches:1, diff:2, label:"Esperto" },
  { n:5, wins:7,  attempts:10, switches:2, diff:3, label:"Veterano" },
  { n:6, wins:8,  attempts:10, switches:2, diff:3, label:"Maestro" },
  { n:7, wins:9,  attempts:10, switches:2, diff:4, label:"Gran Maestro" },
  { n:8, wins:10, attempts:10, switches:2, diff:4, label:"Campione" },
];
const START_PTS = 10_000;
const fmt = n => n.toLocaleString("it-IT");

// ─────────────────────────── GHIGLIOTTINE ────────────────────────────────────
const G = [
  // diff 1
  {id:1,w:"SOLE",d:1,b:2,s:"GIRASOLE",c:[{r:"TRAMONTO",x:"ALBA"},{r:"OCCHIALI",x:"CAPPELLO"},{r:"RAGGIO",x:"FASCIO"},{r:"CREMA",x:"POMATA"},{r:"SISTEMA",x:"GALASSIA"}]},
  {id:2,w:"LUNA",d:1,b:1,s:"ROSSA",c:[{r:"PIENA",x:"ROTONDA"},{r:"MIELE",x:"DOLCE"},{r:"NUOVA",x:"VECCHIA"},{r:"CHIARO",x:"SCURO"},{r:"FALCE",x:"SPADA"}]},
  {id:3,w:"FUOCO",d:1,b:3,s:"VIVO",c:[{r:"ARMA",x:"LAMA"},{r:"ARTIFICIALE",x:"NATURALE"},{r:"SACRO",x:"PROFANO"},{r:"LENTO",x:"RAPIDO"},{r:"APERTO",x:"CHIUSO"}]},
  {id:4,w:"MARE",d:1,b:0,s:"MOSSO",c:[{r:"STELLA",x:"PIANETA"},{r:"CAVALLO",x:"ASINO"},{r:"FONDO",x:"VETTA"},{r:"APERTO",x:"CHIUSO"},{r:"TEMPESTA",x:"NEBBIA"}]},
  {id:5,w:"FERRO",d:1,b:4,s:"ARRUGGINITO",c:[{r:"BATTUTO",x:"FORGIATO"},{r:"FILO",x:"CORDA"},{r:"STIRO",x:"CUCINA"},{r:"CAVALLO",x:"TORO"},{r:"VECCHIO",x:"ANTICO"}]},
  {id:6,w:"ACQUA",d:1,b:3,s:"FRESCA",c:[{r:"CORRENTE",x:"FERMA"},{r:"MINERALE",x:"GASSATA"},{r:"BOCCA",x:"NASO"},{r:"CHETA",x:"CALMA"},{r:"SANTA",x:"SACRA"}]},
  {id:7,w:"VENTO",d:1,b:1,s:"SCIROCCO",c:[{r:"MULINO",x:"TURBINA"},{r:"ROSA",x:"BUSSOLA"},{r:"STRUMENTO",x:"TAMBURO"},{r:"SOTTO",x:"SOPRA"},{r:"TROMBA",x:"FISCHIO"}]},
  {id:8,w:"NOTTE",d:1,b:2,s:"TARDA",c:[{r:"BUONA",x:"BELLA"},{r:"BIANCA",x:"NERA"},{r:"FONDA",x:"ALTA"},{r:"STELLE",x:"SOLE"},{r:"GUARDIA",x:"GIORNO"}]},
  {id:9,w:"ALBERO",d:1,b:0,s:"ULIVO",c:[{r:"NATALE",x:"CAPODANNO"},{r:"GENEALOGICO",x:"STORICO"},{r:"RADICE",x:"RAMO"},{r:"FRUTTO",x:"FIORE"},{r:"MAESTRO",x:"STUDENTE"}]},
  {id:10,w:"PALLA",d:1,b:3,s:"ROTONDA",c:[{r:"NEVE",x:"SABBIA"},{r:"CANNONE",x:"FUCILE"},{r:"FUOCO",x:"ACQUA"},{r:"PIEDI",x:"MANI"},{r:"RIMBALZO",x:"SALTO"}]},
  {id:11,w:"TEMPO",d:1,b:2,s:"LUNGO",c:[{r:"LIBERO",x:"OCCUPATO"},{r:"GIUSTO",x:"SBAGLIATO"},{r:"PIENO",x:"PARZIALE"},{r:"REALE",x:"FINTO"},{r:"PERSO",x:"TROVATO"}]},
  {id:12,w:"CASA",d:1,b:4,s:"NOSTRA",c:[{r:"VACANZA",x:"UFFICIO"},{r:"DISCOGRAFICA",x:"MUSICALE"},{r:"MADRE",x:"PADRE"},{r:"CURA",x:"GUARIGIONE"},{r:"POPOLO",x:"GENTE"}]},
  {id:13,w:"LIBRO",d:1,b:1,s:"BIANCO",c:[{r:"TASCABILE",x:"PORTATILE"},{r:"PAGA",x:"STIPENDIO"},{r:"MASTRO",x:"SERVITORE"},{r:"CUORE",x:"ANIMA"},{r:"VERDE",x:"ROSSO"}]},
  {id:14,w:"MANO",d:1,b:0,s:"SINISTRA",c:[{r:"OPERA",x:"TESTA"},{r:"SECONDA",x:"TERZA"},{r:"LIBERA",x:"CHIUSA"},{r:"ALZATA",x:"ABBASSATA"},{r:"PIENA",x:"COLMA"}]},
  {id:15,w:"PIETRA",d:1,b:3,s:"DURA",c:[{r:"PREZIOSA",x:"COMUNE"},{r:"MILIARE",x:"STRADALE"},{r:"POMICE",x:"ARDESIA"},{r:"ANGOLARE",x:"LATERALE"},{r:"FILOSOFALE",x:"MAGICA"}]},
  // diff 2
  {id:16,w:"CUORE",d:2,b:1,s:"INFARTO",c:[{r:"LEONE",x:"TIGRE"},{r:"APERTO",x:"SERRATO"},{r:"SACRO",x:"PROFANO"},{r:"PURO",x:"SPORCO"},{r:"TENERO",x:"DURO"}]},
  {id:17,w:"OCCHIO",d:2,b:3,s:"MALOCCHIO",c:[{r:"BUE",x:"MUCCA"},{r:"SERRATURA",x:"FINESTRA"},{r:"LUNGO",x:"CORTO"},{r:"PERDERE",x:"TROVARE"},{r:"NUDO",x:"COPERTO"}]},
  {id:18,w:"LINGUA",d:2,b:0,s:"TAGLIENTE",c:[{r:"MADRE",x:"PADRE"},{r:"BIFORCUTA",x:"DRITTA"},{r:"STRANIERA",x:"LOCALE"},{r:"MORTA",x:"TRAPASSATA"},{r:"LUNGA",x:"CORTA"}]},
  {id:19,w:"BOCCA",d:2,b:2,s:"TAPPARE",c:[{r:"LUPO",x:"ORSO"},{r:"FUOCO",x:"ACQUA"},{r:"SCENA",x:"PALCO"},{r:"AMARA",x:"SALATA"},{r:"CUCIRE",x:"APRIRE"}]},
  {id:20,w:"COLPO",d:2,b:4,s:"BASSO",c:[{r:"STATO",x:"GOVERNO"},{r:"TESTA",x:"PIEDI"},{r:"FORTUNA",x:"SFORTUNA"},{r:"GRAZIA",x:"VIOLENZA"},{r:"SCENA",x:"PALCO"}]},
  {id:21,w:"PESO",d:2,b:2,s:"BILANCIA",c:[{r:"PIUMA",x:"COTONE"},{r:"MOSCA",x:"FORMICA"},{r:"MASSIMO",x:"ALTISSIMO"},{r:"MORTO",x:"VIVO"},{r:"SPECIFICO",x:"GENERICO"}]},
  {id:22,w:"TESTA",d:2,b:0,s:"BASSA",c:[{r:"DURA",x:"MORBIDA"},{r:"CALDA",x:"SILENZIOSA"},{r:"GROSSA",x:"PICCOLA"},{r:"CODA",x:"MEZZO"},{r:"PERSA",x:"TROVATA"}]},
  {id:23,w:"CAMPO",d:2,b:3,s:"BASE",c:[{r:"LUNGO",x:"CORTO"},{r:"MINATO",x:"SICURO"},{r:"VISIVO",x:"SONORO"},{r:"PROFUGO",x:"TURISTA"},{r:"MAGNETICO",x:"STATICO"}]},
  {id:24,w:"PAROLA",d:2,b:1,s:"ULTIMA",c:[{r:"CHIAVE",x:"SERRATURA"},{r:"FINE",x:"INIZIO"},{r:"CROCIATA",x:"INTRECCIATA"},{r:"ONORE",x:"VERGOGNA"},{r:"FUORI",x:"DENTRO"}]},
  {id:25,w:"PUNTO",d:2,b:4,s:"CHIAVE",c:[{r:"ZERO",x:"CENTO"},{r:"INTERROGATIVO",x:"ESCLAMATIVO"},{r:"VISTA",x:"SUONO"},{r:"FERMO",x:"MOBILE"},{r:"ONORE",x:"VERGOGNA"}]},
  {id:26,w:"CARTA",d:2,b:2,s:"BIANCA",c:[{r:"BOLLATA",x:"LIBERA"},{r:"CARBONE",x:"LEGNA"},{r:"STRACCIA",x:"USATA"},{r:"VINCENTE",x:"PERDENTE"},{r:"GIOCO",x:"LAVORO"}]},
  {id:27,w:"PONTE",d:2,b:0,s:"LUNGO",c:[{r:"AEREO",x:"TERRESTRE"},{r:"LEVATOIO",x:"FISSO"},{r:"SOSPESO",x:"RIGIDO"},{r:"RADIO",x:"TELEVISIONE"},{r:"VECCHIO",x:"MODERNO"}]},
  {id:28,w:"PORTO",d:2,b:3,s:"FARO",c:[{r:"FRANCO",x:"LIBERO"},{r:"ARMI",x:"PISTOLA"},{r:"SICURO",x:"PERICOLOSO"},{r:"ANTICO",x:"MODERNO"},{r:"PESCHERECCIO",x:"VELICO"}]},
  {id:29,w:"STELLA",d:2,b:1,s:"CINQUE",c:[{r:"CADENTE",x:"VOLANTE"},{r:"MARINA",x:"TERRESTRE"},{r:"ALPINA",x:"MONTANA"},{r:"MICHELIN",x:"GUIDA"},{r:"POLARE",x:"EQUATORIALE"}]},
  {id:30,w:"SPECCHIO",d:2,b:2,s:"MAGICO",c:[{r:"RETROVISORE",x:"FRONTALE"},{r:"ACQUA",x:"TERRA"},{r:"DEFORMANTE",x:"NORMALE"},{r:"ANIMA",x:"CORPO"},{r:"ROTTO",x:"INTERO"}]},
  // diff 3
  {id:31,w:"FIATO",d:3,b:0,s:"RESPIRO",c:[{r:"SOSPESO",x:"TRATTENUTO"},{r:"CORTO",x:"LUNGO"},{r:"STRUMENTO",x:"PERCUSSIONE"},{r:"TUTTO",x:"NIENTE"},{r:"MANCARE",x:"TROVARE"}]},
  {id:32,w:"COLPO",d:3,b:2,s:"MAESTRO",c:[{r:"FULMINE",x:"TUONO"},{r:"MANO",x:"PIEDE"},{r:"CODA",x:"TESTA"},{r:"TEATRO",x:"CINEMA"},{r:"SPUGNA",x:"STRACCIO"}]},
  {id:33,w:"GAMBA",d:3,b:4,s:"LUNGA",c:[{r:"ARIA",x:"TERRA"},{r:"BUONA",x:"CATTIVA"},{r:"SOTTO",x:"SOPRA"},{r:"DARSELA",x:"PERDERLA"},{r:"SANA",x:"MALATA"}]},
  {id:34,w:"NASO",d:3,b:1,s:"OLFATTO",c:[{r:"LUNGO",x:"CORTO"},{r:"AVERE",x:"MANCARE"},{r:"TORCERE",x:"DRIZZARE"},{r:"TABACCO",x:"SIGARETTA"},{r:"FINO",x:"GROSSO"}]},
  {id:35,w:"PELO",d:3,b:3,s:"UOVO",c:[{r:"ACQUA",x:"FUOCO"},{r:"TROVARE",x:"PERDERE"},{r:"RITTO",x:"DISTESO"},{r:"SALVARE",x:"RISCHIARE"},{r:"CORTO",x:"LUNGO"}]},
  {id:36,w:"DENTE",d:3,b:0,s:"CARIE",c:[{r:"LATTE",x:"ACQUA"},{r:"GIUDIZIO",x:"SAGGEZZA"},{r:"LEONE",x:"TIGRE"},{r:"OCCHIO",x:"ORECCHIO"},{r:"LUNGO",x:"CORTO"}]},
  {id:37,w:"FILO",d:3,b:2,s:"SETA",c:[{r:"ARIANNA",x:"ELENA"},{r:"RASOIO",x:"COLTELLO"},{r:"SPINATO",x:"LISCIO"},{r:"DISCORSO",x:"RACCONTO"},{r:"DOPPIO",x:"TRIPLO"}]},
  {id:38,w:"VOCE",d:3,b:1,s:"CORO",c:[{r:"BASSA",x:"ALTA"},{r:"GROSSA",x:"PICCOLA"},{r:"PASSIVA",x:"ATTIVA"},{r:"BILANCIO",x:"CONTO"},{r:"FUORI",x:"DENTRO"}]},
  {id:39,w:"PESCA",d:3,b:4,s:"LENZA",c:[{r:"RETE",x:"TRAPPOLA"},{r:"CANNA",x:"FUCILE"},{r:"SPORTIVA",x:"ARTISTICA"},{r:"ALTURA",x:"PIANURA"},{r:"SUBACQUEA",x:"AEREA"}]},
  {id:40,w:"LUCE",d:3,b:2,s:"NEON",c:[{r:"VERDE",x:"ROSSA"},{r:"BUONA",x:"CATTIVA"},{r:"ANNO",x:"MESE"},{r:"METTERE",x:"TOGLIERE"},{r:"VELOCITÀ",x:"SUONO"}]},
  {id:41,w:"ARIA",d:3,b:0,s:"CORRENTE",c:[{r:"APERTA",x:"CHIUSA"},{r:"STANTIA",x:"FRESCA"},{r:"CONDIZIONATA",x:"NATURALE"},{r:"FRITTA",x:"BOLLITA"},{r:"TIRA",x:"SPINGE"}]},
  {id:42,w:"RETE",d:3,b:3,s:"MAGLIA",c:[{r:"SICUREZZA",x:"PERICOLO"},{r:"SOCIALE",x:"SOLITARIA"},{r:"TELEVISIVA",x:"RADIOFONICA"},{r:"VENDITA",x:"ACQUISTO"},{r:"BUCATO",x:"STIRO"}]},
  // diff 4
  {id:43,w:"CHIAVE",d:4,b:1,s:"MAZZO",c:[{r:"INGLESE",x:"FRANCESE"},{r:"VOLTA",x:"ARCO"},{r:"SOL",x:"RE"},{r:"LETTURA",x:"SCRITTURA"},{r:"GIRAVA",x:"SPINGEVA"}]},
  {id:44,w:"PIEDE",d:4,b:3,s:"CALZA",c:[{r:"LETTERA",x:"PAROLA"},{r:"PAGINA",x:"CAPITOLO"},{r:"PIATTO",x:"FONDO"},{r:"GUERRA",x:"PACE"},{r:"NOTA",x:"ACCORDO"}]},
  {id:45,w:"CODA",d:4,b:0,s:"STRASCICO",c:[{r:"CAVALLO",x:"ASINO"},{r:"CINEMA",x:"TEATRO"},{r:"RONDINE",x:"COLOMBA"},{r:"OCCHIO",x:"NASO"},{r:"ABITO",x:"VESTITO"}]},
  {id:46,w:"BANCO",d:4,b:2,s:"DATI",c:[{r:"NEBBIA",x:"NUVOLA"},{r:"PROVA",x:"ESAME"},{r:"PESCE",x:"MARE"},{r:"SANGUE",x:"OSSO"},{r:"CHIESA",x:"MOSCHEA"}]},
  {id:47,w:"CORRENTE",d:4,b:4,s:"ELETTRICA",c:[{r:"ALTERNATA",x:"CONTINUA"},{r:"TENERE",x:"LASCIARE"},{r:"PENSIERO",x:"IDEA"},{r:"MARINA",x:"FLUVIALE"},{r:"STARE",x:"RESTARE"}]},
  {id:48,w:"TIRO",d:4,b:1,s:"ARCO",c:[{r:"LUNGO",x:"CORTO"},{r:"MANCINO",x:"DESTRO"},{r:"FUNE",x:"CORDA"},{r:"LIBERO",x:"OBBLIGATO"},{r:"SEGNO",x:"BERSAGLIO"}]},
  {id:49,w:"CORSA",d:4,b:3,s:"STAFFETTA",c:[{r:"CAVALLI",x:"ASINI"},{r:"OSTACOLI",x:"BARRIERE"},{r:"TAXI",x:"BUS"},{r:"GIRO",x:"VOLTA"},{r:"SACCO",x:"BORSA"}]},
  {id:50,w:"SCALA",d:4,b:2,s:"CORDA",c:[{r:"MOBILE",x:"FISSA"},{r:"REALE",x:"FINTA"},{r:"MUSICA",x:"PITTURA"},{r:"GRIGIA",x:"NERA"},{r:"ANTINCENDIO",x:"EMERGENZA"}]},
];

// ─────────────────────────── HELPERS ─────────────────────────────────────────
function useCounter(target, ms = 550) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    if (prev.current === target) return;
    const s = prev.current, d = target - s, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / ms, 1);
      const e = p < .5 ? 2*p*p : -1+(4-2*p)*p;
      setV(Math.round(s + d*e));
      if (p < 1) requestAnimationFrame(tick);
      else { setV(target); prev.current = target; }
    };
    requestAnimationFrame(tick);
  }, [target, ms]);
  return v;
}

function pickGame(diff, usedIds) {
  const pool = G.filter(g => g.d === diff && !usedIds.includes(g.id));
  const src  = pool.length ? pool : G.filter(g => g.d === diff);
  return src[Math.floor(Math.random() * src.length)];
}

// ─────────────────────────── STORAGE HELPERS ─────────────────────────────────
function loadState(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveState(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─────────────────────────── ROOT ────────────────────────────────────────────
export default function IlNesso() {
  // ── Persistent progress — caricato dal localStorage ──
  const [curLevel,   setCurLevel]   = useState(() => loadState("nesso_level", 1));
  const [wins,       setWins]       = useState(() => loadState("nesso_wins", 0));
  const [attLeft,    setAttLeft]    = useState(() => loadState("nesso_att", 10));
  const [totalScore, setTotalScore] = useState(() => loadState("nesso_score", 0));
  const [usedIds,    setUsedIds]    = useState(() => loadState("nesso_used", []));
  const [completed,  setCompleted]  = useState(() => loadState("nesso_completed", []));

  // ── Session ──
  const [screen,     setScreen]     = useState("home");
  const [game,       setGame]       = useState(null);
  const [swLeft,     setSwLeft]     = useState(0);

  // ── In-game ──
  const [round,      setRound]      = useState(0);
  const [pts,        setPts]        = useState(START_PTS);
  const [outcomes,   setOutcomes]   = useState([]);
  const [chosen,     setChosen]     = useState([]);
  const [feedback,   setFeedback]   = useState(null);
  const [sixthUsed,  setSixthUsed]  = useState(false);
  const [answer,     setAnswer]     = useState("");
  const [won,        setWon]        = useState(null);
  const [leftIs,     setLeftIs]     = useState(true);
  const [resultInfo, setResultInfo] = useState(null);

  const lvlCfg = LEVELS[curLevel - 1];

  // ── Salva automaticamente nel localStorage ──
  useEffect(() => { saveState("nesso_level",     curLevel);   }, [curLevel]);
  useEffect(() => { saveState("nesso_wins",      wins);       }, [wins]);
  useEffect(() => { saveState("nesso_att",       attLeft);    }, [attLeft]);
  useEffect(() => { saveState("nesso_score",     totalScore); }, [totalScore]);
  useEffect(() => { saveState("nesso_used",      usedIds);    }, [usedIds]);
  useEffect(() => { saveState("nesso_completed", completed);  }, [completed]);

  // ── Start a game ──
  const startGame = useCallback(() => {
    const g = pickGame(lvlCfg.diff, usedIds);
    setGame(g);
    setUsedIds(u => [...u, g.id]);
    setRound(0); setPts(START_PTS);
    setOutcomes([]); setChosen([]);
    setFeedback(null); setSixthUsed(false);
    setAnswer(""); setWon(null);
    setLeftIs(Math.random() > .5);
    setSwLeft(lvlCfg.switches);
    setScreen("playing");
  }, [lvlCfg, usedIds]);

  // ── Switch mechanic ──
  const doSwitch = useCallback(() => {
    if (swLeft <= 0) return;
    const g = pickGame(lvlCfg.diff, [...usedIds, game.id]);
    setGame(g); setUsedIds(u => [...u, g.id]);
    setRound(0); setPts(START_PTS);
    setOutcomes([]); setChosen([]);
    setFeedback(null); setSixthUsed(false);
    setAnswer(""); setLeftIs(Math.random() > .5);
    setSwLeft(s => s - 1);
    setScreen("playing");
  }, [swLeft, game, lvlCfg, usedIds]);

  // ── Round pick ──
  const pick = useCallback((pickedLeft) => {
    if (feedback) return;
    const isOk   = pickedLeft === leftIs;
    const clue   = game.c[round];
    const isBonus = round === game.b;
    let p = pts, outcome;
    if (isOk) {
      if (isBonus) { p = p * 2; outcome = "bonus"; }
      else          { p = p + 1000; outcome = "correct"; }
    } else {
      p = Math.max(0, p - 2000); outcome = "wrong";
    }
    setChosen(c => [...c, clue.r]);
    setPts(p); setOutcomes(o => [...o, outcome]);
    setFeedback({ outcome, pts: p, word: isOk ? clue.r : clue.x });
    setTimeout(() => {
      setFeedback(null);
      if (round < 4) { setRound(r => r + 1); setLeftIs(Math.random() > .5); }
      else setScreen("final");
    }, 1800);
  }, [feedback, game, round, pts, leftIs]);

  const takeSixth = () => { setPts(p => Math.max(0, Math.floor(p / 2))); setSixthUsed(true); };

  // ── Submit final answer ──
  const submit = () => {
    const correct = answer.trim().toUpperCase() === game.w.toUpperCase();
    if (correct) setTotalScore(s => s + pts);
    const newWins = correct ? wins + 1 : wins;
    const newAtt  = attLeft - 1;
    if (correct) setWins(newWins);
    setAttLeft(newAtt);

    let lvlStatus = null;
    if (newWins >= lvlCfg.wins) {
      lvlStatus = "passed";
      setCompleted(c => c.includes(curLevel) ? c : [...c, curLevel]);
    } else if (newAtt <= 0) {
      lvlStatus = "failed";
    }

    setResultInfo({ correct, pts, lvlStatus, newWins, newAtt, finalWord: game.w });
    setScreen("result");
  };

  const goNextLevel = () => {
    if (curLevel < 8) { setCurLevel(l => l + 1); }
    setWins(0); setAttLeft(10);
    setScreen("levelmap"); // mostra mappa solo quando si sblocca un nuovo livello
  };
  const retryLevel = () => {
    setWins(0); setAttLeft(10);
    startGame(); // riparte direttamente senza passare dalla mappa
  };

  const clue    = game?.c[round];
  const L       = clue ? (leftIs ? clue.r : clue.x) : "";
  const R       = clue ? (leftIs ? clue.x : clue.r) : "";
  const allClues = game ? (sixthUsed ? [...chosen, game.s] : chosen) : [];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="bg-glow" /><div className="noise" />
        {screen === "home"     && <Home onStart={() => setScreen("levelmap")} />}
        {screen === "levelmap" && <LevelMap lvlCfg={lvlCfg} curLevel={curLevel} wins={wins} attLeft={attLeft} completed={completed} totalScore={totalScore} onPlay={startGame} />}
        {screen === "playing"  && clue && (
          <Playing round={round} pts={pts} chosen={chosen} outcomes={outcomes}
            L={L} R={R} feedback={feedback} totalScore={totalScore}
            lvlCfg={lvlCfg} wins={wins}
            isBonus={round === game?.b} onPick={pick} />
        )}
        {screen === "final"    && (
          <Final pts={pts} clues={allClues} sixthUsed={sixthUsed}
            swLeft={swLeft} onSwitch={doSwitch}
            totalScore={totalScore} lvlCfg={lvlCfg} wins={wins}
            answer={answer} onChange={setAnswer} onSubmit={submit}
            onTakeSixth={takeSixth} />
        )}
        {screen === "result"   && resultInfo && (
          <Result info={resultInfo} lvlCfg={lvlCfg}
            onContinue={resultInfo.lvlStatus === "passed" ? goNextLevel : resultInfo.lvlStatus === "failed" ? retryLevel : startGame} />
        )}
      </div>
    </>
  );
}

// ─────────────────────────── HOME ────────────────────────────────────────────
function Home({ onStart }) {
  return (
    <div className="screen home-screen">
      <div className="home-brand">
        <span className="home-eyebrow">Gioco di parole</span>
        <h1 className="home-logo">Il<br/>Nesso</h1>
        <p className="home-tagline">Cinque parole.<br/>Un filo invisibile. Trovalo.</p>
      </div>
      <button className="btn-primary" onClick={onStart}>
        <span>Entra nel gioco</span><span className="btn-arr">→</span>
      </button>
    </div>
  );
}

// ─────────────────────────── LEVEL MAP ───────────────────────────────────────
function LevelMap({ lvlCfg, curLevel, wins, attLeft, completed, totalScore, onPlay }) {
  return (
    <div className="screen lvlmap-screen">
      <div className="lvlmap-header">
        <div>
          <p className="eyebrow">Il Nesso</p>
          <h2 className="lvlmap-title">Livelli</h2>
        </div>
        <div className="score-pill">
          <span className="score-pill-lbl">Punteggio</span>
          <span className="score-pill-val">{fmt(totalScore)}</span>
        </div>
      </div>

      {/* Progresso livello corrente ben visibile */}
      <div className="cur-level-bar">
        <div className="clb-top">
          <span className="clb-name">Livello {lvlCfg.n} · {lvlCfg.label}</span>
          <span className="clb-count">{wins} / {lvlCfg.wins} vittorie</span>
        </div>
        <div className="clb-track">
          <div className="clb-fill" style={{width:`${Math.min((wins/lvlCfg.wins)*100,100)}%`}} />
          {Array.from({length: lvlCfg.wins}).map((_,i) => (
            <div key={i} className={`clb-mark ${i < wins ? "done" : ""}`}
              style={{left:`${((i+1)/lvlCfg.wins)*100}%`}} />
          ))}
        </div>
        <div className="clb-bottom">
          <span className="clb-att">{attLeft} partite rimaste</span>
          <span className="clb-need">{Math.max(0, lvlCfg.wins - wins)} vittorie mancanti</span>
        </div>
      </div>

      <div className="levels-grid">
        {LEVELS.map(l => {
          const isCurrent = l.n === curLevel;
          const isPassed  = completed.includes(l.n);
          const isLocked  = l.n > curLevel && !isPassed;
          return (
            <div key={l.n} className={`level-card ${isCurrent?"current":""} ${isPassed?"passed":""} ${isLocked?"locked":""}`}>
              <div className="lc-top">
                <span className="lc-num">{l.n}</span>
                {isPassed && <span className="lc-badge">✓</span>}
                {isLocked  && <span className="lc-lock">🔒</span>}
              </div>
              <p className="lc-label">{l.label}</p>
              <p className="lc-req">{l.wins}/{l.attempts}</p>
              {l.switches > 0 && <p className="lc-sw">⇄ {l.switches}</p>}
            </div>
          );
        })}
      </div>

      <button className="btn-primary" onClick={onPlay}>
        <span>Gioca livello {curLevel}</span><span className="btn-arr">→</span>
      </button>
    </div>
  );
}

// ─────────────────────────── POSTA ───────────────────────────────────────────
function PostaSelect({ bankroll, lvlCfg, onSelect, onBack }) {
  return (
    <div className="screen posta-screen">
      <div className="posta-header">
        <button className="btn-back" onClick={onBack}>← Indietro</button>
        <div className="bank-pill">
          <span className="bank-pill-val">{fmt(bankroll)}</span>
          <span className="bank-pill-lbl">pt</span>
        </div>
      </div>
      <div>
        <p className="eyebrow">Livello {lvlCfg.n} · {lvlCfg.label}</p>
        <h2 className="posta-title">Scegli la posta</h2>
        <p className="posta-sub">Decidi quanto rischiare prima di iniziare</p>
      </div>
      <div className="posta-list">
        {POSTE.map(p => {
          const cost    = p.cost === -1 ? bankroll : p.cost;
          const disabled = cost > bankroll || bankroll === 0;
          return (
            <button key={p.id} className={`posta-card ${disabled ? "disabled" : ""}`}
              onClick={() => !disabled && onSelect(p)} disabled={disabled}>
              <div className="pc-left">
                <span className="pc-name">{p.name}</span>
                <span className="pc-desc">{p.desc}</span>
              </div>
              <div className="pc-right">
                <span className="pc-mult">×{p.mult}</span>
                <span className="pc-cost">{p.cost === -1 ? "Tutto" : `−${fmt(p.cost)}`}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────── PLAYING ─────────────────────────────────────────
function Playing({ round, pts, chosen, outcomes, L, R, feedback, totalScore, lvlCfg, wins, isBonus, onPick }) {
  const displayed = useCounter(pts);
  return (
    <div className="screen playing-screen">
      <ScoreBar totalScore={totalScore} lvlCfg={lvlCfg} wins={wins} />
      <header className="play-hdr">
        <div>
          <p className="pts-lbl">Punti partita</p>
          <p className="pts-val">{fmt(displayed)}</p>
        </div>
        <div className="dots-row">
          <span className="rnd-lbl">Round {round + 1}/5</span>
          <div className="dots">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`dot ${i < outcomes.length ? outcomes[i] : i === round ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="clues-strip">
        {chosen.length === 0
          ? <span className="clues-empty">Le parole indizio appariranno qui</span>
          : chosen.map((w, i) => (
            <span key={i} className={`chip ${outcomes[i]==="bonus"?"bonus":outcomes[i]==="wrong"?"wrong":""}`}>{w}</span>
          ))
        }
      </div>

      {isBonus && <p className="bonus-hint">✦ Parola speciale — scegli con attenzione</p>}

      <div className="cards-area">
        <WordCard word={L} disabled={!!feedback} onClick={() => onPick(true)} />
        <div className="cards-sep">o</div>
        <WordCard word={R} disabled={!!feedback} onClick={() => onPick(false)} />
      </div>

      {feedback && (
        <div className="feedback-overlay">
          <div className={`fb-badge ${feedback.outcome}`}>
            {feedback.outcome === "bonus"
              ? <><span className="fb-bonus-lbl">✦ BONUS</span><span className="fb-pts fb-gold">×2</span><span className="fb-sub">{fmt(feedback.pts)} pt</span></>
              : <><span className="fb-pts">{feedback.outcome==="correct"?"+1.000":"−2.000"}</span><span className="fb-word">{feedback.word}</span></>
            }
          </div>
        </div>
      )}
    </div>
  );
}

function WordCard({ word, disabled, onClick }) {
  return (
    <button className={`word-card ${disabled ? "disabled" : ""}`} onClick={onClick}>
      <span className="word-txt">{word}</span>
    </button>
  );
}

// ─────────────────────────── FINAL ───────────────────────────────────────────
function Final({ pts, clues, sixthUsed, swLeft, onSwitch, totalScore, lvlCfg, wins, onTakeSixth, answer, onChange, onSubmit }) {
  const ref = useRef(null);
  const half = Math.floor(pts / 2);
  useEffect(() => { setTimeout(() => ref.current?.focus(), 80); }, []);
  return (
    <div className="screen final-screen">
      <ScoreBar totalScore={totalScore} lvlCfg={lvlCfg} wins={wins} />
      <div className="final-left">
        <p className="eyebrow">I tuoi indizi</p>
        <div className="clue-list">
          {clues.map((w, i) => (
            <div key={i} className="clue-row">
              <span className="clue-n">{String(i+1).padStart(2,"0")}</span>
              <span className="clue-w">{w}</span>
              {sixthUsed && i === clues.length-1 && i >= 5 && <span className="sixth-pill">6°</span>}
            </div>
          ))}
        </div>

        {/* Sesto indizio */}
        {!sixthUsed && (
          <button className="sixth-btn" onClick={onTakeSixth}>
            <span className="sixth-ico">＋</span>
            <span>
              <span className="sixth-title">Sesto indizio</span>
              <span className="sixth-cost">Costo: ÷2 → {fmt(half)} pt rimasti</span>
            </span>
          </button>
        )}

        {/* Switch — solo se disponibile */}
        {swLeft > 0 && (
          <button className="switch-btn" onClick={onSwitch}>
            <span className="switch-ico">⇄</span>
            <span>
              <span className="switch-title">Cambia parola</span>
              <span className="switch-sub">{swLeft} switch disponibili · riparte da capo</span>
            </span>
          </button>
        )}

        <div className="pts-row-sm" style={{marginTop:20,paddingTop:16,borderTop:"1px solid var(--border)"}}>
          <span className="pts-lbl">Punti partita</span>
          <span className="pts-val">{fmt(pts)}</span>
        </div>
      </div>

      <div className="final-right">
        <p className="eyebrow">La parola del nesso</p>
        <p className="final-q">Qual è la parola che le unisce tutte?</p>
        <input ref={ref} className="ans-inp" value={answer}
          onChange={e => onChange(e.target.value.toUpperCase())}
          placeholder="SCRIVI QUI"
          onKeyDown={e => e.key==="Enter" && answer.trim() && onSubmit()}
          autoCapitalize="characters" spellCheck={false} />
        <button className="btn-primary" onClick={onSubmit}
          disabled={!answer.trim()} style={{opacity: answer.trim()?1:0.35}}>
          <span>Risposta finale</span><span className="btn-arr">→</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── RESULT ──────────────────────────────────────────
function Result({ info, lvlCfg, onContinue }) {
  const { correct, pts, lvlStatus, newWins, newAtt, finalWord } = info;
  return (
    <div className={`screen result-screen ${correct ? "won" : "lost"}`}>
      <div className="result-inner">
        <div className="res-icon">{correct ? "🏆" : "💀"}</div>
        <p className="res-status">{correct ? "Risposta corretta!" : "Risposta errata"}</p>
        <div className={`res-word ${correct ? "res-word-won" : "res-word-lost"}`}>{finalWord}</div>

        {correct
          ? <><p className="pts-lbl" style={{textAlign:"center"}}>Punti partita</p>
                <p className="res-pts">+{fmt(pts)}</p></>
          : <p className="res-zero">La parola era <strong>{finalWord}</strong></p>
        }

        <div className="res-level">
          {lvlStatus === "passed" && (
            <div className="level-msg passed">
              <span>🎉</span>
              <div>
                <p className="lm-title">Livello {lvlCfg.n} superato!</p>
                <p className="lm-sub">Sblocchi il livello {Math.min(lvlCfg.n + 1, 8)}</p>
              </div>
            </div>
          )}
          {lvlStatus === "failed" && (
            <div className="level-msg failed">
              <span>😤</span>
              <div>
                <p className="lm-title">Livello non superato</p>
                <p className="lm-sub">{newWins}/{lvlCfg.wins} vittorie. Riprova!</p>
              </div>
            </div>
          )}
          {!lvlStatus && (
            <div className="res-progress">
              <p className="rp-txt">{newWins}/{lvlCfg.wins} vittorie · {newAtt} partite rimaste</p>
              <div className="rp-bar"><div className="rp-fill" style={{width:`${(newWins/lvlCfg.wins)*100}%`}} /></div>
            </div>
          )}
        </div>

        <button className="btn-primary" style={{marginTop:8}} onClick={onContinue}>
          <span>
            {lvlStatus === "passed" ? "Prossimo livello"
             : lvlStatus === "failed" ? "Ricomincia livello"
             : "Gioca ancora"}
          </span>
          <span className="btn-arr">→</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── SCORE BAR ───────────────────────────────────────
function ScoreBar({ totalScore, lvlCfg, wins }) {
  return (
    <div className="score-bar">
      <div className="sb-left">
        <span className="sb-lbl">Punteggio</span>
        <span className="sb-val">{fmt(totalScore)}</span>
      </div>
      <div className="sb-right">
        <span className="sb-lbl">Livello {lvlCfg.n}</span>
        <span className="sb-prog">{wins}/{lvlCfg.wins} vittorie</span>
      </div>
    </div>
  );
}

// ─────────────────────────── CSS ─────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#06080f;--s1:#0d1220;--s2:#131929;
  --border:rgba(201,162,39,.13);--bhi:rgba(201,162,39,.35);
  --gold:#c9a227;--glt:#e0bc5a;--gdim:rgba(201,162,39,.08);
  --green:#2dd47a;--red:#f0564a;--bonus:#f5a623;
  --text:#e8dece;--muted:#556070;--muted2:#3a4655;
}
html,body{height:100%;background:var(--bg)}
.app{min-height:100svh;background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--text);position:relative;overflow-x:hidden}
.bg-glow{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 80% 50% at 15% 10%,rgba(201,162,39,.045) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 85% 85%,rgba(201,162,39,.03) 0%,transparent 60%)}
.noise{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")}
.screen{position:relative;z-index:1;min-height:100svh;display:flex;flex-direction:column;padding:36px 22px 52px;width:100%;max-width:960px;margin:0 auto}
.eyebrow{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;display:block}
.pts-lbl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--muted)}
.pts-val{font-family:'Bebas Neue';font-size:48px;color:var(--gold);line-height:1;letter-spacing:2px}
.pts-row-sm{display:flex;justify-content:space-between;align-items:baseline}
.btn-primary{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--gold);color:#07090f;border:none;border-radius:6px;font-family:'DM Sans';font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;padding:18px 24px;cursor:pointer;width:100%;transition:background .2s,transform .12s}
.btn-primary:hover:not(:disabled){background:var(--glt)}
.btn-primary:active{transform:scale(.98)}
.btn-primary:disabled{cursor:default}
.btn-arr{font-size:17px;transition:transform .2s}
.btn-primary:hover .btn-arr{transform:translateX(4px)}
.btn-back{background:transparent;border:none;color:var(--muted);font-family:'DM Sans';font-size:13px;letter-spacing:1px;cursor:pointer;padding:0;display:flex;align-items:center;gap:6px;transition:color .2s}
.btn-back:hover{color:var(--text)}

/* SCORE BAR — always visible */
.score-bar{display:flex;justify-content:space-between;align-items:center;background:var(--s1);border:1px solid var(--border);border-radius:8px;padding:10px 16px;margin-bottom:20px}
.sb-left,.sb-right{display:flex;flex-direction:column;gap:1px}
.sb-right{align-items:flex-end}
.sb-lbl{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--muted)}
.sb-val{font-family:'Bebas Neue';font-size:26px;color:var(--gold);letter-spacing:2px;line-height:1}
.sb-prog{font-family:'Bebas Neue';font-size:22px;color:var(--glt);letter-spacing:1px;line-height:1}

/* LEVEL MAP — progress bar */
.score-pill{display:flex;flex-direction:column;align-items:flex-end;gap:1px;background:var(--s1);border:1px solid var(--border);border-radius:8px;padding:8px 14px}
.score-pill-lbl{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--muted)}
.score-pill-val{font-family:'Bebas Neue';font-size:24px;color:var(--gold);letter-spacing:2px;line-height:1}

.cur-level-bar{background:var(--s1);border:1px solid var(--gold);border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;gap:10px}
.clb-top{display:flex;justify-content:space-between;align-items:baseline}
.clb-name{font-size:14px;font-weight:600;color:var(--text)}
.clb-count{font-family:'Bebas Neue';font-size:22px;color:var(--gold);letter-spacing:1px}
.clb-track{position:relative;height:6px;background:var(--s2);border-radius:3px;overflow:visible}
.clb-fill{height:100%;background:var(--gold);border-radius:3px;transition:width .5s ease}
.clb-mark{position:absolute;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:var(--s2);border:2px solid var(--muted2);transition:all .3s}
.clb-mark.done{background:var(--gold);border-color:var(--gold)}
.clb-bottom{display:flex;justify-content:space-between}
.clb-att,.clb-need{font-size:11px;color:var(--muted);letter-spacing:.5px}

/* SWITCH BUTTON in final */
.switch-btn{display:flex;align-items:center;gap:13px;background:var(--s1);border:1px dashed rgba(245,166,35,.3);border-radius:9px;padding:13px 16px;cursor:pointer;width:100%;text-align:left;transition:all .2s;margin-top:8px}
.switch-btn:hover{border-color:var(--bonus);background:var(--s2)}
.switch-ico{font-size:20px;color:var(--bonus);width:30px;height:30px;border:1px solid rgba(245,166,35,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.switch-title{display:block;font-size:14px;font-weight:500;color:var(--text)}
.switch-sub{display:block;font-size:11px;color:var(--muted);margin-top:2px}

/* HOME */
.home-screen{justify-content:space-between}
.home-brand{display:flex;flex-direction:column}
.home-eyebrow{font-size:11px;letter-spacing:5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.home-logo{font-family:'Cormorant Garamond',serif;font-size:clamp(72px,18vw,130px);font-weight:700;line-height:.84;letter-spacing:-3px;color:var(--gold);text-transform:uppercase}
.home-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,3.5vw,20px);color:var(--muted);line-height:1.6;margin-top:14px}
.home-bank{display:flex;align-items:baseline;gap:8px;margin:32px 0 24px}
.bank-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--muted)}
.bank-val{font-family:'Bebas Neue';font-size:44px;color:var(--gold);letter-spacing:2px;margin-left:auto}
.bank-unit{font-size:13px;color:var(--muted);letter-spacing:2px}
.bank-pill{display:flex;align-items:baseline;gap:4px;background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:6px 14px}
.bank-pill-val{font-family:'Bebas Neue';font-size:22px;color:var(--gold);letter-spacing:1px}
.bank-pill-lbl{font-size:10px;color:var(--muted);letter-spacing:2px}

/* LEVEL MAP */
.lvlmap-screen{gap:24px}
.lvlmap-header{display:flex;justify-content:space-between;align-items:flex-start}
.lvlmap-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--gold);letter-spacing:1px}
.levels-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;flex:1}
.level-card{background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:14px 15px;display:flex;flex-direction:column;gap:4px;transition:all .2s;position:relative}
.level-card.current{border-color:var(--gold);background:rgba(201,162,39,.06)}
.level-card.passed{border-color:rgba(45,212,122,.3);opacity:.7}
.level-card.locked{opacity:.35}
.lc-top{display:flex;justify-content:space-between;align-items:center}
.lc-num{font-family:'Bebas Neue';font-size:32px;color:var(--gold);line-height:1;letter-spacing:1px}
.lc-badge{font-size:16px;color:var(--green)}
.lc-lock{font-size:14px}
.lc-label{font-size:13px;font-weight:600;color:var(--text)}
.lc-req{font-size:11px;color:var(--muted);letter-spacing:.5px}
.lc-sw{font-size:11px;color:var(--bonus)}
.lc-progress{margin-top:8px;display:flex;flex-direction:column;gap:5px}
.lc-bar{height:3px;background:var(--s2);border-radius:2px;overflow:hidden}
.lc-fill{height:100%;background:var(--gold);border-radius:2px;transition:width .4s ease}
.lc-prog-txt{font-size:10px;color:var(--muted);letter-spacing:.5px}

/* POSTA */
.posta-screen{gap:24px}
.posta-header{display:flex;justify-content:space-between;align-items:center}
.posta-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:var(--gold);margin-bottom:4px}
.posta-sub{font-size:13px;color:var(--muted)}
.posta-list{display:flex;flex-direction:column;gap:10px;flex:1;justify-content:center}
.posta-card{display:flex;justify-content:space-between;align-items:center;background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:18px 20px;cursor:pointer;width:100%;transition:all .2s;text-align:left}
.posta-card:hover:not(.disabled){border-color:var(--bhi);background:var(--s2)}
.posta-card.disabled{opacity:.3;cursor:default}
.pc-left{display:flex;flex-direction:column;gap:3px}
.pc-name{font-size:16px;font-weight:600;color:var(--text)}
.pc-desc{font-size:12px;color:var(--muted)}
.pc-right{display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.pc-mult{font-family:'Bebas Neue';font-size:32px;color:var(--gold);letter-spacing:1px;line-height:1}
.pc-cost{font-size:12px;color:var(--red)}

/* PLAYING */
.playing-screen{padding-top:24px}
.play-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
.play-hdr-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
.dots-row{display:flex;flex-direction:column;align-items:flex-end;gap:7px}
.rnd-lbl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted)}
.dots{display:flex;gap:6px}
.dot{width:clamp(24px,5.5vw,36px);height:3px;border-radius:2px;background:var(--s2);transition:background .4s}
.dot.active{background:var(--gold)}.dot.correct{background:var(--green)}.dot.wrong{background:var(--red)}.dot.bonus{background:var(--bonus)}
.btn-switch{background:transparent;border:1px solid rgba(245,166,35,.3);border-radius:4px;color:var(--bonus);font-family:'DM Sans';font-size:11px;font-weight:500;letter-spacing:1px;padding:6px 12px;cursor:pointer;transition:all .2s}
.btn-switch:hover:not(:disabled){border-color:var(--bonus);background:rgba(245,166,35,.08)}
.btn-switch:disabled{opacity:.3;cursor:default}
.clues-strip{display:flex;flex-wrap:wrap;gap:7px;min-height:32px;margin-bottom:20px;align-items:center}
.clues-empty{font-size:11px;color:var(--muted2);letter-spacing:1px}
.chip{background:var(--s2);border:1px solid var(--border);border-radius:4px;padding:4px 11px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--glt)}
.chip.wrong{color:var(--red);border-color:rgba(240,86,74,.2)}
.chip.bonus{color:var(--bonus);border-color:rgba(245,166,35,.28)}
.bonus-hint{font-size:11px;color:var(--bonus);letter-spacing:2px;text-transform:uppercase;text-align:center;margin-bottom:12px;animation:fadein .3s}
@keyframes fadein{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.cards-area{flex:1;display:flex;flex-direction:column;gap:0;justify-content:center}
.word-card{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:clamp(26px,7vh,52px) 20px;text-align:center;cursor:pointer;width:100%;transition:border-color .18s,transform .15s;position:relative;overflow:hidden}
.word-card::before{content:'';position:absolute;inset:0;background:var(--gdim);opacity:0;transition:opacity .18s}
.word-card:hover::before{opacity:1}
.word-card:hover{border-color:var(--bhi);transform:translateY(-3px)}
.word-card:active{transform:scale(.987)}
.word-card.disabled{opacity:.28;pointer-events:none}
.word-txt{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,9vw,52px);font-weight:700;letter-spacing:5px;text-transform:uppercase;color:var(--text);position:relative;z-index:1;pointer-events:none}
.cards-sep{text-align:center;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--muted2);padding:12px 0}
.feedback-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(6,8,15,.55);pointer-events:none;animation:fovl 1.8s ease forwards}
@keyframes fovl{0%{opacity:0}12%{opacity:1}72%{opacity:1}100%{opacity:0}}
.fb-badge{display:flex;flex-direction:column;align-items:center;gap:6px;padding:26px 52px;border-radius:14px;animation:bpop 1.8s ease forwards}
@keyframes bpop{0%{opacity:0;transform:scale(.65)}18%{opacity:1;transform:scale(1.04)}70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.93)}}
.fb-badge.correct{background:rgba(45,212,122,.08);border:1px solid rgba(45,212,122,.3)}
.fb-badge.wrong{background:rgba(240,86,74,.08);border:1px solid rgba(240,86,74,.25)}
.fb-badge.bonus{background:rgba(245,166,35,.1);border:2px solid rgba(245,166,35,.45)}
.fb-pts{font-family:'Bebas Neue';font-size:66px;letter-spacing:3px;line-height:1}
.fb-badge.correct .fb-pts{color:var(--green)}.fb-badge.wrong .fb-pts{color:var(--red)}.fb-gold{color:var(--bonus);font-size:54px}
.fb-bonus-lbl{font-family:'Bebas Neue';font-size:20px;letter-spacing:5px;color:var(--bonus)}
.fb-word{font-size:11px;letter-spacing:4px;text-transform:uppercase;opacity:.55}
.fb-sub{font-family:'Bebas Neue';font-size:26px;color:var(--bonus);letter-spacing:2px;opacity:.8}

/* FINAL */
.final-screen{gap:36px}
.final-left{display:flex;flex-direction:column}
.final-right{display:flex;flex-direction:column;gap:14px}
.clue-list{display:flex;flex-direction:column;gap:8px}
.clue-row{display:flex;align-items:center;gap:14px;background:var(--s1);border:1px solid var(--border);border-radius:8px;padding:12px 16px}
.clue-n{font-size:11px;color:var(--muted);letter-spacing:2px;width:22px;flex-shrink:0}
.clue-w{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;letter-spacing:3px;text-transform:uppercase;flex:1}
.sixth-pill{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);background:var(--gdim);border:1px solid var(--bhi);border-radius:4px;padding:3px 8px}
.sixth-btn{display:flex;align-items:center;gap:13px;background:var(--s1);border:1px dashed rgba(201,162,39,.28);border-radius:9px;padding:13px 16px;cursor:pointer;width:100%;text-align:left;transition:all .2s;margin-top:10px}
.sixth-btn:hover{border-color:var(--gold);background:var(--s2)}
.sixth-ico{font-size:20px;color:var(--gold);width:30px;height:30px;border:1px solid rgba(201,162,39,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sixth-title{display:block;font-size:14px;font-weight:500;color:var(--text)}
.sixth-cost{display:block;font-size:11px;color:var(--muted);margin-top:2px}
.final-q{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:4px}
.ans-inp{background:var(--s1);border:1px solid var(--bhi);border-radius:8px;color:var(--glt);font-family:'Cormorant Garamond',serif;font-size:clamp(26px,8vw,42px);font-weight:700;letter-spacing:6px;text-transform:uppercase;text-align:center;padding:20px 14px;width:100%;outline:none;caret-color:var(--gold);transition:border-color .2s,box-shadow .2s}
.ans-inp:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,162,39,.1)}
.ans-inp::placeholder{color:rgba(201,162,39,.18)}

/* RESULT */
.result-screen{align-items:center;justify-content:center;text-align:center}
.result-inner{display:flex;flex-direction:column;align-items:center;gap:12px;max-width:420px;width:100%}
.res-icon{font-size:72px;animation:idrop .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes idrop{from{transform:scale(0) translateY(-20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.res-word{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,12vw,68px);font-weight:700;letter-spacing:8px;text-transform:uppercase;animation:fadein .4s .2s both}
.res-word-won{color:var(--green)}
.res-word-lost{color:var(--red)}
.res-status{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--muted)}
.res-pts{font-family:'Bebas Neue';font-size:72px;color:var(--green);line-height:1;letter-spacing:2px;animation:fadein .4s .2s both}
.res-zero{font-size:14px;color:var(--red)}
.res-bank{display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 28px;background:var(--s1);border:1px solid var(--border);border-radius:10px;width:100%}
.res-bank-val{font-family:'Bebas Neue';font-size:40px;color:var(--gold);letter-spacing:2px}
.res-level{width:100%}
.level-msg{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:10px}
.level-msg.passed{background:rgba(45,212,122,.08);border:1px solid rgba(45,212,122,.25)}
.level-msg.failed{background:rgba(240,86,74,.08);border:1px solid rgba(240,86,74,.2)}
.level-msg>span{font-size:26px}
.lm-title{font-size:15px;font-weight:600;text-align:left}
.lm-sub{font-size:12px;color:var(--muted);text-align:left;margin-top:2px}
.res-progress{display:flex;flex-direction:column;gap:7px;width:100%;padding:14px;background:var(--s1);border:1px solid var(--border);border-radius:10px}
.rp-txt{font-size:12px;color:var(--muted);letter-spacing:.5px}
.rp-bar{height:3px;background:var(--s2);border-radius:2px;overflow:hidden}
.rp-fill{height:100%;background:var(--gold);border-radius:2px;transition:width .5s ease}

@media(min-width:600px){
  .screen{padding:48px 44px 60px}
  .levels-grid{grid-template-columns:repeat(4,1fr)}
  .cards-area{flex-direction:row;align-items:stretch}
  .word-card{flex:1;padding:clamp(44px,8vh,72px) 24px}
  .cards-sep{padding:0 14px;display:flex;align-items:center}
  .final-screen{flex-direction:row;align-items:flex-start;gap:48px}
  .final-left{flex:1.1}.final-right{flex:1;position:sticky;top:40px}
  .posta-list{flex-direction:row;flex-wrap:wrap}.posta-card{flex:1;min-width:160px}
}
@media(min-width:860px){
  .screen{padding:56px 72px 68px}
  .pts-val{font-size:56px}
  .dot{width:40px;height:4px}
}
`;
