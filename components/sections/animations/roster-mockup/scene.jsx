"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * The RosterLab product mockup used by the landing-page animations.
 *
 * Ported verbatim from the `public/landing/*.html` bundles that previously
 * ran through @babel/standalone in an iframe. Layout is absolute-positioned
 * against a fixed 2020x1085 canvas (see W/H) and scaled by <Stage>, so the
 * magic numbers below are canvas coordinates, not CSS pixels.
 *
 * Images that were inlined as base64 data URIs now live in
 * public/landing/mockup/ as WebP (983KB of PNG/JPEG -> 138KB).
 */

import { createContext, useContext, Fragment } from "react";
import { Sprite, useTime, interpolate, Easing, clamp } from "./stage";

const React = { Fragment };

/**
 * Locale for the handful of strings inside the mockup that read as
 * rostering-vs-scheduling copy. Everything else in here is either product
 * chrome or a proper noun, so this stays deliberately tiny — pass
 * `locale="us"` to <DesktopScene> on the US landing page.
 */
const SceneLocaleContext = createContext("au");
const useSceneCopy = () => COPY[useContext(SceneLocaleContext)] ?? COPY.au;

const COPY = {
  au: {
    myRoster: "My Roster",
    modalTitle: "Generating Rosters For You...",
    modalTease: "Our rostering A.I. could beat you at battleship ⚔️",
  },
  us: {
    myRoster: "My Schedule",
    modalTitle: "Generating Schedules For You...",
    modalTease: "Our scheduling A.I. could beat you at battleship ⚔️",
  },
};

// The two mockups differ only in the roster rows they show.
const StaffContext = createContext(null);
const useStaff = () => useContext(StaffContext) ?? STOOL_STAFF;
export function StaffProvider({ staff, children }) {
  return <StaffContext.Provider value={staff}>{children}</StaffContext.Provider>;
}

const UI = "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const FONT = "'Poppins', system-ui, sans-serif";

const C = {
  navL:'#16C6C0', navR:'#1BB2CE',
  teal:'#14C4BE', tealDk:'#0FA9A4',
  blue:'#1B8FD6', blueDk:'#1479B8',
  am:'#F9B248', pm:'#6DC48C', night:'#4EA9E8', al:'#C55FD4',
  avail:'#DDF4DD',
  ink:'#1F2C33', sub:'#5D6B73', line:'#E2E7EA', line2:'#EDF0F2',
  weekend:'#DCE5F4',
  grpL:'#F1F2F1', grpJul:'#FDF6E7', grpAug:'#FBF0F4',
  openBg:'#FDECF1', openLine:'#F3AFC5', openText:'#E5527E',
  modalTitle:'#1763C9',
};

export const W = 2020, H = 1085;
export const DW = 2283, DH = 1457;
const WIN = {x:60, y:38, w:1910, h:972};
const APP_T = 122;
const NAV_T = 124, NAV_H = 48;
const SIDE_X = 60, SIDE_W = 70;
const TBL_X = 150, TBL_R = 1895;
const DAY_X = 518, DAY_W = (TBL_R - DAY_X) / 14;
const GRP_T = 284, HEAD_T = 314, OPEN_T = 378, ROWS_T = 406, ROW_H = 25;
const BODY_B = 811;

const DAYS = [
  {d:27,w:'Mo'},{d:28,w:'Tu'},{d:29,w:'We'},{d:30,w:'Th'},{d:31,w:'Fr'},{d:1,w:'Sa'},{d:2,w:'Su'},
  {d:3,w:'Mo'},{d:4,w:'Tu'},{d:5,w:'We'},{d:6,w:'Th'},{d:7,w:'Fr'},{d:8,w:'Sa'},{d:9,w:'Su'},
];
const WEEKEND = new Set([5,6,12,13]);

const STOOL_STAFF = [
  {n:'Zac Low',          s:'RN, AM, …',   f:'0.90', to:10, row:['N','N','N','N','','','PM','PM','PM','PM','PM','','','']},
  {n:'Jack Sullivan',    s:'HCA, AM, …',  f:'0.60', to:13, row:['','','','','N','N','N','N','','','','','N','N']},
  {n:'Wei Chen',         s:'RN, AM, …',   f:'0.80', to:11, row:['AM','AM','AM','AM','PM','','','AM','AM','AM','AM','AM','','']},
  {n:'Priya Nair',       s:'RN, AM, …',   f:'0.70', to:11, row:['','','','','AM','AL','AM','','','N','N','N','','']},
  {n:'Santiago Vega',    s:'RN, AM, …',   f:'0.80', to:13, row:['PM','PM','PM','','','PM','N','N','N','','','PM','PM','PM']},
  {n:'Fatima Al-Rashid', s:'HCA, AM,…',   f:'0.80', to:10, row:['AM','N','N','N','','','','PM','PM','PM','PM','','','']},
  {n:'Kenji Nakamura',   s:'HCA, AM,…',   f:'0.60', to:13, row:['','','PM','PM','PM','','','','','','','AM','AM','AM']},
  {n:'Aaliyah Johnson',  s:'HCA, AM,…',   f:'0.80', to:13, row:['PM','PM','','','','AM','AM','AM','AM','','','','PM','PM']},
  {n:'Diego Morales',    s:'HCA, NIG…',   f:'0.80', to:11, row:['','AM','AM','AM','AM','','','','N','N','N','N','','']},
  {n:'Emily Carter',     s:'HCA, AM,…',   f:'0.60', to:11, row:['N','N','','','','PM','PM','','','AM','AM','PM','','']},
];


const BARS = [
  {r:0,c:1,k:'g'},{r:0,c:8,k:'b'},{r:1,c:5,k:'b'},{r:2,c:2,k:'g'},{r:2,c:9,k:'b'},
  {r:3,c:10,k:'g'},{r:4,c:1,k:'b'},{r:4,c:12,k:'g'},{r:5,c:3,k:'g'},{r:5,c:8,k:'b'},
  {r:6,c:3,k:'b'},{r:6,c:12,k:'g'},{r:7,c:6,k:'g'},{r:7,c:13,k:'b'},{r:8,c:2,k:'b'},
  {r:8,c:9,k:'g'},{r:9,c:0,k:'g'},{r:9,c:10,k:'b'},
];
const BAR_COLOR = {g:'#2F7D4F', b:'#3355B5'};

const SHIFT = {
  AM:{bg:C.am, label:'AM'},
  PM:{bg:C.pm, label:'PM'},
  N:{bg:C.night, label:'Night'},
  AL:{bg:C.al, label:'AL'},
};

