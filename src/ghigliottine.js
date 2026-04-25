Ecco il contenuto da incollare:

```js
const GHIGLIOTTINE = [
  // LIVELLO 1
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
  // LIVELLO 2
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
  // LIVELLO 3
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
  // LIVELLO 4
  {id:43,w:"CHIAVE",d:4,b:1,s:"MAZZO",c:[{r:"INGLESE",x:"FRANCESE"},{r:"VOLTA",x:"ARCO"},{r:"SOL",x:"RE"},{r:"LETTURA",x:"SCRITTURA"},{r:"GIRAVA",x:"SPINGEVA"}]},
  {id:44,w:"PIEDE",d:4,b:3,s:"CALZA",c:[{r:"LETTERA",x:"PAROLA"},{r:"PAGINA",x:"CAPITOLO"},{r:"PIATTO",x:"FONDO"},{r:"GUERRA",x:"PACE"},{r:"NOTA",x:"ACCORDO"}]},
  {id:45,w:"CODA",d:4,b:0,s:"STRASCICO",c:[{r:"CAVALLO",x:"ASINO"},{r:"CINEMA",x:"TEATRO"},{r:"RONDINE",x:"COLOMBA"},{r:"OCCHIO",x:"NASO"},{r:"ABITO",x:"VESTITO"}]},
  {id:46,w:"BANCO",d:4,b:2,s:"DATI",c:[{r:"NEBBIA",x:"NUVOLA"},{r:"PROVA",x:"ESAME"},{r:"PESCE",x:"MARE"},{r:"SANGUE",x:"OSSO"},{r:"CHIESA",x:"MOSCHEA"}]},
  {id:47,w:"CORRENTE",d:4,b:4,s:"ELETTRICA",c:[{r:"ALTERNATA",x:"CONTINUA"},{r:"TENERE",x:"LASCIARE"},{r:"PENSIERO",x:"IDEA"},{r:"MARINA",x:"FLUVIALE"},{r:"STARE",x:"RESTARE"}]},
  {id:48,w:"TIRO",d:4,b:1,s:"ARCO",c:[{r:"LUNGO",x:"CORTO"},{r:"MANCINO",x:"DESTRO"},{r:"FUNE",x:"CORDA"},{r:"LIBERO",x:"OBBLIGATO"},{r:"SEGNO",x:"BERSAGLIO"}]},
  {id:49,w:"CORSA",d:4,b:3,s:"STAFFETTA",c:[{r:"CAVALLI",x:"ASINI"},{r:"OSTACOLI",x:"BARRIERE"},{r:"TAXI",x:"BUS"},{r:"GIRO",x:"VOLTA"},{r:"SACCO",x:"BORSA"}]},
  {id:50,w:"SCALA",d:4,b:2,s:"CORDA",c:[{r:"MOBILE",x:"FISSA"},{r:"REALE",x:"FINTA"},{r:"MUSICA",x:"PITTURA"},{r:"GRIGIA",x:"NERA"},{r:"ANTINCENDIO",x:"EMERGENZA"}]},
];

export default GHIGLIOTTINE;
```

Poi **"Commit changes"** → **"Commit changes"**.

Dimmi quando fatto — poi aggiorniamo `IlNesso.jsx` per leggere da questo file.
