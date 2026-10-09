(function(){
  'use strict';
  const arrow='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
  const external='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v6H4V5h6"/></svg>';
  const google='https://sites.google.com/adirondack.org/';
  const sourceLink=(url,label)=>'<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+external+'</a>';
  const details={
    ccl:{label:'Program / leadership',title:'Cultivating Community Leaders',copy:'Explore program expectations, previous cohorts, and BIPOC history in the Adirondacks. The original pages provide the current program information.',links:[['cultivating-community-leaders/home','Program overview'],['cultivating-community-leaders/what-to-expect','What to expect'],['cultivating-community-leaders/cohorts','Previous cohorts'],['cultivating-community-leaders/bipoc-adk-history','BIPOC Adirondack history']]},
    bipoc:{label:'Program / leadership',title:'Sustaining BIPOC Leadership',copy:'Learn about the initiative\'s mission and vision, its program expectations, and regional history resources.',links:[['sustaining-bipoc-leadership/home','Program overview'],['sustaining-bipoc-leadership/missionvision','Mission and vision'],['sustaining-bipoc-leadership/what-to-expect','What to expect'],['sustaining-bipoc-leadership/bipoc-adk-history','BIPOC Adirondack history']]},
    lgbtq:{label:'Program / leadership',title:'LGBTQIA+ Leaders Retreat',copy:'Explore the retreat\'s format, facilitators, and accommodation information in its original program pages.',links:[['lgbtqialeadersretreat/home','Retreat overview and current status'],['lgbtqialeadersretreat/what-to-expect','What to expect'],['lgbtqialeadersretreat/facilitators','Facilitators'],['lgbtqialeadersretreat/accommodations','Accommodation information']],note:'The public page reviewed on October 8, 2026 stated that applications were closed. Check the original page for any later update.'},
    birders:{label:'Program / outdoors',title:'Adirondack Black Birders',copy:'Explore birding, regional history, and the published 2026 celebration program. Its historic event information remains available in this demonstration.',links:[['adk-black-birders-event-2026/home','Original event overview'],['adk-black-birders-event-2026/schedule','2026 schedule'],['adk-black-birders-event-2026/plan-your-visit','Historic visit information'],['adk-black-birders-event-2026/suggested-reading','Suggested reading']],note:'The event on May 30, 2026 is in the past. This demonstration does not offer registration.'},
    event:{label:'Event archive / May 30, 2026',title:'Adirondack Black Birders Week Celebration',copy:'The published 2026 program included bird walks, speakers, and family activities centred on birding and Black experiences in the outdoors. The announced location was John Brown Farm State Historic Site, Lake Placid, New York.',links:[['adk-black-birders-event-2026/home','Original event overview'],['adk-black-birders-event-2026/schedule','Published 2026 schedule'],['adk-black-birders-event-2026/plan-your-visit','Location and historic visit information']],note:'Past event. Original pages may retain historical registration language; this concept does not accept registrations.'}
  };
  const resources=[
    {title:'Schoolyard Response Toolkit',category:'education',label:'Education / toolkit',copy:'Guidance for adults responding to identity-based harm involving children, before, during, and after an incident.',url:'https://www.diversityadk.org/schoolyardtoolkit',source:'ADI resource page',keywords:'school teacher children family classroom bullying parent'},
    {title:'Language Guides & Glossaries',category:'inclusion',label:'Inclusion / reference',copy:'Terminology and language guidance for respectful, inclusive communication.',url:'https://www.diversityadk.org/languageglossaries',source:'ADI resource page',keywords:'language glossary diversity equity belonging pronouns'},
    {title:'BIPOC Adirondack History',category:'history',label:'History / stories',copy:'Articles, films, and places to learn about Black and Indigenous histories in the Adirondacks.',url:google+'cultivating-community-leaders/bipoc-adk-history',source:'Cultivating Community Leaders',keywords:'history black indigenous bipoc films stories region'},
    {title:'Teaching Resources',category:'education',label:'Education / collection',copy:'Explore ADI\'s collection of teaching resources and follow original links for further reading.',url:'https://www.diversityadk.org/teachingresources',source:'ADI resource page',keywords:'teacher teaching classroom school educator learning'},
    {title:'New American & Immigration Resources',category:'inclusion',label:'Inclusion / collection',copy:'A starting point for New American and immigration information in ADI\'s resource directory.',url:'https://www.diversityadk.org/newamerican-immigration',source:'ADI resource page',keywords:'immigration immigrant new american community'},
    {title:'Black Birders Suggested Reading',category:'history',label:'Outdoors / reading',copy:'Reading and media resources collected for the published 2026 Black Birders event.',url:google+'adk-black-birders-event-2026/suggested-reading',source:'Black Birders 2026 program',keywords:'bird birds birding reading outdoors nature books'}
  ];
  const normalize=s=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').trim();
  const search=document.querySelector('#resource-search');
  let filter='all';
  function renderResources(){
    const terms=normalize(search.value).split(/\s+/).filter(Boolean);
    const selected=resources.filter(r=>(filter==='all'||r.category===filter)&&terms.every(t=>normalize(r.title+' '+r.copy+' '+r.keywords).includes(t)));
    document.querySelector('#resource-list').innerHTML=selected.map(r=>'<a class="resource-entry" href="'+r.url+'" target="_blank" rel="noopener noreferrer"><div><span class="category">'+r.label+'</span><h3>'+r.title+'</h3><p>'+r.copy+'</p><span class="source-label">'+r.source+' - opens original source</span></div>'+external+'</a>').join('');
    document.querySelector('#resource-empty').hidden=selected.length>0;
    document.querySelector('#resource-count').textContent='Showing '+selected.length+' of '+resources.length+' selected resources';
  }
  search.addEventListener('input',renderResources);
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderResources();}));
  document.querySelector('#resource-reset').addEventListener('click',()=>{filter='all';search.value='';document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.filter==='all')));renderResources();search.focus();});
  renderResources();
  const eventSearch=document.querySelector('#event-search'),eventStatus=document.querySelector('#event-status');
  function filterEvents(){
    const terms=normalize(eventSearch.value).split(/\s+/).filter(Boolean);
    const upcoming=eventStatus.value==='upcoming';
    const match=!upcoming&&terms.every(t=>'adirondack black birders week celebration lake placid john brown farm birding outdoors may 30 2026'.includes(t));
    document.querySelector('#event-entry').hidden=!match;
    document.querySelector('#event-empty').hidden=match;
    document.querySelector('#event-count').textContent=match?'1 selected archive entry':'0 matching entries in this concept';
    document.querySelector('#event-empty-title').textContent=upcoming?'Check the current calendar':'No matching archive entry';
    document.querySelector('#event-empty-copy').textContent=upcoming?'No future dates are proposed in this private concept. See ADI\'s official website for current announcements.':'Try “birding” or “Lake Placid”, or reset the filters.';
  }
  eventSearch.addEventListener('input',filterEvents);eventStatus.addEventListener('change',filterEvents);
  document.querySelector('#event-reset').addEventListener('click',()=>{eventSearch.value='';eventStatus.value='all';filterEvents();eventSearch.focus();});
  filterEvents();
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.navigation');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.textContent='Menu';nav.classList.remove('open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';nav.classList.toggle('open',open);});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',closeMenu);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector(a.getAttribute('href'));if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
  const video=document.querySelector('.hero-video'),toggle=document.querySelector('.video-toggle'),seek=document.querySelector('.video-seek'),time=document.querySelector('.video-time'),motion=matchMedia('(prefers-reduced-motion:reduce)');
  let userChosePlayback=false;
  function clock(n){n=Math.max(0,Math.floor(n||0));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
  function updateMedia(){
    toggle.classList.toggle('is-playing',!video.paused);
    toggle.querySelector('span').textContent=video.paused?'Play film':'Pause film';
    toggle.setAttribute('aria-label',video.paused?'Play 30-second archive film':'Pause archive film');
    toggle.setAttribute('aria-pressed',String(!video.paused));
    seek.value=isFinite(video.duration)&&video.duration?String(video.currentTime/video.duration*100):'0';
    seek.setAttribute('aria-valuetext',clock(video.currentTime)+' of '+clock(video.duration));
    time.textContent=clock(video.currentTime)+' / '+clock(video.duration);
  }
  // A paused/cancelled play promise or autoplay denial is normal browser behaviour.
  // Only the media element's confirmed network/decode/source error shows a failure.
  function attemptPlay(){return video.play().catch(()=>{updateMedia();});}
  video.muted=true;
  if(!motion.matches){attemptPlay();}
  toggle.addEventListener('click',()=>{userChosePlayback=true;if(video.paused)attemptPlay();else video.pause();});
  seek.addEventListener('input',()=>{if(isFinite(video.duration))video.currentTime=video.duration*Number(seek.value)/100;updateMedia();});
  ['play','pause','timeupdate','loadedmetadata','seeked','ended'].forEach(e=>video.addEventListener(e,updateMedia));
  const mediaFailure=document.querySelector('.media-failure');
  video.addEventListener('error',()=>{if(!video.error||video.error.code===1)return;mediaFailure.hidden=false;toggle.disabled=true;seek.disabled=true;});
  ['loadeddata','canplay'].forEach(event=>video.addEventListener(event,()=>{if(!video.error){mediaFailure.hidden=true;toggle.disabled=false;seek.disabled=false;}}));
  motion.addEventListener('change',()=>{if(motion.matches){video.pause();userChosePlayback=false;}else if(!userChosePlayback)attemptPlay();});
  // Pause off-screen media; resume only if it was playing when it left the viewport.
  let resumeInView=false;
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{const visible=entries[0].isIntersecting;if(!visible){resumeInView=!video.paused;video.pause();}else if(resumeInView&&!motion.matches){resumeInView=false;attemptPlay();}},{threshold:.05}).observe(video);}
  updateMedia();
  const dialog=document.querySelector('#detail-dialog'),body=document.querySelector('#dialog-body');
  let opener=null,heroWasPlaying=false;
  function openDetail(button){
    opener=button;heroWasPlaying=!video.paused;video.pause();
    const key=button.dataset.dialog;
    let label,html;
    if(key==='involved'){
      label='Connect with ADI';html='<h2 id="dialog-title">Get involved.</h2><p>Start with a program, explore resources, or contact the Adirondack Diversity Initiative through its official channels.</p><div class="detail-links">'+sourceLink('https://www.diversityadk.org/feedback','Contact ADI')+sourceLink('https://www.diversityadk.org','Official ADI website')+'</div><p class="detail-note">This private design concept does not collect personal details or submit applications.</p>';
    }else if(key==='film'){
      label='Private archive film / 30 seconds';html='<h2 id="dialog-title">People and places.</h2><p>A contextual montage from historical ANCA business and food stories, followed by original community art and mural photographs.</p><video class="native-film" src="../assets/community-archive.mp4" poster="../assets/conversation-poster.jpg" controls playsinline muted preload="metadata" aria-label="Thirty-second contextual archive montage"></video><p class="detail-note">Illustrative context for private review. These scenes span different activities and do not document one ADI event or all four programs. Public reuse rights and final client approval remain unconfirmed.</p><div class="detail-links">'+sourceLink('https://www.youtube.com/watch?v=emvWt5EYT-g','Crave Diner transition story')+sourceLink('https://www.youtube.com/watch?v=XsMJeLh7DGQ','ANCA farm story')+sourceLink('https://www.youtube.com/watch?v=P4ObiWtEZMo','ANCA compost story')+'</div>';
    }else{
      const d=details[key];label=d.label;html='<h2 id="dialog-title">'+d.title+'</h2><p>'+d.copy+'</p><h3>Explore the original pages</h3><div class="detail-links">'+d.links.map(l=>sourceLink(google+l[0],l[1])).join('')+'</div><p class="detail-note">'+(d.note||'Original links open in a new tab and need an internet connection. This local concept does not accept applications or imply current availability.')+'</p>';
    }
    document.querySelector('#dialog-label').textContent=label;body.innerHTML=html;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('dialog-open');document.querySelector('.dialog-close').focus();
  }
  document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>openDetail(b)));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{const modalVideo=body.querySelector('video');if(modalVideo)modalVideo.pause();document.body.classList.remove('dialog-open');if(opener)opener.focus();if(heroWasPlaying&&!motion.matches)attemptPlay();});
})();