// ── Timeline ────────────────────────────────────────────────────────────────
// Negative marks are pre-roll: they have already resolved by t=0, so the
// loop opens on a populated app rather than building it. Everything from
// genHover on is the visible story — cursor reaches Generate, clicks, the
// solver runs, the roster fills in.
//
// The lead-in is deliberately tight. A viewer landing on the hero sees the
// first movement almost immediately; anything longer reads as a static
// screenshot, and on a loop that dead air is paid again every cycle.
export const TL = {
  addStart: -3.0, addStep: 0.0,
  open: -1.0,
  genHover: 0.5, genClick: 1.2,
  modalStart: 1.9, modalEnd: 6.0,
  revealStart: 6.4, revStepC: 0.10, revStepR: 0.04,
  payoff: 13.4,
  end: 18.1,
};


const IC = {
  'caret-down': (s)=>[<path key="a" d="M6 9.5l6 6 6-6" {...s}/>],
  'caret-up': (s)=>[<path key="a" d="M6 14.5l6-6 6 6" {...s}/>],
  'caret-left': (s)=>[<path key="a" d="M15 6l-6 6 6 6" {...s}/>],
  'caret-right': (s)=>[<path key="a" d="M9 6l6 6-6 6" {...s}/>],
  'caret-double-left': (s)=>[<path key="a" d="M12.5 6.5l-5.5 5.5 5.5 5.5M19 6.5L13.5 12 19 17.5" {...s}/>],
  'x': (s)=>[<path key="a" d="M6 6l12 12M18 6L6 18" {...s}/>],
  'plus': (s)=>[<path key="a" d="M12 5v14M5 12h14" {...s}/>],
  'arrow-left': (s)=>[<path key="a" d="M20 12H4m0 0l6-6m-6 6l6 6" {...s}/>],
  'arrow-right': (s)=>[<path key="a" d="M4 12h16m0 0l-6-6m6 6l-6 6" {...s}/>],
  'arrow-clockwise': (s)=>[<path key="a" d="M19.6 13a8 8 0 11-2.6-6.8M20 4.5V10h-5.2" {...s}/>],
  'frame-corners': (s)=>[<path key="a" d="M9.5 4.5H4.5v5M14.5 4.5h5v5M14.5 19.5h5v-5M9.5 19.5H4.5v-5" {...s}/>],
  'squares-four': (s)=>[<path key="a" d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z" {...s}/>],
  'dots-three-vertical': (s,f)=>[5.6,12,18.4].map((y,i)=><circle key={i} cx="12" cy={y} r="1.5" {...f}/>),
  'dots-six-vertical': (s,f)=>[[9,6],[15,6],[9,12],[15,12],[9,18],[15,18]].map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="1.4" {...f}/>),
  'funnel': (s)=>[<path key="a" d="M4 5.5h16l-6.2 7.2V19l-3.6 1.8v-8.1z" {...s}/>],
  'magnifying-glass': (s)=>[<circle key="a" cx="10.5" cy="10.5" r="6.3" {...s}/>, <path key="b" d="M15.4 15.4L21 21" {...s}/>],
  'palette': (s,f)=>[<path key="a" d="M12 3.2c-5 0-8.8 3.9-8.8 8.8S7 20.8 12 20.8h1.7a2 2 0 001.9-2.4 1.9 1.9 0 011.9-2.3h1.1a3 3 0 003-3.1c-.3-5-4.4-8.8-9.6-8.8z" {...s}/>,
    <circle key="b" cx="8.6" cy="9" r="1.2" {...f}/>, <circle key="c" cx="12" cy="7.2" r="1.2" {...f}/>, <circle key="d" cx="15.4" cy="9" r="1.2" {...f}/>],
  'eye': (s)=>[<path key="a" d="M2.4 12S5.9 6 12 6s9.6 6 9.6 6-3.5 6-9.6 6-9.6-6-9.6-6z" {...s}/>, <circle key="b" cx="12" cy="12" r="2.7" {...s}/>],
  'calendar-plus': (s)=>[<path key="a" d="M4.5 6h15v13.5h-15zM8.5 3.5v4M15.5 3.5v4M4.5 10.5h15" {...s}/>, <path key="b" d="M12 13v4.4M9.8 15.2h4.4" {...s}/>],
  'calendar-dots': (s,f)=>[<path key="a" d="M4.5 6h15v13.5h-15zM8.5 3.5v4M15.5 3.5v4M4.5 10.5h15" {...s}/>,
    ...[8.5,12,15.5].map((x,i)=><circle key={i} cx={x} cy="15" r="1.1" {...f}/>)],
  'calendar-check': (s)=>[<path key="a" d="M4.5 6h15v13.5h-15zM8.5 3.5v4M15.5 3.5v4M4.5 10.5h15" {...s}/>, <path key="b" d="M9 15l2.1 2.1 4-4" {...s}/>],
  'clipboard-text': (s)=>[<path key="a" d="M5.5 4.5h13v16h-13zM9 4.5V3h6v1.5" {...s}/>, <path key="b" d="M8.5 11h7M8.5 15h4.5" {...s}/>],
  'user-plus': (s)=>[<circle key="a" cx="9.5" cy="8" r="3.3" {...s}/>, <path key="b" d="M3.4 20c0-3.3 2.8-5.3 6.1-5.3 1.2 0 2.3.3 3.2.7" {...s}/>, <path key="c" d="M17.5 9.5v6M14.5 12.5h6" {...s}/>],
  'clock-clockwise': (s)=>[<path key="a" d="M12 4.2a7.8 7.8 0 11-7.4 5.3" {...s}/>, <path key="b" d="M12 8.4V12l3 1.8" {...s}/>, <path key="c" d="M4.2 5.4v4.2h4.2" {...s}/>],
  'clock-counter-clockwise': (s)=>[<path key="a" d="M12 4.2a7.8 7.8 0 107.4 5.3" {...s}/>, <path key="b" d="M12 8.4V12l3 1.8" {...s}/>, <path key="c" d="M19.8 5.4v4.2h-4.2" {...s}/>],
  'list-checks': (s)=>[<path key="a" d="M3.6 6.4l1.8 1.8 3-3M3.6 13l1.8 1.8 3-3M3.6 19.6l1.8 1.8 3-3" {...s}/>, <path key="b" d="M12.5 6.6h8M12.5 13.2h8M12.5 19.8h8" {...s}/>],
  'check-square': (s)=>[<path key="a" d="M4.5 4.5h15v15h-15z" {...s}/>, <path key="b" d="M8.4 12l2.6 2.6 4.6-5.2" {...s}/>],
  'chart-line-up': (s)=>[<path key="a" d="M4 19V5M4 19h16" {...s}/>, <path key="b" d="M6.8 15.2l3.6-4.2 3 2.6 4.2-5.4" {...s}/>, <path key="c" d="M14.6 8.2h3.6v3.6" {...s}/>],
  'faders-horizontal': (s)=>[<path key="a" d="M3.6 8h9M17 8h3.4M3.6 16h3.4M11.6 16h8.8" {...s}/>, <circle key="b" cx="14.8" cy="8" r="2.2" {...s}/>, <circle key="c" cx="9.4" cy="16" r="2.2" {...s}/>],
  'sliders-horizontal': (s)=>[<path key="a" d="M3.6 8h9M17 8h3.4M3.6 16h3.4M11.6 16h8.8" {...s}/>, <circle key="b" cx="14.8" cy="8" r="2.2" {...s}/>, <circle key="c" cx="9.4" cy="16" r="2.2" {...s}/>],
  'share-network': (s)=>[<circle key="a" cx="6.2" cy="12" r="2.6" {...s}/>, <circle key="b" cx="17.8" cy="6" r="2.6" {...s}/>, <circle key="c" cx="17.8" cy="18" r="2.6" {...s}/>, <path key="d" d="M8.6 10.9l6.8-3.4M8.6 13.1l6.8 3.4" {...s}/>],
  'download-simple': (s)=>[<path key="a" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19.5h14" {...s}/>],
  'bell': (s)=>[<path key="a" d="M6.2 16.4v-4.9a5.8 5.8 0 1111.6 0v4.9l1.9 1.9H4.3z" {...s}/>, <path key="b" d="M10.1 20.4a2 2 0 003.8 0" {...s}/>],
  'arrows-out': (s)=>[<path key="a" d="M4 9.5V4h5.5M20 9.5V4h-5.5M4 14.5V20h5.5M20 14.5V20h-5.5" {...s}/>],
  'wifi-high': (s,f)=>[<path key="a" d="M3.6 9.2a12 12 0 0116.8 0M6.8 12.6a8 8 0 0110.4 0M10 16.1a4 4 0 014 0" {...s}/>, <circle key="b" cx="12" cy="19.2" r="1.3" {...f}/>],
  'trash': (s)=>[<path key="a" d="M4 6.8h16M9.2 6.8V4h5.6v2.8" {...s}/>, <path key="b" d="M6.2 6.8l1 13.2h9.6l1-13.2" {...s}/>, <path key="c" d="M10.4 10.6v5.6M13.6 10.6v5.6" {...s}/>],
  'book-open': (s)=>[<path key="a" d="M12 6.4C10 4.9 7.6 4.4 4 4.6v13c3.6-.2 6 .3 8 1.8 2-1.5 4.4-2 8-1.8v-13c-3.6-.2-6 .3-8 1.8z" {...s}/>, <path key="b" d="M12 6.4v12.8" {...s}/>],
  'robot': (s,f)=>[<path key="a" d="M5 8.5h14v10H5z" {...s}/>, <path key="b" d="M12 5v3.5" {...s}/>, <circle key="c" cx="9.2" cy="13" r="1.3" {...f}/>, <circle key="d" cx="14.8" cy="13" r="1.3" {...f}/>],
};

const IC_FILL = {
  'sparkle': (f)=>[<path key="a" d="M12 2.4l2.1 6.6 6.6 2.1-6.6 2.1-2.1 6.6-2.1-6.6L3.3 11.1l6.6-2.1z" {...f}/>,
    <path key="b" d="M18.6 15.4l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" {...f}/>],
  'magic-wand': (f)=>[<path key="a" d="M3.2 19.4L14 8.6l1.8 1.8L5 21.2z" {...f}/>,
    <path key="b" d="M17.2 2.6l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z" {...f}/>,
    <path key="c" d="M6.4 3.4l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7L4.1 5.7l1.7-.6z" {...f}/>],
  'user': (f)=>[<circle key="a" cx="12" cy="8" r="4.1" {...f}/>, <path key="b" d="M4 20.4c0-4.4 3.6-7 8-7s8 2.6 8 7z" {...f}/>],
  'clock': (f)=>[<circle key="a" cx="12" cy="12" r="8.6" {...f}/>, <path key="b" d="M12 7v5.4l3.4 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>],
  'chat-teardrop-dots': (f)=>[<path key="a" d="M12 3.2a8.8 8.8 0 00-7.6 13.2L3.2 20.8l4.4-1.2A8.8 8.8 0 1012 3.2z" {...f}/>,
    ...[8.6,12,15.4].map((x,i)=><circle key={i} cx={x} cy="12" r="1.15" fill="#fff"/>)],
  'apple-logo': (f)=>[<path key="a" d="M16.4 12.5c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.2.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.6 2.7.6 1.1 0 1.8-1 2.5-2 .5-.8.8-1.6.8-1.7-.1 0-2-.8-2-2.9z" {...f}/>,
    <path key="b" d="M14.2 6.2c.5-.6.9-1.5.8-2.3-.8 0-1.7.5-2.2 1.2-.5.6-.9 1.5-.8 2.3.9.1 1.7-.5 2.2-1.2z" {...f}/>],
  'battery-high': (f)=>[<path key="a" d="M2.6 8.4h15.2c.7 0 1.2.5 1.2 1.2v4.8c0 .7-.5 1.2-1.2 1.2H2.6c-.7 0-1.2-.5-1.2-1.2V9.6c0-.7.5-1.2 1.2-1.2z" fill="none" stroke={f.fill} strokeWidth="1.4"/>,
    <path key="b" d="M3.4 10.2h11.4v3.6H3.4z" {...f}/>, <path key="c" d="M20.4 10.6v2.8" stroke={f.fill} strokeWidth="1.6" strokeLinecap="round"/>],
  'star': (f)=>[<path key="a" d="M12 3.4l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z" fill="none" stroke={f.fill} strokeWidth="1.7" strokeLinejoin="round"/>],
  'calendar-plus': (f)=>[<path key="a" d="M4.5 6h15v13.5h-15zM8.5 3.5v4M15.5 3.5v4M4.5 10.5h15" fill="none" stroke={f.fill} strokeWidth="1.7" strokeLinecap="round"/>,
    <path key="b" d="M12 13v4.4M9.8 15.2h4.4" fill="none" stroke={f.fill} strokeWidth="1.7" strokeLinecap="round"/>],
};

function Ph({n, size=18, color=C.sub, weight='fill', style}){
  const st = {stroke:color, strokeWidth:1.7, strokeLinecap:'round', strokeLinejoin:'round', fill:'none'};
  const fl = {fill:color};
  const fill = IC_FILL[n];
  const draw = fill ? fill(fl) : (IC[n] ? IC[n](st, fl) : IC['squares-four'](st, fl));
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display:'block', flexShrink:0, ...(style||{})}}>
      {draw}
    </svg>
  );
}

