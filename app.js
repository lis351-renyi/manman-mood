'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const icons = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  book:'<path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4z"/><path d="M13 7a3 3 0 0 1 3-3h5v15h-4a4 4 0 0 0-4 2"/><path d="M7 8h3M7 11h3"/>',
  chart:'<path d="M4 4v16h17"/><path d="m7 14 4-5 4 3 6-7"/><path d="M17 5h4v4"/>',
  heart:'<path d="M20.8 4.6a5.6 5.6 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.6 5.6 0 0 0-7.8 8L12 21l8.8-8.4a5.6 5.6 0 0 0 0-8z"/>',
  leaf:'<path d="M20 3c1 10-1 17-8 17a7 7 0 0 1-7-7C5 6 12 6 20 3Z"/><path d="M4 21 16 9M9 16v-5M9 16h5"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/>',
  life:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6m5.6 5.6 3.6 3.6m0-12.8-3.6 3.6m-5.6 5.6-3.6 3.6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2"/>',
  play:'<path d="m8 5 11 7-11 7z" fill="currentColor" stroke-width="0"/>',
  pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sparkle:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  edit:'<path d="m16 3 5 5-12 12-6 1 1-6zM13 6l5 5"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  check:'<path d="m5 12 4 4L20 5"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  music:'<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="17" cy="16" rx="3" ry="3"/>',
  wave:'<path d="M2 8c3-5 5 5 8 0s5 5 8 0 4 0 4 0M2 16c3-5 5 5 8 0s5 5 8 0 4 0 4 0"/>',
  stretch:'<circle cx="12" cy="4" r="2"/><path d="m5 9 7 2 7-4M12 11v5m0 0-5 6m5-6 5 6"/>',
  flower:'<path d="M12 13C3 11 4 3 8 3c3 0 4 7 4 10Zm0 0C21 11 20 3 16 3c-3 0-4 7-4 10Zm0 0c-6-4-10 1-7 4 3 3 7-4 7-4Zm0 0c6-4 10 1 7 4-3 3-7-4-7-4Zm0 0v9"/>',
  volume:'<path d="m11 4-6 5H2v6h3l6 5zM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.1"/>',
  moon:'<path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1"/>'
};
function icon(name, extra=''){ return '<svg class="icon '+extra+'" viewBox="0 0 24 24" aria-hidden="true">'+(icons[name]||icons.sparkle)+'</svg>'; }
function esc(value){ return String(value??'').replace(/[&<>"']/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
const moods=[
  {name:'很低落',color:'#c3c5df',shadow:'#dfe0ed',ink:'#8a8eaf'},
  {name:'有点难过',color:'#b5c7d3',shadow:'#dbe5eb',ink:'#7c98aa'},
  {name:'平平静静',color:'#c3cfb4',shadow:'#e1e8d8',ink:'#8a9f76'},
  {name:'还不错',color:'#edd29c',shadow:'#f8eacd',ink:'#c8a569'},
  {name:'很开心',color:'#e6baa4',shadow:'#f5ddd0',ink:'#c59279'}
];
function face(level){
  const m=moods[level-1]||moods[2];
  let mouth=level===1?'<path d="M20 34q8-9 16 0"/>':level===2?'<path d="M21 33q7-5 14 0"/>':level===3?'<path d="M23 32h10"/>':level===4?'<path d="M20 29q8 10 16 0"/>':'<path d="M19 28q9 15 18 0Z" fill="'+m.ink+'" stroke="none"/>';
  const eyes=level===5?'<path d="m18 23 3-2 3 2m8 0 3-2 3 2"/>':'<path d="M21 22v2M35 22v2"/>';
  return '<span class="face" aria-label="'+m.name+'"><svg viewBox="0 0 56 56" aria-hidden="true"><ellipse cx="28" cy="50" rx="15" ry="2" fill="'+m.shadow+'" opacity=".5"/><circle cx="28" cy="27" r="23" fill="'+m.shadow+'" opacity=".5"/><circle cx="28" cy="26" r="20" fill="'+m.color+'"/><ellipse cx="22" cy="15" rx="9" ry="6" fill="#fff" opacity=".13"/><g stroke="'+m.ink+'" stroke-width="1.6" stroke-linecap="round" fill="none">'+eyes+mouth+'</g><ellipse cx="16.5" cy="28" rx="2.5" ry="1.2" fill="'+m.ink+'" opacity=".16"/><ellipse cx="39.5" cy="28" rx="2.5" ry="1.2" fill="'+m.ink+'" opacity=".16"/></svg></span>';
}
const TAGS=['学业','工作','人际','家庭','睡眠','独处','运动','天气','小确幸'];
const KEY='manman-mood-v1';
const defaults={mode:'demo',entries:[],favorites:[],sessions:[]};
let state=structuredClone(defaults), storageOK=true;
try{
  const saved=JSON.parse(localStorage.getItem(KEY)||'null');
  if(saved&&typeof saved==='object'){
    state.mode=saved.mode==='personal'?'personal':'demo';
    state.entries=Array.isArray(saved.entries)?saved.entries.filter(e=>e&&typeof e.id==='string'&&Number.isInteger(e.mood)&&e.mood>=1&&e.mood<=5&&!isNaN(Date.parse(e.date))).map(e=>({...e,note:String(e.note||'').slice(0,2000),tags:Array.isArray(e.tags)?e.tags.filter(t=>TAGS.includes(t)):[],intensity:Math.max(1,Math.min(10,Number(e.intensity)||5))})):[];
    state.favorites=Array.isArray(saved.favorites)?saved.favorites.filter(v=>typeof v==='string'):[];
    state.sessions=Array.isArray(saved.sessions)?saved.sessions.filter(s=>s&&typeof s.careId==='string'&&!isNaN(Date.parse(s.date))):[];
  }
}catch(e){storageOK=false;}
function persist(next){state=next;try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;return true;}catch(e){storageOK=false;return false;}}
function dateKey(date){const d=new Date(date);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function ago(days,hour=20){const d=new Date();d.setDate(d.getDate()-days);d.setHours(hour,30,0,0);if(d>new Date())d.setTime(Date.now()-60000);return d.toISOString();}
const demoEntries=[
  {id:'d1',date:ago(6),mood:3,intensity:4,tags:['独处','睡眠'],note:'晚上给自己泡了一杯热茶。没有特别开心，也没有特别难过，这样平静地待一会儿也很好。'},
  {id:'d2',date:ago(5),mood:4,intensity:6,tags:['运动','小确幸'],note:'下班后绕路去公园走了走，刚好看到很漂亮的晚霞。原来快乐也可以是这么小的一件事。'},
  {id:'d3',date:ago(4),mood:2,intensity:8,tags:['工作','睡眠'],note:'待办一件接着一件，昨晚也没有睡好。感觉自己有点被掏空了，今天想早点休息。'},
  {id:'d4',date:ago(3),mood:3,intensity:5,tags:['工作','独处'],note:'把任务拆成了小块，终于没那么慌了。午休时什么都没做，就安静地坐了一会儿。'},
  {id:'d5',date:ago(2),mood:4,intensity:6,tags:['人际','小确幸'],note:'和很久没见的朋友吃了顿饭。聊了一些有的没的，被认真听见的感觉真好。'},
  {id:'d6',date:ago(1),mood:3,intensity:4,tags:['家庭','独处'],note:'整理了房间，给家里打了电话。平凡的一天，也有属于它的温柔。'},
  {id:'d7',date:ago(0,8),mood:4,intensity:5,tags:['运动','小确幸'],note:'早起给自己做了一顿早餐，又在阳光里散了会儿步。今天决定，不着急，慢慢来。'}
];
let currentPage=['today','journal','insights','care'].includes(location.hash.slice(1))?location.hash.slice(1):'today';
let rangeDays=7,diarySearch='',diaryMood='',careFilter='all',activeModal=null,previousFocus=null,practice=null,audioEngine=null,toastTimer;
const NAV=[['today','grid','今日概览'],['journal','book','情绪日记'],['insights','chart','情绪洞察'],['care','heart','自我关怀']];
const CARES=[
  {id:'breath',title:'把心事交给呼吸',desc:'跟随一呼一吸，给自己一个温柔的停顿。',category:'meditate',type:'正念冥想',kind:'breath',minutes:5,art:'breath',icon:'flower',hint:'适合紧绷、心绪有些乱的时候'},
  {id:'rain',title:'雨落在窗边',desc:'让细碎的雨声，为纷乱的思绪留白。',category:'music',type:'自然声音',kind:'rain',minutes:15,art:'rain',icon:'wave',hint:'适合需要安静陪伴的时候'},
  {id:'stretch',title:'让身体先松下来',desc:'放下肩膀，也放下今天一点点的疲惫。',category:'move',type:'轻运动',kind:'stretch',minutes:5,art:'stretch',icon:'stretch',hint:'适合久坐、身体紧绷的时候'},
  {id:'music',title:'一段慢下来的旋律',desc:'没有歌词的柔和音符，陪你留在此刻。',category:'music',type:'舒缓音乐',kind:'music',minutes:10,art:'music',icon:'music',hint:'适合想暂时放空的时候'},
  {id:'ground',title:'找回此刻的自己',desc:'用感官感受周围，轻轻把思绪带回来。',category:'meditate',type:'感官觉察',kind:'ground',minutes:3,art:'ground',icon:'sun',hint:'适合思绪不停打转的时候'},
  {id:'walk',title:'去和微风见个面',desc:'慢慢走一段路，把注意力交给脚步。',category:'move',type:'轻运动',kind:'walk',minutes:10,art:'walk',icon:'leaf',hint:'适合想换一口新鲜空气的时候'}
];
function entries(){return state.mode==='demo'?demoEntries:state.entries;}
function recentEntries(days=rangeDays){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-days+1);return entries().filter(e=>new Date(e.date)>=d&&new Date(e.date)<=new Date());}
function prettyDate(date,weekday=false){const d=new Date(date);return (d.getMonth()+1)+'月'+d.getDate()+'日'+(weekday?'  星期'+'日一二三四五六'[d.getDay()]:'');}
function timeOf(date){return new Date(date).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false});}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function sampleBadge(){return state.mode==='demo'?'<span class="soft-badge">示例</span>':'';}
function titleBlock(title,sub,eyebrow,right){return '<div class="page-title"><div><div class="eyebrow">'+eyebrow+'</div><h1>'+title+'</h1><p>'+sub+'</p></div>'+(right||'')+'</div>';}
function dateNote(){return '<div class="date-note">'+icon('calendar')+prettyDate(new Date(),true)+'</div>';}
function moodButtons(action,selected=0,extra=''){return '<div class="mood-options '+extra+'" role="group" aria-label="选择心情">'+moods.map((m,i)=>'<button type="button" class="mood-option '+(selected===i+1?'selected':'')+'" data-action="'+action+'" data-mood="'+(i+1)+'" aria-label="'+m.name+'" aria-pressed="'+(selected===i+1)+'">'+face(i+1)+'<span>'+m.name+'</span></button>').join('')+'</div>';}
function header(){
  $('#brandIcon').innerHTML='<img src="favicon.svg" width="38" height="38" alt="">';
  $('#navigation').innerHTML=NAV.map(n=>'<a href="#'+n[0]+'" class="nav-item '+(currentPage===n[0]?'active':'')+'" '+(currentPage===n[0]?'aria-current="page"':'')+'>'+icon(n[1])+'<span>'+n[2]+'</span></a>').join('');
  $('#breadcrumb').textContent=NAV.find(n=>n[0]===currentPage)[2];
  $('#modePill').classList.toggle('personal',state.mode==='personal');
  $('#modePill').innerHTML=icon(state.mode==='demo'?'sparkle':'lock')+(state.mode==='demo'?'体验模式 · 示例数据':'我的记录 · 本地保存');
  $('#privacyLink').innerHTML=icon('lock')+'数据与隐私';
  $('#supportLink').innerHTML=icon('life')+'需要更多支持';
}
function chartHTML(days,full=false){
  const list=recentEntries(days),W=640,H=190,pad=14,plotH=142;
  const dates=Array.from({length:days},(_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-days+1+i);return d;});
  const points=dates.map((d,i)=>{const dayEntries=list.filter(e=>dateKey(e.date)===dateKey(d));return {date:d,x:pad+i*(W-pad*2)/(days-1),value:dayEntries.length?dayEntries.reduce((sum,e)=>sum+e.mood,0)/dayEntries.length:null,count:dayEntries.length};});
  const grid=[0,1,2].map(i=>'<line class="grid-line" x1="0" y1="'+(12+i*plotH/2)+'" x2="'+W+'" y2="'+(12+i*plotH/2)+'"/>').join('');
  let line='',areas='',segment=[];
  function flush(){if(!segment.length)return;const path=segment.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+(12+(5-p.value)*plotH/4).toFixed(1)).join(' ');line+='<path class="chart-line" d="'+path+'"/>';if(segment.length>1)areas+='<path d="'+path+' L'+segment.at(-1).x+','+(plotH+12)+' L'+segment[0].x+','+(plotH+12)+' Z" fill="url(#area-'+days+')"/>';segment=[];}
  points.forEach(p=>{if(p.value!==null)segment.push(p);else flush();});flush();
  const dots=points.filter(p=>p.value!==null).map(p=>'<circle class="chart-dot" cx="'+p.x.toFixed(1)+'" cy="'+(12+(5-p.value)*plotH/4).toFixed(1)+'" r="'+(days===7?4:2.5)+'"><title>'+prettyDate(p.date)+'，'+moods[Math.round(p.value)-1].name+'，'+p.count+'条记录</title></circle>').join('');
  const labels=points.filter((p,i)=>days===7||i%5===0||i===days-1).map(p=>'<text x="'+p.x.toFixed(1)+'" y="184" text-anchor="middle">'+(p.date.getMonth()+1)+'.'+p.date.getDate()+'</text>').join('');
  const average=list.length?list.reduce((s,e)=>s+e.mood,0)/list.length:0;
  return '<div class="chart-area"><div class="y-labels"><span>愉悦</span><span>平静</span><span>低落</span></div>'+(list.length?'<svg class="chart" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" role="img" aria-label="最近'+days+'天情绪变化折线图，'+list.length+'条'+(state.mode==='demo'?'示例':'')+'记录。相同日期按心情等级平均，无记录日期留空。"><defs><linearGradient id="area-'+days+'" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#cbb7df" stop-opacity=".25"/><stop offset="1" stop-color="#cbb7df" stop-opacity=".02"/></linearGradient></defs>'+grid+areas+line+dots+labels+'</svg>':'<div class="chart-empty">给心情一个落脚的地方<br><small>记录后，这里会慢慢长出你的情绪轨迹。</small></div>')+'</div><div class="chart-footer"><span>'+icon('leaf')+(list.length?(average>=3.5?'有些小小的美好，正在发生。':average>=2.8?'起伏之间，记得给自己一点空间。':'这段日子有些辛苦，先照顾好自己。'):'从今天的一次记录开始。')+'</span><span>'+list.length+' 条记录'+(state.mode==='demo'?' · 示例':'')+'</span></div>';
}
function trendCard(full=false){return '<section class="card trend-card '+(full?'full-trend':'')+'"><div class="section-header"><h2>心情的起伏，都有迹可循'+sampleBadge()+'</h2><div class="segmented" aria-label="趋势时间范围"><button class="'+(rangeDays===7?'active':'')+'" data-action="range" data-days="7">近7天</button><button class="'+(rangeDays===30?'active':'')+'" data-action="range" data-days="30">近30天</button></div></div><p class="subtext">不评判好坏，只是多了解自己一点。</p>'+chartHTML(rangeDays,full)+'</section>';}
function landscape(kind){
  const svgStart='<svg viewBox="0 0 360 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
  if(kind==='rain')return svgStart+'<defs><linearGradient id="rainbg" x2="0" y2="1"><stop stop-color="#b8c4c2"/><stop offset="1" stop-color="#d9e2db"/></linearGradient></defs><rect width="360" height="170" fill="url(#rainbg)"/><circle cx="258" cy="43" r="24" fill="#f5f1db" opacity=".55"/><path d="M0 104q65-53 130-9t130-17 110 0v100H0Z" fill="#9dae9e" opacity=".7"/><path d="M0 126q75-27 140 2t120-13 110-2v60H0Z" fill="#8b9f94" opacity=".7"/><path d="M0 152q90-30 190 4t170-8v30H0Z" fill="#7c958b" opacity=".5"/><g stroke="#fff" stroke-width="1" opacity=".4"><path d="m32 20-5 17m60-28-5 17m63 21-5 17m55-45-5 17m55 25-5 17m60-43-5 17m58 20-5 17m-257 3-5 17m64-7-5 17m63 2-5 17m65-15-5 17m60-10-5 17m57 2-5 17"/></g></svg>';
  if(kind==='stretch')return svgStart+'<rect width="360" height="170" fill="#f0dfcf"/><circle cx="258" cy="53" r="42" fill="#f9eedb"/><path d="M0 137q75-37 150-2t210-9v60H0Z" fill="#dbc7b2"/><ellipse cx="192" cy="146" rx="83" ry="8" fill="#c4ae9b" opacity=".5"/><path d="M127 146h129" stroke="#bc9e96" stroke-width="7" stroke-linecap="round"/><path d="m183 97-19 27-28 13m47-40 32 27 26 13" stroke="#b0888f" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="m182 66 1 34" stroke="#c49e92" stroke-width="16" stroke-linecap="round"/><path d="m180 77-30-18-11-22m44 40 29-15 10-24" stroke="#c49e92" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="182" cy="49" r="12" fill="#c29b8e"/><path d="M170 47q-1-19 15-16 16 5 8 22-2-12-12-11-1 8-11 5Z" fill="#6e6563"/><path d="M59 136V81m0 36c-23-7-23-30-23-30 24 0 26 20 23 30Zm0-13c20-6 22-27 22-27-20 1-25 17-22 27Z" stroke="#aeb391" fill="#b8ba9a" stroke-width="2"/><path d="M48 133h22l-3 19H51Z" fill="#bdafa0"/></svg>';
  if(kind==='music')return svgStart+'<rect width="360" height="170" fill="#dcd9ea"/><circle cx="265" cy="44" r="35" fill="#eeebf4"/><path d="M0 135q75-40 147-15t213-15v65H0Z" fill="#c4bdd6"/><path d="M0 159q124-41 225-7t135-14v40H0Z" fill="#b3abc6"/><circle cx="182" cy="83" r="48" fill="#c3b4d5" opacity=".7"/><circle cx="182" cy="83" r="34" fill="#eae3f1"/><path d="M175 104V65l30-6v37M175 75l30-6" stroke="#aa92bd" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="168" cy="104" rx="8" ry="5" fill="#aa92bd"/><ellipse cx="198" cy="96" rx="8" ry="5" fill="#aa92bd"/><path d="m86 48 2 7 7 2-7 2-2 7-2-7-7-2 7-2Zm167 57 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#f9f6fb"/></svg>';
  if(kind==='walk')return svgStart+'<rect width="360" height="170" fill="#dce6d6"/><circle cx="261" cy="45" r="30" fill="#f9f0cd"/><path d="M0 118q70-40 160-5t200-22v79H0Z" fill="#c1d2b4"/><path d="M0 151q95-51 180-17t180-5v50H0Z" fill="#a8c2a0"/><path d="M229 170c-88-46-38-55-67-67 41 3-11 34 124 67Z" fill="#ece5cf"/><path d="M74 134V55" stroke="#8a9d7e" stroke-width="4"/><ellipse cx="74" cy="55" rx="25" ry="41" fill="#9db48f"/><path d="M302 133V75" stroke="#8c9c7d" stroke-width="3"/><ellipse cx="302" cy="71" rx="20" ry="30" fill="#b3c7a1"/></svg>';
  if(kind==='ground')return svgStart+'<rect width="360" height="170" fill="#e5e8d8"/><circle cx="90" cy="48" r="29" fill="#f8f2dc"/><ellipse cx="180" cy="144" rx="88" ry="10" fill="#bdc5ac"/><ellipse cx="182" cy="129" rx="53" ry="18" fill="#abb59f"/><ellipse cx="185" cy="104" rx="39" ry="20" fill="#c8cebb"/><ellipse cx="179" cy="78" rx="28" ry="17" fill="#d6d7c6"/><path d="M276 145V69m0 37c-25-6-24-32-24-32 22 2 29 20 24 32Zm0 18c23-6 26-29 26-29-22 1-31 15-26 29Z" stroke="#a6b090" stroke-width="2" fill="#aab894"/></svg>';
  return svgStart+'<defs><linearGradient id="brbg" x2="0" y2="1"><stop stop-color="#cfc0df"/><stop offset="1" stop-color="#e9e0ee"/></linearGradient></defs><rect width="360" height="170" fill="url(#brbg)"/><circle cx="254" cy="45" r="30" fill="#f8eddb" opacity=".85"/><path d="M0 114q65-22 130 5t130-3 110 9v55H0Z" fill="#c4b2d2"/><path d="M0 149q80-34 170-10t190-7v50H0Z" fill="#b8a0c7" opacity=".65"/><ellipse cx="176" cy="145" rx="52" ry="7" fill="#aa90bc" opacity=".45"/><path d="m170 101-26 31h63l-24-31" fill="#967caa"/><path d="M161 83q14-12 28 0l-6 31h-15Z" fill="#a18ab1"/><circle cx="175" cy="66" r="11" fill="#d7b8a6"/><path d="M164 64q-1-15 13-12 12 1 9 16-4-9-10-7-5 4-12 3Z" fill="#6f617e"/><path d="m162 89-10 17-13 6m49-23 11 17 13 6" stroke="#cba99e" stroke-width="6" stroke-linecap="round"/><path d="M143 132q33-12 62 0" stroke="#80668e" stroke-width="9" stroke-linecap="round"/></svg>';
}
function careCard(c){const saved=state.favorites.includes(c.id);return '<article class="card care-card"><div class="care-art">'+landscape(c.art)+'<button class="illustration-click" data-action="practice" data-id="'+c.id+'" aria-label="打开'+c.title+'"></button><span class="care-type">'+c.type+'</span><button class="save-btn '+(saved?'saved':'')+'" data-action="favorite" data-id="'+c.id+'" aria-label="'+(saved?'取消收藏':'收藏')+c.title+'" aria-pressed="'+saved+'">'+icon('heart')+'</button></div><div class="care-body"><h3>'+c.title+'</h3><p>'+c.desc+'</p><div class="care-bottom"><span class="care-meta">'+icon('clock')+c.minutes+' 分钟<span> · </span>'+c.type+'</span><button class="play-btn" data-action="practice" data-id="'+c.id+'" aria-label="开始'+c.title+'">'+icon('play')+'</button></div></div></article>';}
function recommended(){const last=[...entries()].sort((a,b)=>new Date(b.date)-new Date(a.date))[0];if(last?.tags.includes('工作')||last?.tags.includes('学业'))return [CARES[0],CARES[2],CARES[3]];return CARES.slice(0,3);}
function renderToday(){
  const list=entries(),notice=state.mode==='demo'?'你正在浏览虚构的示例记录，试着写下自己的心情吧。':list.length?'你已经为自己留下了 '+list.length+' 次认真倾听的时刻。':'你的空间已经准备好，从此刻的心情开始吧。';
  return titleBlock('留一点时间，给自己。','忙碌的生活里，这里有一个属于你的小小角落。','A LITTLE SPACE FOR YOU',dateNote())+
  '<section class="hero"><div class="hero-copy"><div class="eyebrow">IT’S OKAY TO FEEL WHAT YOU FEEL</div><h2>每一种心情，<br>都值得被好好安放。</h2><p>哪怕只是停下来，听一听自己的声音。</p><button class="btn" data-action="new-entry">'+icon('plus')+'记录此刻心情</button><span class="hero-tiny">'+icon('lock')+'只为自己而写</span></div><img class="hero-img" src="hero.svg" alt="在柔和光线中生长的紫色花朵与绿叶"></section>'+
  '<section class="card mood-check"><div class="section-header"><h2>此刻，你感觉怎么样？</h2><span class="hint">不用想太多，跟着感觉选</span></div>'+moodButtons('quick-mood')+'</section>'+
  '<div class="dashboard-grid">'+trendCard()+'<section class="breath-card"><div class="section-header"><h2>给此刻的你</h2>'+icon('leaf','leaf-icon')+'</div><div class="subtext">先放下思绪，试着深呼吸。</div><div class="breath-orb" aria-hidden="true"><div class="orb-inner">呼 · 吸</div></div><p>让呼吸，带你回到当下。</p><button class="btn" data-action="quick-breath">'+icon('play')+'开始 1 分钟呼吸</button></section></div>'+
  '<section><div class="section-header recommend-heading"><div><h2>小小的关怀，大大的能量</h2><div class="section-subtitle">选一件小事，好好照顾此刻的自己。</div></div><a class="btn-ghost" href="#care">探索更多 '+icon('arrow')+'</a></div><div class="care-grid">'+recommended().map(careCard).join('')+'</div></section>'+
  '<div class="mini-insight">'+icon('sparkle')+'<p><b>慢慢陪你发现自己。</b> '+notice+'</p><button class="btn-ghost" data-action="'+(state.mode==='demo'?'mode':'go-insights')+'">'+(state.mode==='demo'?'开始我的记录':'看看我的洞察')+icon('arrow')+'</button></div>';
}
function renderJournal(){return titleBlock('给心情，一个落脚的地方。','那些说不出口的话，也可以慢慢写下来。','YOUR MOOD JOURNAL','<button class="btn" data-action="new-entry">'+icon('plus')+'写一篇日记</button>')+'<div class="toolbar"><label class="search-box">'+icon('search')+'<input id="diarySearch" type="search" value="'+esc(diarySearch)+'" placeholder="搜索日记、心情或触发因素…" aria-label="搜索日记"></label><select class="filter-select" id="moodFilter" aria-label="按心情筛选"><option value="">所有心情</option>'+moods.map((m,i)=>'<option value="'+(i+1)+'" '+(diaryMood===String(i+1)?'selected':'')+'>'+m.name+'</option>').join('')+'</select></div>'+(state.mode==='demo'?'<div class="onboarding-note">'+icon('info')+'以下为虚构的示例日记。点击「写一篇日记」，开始自己的记录。</div>':'')+'<div id="entriesList">'+entryListHTML()+'</div>';}
function entryListHTML(){
  const list=[...entries()].filter(e=>(!diaryMood||String(e.mood)===diaryMood)&&(!diarySearch||(e.note+' '+e.tags.join(' ')+' '+moods[e.mood-1].name).toLowerCase().includes(diarySearch.toLowerCase()))).sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(!list.length)return emptyState(diarySearch||diaryMood?'没有找到这份心情':'还没有日记，也没关系',diarySearch||diaryMood?'试试换一个关键词，或清除筛选条件。':'你不需要写得很好，一句话、一个心情都可以。',diarySearch||diaryMood?'clear-filters':'new-entry',diarySearch||diaryMood?'清除筛选':'记录第一份心情');
  let lastDay='';return list.map(e=>{const key=dateKey(e.date);let heading='';if(key!==lastDay){heading='<div class="entry-group-label">'+prettyDate(e.date,true)+(key===dateKey(new Date())?' · 今天':'')+'</div>';lastDay=key;}
    return heading+'<article class="card entry-card">'+face(e.mood)+'<div class="entry-content"><div class="entry-top"><h3>'+moods[e.mood-1].name+sampleBadge()+'<time datetime="'+esc(e.date)+'">'+timeOf(e.date)+'</time></h3><div class="entry-tools"><button class="icon-btn" data-action="edit-entry" data-id="'+esc(e.id)+'" aria-label="'+(state.mode==='demo'?'以此示例开始写作':'编辑日记')+'">'+icon('edit')+'</button>'+(state.mode==='personal'?'<button class="icon-btn" data-action="delete-entry" data-id="'+esc(e.id)+'" aria-label="删除日记">'+icon('trash')+'</button>':'')+'</div></div><p class="entry-text">'+(esc(e.note)||'今天，先记下这份心情。')+'</p><div class="entry-tags">'+e.tags.map(t=>'<span class="tag">'+esc(t)+'</span>').join('')+'</div><div class="entry-intensity">情绪强度 '+e.intensity+' / 10</div></div></article>';
  }).join('');
}
function emptyState(title,desc,action,label){return '<div class="empty-state"><div class="empty-flower">✧</div><h3>'+title+'</h3><p>'+desc+'</p><button class="btn btn-secondary" data-action="'+action+'">'+icon(action==='new-entry'?'plus':'arrow')+label+'</button></div>';}
function tagFrequency(list){const counts={};list.forEach(e=>e.tags.forEach(t=>counts[t]=(counts[t]||0)+1));return Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));}
function renderInsights(){
  const list=recentEntries(),days=new Set(list.map(e=>dateKey(e.date))).size,avg=list.length?list.reduce((s,e)=>s+e.mood,0)/list.length:0,freq=tagFrequency(list),low=list.filter(e=>e.mood<=2),lowFreq=tagFrequency(low),good=list.filter(e=>e.mood>=4),goodFreq=tagFrequency(good);
  const lowText=low.length&&lowFreq.length?'这 '+rangeDays+' 天里，有 '+low.length+' 条较低落的记录，其中 '+lowFreq[0][1]+' 条提到了「'+lowFreq[0][0]+'」。下次遇到类似的时刻，可以先给自己留一个小小的休息。':list.length?'这些记录里，暂时还没有足够的线索指向某个压力来源。继续记下发生了什么，规律会慢慢变得清楚。':'记录心情时，顺手选一个触发因素。这里会帮你整理哪些场景经常和情绪一起出现。';
  const goodText=goodFreq.length?'在 '+good.length+' 条心情较好的记录里，「'+goodFreq[0][0]+'」出现了 '+goodFreq[0][1]+' 次。回看这些片段，留意当时让你感到轻松的具体细节。标签可能只是背景，美好也藏在细节里。':'你不需要马上开心起来。先记下一次平静的午后，或一件让你稍微舒服一点的小事。';
  return titleBlock('多了解自己，一点点就好。','看见起伏，也看见那些给你力量的小事。','A GENTLE LOOK WITHIN',dateNote())+'<div class="stats-grid"><div class="card stat-card"><div class="stat-card-label">'+icon('book')+'认真倾听自己</div><div class="stat-number">'+list.length+'<small>次记录</small></div><p>最近 '+rangeDays+' 天'+(state.mode==='demo'?' · 示例数据':'')+'</p></div><div class="card stat-card"><div class="stat-card-label">'+icon('calendar')+'留下心情的日子</div><div class="stat-number">'+days+'<small>天</small></div><p>每一次记录，都有意义</p></div><div class="card stat-card"><div class="stat-card-label">'+icon('leaf')+'最近的心情</div><div class="stat-number" style="font-size:24px">'+(avg?moods[Math.round(avg)-1].name:'待记录')+'</div><p>按记录等级整理，不是健康评分</p></div></div><div class="insight-grid">'+trendCard(true)+'<section class="card factor-card"><div class="section-header"><h2>心情里，常出现的关键词</h2>'+icon('flower','leaf-icon')+'</div><p class="subtext">来自你选择的触发因素标签</p><div class="factor-list">'+(freq.length?freq.slice(0,5).map(f=>'<div class="factor-row"><div class="factor-row-top"><span>'+f[0]+'</span><small>'+f[1]+' 条记录</small></div><div class="bar-track"><span style="width:'+(f[1]/list.length*100)+'%"></span></div></div>').join(''):'<p class="factor-empty">暂时还没有标签。<br>下次记录时，试着选一个。</p>')+'</div></section></div><div class="insight-grid"><section class="card insight-statement"><h3>'+iconInline('sparkle')+' 那些需要被照顾的时刻</h3><p>'+lowText+'</p><span class="source-note">依据：近'+rangeDays+'天的'+list.length+'条记录及所选标签；共同出现不代表因果。'+(state.mode==='demo'?'当前为示例。':'')+'</span>'+(low.length?'<div class="evidence-list">'+low.map(e=>'<span class="tag">'+prettyDate(e.date)+' · '+moods[e.mood-1].name+'</span>').join('')+'</div>':'')+'</section><section class="card insight-statement green"><h3>✧ 留住，给你能量的事</h3><p>'+goodText+'</p><span class="source-note">从 '+good.length+' 条较好心情记录中整理</span><button class="btn-ghost" data-action="go-care" style="margin-top:12px">给自己一点关怀 '+icon('arrow')+'</button></section></div>';
}
function iconInline(name){return '<span aria-hidden="true" style="color:#ab8bc1">✧</span>';}
function renderCare(){
  const filters=[['all','全部','flower'],['meditate','正念冥想','leaf'],['music','舒缓声音','music'],['move','轻运动','stretch'],['saved','我的收藏','heart']];
  const list=CARES.filter(c=>careFilter==='all'||careFilter===c.category||(careFilter==='saved'&&state.favorites.includes(c.id)));
  const done=state.sessions.length;
  return titleBlock('照顾自己，从一件小事开始。','不急着变好，先让此刻的自己舒服一点。','LITTLE MOMENTS OF CARE',dateNote())+'<div class="care-banner">'+icon('leaf')+'<div><h3>'+(done?'已经为自己留出 '+done+' 段关怀时光':'今天，你想怎样照顾自己？')+'</h3><p>'+(done?'每一次停下来，都是一次温柔的回应。':'呼吸、听一段声音，或伸个懒腰。跟着自己的节奏就好。')+'</p></div><button class="btn-ghost" data-action="care-info">了解这些练习 '+icon('arrow')+'</button></div><div class="tabs-row" role="group" aria-label="关怀分类">'+filters.map(f=>'<button class="filter-tab '+(careFilter===f[0]?'active':'')+'" data-action="care-filter" data-filter="'+f[0]+'" aria-pressed="'+(careFilter===f[0])+'">'+icon(f[2])+f[1]+'</button>').join('')+'</div>'+(list.length?'<div class="care-grid library">'+list.map(careCard).join('')+'</div>':emptyState('把喜欢的关怀，留在这里','点击关怀卡片右上角的爱心，就能在这里找到它。','all-care','去看看有什么'))+'<p class="library-note">练习强度由你决定。过程中若感到不适，随时暂停或结束。</p>';
}
function render(){header();$('#main').innerHTML=({today:renderToday,journal:renderJournal,insights:renderInsights,care:renderCare}[currentPage])();}
function go(page){if(currentPage===page){render();return;}location.hash=page;}
window.addEventListener('hashchange',()=>{const p=location.hash.slice(1);if(NAV.some(n=>n[0]===p)){if(activeModal)closeModal();currentPage=p;render();window.scrollTo(0,0);}});
function openModal(content,options={}){
  if(!activeModal)previousFocus=document.activeElement;
  $('#modalRoot').innerHTML='<div class="modal-backdrop"><section class="modal '+(options.className||'')+'" role="dialog" aria-modal="true" aria-labelledby="modalTitle" tabindex="-1"><button class="icon-btn modal-close" data-action="close-modal" aria-label="关闭弹窗">'+icon('close')+'</button>'+content+'</section></div>';
  activeModal=options.type||'generic';document.body.style.overflow='hidden';
  requestAnimationFrame(()=>$('.modal').focus());
}
function closeModal(){stopPractice();$('#modalRoot').innerHTML='';document.body.style.overflow='';activeModal=null;previousFocus?.focus?.();}
function modalHead(eyebrow,title,desc){return '<div class="modal-heading"><div class="eyebrow">'+eyebrow+'</div><h2 id="modalTitle">'+title+'</h2>'+(desc?'<p>'+desc+'</p>':'')+'</div>';}
let journalDraft=null;
function openJournal(mood=0,entry=null){
  const personalEdit=entry&&state.mode==='personal';
  journalDraft={id:personalEdit?entry.id:null,mood:entry?entry.mood:mood,intensity:entry?entry.intensity:5,tags:entry?[...entry.tags]:[],note:entry?entry.note:'',date:personalEdit?entry.date:null};
  openModal(modalHead('A MOMENT FOR YOURSELF',personalEdit?'再听一听，那时的自己。':'此刻的你，值得被听见。',personalEdit?'修改你的记录，也是一种对自己的回应。':'选一个心情就可以保存，其他的都可以慢慢说。')+'<form id="journalForm">'+moodButtons('draft-mood',journalDraft.mood,'journal-moods')+'<label class="field-label" for="intensity">这份情绪有多强烈？ <span class="range-value" id="intensityValue">'+journalDraft.intensity+' / 10</span></label><div class="range-row"><span>轻轻的</span><input type="range" id="intensity" min="1" max="10" value="'+journalDraft.intensity+'" aria-label="情绪强度"><span>很强烈</span></div><div class="field-label">可能和什么有关？ <small>可多选，也可以先跳过</small></div><div class="tag-options">'+TAGS.map(t=>'<button type="button" class="tag-option '+(journalDraft.tags.includes(t)?'selected':'')+'" data-action="draft-tag" data-tag="'+t+'" aria-pressed="'+journalDraft.tags.includes(t)+'">'+t+'</button>').join('')+'</div><label class="field-label" for="journalNote">想说的话，写在这里 <small>选填</small></label><textarea class="note-input" id="journalNote" maxlength="2000" placeholder="今天发生了什么？此刻的你，需要什么？&#10;哪怕只有一句话，也很好。">'+esc(journalDraft.note)+'</textarea><div class="textarea-footer"><button type="button" class="btn-ghost" data-action="suggest-tags">'+icon('sparkle')+'帮我整理触发因素</button><span id="charCount">'+journalDraft.note.length+' / 2000</span></div><div id="suggestions"></div><div id="journalAlert"></div><div class="modal-bottom"><span class="privacy-note">'+icon('lock')+(state.mode==='demo'?'保存后进入「我的记录」':'只保存在当前浏览器')+'</span><button type="submit" class="btn">'+icon('check')+(personalEdit?'保存修改':'收好这份心情')+'</button></div></form>',{type:'journal'});
}
function saveJournal(){
  if(!journalDraft.mood){toast('先选一个最接近此刻的心情吧。');$('.journal-moods button')?.focus();return;}
  const note=$('#journalNote').value.trim(),intensity=Number($('#intensity').value),isEdit=!!journalDraft.id;
  const record={id:journalDraft.id||crypto.randomUUID(),date:journalDraft.date||new Date().toISOString(),mood:journalDraft.mood,intensity,tags:journalDraft.tags,note};
  const list=isEdit?state.entries.map(e=>e.id===record.id?record:e):[...state.entries,record];
  const ok=persist({...state,entries:list,mode:'personal'});
  closeModal();render();toast(ok?(isEdit?'记录已更新。谢谢你，再次听见自己。':'已收好这份心情。给愿意停下来的自己一个拥抱。'):'记录留在当前页面，但浏览器无法持久保存。请在数据与隐私中导出。');
}
function suggestTags(){
  const text=$('#journalNote').value;const rules={'学业':/考试|作业|论文|学业|老师|上课|学习|成绩/,'工作':/工作|同事|领导|加班|项目|开会|任务|下班|职场/,'人际':/朋友|社交|同学|关系|聊天|误会/,'家庭':/家里|家人|爸爸|妈妈|父母|家庭/,'睡眠':/睡眠|失眠|睡好|睡不|熬夜|困|早睡/,'独处':/独处|一个人|安静|独自|自己待/,'运动':/散步|跑步|运动|健身|瑜伽|公园|走了/,'天气':/下雨|阳光|天气|晴天|阴天/,'小确幸':/美好|开心|快乐|好吃|晚霞|感谢|小确幸/};
  const found=Object.entries(rules).filter(([tag,re])=>re.test(text)&&!journalDraft.tags.includes(tag)).map(([tag])=>tag);
  $('#suggestions').innerHTML='<div class="suggestions">'+(found.length?'从文字里整理出这些线索，点击选择：<br>'+found.map(t=>'<button type="button" data-action="suggested-tag" data-tag="'+t+'">+ '+t+'</button>').join(''):'暂时没有新的线索，你也可以自己选一个标签。')+'<div style="font-size:8px;margin-top:5px;opacity:.7">基于当前文字的本地关键词匹配，不是心理评估。</div></div>';
}
function deleteEntry(id){
  const e=state.entries.find(e=>e.id===id);if(!e)return;
  openModal(modalHead('YOUR CHOICE','要放下这篇记录吗？',prettyDate(e.date)+' · '+moods[e.mood-1].name+'。删除后无法恢复，相关趋势也会同步更新。')+'<div class="modal-bottom"><button class="btn btn-secondary" data-action="close-modal">再留一会儿</button><button class="btn btn-danger" data-action="confirm-delete" data-id="'+esc(id)+'">'+icon('trash')+'删除这篇日记</button></div>',{className:'small',type:'confirm'});
}
function openMode(){
  openModal(modalHead('YOUR OWN LITTLE SPACE','在这里，慢慢认识自己。','示例帮你了解功能，你的真实心情拥有独立的空间。切换不会删除已有记录。')+'<div class="mode-options"><button class="mode-option '+(state.mode==='demo'?'chosen':'')+'" data-action="set-mode" data-mode="demo">'+icon('sparkle')+'<b>先看看示例</b><p>浏览虚构日记与趋势，了解慢慢如何陪伴你。</p></button><button class="mode-option '+(state.mode==='personal'?'chosen':'')+'" data-action="set-mode" data-mode="personal">'+icon('book')+'<b>开始我的记录</b><p>'+(state.entries.length?'你已有 '+state.entries.length+' 条日记，继续自己的故事。':'一个干净的空间，从此刻的心情开始。')+'</p></button></div><p class="smallprint" style="margin-top:22px">无需注册。真实日记只保存在当前浏览器，与其他访客互不可见。</p>',{type:'mode'});
}
function openPrivacy(){
  openModal(modalHead('JUST BETWEEN YOU AND YOURSELF','这里的心事，属于你。','你可以随时带走自己的记录，也可以选择放下。')+'<div class="privacy-section"><h3>'+iconInline('lock')+' 你的数据，放在哪里？</h3><p>日记、收藏和练习反馈存储在当前浏览器，不会上传到服务器。不同设备不会同步。清除浏览器数据或使用无痕模式，可能让记录丢失。</p></div><div class="privacy-section"><h3>记录里的你</h3><p>你有 '+state.entries.length+' 条真实日记、'+state.sessions.length+' 次练习记录与 '+state.favorites.length+' 个收藏。示例数据不会被导出，也不会混入你的情绪洞察。</p></div>'+(!storageOK?'<div class="journal-alert">当前浏览器限制了存储。请及时导出，以免关闭页面后丢失。</div>':'')+'<div class="privacy-actions"><button class="btn btn-secondary" data-action="export">'+icon('download')+'导出我的数据</button><button class="btn btn-white" data-action="mode">'+icon('sparkle')+'切换体验模式</button><button class="btn btn-white" data-action="clear-data">'+icon('trash')+'清除我的数据</button></div><p class="smallprint">慢慢提供情绪记录和日常自我关怀，不提供诊断或治疗。网站公开可访问，你的本地日记不会因此公开。</p><button class="btn-ghost" data-action="support">如果需要更多支持 '+icon('arrow')+'</button>',{type:'privacy'});
}
function exportData(){
  const blob=new Blob([JSON.stringify({app:'慢慢',version:1,exportedAt:new Date().toISOString(),entries:state.entries,favorites:state.favorites,sessions:state.sessions},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='慢慢-我的记录-'+dateKey(new Date())+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('已导出你的真实记录，请妥善保管这份文件。');
}
function openSupport(){
  openModal(modalHead('YOU DON’T HAVE TO DO IT ALONE','你可以获得更多支持。','有些时候，一份日记或一次呼吸还不够。你不需要独自撑过所有事情。')+'<div class="privacy-section"><h3>让一个可信任的人知道</h3><p>可以从一句很简单的话开始：「我最近有点难受，想找个人陪我待一会儿。」朋友、家人、学校心理中心或专业心理服务，都可以是支持的起点。</p></div><div class="support-box">如果你担心自己会立刻伤害自己或他人，请尽快联系当地紧急服务，或请身边可信任的人立即陪伴你，前往安全的地方。</div><p class="smallprint">当低落、焦虑或失眠持续影响日常生活时，可以寻求专业心理或医疗支持。慢慢不会判断你是否患病，也不能提供紧急救助。</p><div class="modal-bottom"><button class="btn btn-secondary" data-action="close-modal">我知道了</button><button class="btn" data-action="quick-breath">'+icon('leaf')+'先陪自己呼吸一下</button></div>',{type:'support'});
}
function openCareInfo(){
  openModal(modalHead('GENTLE CARE, AT YOUR PACE','小小的练习，按你的节奏。','这里的练习是日常自我关怀的起点，不承诺改变某一种情绪。')+'<div class="privacy-section"><h3>呼吸与感官觉察</h3><p>轻柔地吸气和呼气，不屏息、不强迫自己深吸。如果跟不上计时，就回到自然呼吸。感官觉察引导你留意身边看到、听到和触碰到的东西。</p></div><div class="privacy-section"><h3>声音与轻运动</h3><p>雨声与舒缓音乐由浏览器原创合成，无需联网播放。运动以舒适的小幅活动为主；身体不适时请停止。声音播放时请保持舒适音量。</p></div><a class="source-link" href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/" target="_blank" rel="noopener noreferrer">呼吸练习参考：NHS 日常减压呼吸指南 ↗</a><p class="smallprint">一切练习都可以暂停。找到适合自己的方式，比完成计时更重要。</p>',{type:'info'});
}
const STEPS={
  stretch:[['先找到舒服的姿势','坐稳或站稳，脚下有支撑。把肩膀轻轻放下来，保持自然呼吸。'],['把注意力交给肩膀','在舒适范围内，轻轻耸肩，再慢慢放下。动作可以很小，不需要用力。'],['给双手一点空间','轻轻张开手掌，再放松。感受手指与前臂的变化，避免牵拉或憋气。'],['轻轻活动双脚','脚掌稳稳着地，依次轻轻抬起脚跟、放下。保持舒适和平衡。'],['回到自己的节奏','停下动作，注意身体与刚才有什么不同。没有变化，也完全可以。']],
  ground:[['看见周围的五样东西','慢慢环顾四周，注意一种颜色、一条线条、一处光线。无需评价，只是看见。'],['感受四种触碰','留意脚底的地面、衣服的材质、椅子的支撑，或掌心触碰到的物品。'],['听见三种声音','分辨远处和近处的声音。即使只有细小的声音，也试着停留一会儿。'],['发现两种气味','轻轻留意空气中的气味。如果没有明显的气味，也可以回忆一种熟悉的味道。'],['留意一个味道','注意嘴里的味道，或小口喝一点水。把注意力轻轻带回此刻。']],
  walk:[['出发前，看看周围','选择安全、熟悉、适合步行的地方。不方便出门时，也可以在室内缓步走动。'],['跟着自己的脚步','不追求距离或速度，注意脚掌落地、抬起的感觉。保持自然呼吸。'],['留意一件小事','看看树叶、光线或天空。让注意力从脑海里的事，轻轻移到眼前。'],['把步伐慢下来','留意肩膀是否放松，给自己一个舒服的节奏。随时可以停下来。'],['准备回到日常','看看此刻身体的感觉。为自己留出这段时间，本身就是一件小小的好事。']]
};
function openPractice(id,quick=false){
  stopPractice();const c=CARES.find(c=>c.id===id);if(!c)return;
  practice={care:c,total:(quick?1:c.minutes)*60,remaining:(quick?1:c.minutes)*60,elapsed:0,running:false,startedAt:0,timer:null,finished:false};
  const isSound=['rain','music'].includes(c.kind),step=STEPS[c.kind]?.[0];
  openModal('<div class="practice-modal">'+modalHead(c.type.toUpperCase(),c.title,c.hint)+'<div class="practice-visual '+(isSound?'sound':'')+'"><div class="practice-orb" id="practiceOrb">'+(isSound?icon(c.icon):'<span id="breathLabel">'+(c.kind==='breath'?'准备好了':'慢慢来')+'</span><small id="breathSub">'+(c.kind==='breath'?'跟随自己的节奏':'留意当下的感觉')+'</small>')+'</div></div><div class="practice-timer" id="practiceTimer">'+formatTime(practice.remaining)+'</div><div class="practice-status" id="practiceStatus">准备好后，再开始</div>'+(c.kind==='breath'?'<div class="duration-options" aria-label="练习时长">'+[1,3,5].map(m=>'<button class="duration-option '+(practice.total===m*60?'active':'')+'" data-action="duration" data-minutes="'+m+'">'+m+' 分钟</button>').join('')+'</div>':'')+(step?'<div class="practice-step" id="practiceStep"><h3>'+step[0]+'</h3><p>'+step[1]+'</p></div>':'')+(isSound?'<div class="volume-row">'+icon('volume')+'<label for="volume">音量</label><input id="volume" type="range" min="0" max="100" value="30"></div><div class="sound-credit">'+(c.kind==='music'?'原创合成 · 五声音阶氛围音乐':'原创合成 · 自然雨声')+'</div>':'')+'<div class="practice-controls"><button class="btn" data-action="toggle-practice" id="practiceToggle">'+icon('play')+'开始练习</button><button class="btn btn-white" data-action="finish-practice" id="practiceFinish" disabled>结束练习</button></div><p class="practice-tip">'+(c.kind==='breath'?'轻柔吸气、慢慢呼气。无需屏息，也不必强求跟上。<br>若感到不适，请暂停并回到自然呼吸。':isSound?'请在安全的环境中，用舒适的音量聆听。':'动作与节奏以舒适为准。不适时，随时可以停下来。')+'</p>'+(c.kind==='breath'?'<div class="source-line"><a class="source-link" href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/" target="_blank" rel="noopener noreferrer">练习参考 · NHS ↗</a></div>':'')+'</div>',{type:'practice',className:'small'});
}
function formatTime(seconds){const s=Math.max(0,Math.ceil(seconds));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function elapsedNow(){return practice?Math.min(practice.total,practice.elapsed+(practice.running?(performance.now()-practice.startedAt)/1000:0)):0;}
function updatePractice(){
  if(!practice||activeModal!=='practice')return;const elapsed=elapsedNow();practice.remaining=Math.max(0,practice.total-elapsed);
  $('#practiceTimer').textContent=formatTime(practice.remaining);
  $('#practiceStatus').textContent=practice.running?'这段时间，只属于你。':elapsed>0?'已暂停，随时可以继续':'准备好后，再开始';
  const c=practice.care,orb=$('#practiceOrb');
  if(c.kind==='breath'&&practice.running){const inhale=elapsed%9<4;orb.className='practice-orb '+(inhale?'inhale':'exhale');$('#breathLabel').textContent=inhale?'轻轻吸气':'慢慢呼气';$('#breathSub').textContent=inhale?'不用着急':'让肩膀放松';}
  else if(c.kind==='breath'&&!practice.running){orb.className='practice-orb';$('#breathLabel').textContent=elapsed>0?'休息一下':'准备好了';$('#breathSub').textContent='按自己的节奏就好';}
  if(STEPS[c.kind]){const steps=STEPS[c.kind],i=Math.min(steps.length-1,Math.floor(elapsed/practice.total*steps.length));$('#practiceStep').innerHTML='<h3>'+(i+1)+' / '+steps.length+' · '+steps[i][0]+'</h3><p>'+steps[i][1]+'</p>';}
  if(practice.remaining<=0&&!practice.finished)finishPractice(true);
}
async function togglePractice(){
  if(!practice)return;
  if(practice.running){practice.elapsed=elapsedNow();practice.running=false;clearInterval(practice.timer);if(audioEngine)audioEngine.ctx.suspend();$('#practiceToggle').innerHTML=icon('play')+'继续练习';}
  else{
    if(['rain','music'].includes(practice.care.kind)){
      try{if(!audioEngine)audioEngine=createAudio(practice.care.kind);await audioEngine.ctx.resume();}
      catch(e){toast('当前浏览器无法播放声音。请换用支持音频的浏览器。');stopAudio();return;}
      if(!practice||activeModal!=='practice'){stopAudio();return;}
    }
    practice.running=true;practice.startedAt=performance.now();practice.timer=setInterval(updatePractice,200);$('#practiceToggle').innerHTML=icon('pause')+'暂停一下';$('#practiceFinish').disabled=false;$$('.duration-option').forEach(b=>b.disabled=true);
  }updatePractice();
}
function createAudio(kind){
  const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)throw Error('No audio');
  const ctx=new AudioCtx(),master=ctx.createGain();master.gain.value=(Number($('#volume')?.value)||30)/100*.45;master.connect(ctx.destination);
  const cleanup=[];let noteTimer=null;
  if(kind==='rain'){
    const buffer=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),data=buffer.getChannelData(0);let brown=0;
    for(let i=0;i<data.length;i++){brown=(brown+Math.random()*.04-.02)/1.02;data[i]=brown*3.5+Math.random()*.12-.06;}
    const noise=ctx.createBufferSource();noise.buffer=buffer;noise.loop=true;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2400;noise.connect(filter);filter.connect(master);noise.start();cleanup.push(noise);
  }else{
    const notes=[220,261.63,293.66,329.63,392,440,523.25];
    const chord=[130.81,196,261.63];chord.forEach((freq,i)=>{const osc=ctx.createOscillator(),g=ctx.createGain();osc.type='sine';osc.frequency.value=freq;g.gain.value=.055;osc.connect(g);g.connect(master);osc.start();cleanup.push(osc);});
    let idx=0;const sequence=[0,2,4,2,1,3,5,4,2,6,4,3,1,2,0,4];
    function note(){if(ctx.state!=='running')return;const freq=notes[sequence[idx++%sequence.length]],now=ctx.currentTime,osc=ctx.createOscillator(),g=ctx.createGain();osc.type='sine';osc.frequency.value=freq;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.18,now+.12);g.gain.exponentialRampToValueAtTime(.0001,now+4);osc.connect(g);g.connect(master);osc.start(now);osc.stop(now+4.1);}
    ctx.resume().then(note).catch(()=>{});noteTimer=setInterval(note,1700);
  }
  return {ctx,master,cleanup,noteTimer};
}
function stopAudio(){if(!audioEngine)return;clearInterval(audioEngine.noteTimer);audioEngine.cleanup.forEach(n=>{try{n.stop();}catch(e){}});audioEngine.ctx.close().catch(()=>{});audioEngine=null;}
function stopPractice(){if(practice)clearInterval(practice.timer);stopAudio();practice=null;}
let completedSession=null;
function finishPractice(automatic=false){
  if(!practice||practice.finished)return;const elapsed=elapsedNow();if(elapsed<1&&!automatic){toast('先为自己留一点时间，再结束练习吧。');return;}
  practice.finished=true;const care=practice.care;
  completedSession={id:crypto.randomUUID(),careId:care.id,date:new Date().toISOString(),seconds:Math.round(elapsed),completed:automatic,afterMood:null};
  const ok=persist({...state,sessions:[...state.sessions,completedSession]});stopPractice();render();
  openModal('<div class="practice-modal"><div class="completed-icon">'+icon('check')+'</div>'+modalHead('A LITTLE KINDNESS TO YOURSELF','谢谢你，照顾了一下自己。','你为自己留出了 '+(elapsed<60?Math.max(1,Math.round(elapsed))+' 秒':Math.floor(elapsed/60)+' 分 '+Math.round(elapsed%60)+' 秒')+'。无论感受如何，这段时间都有意义。')+'<p class="feedback-caption">现在的心情，更接近哪一种？（选填）</p>'+moodButtons('feedback-mood',0,'feedback-moods')+'<div class="modal-bottom"><button class="btn-ghost" data-action="close-modal">先这样就好</button><button class="btn" data-action="save-feedback">'+icon('check')+'收好这份关怀</button></div>'+(!ok?'<p class="smallprint">当前浏览器无法持久保存，请及时导出。</p>':'')+'</div>',{type:'feedback',className:'small'});
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,id=b.dataset.id;
  if(a==='new-entry')openJournal();
  else if(a==='quick-mood')openJournal(Number(b.dataset.mood));
  else if(a==='edit-entry')openJournal(0,entries().find(v=>v.id===id));
  else if(a==='delete-entry')deleteEntry(id);
  else if(a==='confirm-delete'){const ok=persist({...state,entries:state.entries.filter(v=>v.id!==id)});closeModal();render();toast(ok?'这篇日记已删除，情绪洞察也已更新。':'当前页面已删除，但浏览器未能保存变更。');}
  else if(a==='close-modal')closeModal();
  else if(a==='draft-mood'){journalDraft.mood=Number(b.dataset.mood);$$('.journal-moods .mood-option').forEach(v=>{const yes=Number(v.dataset.mood)===journalDraft.mood;v.classList.toggle('selected',yes);v.setAttribute('aria-pressed',yes);});}
  else if(a==='draft-tag'||a==='suggested-tag'){const t=b.dataset.tag;if(journalDraft.tags.includes(t))journalDraft.tags=journalDraft.tags.filter(x=>x!==t);else journalDraft.tags.push(t);$$('.tag-option').forEach(v=>{const yes=journalDraft.tags.includes(v.dataset.tag);v.classList.toggle('selected',yes);v.setAttribute('aria-pressed',yes);});if(a==='suggested-tag'){b.textContent='✓ '+t;b.disabled=true;}}
  else if(a==='suggest-tags')suggestTags();
  else if(a==='range'){rangeDays=Number(b.dataset.days);render();}
  else if(a==='mode')openMode();
  else if(a==='set-mode'){persist({...state,mode:b.dataset.mode});diarySearch='';diaryMood='';closeModal();render();toast(state.mode==='personal'?'欢迎回到自己的心情空间。':'正在浏览示例，你的真实记录已妥善保留。');}
  else if(a==='privacy')openPrivacy();
  else if(a==='support')openSupport();
  else if(a==='export')exportData();
  else if(a==='clear-data')openModal(modalHead('YOUR CHOICE','清空自己的心情空间？','将删除当前浏览器中的全部真实日记、练习反馈和收藏。无法恢复，建议先导出备份。')+'<div class="privacy-actions"><button class="btn btn-secondary" data-action="export">'+icon('download')+'先导出备份</button></div><div class="modal-bottom"><button class="btn btn-white" data-action="privacy">保留记录</button><button class="btn btn-danger" data-action="confirm-clear">确认清空我的数据</button></div>',{type:'confirm',className:'small'});
  else if(a==='confirm-clear'){const ok=persist({...structuredClone(defaults),mode:'personal'});closeModal();render();toast(ok?'心情空间已清空。新的故事，可以慢慢开始。':'当前页面已清空，但浏览器未能保存变更。');}
  else if(a==='clear-filters'){diarySearch='';diaryMood='';render();}
  else if(a==='go-insights')go('insights');
  else if(a==='go-care')go('care');
  else if(a==='all-care'){careFilter='all';render();}
  else if(a==='care-filter'){careFilter=b.dataset.filter;render();}
  else if(a==='favorite'){const added=!state.favorites.includes(id);const ok=persist({...state,favorites:added?[...state.favorites,id]:state.favorites.filter(x=>x!==id)});render();toast(ok?(added?'已放进「我的收藏」，想起时就能找到。':'已取消收藏。'):'已更新当前页面，浏览器未能保存收藏。');}
  else if(a==='practice')openPractice(id);
  else if(a==='quick-breath')openPractice('breath',true);
  else if(a==='care-info')openCareInfo();
  else if(a==='duration'&&practice&&!practice.running&&!practice.elapsed){practice.total=Number(b.dataset.minutes)*60;practice.remaining=practice.total;$$('.duration-option').forEach(v=>v.classList.toggle('active',v===b));updatePractice();}
  else if(a==='toggle-practice')togglePractice();
  else if(a==='finish-practice')finishPractice();
  else if(a==='feedback-mood'){if(completedSession)completedSession.afterMood=Number(b.dataset.mood);$$('.feedback-moods .mood-option').forEach(v=>{const yes=v===b;v.classList.toggle('selected',yes);v.setAttribute('aria-pressed',yes);});}
  else if(a==='save-feedback'){if(completedSession){const ok=persist({...state,sessions:state.sessions.map(s=>s.id===completedSession.id?{...completedSession}:s)});closeModal();render();toast(ok?'这份关怀已收好。今天也辛苦了。':'反馈留在当前页面，浏览器未能持久保存。');}}
});
document.addEventListener('submit',e=>{if(e.target.id==='journalForm'){e.preventDefault();saveJournal();}});
document.addEventListener('input',e=>{
  if(e.target.id==='intensity')$('#intensityValue').textContent=e.target.value+' / 10';
  if(e.target.id==='journalNote'){$('#charCount').textContent=e.target.value.length+' / 2000';const risk=/想死|自杀|伤害自己|不想活/.test(e.target.value);$('#journalAlert').innerHTML=risk?'<div class="journal-alert">听起来你正在经历很难受的时刻。先找一个安全的地方，让可信任的人陪着你。<button type="button" class="btn-ghost" data-action="support">查看支持方式 '+icon('arrow')+'</button></div>':'';}
  if(e.target.id==='diarySearch'){diarySearch=e.target.value;$('#entriesList').innerHTML=entryListHTML();}
  if(e.target.id==='volume'&&audioEngine)audioEngine.master.gain.setTargetAtTime(Number(e.target.value)/100*.45,audioEngine.ctx.currentTime,.15);
});
document.addEventListener('change',e=>{if(e.target.id==='moodFilter'){diaryMood=e.target.value;$('#entriesList').innerHTML=entryListHTML();}});
document.addEventListener('keydown',e=>{
  if(!activeModal)return;if(e.key==='Escape'){e.preventDefault();closeModal();return;}
  if(e.key==='Tab'){const focusable=$$('.modal button:not(:disabled),.modal a[href],.modal input,.modal textarea,.modal select').filter(n=>n.offsetParent!==null);if(!focusable.length)return;const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('.modal'))){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
window.addEventListener('beforeunload',()=>{stopAudio();});
render();