// ── Browser chrome ──────────────────────────────────────────────────────────
function BrowserChrome(){
  const dot = (x,bg)=>(<div key={x} style={{position:'absolute', left:x, top:52, width:12, height:12, borderRadius:6, background:bg}}/>);
  return (
    <React.Fragment>
      {/* tab strip */}
      <div style={{position:'absolute', left:WIN.x, top:WIN.y, width:WIN.w, height:42,
        background:'#DEE7FA', borderRadius:'12px 12px 0 0'}}/>
      {dot(76,'#FF5F57')}{dot(99,'#FEBC2E')}{dot(122,'#28C840')}
      <div style={{position:'absolute', left:154, top:50, width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Ph weight="regular" n="caret-down" size={13} color="#4A5A63" weight="regular"/>
      </div>
      <div style={{position:'absolute', left:185, top:42, width:226, height:34, background:'#fff',
        borderRadius:'9px 9px 0 0', display:'flex', alignItems:'center', gap:9, paddingLeft:12}}>
        <span style={{fontFamily:UI, fontSize:13, color:'#202124'}}>RosterLab App</span>
        <div style={{marginLeft:'auto', marginRight:10}}><Ph weight="regular" n="x" size={12} color="#5F6368"/></div>
      </div>
      <div style={{position:'absolute', left:427, top:49, width:16, height:16}}><Ph weight="regular" n="plus" size={14} color="#4A5A63" weight="regular"/></div>
      {/* url bar */}
      <div style={{position:'absolute', left:WIN.x, top:80, width:WIN.w, height:42, background:'#fff'}}/>
      <div style={{position:'absolute', left:71, top:92, display:'flex', gap:20}}>
        <Ph weight="regular" n="arrow-left" size={17} color="#3C4043"/>
        <Ph weight="regular" n="arrow-right" size={17} color="#BDC1C6"/>
        <Ph weight="regular" n="arrow-clockwise" size={17} color="#3C4043"/>
      </div>
      <div style={{position:'absolute', left:176, top:86, right:250, height:30, background:'#F1F3F4', borderRadius:16,
        display:'flex', alignItems:'center', gap:10, paddingLeft:14}}>
        <Ph weight="regular" n="faders-horizontal" size={14} color="#5F6368"/>
        <span style={{fontFamily:UI, fontSize:13.5, color:'#202124', whiteSpace:'nowrap', overflow:'hidden'}}>
          rosterlab.com
        </span>
      </div>
      <div style={{position:'absolute', right:78, top:92, display:'flex', alignItems:'center', gap:18}}>
        <Ph weight="regular" n="frame-corners" size={16} color="#3C4043"/>
        <Ph weight="regular" n="star" size={16} color="#3C4043"/>
        <Ph weight="regular" n="squares-four" size={16} color="#3C4043"/>
        <div style={{width:1, height:20, background:'#DADCE0'}}/>
        <Ph weight="regular" n="dots-three-vertical" size={17} color="#3C4043"/>
      </div>
    </React.Fragment>
  );
}

// ── Top nav ─────────────────────────────────────────────────────────────────
function TopNav(){
  const link = {fontFamily:UI, fontSize:14.5, color:'#fff', opacity:0.95};
  const items = ['Schedules','Timesheet','Requests'];
  return (
    <div style={{position:'absolute', left:SIDE_X, top:NAV_T, width:WIN.w, height:NAV_H,
      background:`linear-gradient(90deg, ${C.navR}, ${C.navL})`, zIndex:6}}>
      <div style={{position:'absolute', left:18, top:8, height:32, background:'rgba(255,255,255,0.18)',
        borderRadius:7, display:'flex', alignItems:'center', gap:26, padding:'0 12px 0 14px'}}>
        <span style={{fontFamily:UI, fontSize:13.5, color:'#fff'}}>RosterLab Roster</span>
        <Ph n="caret-down" size={12} color="#fff"/>
      </div>
      <div style={{position:'absolute', left:262, top:0, height:NAV_H, display:'flex', alignItems:'stretch'}}>
        {items.map((it,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', padding:'0 22px',
            background: i===0 ? 'rgba(255,255,255,0.13)' : 'transparent',
            borderBottom: i===0 ? '3px solid #fff' : '3px solid transparent'}}>
            <span style={link}>{it}</span>
          </div>
        ))}
      </div>
      <div style={{position:'absolute', left:'50%', top:4, transform:'translateX(-50%)'}}>
        <img src="/landing/mockup/rosterlab-logo.webp" alt="RosterLab"
          style={{height:40, width:'auto', display:'block'}}/>
      </div>
      <div style={{position:'absolute', right:22, top:0, height:NAV_H, display:'flex', alignItems:'center', gap:22}}>
        <Ph n="calendar-dots" size={19} color="#fff"/>
        <Ph n="share-network" size={19} color="#fff"/>
        <Ph n="download-simple" size={19} color="#fff"/>
        <Ph n="bell" size={19} color="#fff"/>
        <div style={{width:1, height:24, background:'rgba(255,255,255,0.45)'}}/>
        <div style={{width:32, height:32, borderRadius:16, background:'#fff', display:'flex', alignItems:'center',
          justifyContent:'center', fontFamily:UI, fontSize:12.5, fontWeight:600, color:C.blueDk}}>RL</div>
        <Ph n="caret-down" size={13} color="#fff"/>
      </div>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────────────────
const SIDE_ITEMS = [
  {ic:'clipboard-text', label:null, labelKey:'myRoster', y:210},
  {ic:'user-plus', label:'Employees', y:279},
  {ic:'clock-clockwise', label:'Shift/Shift\nGroups', y:340},
  {ic:'list-checks', label:'Tasks', y:402},
  {ic:'check-square', label:'Rules', y:450},
  {ic:'chart-line-up', label:'Demands', y:504},
  {ic:'clock-counter-clockwise', label:'History', y:558},
  {ic:'calendar-check', label:'Fixed\nShifts/Leave', y:619},
  {ic:'faders-horizontal', label:'Preferences', y:675},
  {ic:'sparkle', label:'A.I.\nSolutions', y:737},
];

function Sidebar({time}){
  const copy = useSceneCopy();
  const empActive = time>=TL.addStart-0.2 && time<TL.open-0.3;
  const shiftActive = time>=TL.open-0.3 && time<TL.genHover-0.2;
  let gScale=1, gGlow=false;
  if(time>=TL.genHover && time<TL.genClick){ gScale=1.06; gGlow=true; }
  if(time>=TL.genClick && time<TL.genClick+0.28){ gScale=0.94; gGlow=true; }
  return (
    <div style={{position:'absolute', left:SIDE_X, top:APP_T+NAV_H+2, width:SIDE_W, bottom:H-WIN.y-WIN.h,
      background:'#fff', borderRight:`1px solid ${C.line}`}}>
      {SIDE_ITEMS.map((it,i)=>{
        const label = it.labelKey ? copy[it.labelKey] : it.label;
        const two = label.indexOf('\n')>=0;
        const active = i===0 || (it.ic==='user-plus'&&empActive) || (it.ic==='clock-clockwise'&&shiftActive);
        const col = active ? '#1479B8' : '#219BC6';
        const top = it.y - (two?40:36) - (APP_T+NAV_H+2);
        return (
          <div key={i} style={{position:'absolute', left:4, right:4, top, height:two?54:48,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4,
            background: active&&i===0 ? '#E8F2FB' : 'transparent', borderRadius:6}}>
            {active && <div style={{position:'absolute', left:-4, top:2, bottom:2, width:3, background:col, borderRadius:2}}/>}
            <Ph n={it.ic} size={23} color={col} weight={it.ic==='sparkle'?'fill':'regular'}/>
            <div style={{fontFamily:UI, fontSize:9.5, fontWeight:500, lineHeight:1.15, textAlign:'center',
              whiteSpace:'pre', color:col}}>{label}</div>
          </div>
        );
      })}
      {/* Generate */}
      <div style={{position:'absolute', left:6, right:9, top:750-(APP_T+NAV_H+2), height:56, borderRadius:10,
        background:`linear-gradient(135deg, ${C.navR}, ${C.navL})`, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:3, transform:`scale(${gScale})`, transformOrigin:'center',
        boxShadow: gGlow ? '0 6px 18px rgba(20,196,190,0.55)' : '0 2px 6px rgba(20,196,190,0.35)'}}>
        <Ph n="magic-wand" size={18} color="#fff" weight="fill"/>
        <div style={{fontFamily:UI, fontSize:9, fontWeight:600, color:'#fff'}}>Generate</div>
      </div>
    </div>
  );
}

// ── Toolbar rows ────────────────────────────────────────────────────────────
const pill = {fontFamily:UI, fontSize:13.5, color:C.ink, border:`1px solid ${C.line}`, borderRadius:7,
  height:38, display:'flex', alignItems:'center', padding:'0 16px', background:'#fff', boxSizing:'border-box'};
const arrowBtn = {width:42, height:38, borderRadius:7, background:C.blue, display:'flex', alignItems:'center', justifyContent:'center'};

function Toolbar({time}){
  return (
    <React.Fragment>
      {/* chevron tab next to sidebar */}
      <div style={{position:'absolute', left:118, top:190, width:22, height:22, borderRadius:5,
        background:'#fff', border:`1px solid ${C.line}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Ph n="caret-right" size={11} color={C.sub} weight="regular"/>
      </div>
      {/* date row */}
      <div style={{position:'absolute', left:TBL_X, top:196, display:'flex', alignItems:'center', gap:12}}>
        <div style={{...pill, width:133, justifyContent:'center'}}>27/07/2026</div>
        <div style={{...pill, width:135, justifyContent:'center'}}>06/09/2026</div>
        <div style={arrowBtn}><Ph n="caret-left" size={15} color="#fff" weight="regular"/></div>
        <div style={{...pill, padding:'0 20px'}}>Current schedule period</div>
        <div style={arrowBtn}><Ph n="caret-right" size={15} color="#fff" weight="regular"/></div>
        <div style={{display:'flex', background:'#EFF1F2', borderRadius:19, padding:3, gap:2, marginLeft:2}}>
          <div style={{width:38, height:30, borderRadius:16, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Ph n="user" size={15} color={C.sub} weight="fill"/></div>
          <div style={{width:38, height:30, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Ph n="clock" size={15} color={C.sub} weight="fill"/></div>
        </div>
      </div>
      {/* right buttons */}
      <div style={{position:'absolute', right:W-1918, top:196, display:'flex', alignItems:'center', gap:11}}>
        <div style={{...pill, border:`1.5px solid ${C.blue}`, color:C.blueDk, padding:'0 22px', fontWeight:500}}>Versions</div>
        <div style={{...pill, border:`1.5px solid ${C.blue}`, color:C.blueDk, padding:'0 22px', fontWeight:500}}>Re-roster</div>
        <div style={{...pill, border:`1.5px solid ${C.blue}`, color:C.blueDk, padding:'0 22px', fontWeight:500}}>Publish</div>
      </div>
      {/* filter row */}
      <div style={{position:'absolute', left:TBL_X+8, top:247, display:'flex', alignItems:'center', gap:0}}>
        <div style={{display:'flex', alignItems:'center', height:28, border:`1px solid ${C.line}`, borderRadius:4,
          background:'#fff', boxSizing:'border-box'}}>
          <span style={{fontFamily:UI, fontSize:13, color:'#98A4AB', padding:'0 12px', width:150}}>Search keywords</span>
          <div style={{width:30, height:26, borderLeft:`1px solid ${C.line}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Ph n="magnifying-glass" size={14} color={C.blueDk} weight="regular"/>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8, marginLeft:32}}>
          <Ph n="palette" size={16} color={C.blue}/>
          <span style={{fontFamily:UI, fontSize:14, color:C.blue}}>Color Coding</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:11, marginLeft:26}}>
          <div style={{width:34, height:19, borderRadius:10, background:C.teal, position:'relative'}}>
            <div style={{position:'absolute', right:2, top:2, width:15, height:15, borderRadius:8, background:'#fff'}}/>
          </div>
          <span style={{fontFamily:UI, fontSize:14, color:C.ink}}>Show what's published</span>
        </div>
      </div>
      <div style={{position:'absolute', right:W-1918, top:249, display:'flex', alignItems:'center', gap:30}}>
        <div style={{display:'flex', alignItems:'center', gap:9}}><Ph n="eye" size={17} color={C.blue}/>
          <span style={{fontFamily:UI, fontSize:14, color:C.blue}}>Show/Hide</span></div>
        <div style={{display:'flex', alignItems:'center', gap:9}}><Ph n="faders-horizontal" size={17} color={C.blue}/>
          <span style={{fontFamily:UI, fontSize:14, color:C.blue}}>Adjust column width</span></div>
        <div style={{display:'flex', alignItems:'center', gap:5}}><Ph n="dots-three-vertical" size={15} color={C.blue} weight="regular"/>
          <span style={{fontFamily:UI, fontSize:14, color:C.blue}}>Export</span></div>
      </div>
    </React.Fragment>
  );
}

// ── Table ───────────────────────────────────────────────────────────────────
function ColHeadCell({label, x, w, last}){
  return (
    <div style={{position:'absolute', left:x, top:0, width:w, height:64, boxSizing:'border-box',
      borderRight: last?'none':`1px solid ${C.line}`, display:'flex', alignItems:'center', gap:6, paddingLeft:12}}>
      <span style={{fontFamily:UI, fontSize:13, fontWeight:600, color:C.ink}}>{label}</span>
      <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:2, paddingRight:6}}>
        <Ph n="funnel" size={12} color={C.sub}/>
        <Ph n="dots-three-vertical" size={12} color={C.sub} weight="regular"/>
      </div>
    </div>
  );
}

function Table({time}){
  const staff = useStaff();
  const cols = DAYS.map((d,i)=>({...d, x: DAY_X + i*DAY_W}));
  return (
    <div style={{position:'absolute', left:TBL_X, top:GRP_T, width:TBL_R-TBL_X, height:BODY_B-GRP_T,
      border:`1px solid ${C.line}`, boxSizing:'border-box', background:'#fff'}}>
      {/* group header */}
      <div style={{position:'absolute', left:0, top:0, right:0, height:30, display:'flex'}}>
        <div style={{width:DAY_X-TBL_X, background:C.grpL, display:'flex', alignItems:'center', gap:8, paddingLeft:12}}>
          <span style={{fontFamily:UI, fontSize:13, fontWeight:600, color:C.ink}}>Employees</span>
          <Ph n="caret-double-left" size={12} color={C.ink} weight="regular"/>
        </div>
        <div style={{width:7*DAY_W, background:C.grpJul, display:'flex', alignItems:'center', paddingLeft:12,
          fontFamily:UI, fontSize:13, color:C.ink}}>July - Week 1 (C)</div>
        <div style={{flex:1, background:C.grpAug, display:'flex', alignItems:'center', paddingLeft:12,
          borderLeft:`1px solid ${C.line}`, fontFamily:UI, fontSize:13, color:C.ink}}>August - Week 2 (D)</div>
      </div>
      {/* column header */}
      <div style={{position:'absolute', left:0, top:30, right:0, height:64, borderTop:`1px solid ${C.line}`}}>
        <ColHeadCell label="Name" x={0} w={250}/>
        <ColHeadCell label="FTE" x={250} w={118}/>
        {cols.map((c,i)=>(
          <div key={i} style={{position:'absolute', left:c.x-TBL_X, top:0, width:DAY_W, height:64,
            boxSizing:'border-box', borderLeft:`1px solid ${C.line}`}}>
            <div style={{height:30, display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:UI, fontSize:13, color:C.ink}}>{c.d}</div>
            <div style={{height:34, background:WEEKEND.has(i)?C.weekend:'#fff', display:'flex', alignItems:'center',
              paddingLeft:12, fontFamily:UI, fontSize:12.5, color:C.ink}}>{c.w}</div>
          </div>
        ))}
      </div>
      {/* open shifts row */}
      <div style={{position:'absolute', left:0, top:OPEN_T-GRP_T, right:0, height:28,
        borderTop:`1px solid ${C.line}`, borderBottom:`1px solid ${C.line}`}}>
        <div style={{position:'absolute', left:4, top:1, width:DAY_X-TBL_X-8, height:24, background:C.openBg,
          border:`1px solid ${C.openLine}`, borderRadius:2, display:'flex', alignItems:'center',
          justifyContent:'center', gap:7}}>
          <Ph n="calendar-plus" size={13} color={C.openText} weight="fill"/>
          <span style={{fontFamily:UI, fontSize:13, fontWeight:600, color:C.openText}}>Open Shifts</span>
        </div>
        {cols.map((c,i)=>(
          <div key={i} style={{position:'absolute', left:c.x-TBL_X, top:0, width:DAY_W, height:26,
            background:'#fff', borderLeft:`1px solid ${C.line}`, boxSizing:'border-box',
            display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Ph n="calendar-plus" size={13} color={C.openText}/>
          </div>
        ))}
      </div>
      {/* employee rows */}
      {staff.map((st,r)=>{
        const nameAt = TL.addStart + r*TL.addStep;
        const ne = Easing.easeOutCubic(clamp((time-nameAt)/0.4,0,1));
        return (
          <div key={r} style={{position:'absolute', left:0, top:ROWS_T-GRP_T + r*ROW_H, right:0, height:ROW_H,
            borderBottom:`1px solid ${C.line2}`}}>
            <div style={{position:'absolute', left:0, top:0, width:DAY_X-TBL_X, height:'100%',
              display:'flex', alignItems:'center', opacity:ne, transform:`translateX(${(1-ne)*-10}px)`}}>
              <div style={{width:24, display:'flex', justifyContent:'center'}}><Ph n="dots-six-vertical" size={13} color="#9AA6AD" weight="regular"/></div>
              <span style={{fontFamily:UI, fontSize:13, color:C.ink, width:226}}>{st.n}</span>
              <span style={{fontFamily:UI, fontSize:12, color:C.ink}}>{st.f}</span>
            </div>
            {DAYS.map((d,c)=>{
              const v = st.row[c];
              const at = TL.revealStart + c*TL.revStepC + r*TL.revStepR;
              const p = clamp((time-at)/0.3,0,1);
              const e = Easing.easeOutBack(p);
              const sh = v ? SHIFT[v] : null;
              const bar = BARS.find(m=>m.r===r&&m.c===c);
              return (
                <div key={c} style={{position:'absolute', left:DAY_X-TBL_X + c*DAY_W, top:0, width:DAY_W, height:ROW_H,
                  boxSizing:'border-box', borderLeft:`1px solid ${C.line2}`, background:'#fff'}}>
                  {sh && p>0 && (
                    <div style={{position:'absolute', left:0, top:0, right:-1, bottom:0, background:sh.bg,
                      display:'flex', alignItems:'center', paddingLeft:14, fontFamily:UI, fontSize:12, color:C.ink,
                      opacity:p, transform:`scale(${0.7+0.3*e})`}}>{sh.label}</div>
                  )}
                  {bar && sh && p>0 && (
                    <div style={{position:'absolute', left:0, right:-1, bottom:0, height:4,
                      background:BAR_COLOR[bar.k], opacity:p}}/>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* horizontal scrollbar */}
      <div style={{position:'absolute', left:DAY_X-TBL_X, top:BODY_B-GRP_T-22, width:448, height:7,
        borderRadius:4, background:'#B9C0C5'}}/>
    </div>
  );
}

// ── Shift types popover ─────────────────────────────────────────────────────

function RightRail(){
  const vtab = {writingMode:'vertical-rl', fontFamily:UI, fontSize:9, letterSpacing:'0.09em',
    color:'#3F4E56', textAlign:'center'};
  return (
    <React.Fragment>
      <div style={{position:'absolute', left:1898, top:302, width:21, height:372, background:'#fff',
        border:`1px solid ${C.line}`, boxSizing:'border-box', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'flex-start', paddingTop:8, gap:16}}>
        <div style={vtab}>SHIFT &amp; SKILL COUNTS STATS</div>
        <div style={vtab}>RULE &amp; DEMAND VIOLATIONS</div>
      </div>
      <div style={{position:'absolute', left:1920, top:454, width:40, height:132, borderRadius:'6px 0 0 6px',
        background:'#219BC6', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6}}>
        <img src="/landing/mockup/right-rail.webp" alt="Otto" style={{width:24, height:24, objectFit:'contain', display:'block'}}/>
        <div style={{fontFamily:UI, fontSize:9, fontWeight:700, color:'#fff', lineHeight:1.25, textAlign:'center'}}>ASK<br/>OTTO</div>
        <div style={{background:'rgba(0,0,0,0.18)', borderRadius:3, padding:'1px 5px',
          fontFamily:UI, fontSize:7.5, fontWeight:700, color:'#fff', letterSpacing:'0.06em'}}>BETA</div>
      </div>
      {/* page scrollbar */}
      <div style={{position:'absolute', left:1956, top:130, width:7, height:868, borderRadius:4, background:'#F1F3F4'}}/>
      <div style={{position:'absolute', left:1956, top:130, width:7, height:300, borderRadius:4, background:'#C8CFD3'}}/>
    </React.Fragment>
  );
}

function Footer(){
  const staff = useStaff();
  const legend = [
    {t:'Fulfilled Fixed Shifts', bg:'#CFE7D2', c:'#2C5C34'},
    {t:'Fulfilled Preference',   bg:'#D2DCF4', c:'#33407A'},
    {t:'Recommendation',         bg:'#F8C3B2', c:'#7A3524'},
    {t:'Critical Warning',       bg:'#F4694A', c:'#ffffff'},
  ];
  return (
    <React.Fragment>
      <div style={{position:'absolute', left:TBL_X, top:BODY_B, width:TBL_R-TBL_X, height:30,
        border:`1px solid ${C.line}`, borderTop:'none', boxSizing:'border-box', display:'flex', alignItems:'center'}}>
        <span style={{fontFamily:UI, fontSize:12.5, color:C.ink, paddingLeft:14}}>Rows: <b style={{fontWeight:700}}>{staff.length}</b></span>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:9, paddingRight:16}}>
          <Ph n="arrows-out" size={15} color={C.blue}/>
          <span style={{fontFamily:UI, fontSize:14, color:C.blue}}>Expand View</span>
        </div>
      </div>
      <div style={{position:'absolute', left:TBL_X-2, top:860, fontFamily:UI, fontSize:13, color:C.ink}}>saved</div>
      <div style={{position:'absolute', right:W-1918, top:890, display:'flex', gap:12}}>
        {legend.map((l,i)=>(
          <div key={i} style={{background:l.bg, color:l.c, fontFamily:UI, fontSize:13, borderRadius:3,
            padding:'6px 14px'}}>{l.t}</div>
        ))}
      </div>
      <div style={{position:'absolute', left:1893, top:943, width:48, height:48, borderRadius:24,
        background:'#219BC6', display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 4px 14px rgba(0,0,0,0.18)'}}>
        <Ph n="chat-teardrop-dots" size={24} color="#fff" weight="fill"/>
      </div>
    </React.Fragment>
  );
}

// ── Generating modal ────────────────────────────────────────────────────────
const MODAL_MSGS = [
  null, // locale-dependent teaser, filled in at render
  'Balancing 14 days across 10 staff…',
  'Respecting every fixed shift, leave and request…',
  'Checking hundreds of rules at once…',
];

function GenModal({time}){
  const copy = useSceneCopy();
  const msgs = MODAL_MSGS.map((m) => m ?? copy.modalTease);
  return (
    <Sprite start={TL.modalStart} end={TL.modalEnd+0.4}>
      {({localTime,duration})=>{
        const ex=duration-0.4;
        let op=1, sc=1, by=0;
        if(localTime<0.35){const t=Easing.easeOutBack(localTime/0.35); op=clamp(localTime/0.35,0,1); sc=0.86+0.14*t;}
        else if(localTime>ex){const t=Easing.easeInCubic((localTime-ex)/0.4); op=1-t; sc=1+0.04*t; by=-t*10;}
        const pct = Math.round(clamp((time-(TL.modalStart+0.4))/((TL.modalEnd-0.4)-(TL.modalStart+0.4)),0,1)*100);
        const msgIdx = Math.min(msgs.length-1, Math.floor(localTime/1.85));
        return (
          <div style={{position:'absolute', left:WIN.x, top:WIN.y, width:WIN.w, height:WIN.h, borderRadius:12,
            background:'rgba(90,104,116,0.45)', zIndex:20, opacity:op,
            display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:660, background:'#fff', borderRadius:20, padding:'42px 50px',
              boxShadow:'0 30px 80px rgba(20,40,60,0.35)', transform:`scale(${sc}) translateY(${by}px)`}}>
              <div style={{fontFamily:FONT, fontSize:32, fontWeight:700, color:C.modalTitle, marginBottom:24}}>
                {copy.modalTitle}
              </div>
              <div style={{display:'flex', alignItems:'center', gap:18}}>
                <div style={{flex:1, height:24, borderRadius:13, background:'#EEF1F4', overflow:'hidden',
                  border:`1px solid ${C.line}`}}>
                  <div style={{height:'100%', width:`${pct}%`, borderRadius:13,
                    background:`repeating-linear-gradient(115deg, ${C.blue} 0 14px, #5FB8EC 14px 28px)`}}/>
                </div>
                <div style={{fontFamily:FONT, fontSize:24, fontWeight:700, color:C.blueDk, width:64, textAlign:'right'}}>{pct}%</div>
              </div>
              <div style={{fontFamily:UI, fontSize:17, color:C.ink, marginTop:24}}>{msgs[msgIdx]}</div>
              <div style={{textAlign:'right', marginTop:16}}>
                <span style={{fontFamily:UI, fontSize:17, color:C.sub, textDecoration:'underline'}}>Dismiss</span>
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Cursor ──────────────────────────────────────────────────────────────────
function Cursor({time}){
  // Leaves the corner almost at once — the hold here is what the viewer
  // reads as the mockup "not doing anything", so it stays short enough to
  // feel like the cursor was already on its way in.
  const ks=[0,0.08,TL.genHover,TL.end];
  const cx = interpolate(ks,[1200,1200,95,95],Easing.easeInOutCubic)(time);
  const cy = interpolate(ks,[900,900,778,778],Easing.easeInOutCubic)(time);
  const op = interpolate([0,0.04,0.28,TL.genClick+0.2,TL.genClick+0.7,TL.end],[0,0,1,1,0,0])(time);
  const clicks=[TL.genClick];
  return (
    <React.Fragment>
      {clicks.map((ct,i)=>{
        const lt=time-ct;
        if(lt<0||lt>0.5) return null;
        const t=lt/0.5;
        return (
          <div key={i} style={{position:'absolute', left:cx, top:cy, zIndex:30}}>
            <div style={{position:'absolute', left:-2, top:-2, width:4, height:4, borderRadius:'50%',
              border:`2px solid ${C.tealDk}`, transform:`translate(-50%,-50%) scale(${1+t*9})`, opacity:1-t}}/>
          </div>
        );
      })}
      <div style={{position:'absolute', left:cx, top:cy, opacity:op, zIndex:31,
        filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M5 3l5 16 2.5-6.5L19 10 5 3z" fill="#fff" stroke="#1B2A33" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      </div>
    </React.Fragment>
  );
}

// ── App + camera ────────────────────────────────────────────────────────────
export function AppUI({time}){
  return (
    <div style={{position:'absolute', inset:0, background:'transparent'}}>
      <div style={{position:'absolute', left:WIN.x, top:WIN.y, width:WIN.w, height:WIN.h, background:'#fff',
        borderRadius:12, boxShadow:'0 18px 60px rgba(20,40,60,0.18), 0 0 0 1px rgba(20,40,60,0.06)'}}/>
      <BrowserChrome/>
      <TopNav/>
      <Sidebar time={time}/>
      <Toolbar time={time}/>
      <Table time={time}/>
      <RightRail/>
      <Footer/>
      <GenModal time={time}/>
      <Cursor time={time}/>
    </div>
  );
}




// ═════════════════════════════════════════════════════════════════════════
// macOS desktop frame
// ═════════════════════════════════════════════════════════════════════════
const MENU_H = 30;
const MENUS = ['Chrome','File','Edit','View','History','Bookmarks','Profiles','Tab','Window','Help'];

function MenuBar(){
  return (
    <div style={{position:'absolute', left:0, top:0, right:0, height:MENU_H, background:'rgba(250,250,250,0.55)',
      backdropFilter:'blur(18px)', display:'flex', alignItems:'center', paddingLeft:44, paddingRight:44, zIndex:40}}>
      <Ph n="apple-logo" size={15} color="rgba(20,22,24,0.9)" weight="fill"/>
      <div style={{display:'flex', alignItems:'center', gap:19, marginLeft:20}}>
        {MENUS.map((m,i)=>(
          <span key={i} style={{fontFamily:UI, fontSize:12.5, fontWeight:i===0?600:400,
            color:'rgba(20,22,24,0.9)'}}>{m}</span>
        ))}
      </div>
      <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:16}}>
        <Ph n="battery-high" size={17} color="rgba(20,22,24,0.9)" weight="fill"/>
        <Ph n="wifi-high" size={15} color="rgba(20,22,24,0.9)" weight="regular"/>
        <Ph n="magnifying-glass" size={14} color="rgba(20,22,24,0.9)" weight="regular"/>
        <Ph n="sliders-horizontal" size={14} color="rgba(20,22,24,0.9)" weight="regular"/>
        <span style={{fontFamily:UI, fontSize:12.5, color:'rgba(20,22,24,0.9)'}}>Mon 27 Jul  9:41 am</span>
      </div>
    </div>
  );
}

const ICON = {
  finder:  '/landing/mockup/dock-finder.webp',
  chrome:  '/landing/mockup/dock-chrome.webp',
  messages:'/landing/mockup/dock-messages.webp',
  notes:   '/landing/mockup/dock-notes.webp',
  photos:  '/landing/mockup/dock-photos.webp',
  music:   '/landing/mockup/dock-music.webp',
  settings:'/landing/mockup/dock-settings.webp',
};

function CalendarIcon(){
  return (
    <div style={{width:66, height:66, borderRadius:15, overflow:'hidden', background:'#fff',
      display:'flex', flexDirection:'column'}}>
      <div style={{height:17, background:'#EA4B3C', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:UI, fontSize:10, fontWeight:700, color:'#fff', letterSpacing:'0.08em'}}>JUL</div>
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:UI, fontSize:32, fontWeight:400, color:'#2b3138'}}>27</div>
    </div>
  );
}

function TerminalPrompt(){
  return (
    <div style={{width:66, height:66, borderRadius:15, background:'linear-gradient(160deg,#3a4249,#14181b)',
      display:'flex', alignItems:'center', justifyContent:'center', gap:4,
      fontFamily:'ui-monospace, SFMono-Regular, monospace', fontSize:24, color:'#fff'}}>
      <span>&gt;</span><span style={{width:13, height:3, background:'#fff', marginTop:10}}/>
    </div>
  );
}

function Dock(){
  const shadow = '0 5px 14px rgba(0,0,0,0.32)';
  const img = (n) => ({width:n, height:n, borderRadius:n*0.225, display:'block', boxShadow:shadow});
  const items = [
    {src:ICON.finder},
    {src:ICON.chrome, running:true, size:58},
    {src:ICON.messages},
    {src:ICON.notes},
    {src:ICON.photos, size:58},
    {src:ICON.music},
    {el:<CalendarIcon/>},
    {el:<TerminalPrompt/>},
    {src:ICON.settings},
  ];
  return (
    <div style={{position:'absolute', left:'50%', bottom:16, transform:'translateX(-50%)', height:92,
      display:'flex', alignItems:'center', gap:13, padding:'0 16px', borderRadius:24,
      background:'rgba(226,235,240,0.30)', backdropFilter:'blur(26px)',
      boxShadow:'0 18px 45px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.35)', zIndex:40}}>
      {items.map((d,i)=>(
        <div key={i} style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
          {d.src ? <img src={d.src} alt="" style={img(d.size || 66)}/> : <div style={{boxShadow:shadow, borderRadius:15}}>{d.el}</div>}
          {d.running && (
            <div style={{position:'absolute', bottom:-11, left:'50%', marginLeft:-2.5, width:5, height:5,
              borderRadius:3, background:'rgba(255,255,255,0.9)'}}/>
          )}
        </div>
      ))}
      <div style={{width:1, height:60, background:'rgba(255,255,255,0.35)', margin:'0 4px'}}/>
      <div style={{width:66, height:66, borderRadius:15, display:'flex', alignItems:'center', justifyContent:'center',
        background:'linear-gradient(160deg,rgba(255,255,255,0.5),rgba(230,236,240,0.3))', boxShadow:shadow}}>
        <Ph n="trash" size={32} color="#4a5560" weight="regular"/>
      </div>
    </div>
  );
}

export function DesktopScene({locale = "au"}){
  const time = useTime();
  return (
    <SceneLocaleContext.Provider value={locale}>
    <div style={{position:'absolute', inset:0, overflow:'hidden', background:'#2a6fb5'}}>
      <img src="/landing/mockup/desktop-wallpaper.webp" alt="" style={{position:'absolute', inset:0, width:'100%',
        height:'100%', objectFit:'cover', display:'block'}}/>
      <MenuBar/>
      <div style={{position:'absolute', left:0, top:0, width:W, height:H, transformOrigin:'0 0',
        transform:'translate(-44px, -12px) scale(1.168, 1.319)',
        filter:'drop-shadow(0 30px 60px rgba(0,20,30,0.45))'}}>
        <AppUI time={time}/>
      </div>
      <Dock/>
    </div>
    </SceneLocaleContext.Provider>
  );
}
