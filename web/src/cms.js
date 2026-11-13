(()=>{
/* ---------- Modo edición MST (solo para quien puede editar esta página) ---------- */
const SKEL='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const dEl=$("#mstdata"),sEl=$("#mstsrc"),iEl=$("#mstimg");
let D={};try{D=JSON.parse(dEl.textContent)||{}}catch(e){}
D={t:D.t||{},img:D.img||{},cfg:D.cfg||{},lists:D.lists||null,col:D.col||{},items:Array.isArray(D.items)?D.items:[],mk:D.mk||{}};
const OK=new Set(["B","EM","STRONG","BR"]);
const esc=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s||"").replace(/\s+/g," ").trim();
const clean=h=>{const d=document.createElement("div");d.innerHTML=h;const w=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType==1){if(!OK.has(c.tagName)){c.replaceWith(...c.childNodes);return w(n)}[...c.attributes].forEach(a=>c.removeAttribute(a.name));w(c)}})};w(d);return d.innerHTML.replace(/&nbsp;/g," ").trim()};
/* textos sueltos dentro de enlaces con íconos */
$$("main a,main .tbody i,footer a,header a.btn").forEach(a=>{if(a.children.length)[...a.childNodes].forEach(n=>{if(n.nodeType==3&&n.textContent.trim()){const sp=document.createElement("span");sp.className="cmst";n.replaceWith(sp);sp.appendChild(n)}})});
const SEL="main h1 .t1,main h1 .t2,main h1 .hl,main .sub,main h2,main h3,main p,main li,main summary,main small,main th,main td,main .tbody b,main .tbody>span,main .facts b,main .facts span,main label>span,main .seg a,main .mini b,.cmst,footer p,footer h4,footer ul a,header .btn";
const leaf=e=>[...e.childNodes].every(n=>n.nodeType==3||(n.nodeType==1&&OK.has(n.tagName)&&[...n.childNodes].every(m=>m.nodeType==3)))&&e.textContent.trim();
const T=[...document.querySelectorAll(SEL)].filter(e=>leaf(e)&&!e.closest(".faq,[data-cf],#cmsbar,[data-nocms]")&&!e.querySelector("#yr"));
T.forEach((e,i)=>{e.dataset.ck="t"+i;e.dataset.co=e.innerHTML});
const FAQS=$$(".det .faq");
const readLists=()=>{const L={};FAQS.forEach(f=>{const k=f.closest(".det").dataset.k;L[k]=[...f.querySelectorAll("details")].map(d=>({q:clean(d.querySelector("summary").innerHTML),a:clean((d.querySelector("p")||{innerHTML:""}).innerHTML)})).filter(x=>norm(x.q))});return L};
const ORIG_L=readLists();
const renderLists=L=>{if(!L)return;FAQS.forEach(f=>{const k=f.closest(".det").dataset.k;if(L[k])f.innerHTML=L[k].map(x=>"<details><summary>"+clean(x.q)+"</summary><p>"+clean(x.a)+"</p></details>").join("")})};
/* ajustes */
const txt=k=>{const e=$('[data-cf="'+k+'"]');return e?e.textContent.trim():""};
const DEF={wa:(window.MSTWA||"56942706354"),waTxt:txt("waTxt"),tel:txt("tel"),mail:txt("mail"),dir:txt("dir"),maps:($("[data-cfh=maps]")||{}).href||"",acc:"",hideFacts:false};
const dig=s=>String(s||"").replace(/\D/g,"");
let LC={};
function applyCfg(c){c={...DEF,...(c||{})};LC=c;const wa=dig(c.wa)||DEF.wa;if(window.MSTsetWA)MSTsetWA(wa);
 ["waTxt","tel","mail","dir"].forEach(k=>{$$('[data-cf="'+k+'"]').forEach(e=>e.textContent=c[k]);$$('[data-cfc="'+k+'"]').forEach(e=>e.dataset.copy=c[k])});
 $$("[data-cfh=walink]").forEach(a=>a.href="https://wa.me/"+wa);
 $$("[data-cfh=watel]").forEach(a=>{a.href="tel:+"+wa;a.setAttribute("aria-label","Llamar al "+c.waTxt)});
 $$("[data-cfh=tel]").forEach(a=>{const d=dig(c.tel);a.href="tel:+"+(d.length==9?"56"+d:d)});
 $$("[data-cfh=maps]").forEach(a=>{if(c.maps)a.href=c.maps});
 const r=document.documentElement.style;if(c.acc){r.setProperty("--blue",c.acc);r.setProperty("--blue-h","color-mix(in srgb,"+c.acc+" 82%,#000)")}else{r.removeProperty("--blue");r.removeProperty("--blue-h")}
 const f=$(".facts");if(f)f.hidden=!!c.hideFacts}
/* imágenes */
let IMGX=document.createElement("style");IMGX.id="mstimgx";document.head.appendChild(IMGX);
function applyImgs(img){let css="";Object.entries(img||{}).forEach(([k,v])=>{if(!v||!v.src)return;const u=v.src.replace(/"/g,"%22");
 if(k=="bg")css+='.wm{--bgimg:url("'+u+'")!important}';
 else{css+='.i-'+k+'{background-image:url("'+u+'")!important}';if(v.fill)css+='.art.i-'+k+'{inset:0!important;width:100%!important;height:100%!important;background-size:cover!important;background-position:center!important}'}});IMGX.textContent=css}
/* aplicar lo guardado */
T.forEach(e=>{const x=D.t[e.dataset.ck];if(x&&norm(x.o)==norm(e.dataset.co))e.innerHTML=clean(x.h)});
const isClip=e=>/text/.test(getComputedStyle(e).backgroundClip||getComputedStyle(e).webkitBackgroundClip||"");
function setCol(e,c){const _l=(h=>{h=String(h||"").replace("#","");if(h.length==3)h=h.replace(/./g,"$&$&");if(!/^[0-9a-f]{6}$/i.test(h))return .5;const v=[0,2,4].map(i=>{let x=parseInt(h.substr(i,2),16)/255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)});return .2126*v[0]+.7152*v[1]+.0722*v[2]})(c);if(c&&_l>.8)e.dataset.cl="w";else if(c&&_l<.03)e.dataset.cl="k";else delete e.dataset.cl;if(c){e.style.color=c;e.style.setProperty("-webkit-text-fill-color",c);if(e.classList.contains("hl")||isClip(e)){e.style.backgroundImage="none"}}else{e.style.removeProperty("color");e.style.removeProperty("-webkit-text-fill-color");e.style.removeProperty("background-image")}}
function applyCols(col){T.forEach(e=>setCol(e,(col||{})[e.dataset.ck]||""))}
renderLists(D.lists);applyCfg(D.cfg);applyImgs(D.img);applyCols(D.col);
/* ---------- edición ---------- */
let editing=false,snap=null,busy=false,pc=null,pimg=null,pcol=null,curEl=null;
/* ---------- Marketplace: venta de activos ---------- */
const CATS=[["camiones","Camiones y grúas"],["contenedores","Contenedores y módulos"],["materiales","Tubería y materiales"],["equipos","Equipos y herramientas"],["otros","Otros"]];
const ST={disp:"Disponible",res:"Reservado",vend:"Vendido"};
const catN=k=>(CATS.find(c=>c[0]==k)||["","Otros"])[1];
const fmtP=p=>{p=String(p||"").trim();if(!p)return"";const d=p.replace(/[^\d]/g,"");return /^[\s$.\d]+$/.test(p)&&d?"$"+Number(d).toLocaleString("es-CL"):p};
const mkGrid=$(".mk-grid"),mkCats=$(".mk-cats"),mkEmpty=$(".mk-empty"),mkM=$("#mkm");if(mkM)document.body.appendChild(mkM);let mkF="all",ITEMS=D.items||[];
const mkWa=t=>"https://wa.me/"+(window.MSTWA||"56942706354")+"?text="+encodeURIComponent(t);
function mkHead(m){$$("[data-mk]").forEach(e=>{if(!e.dataset.mo)e.dataset.mo=e.innerHTML;const v=(m||{})[e.dataset.mk];e.innerHTML=v?clean(v):e.dataset.mo})}
function mkRender(){const ed=editing;const items=(ITEMS||[]).filter(i=>ed||i.pub!==false);
 const cnt={};items.forEach(i=>cnt[i.cat]=(cnt[i.cat]||0)+1);const used=CATS.filter(c=>cnt[c[0]]);if(mkF!="all"&&!cnt[mkF])mkF="all";
 mkCats.innerHTML=used.length>1?'<button type="button" data-c="all" class="'+(mkF=="all"?"on":"")+'">Todos<span>'+items.length+'</span></button>'+used.map(([k,n])=>'<button type="button" data-c="'+k+'" class="'+(mkF==k?"on":"")+'">'+esc(n)+'<span>'+cnt[k]+'</span></button>').join(""):"";
 mkCats.querySelectorAll("button").forEach(b=>b.onclick=()=>{mkF=b.dataset.c;mkRender()});
 const list=items.map(it=>[it,ITEMS.indexOf(it)]).filter(([it])=>mkF=="all"||it.cat==mkF);
 mkGrid.innerHTML=list.map(([it,ix])=>{const f=(it.fotos||[])[0];const det=[it.anio,it.det].filter(Boolean).map(esc).join(" · ");const pr=fmtP(it.precio);
  return '<div class="mk-card '+(it.estado||"disp")+'" role="button" tabindex="0" data-ix="'+ix+'"><div class="mk-ph'+(f?"":" none")+'"'+(f?' style="background-image:url(&quot;'+esc(f)+'&quot;)"':"")+'>'+(f?"":"Sin foto")+'<span class="mk-st '+(it.estado||"disp")+'">'+ST[it.estado||"disp"]+'</span>'+((it.fotos||[]).length>1?'<span class="mk-n">📷 '+it.fotos.length+'</span>':"")+'</div><div class="mk-cb"><small>'+esc(catN(it.cat))+'</small><b>'+esc(it.n||"Sin nombre")+'</b>'+(det?'<span class="mk-d">'+det+'</span>':"")+'<span class="mk-p'+(pr?"":" q")+'">'+(pr?esc(pr):"Consultar precio")+'</span>'+
  (ed?'<span class="mk-ed"><button type="button" class="cmsl add" data-e="'+ix+'">✏️ Editar</button><button type="button" class="cmsl" data-d="'+ix+'">Eliminar</button></span>':"")+'</div></div>'}).join("");
 mkEmpty.hidden=items.length>0;const e=$(".mk-empty .mk-wa");if(e)e.href=mkWa("Hola, quiero consultar por los activos que tienen a la venta.");
 const disp=items.filter(i=>(i.estado||"disp")!="vend").length;const c=$(".mk-count");if(c)c.textContent=disp?disp+(disp==1?" disponible":" disponibles"):"";
 mkGrid.querySelectorAll(".mk-card").forEach(c=>{c.onclick=e=>{if(e.target.closest(".mk-ed"))return;mkOpen(+c.dataset.ix)};c.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();mkOpen(+c.dataset.ix)}}});
 mkGrid.querySelectorAll("[data-e]").forEach(b=>b.onclick=e=>{e.stopPropagation();mkEditor(+b.dataset.e)});
 mkGrid.querySelectorAll("[data-d]").forEach(b=>b.onclick=e=>{e.stopPropagation();if(confirmDel(+b.dataset.d)){}});
 let add=$("#mkadd");if(ed){if(!add){add=document.createElement("button");add.id="mkadd";add.type="button";add.className="cmsl add";add.style.cssText="font-size:.95rem;padding:.7em 1.2em;margin:18px 0 0";add.textContent="+ Agregar activo";add.onclick=()=>mkEditor(-1);mkGrid.before(add)}}else if(add)add.remove()}
function confirmDel(ix){const b=mkGrid.querySelector('[data-d="'+ix+'"]');if(b.dataset.ok){ITEMS.splice(ix,1);mkRender();return true}b.dataset.ok=1;b.textContent="¿Seguro? Toca de nuevo";setTimeout(()=>{if(b.isConnected){delete b.dataset.ok;b.textContent="Eliminar"}},3000);return false}
let mkLast=null;
function mkOpen(ix){const it=ITEMS[ix];if(!it)return;mkLast=document.activeElement;const fotos=it.fotos||[];const pr=fmtP(it.precio);const st=it.estado||"disp";
 const rows=[["Categoría",catN(it.cat)],["Estado",ST[st]],["Año",it.anio],["Detalle",it.det]].filter(r=>r[1]);
 $(".mk-box",).innerHTML='<button type="button" class="mk-x" aria-label="Cerrar">×</button><div class="mk-gal"'+(fotos.length?'':' hidden')+'><div class="mk-main"'+(fotos[0]?' style="background-image:url(&quot;'+esc(fotos[0])+'&quot;)"':"")+'></div>'+(fotos.length>1?'<div class="mk-th">'+fotos.map((f,i)=>'<button type="button" data-i="'+i+'" class="'+(i?"":"on")+'" style="background-image:url(&quot;'+esc(f)+'&quot;)" aria-label="Foto '+(i+1)+'"></button>').join("")+"</div>":"")+'</div>'+
 '<div class="mk-inf"><small style="font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--blue)">Venta de activos MST</small><h3>'+esc(it.n||"")+'</h3><div class="mk-p">'+(pr?esc(pr):"Consultar precio")+'</div><dl>'+rows.map(r=>"<dt>"+esc(r[0])+"</dt><dd>"+esc(r[1])+"</dd>").join("")+'</dl>'+(it.desc?'<p class="mk-ds">'+esc(it.desc)+"</p>":"")+
 '<a class="btn pri mk-btn-wa'+(st=="vend"?" off":"")+'" target="_blank" rel="noopener" href="'+esc(mkWa("Hola, me interesa este activo de MST: "+(it.n||"")+(pr?" ("+pr+")":"")+". ¿Sigue disponible?"))+'">'+(st=="vend"?"Vendido":"💬 Me interesa · WhatsApp")+'</a></div>';
 mkM.querySelector(".mk-box").classList.toggle("nof",!fotos.length);mkM.hidden=false;document.body.style.overflow="hidden";const x=mkM.querySelector(".mk-x");x.onclick=mkClose;x.focus();
 mkM.querySelectorAll(".mk-th button").forEach(b=>b.onclick=()=>{mkM.querySelector(".mk-main").style.backgroundImage='url("'+fotos[+b.dataset.i]+'")';mkM.querySelectorAll(".mk-th button").forEach(o=>o.classList.toggle("on",o==b))})}
function mkClose(){mkM.hidden=true;document.body.style.overflow="";if(mkLast&&mkLast.focus)mkLast.focus()}
mkM.addEventListener("click",e=>{if(e.target==mkM)mkClose()});document.addEventListener("keydown",e=>{if(e.key=="Escape"&&!mkM.hidden)mkClose()});
function mkEditor(ix){let m=$("#cmscfg");if(m)m.remove();const it=ix>=0?JSON.parse(JSON.stringify(ITEMS[ix])):{n:"",cat:"camiones",precio:"",estado:"disp",anio:"",det:"",desc:"",fotos:[]};
 m=document.createElement("div");m.id="cmscfg";
 const f=(k,l,h,ph)=>'<label><span>'+l+'</span><input data-k="'+k+'" type="text" value="'+esc(it[k]||"")+'" placeholder="'+esc(ph||"")+'">'+(h?"<small>"+h+"</small>":"")+"</label>";
 const draw=()=>{m.innerHTML='<div class="cbox"><div class="chd"><b>'+(ix>=0?"Editar activo":"Nuevo activo")+'</b><button type="button" class="cx">Cancelar</button></div>'+
 "<h5>Fotos</h5><div class=\"mkfs\" style=\"display:flex;flex-wrap:wrap;gap:8px\">"+it.fotos.map((u,i)=>'<span style="position:relative;width:86px;height:64px;border-radius:8px;background:#ddd center/cover no-repeat;background-image:url(&quot;'+esc(u)+'&quot;)">'+(i==0?'<em style="position:absolute;left:4px;bottom:4px;font:700 .65rem system-ui;background:#1452e0;color:#fff;border-radius:4px;padding:1px 4px;font-style:normal">Portada</em>':'<button type="button" data-pf="'+i+'" title="Usar como portada" style="position:absolute;left:3px;bottom:3px;padding:1px 5px;font-size:.65rem">★</button>')+'<button type="button" data-rf="'+i+'" title="Quitar foto" style="position:absolute;top:3px;right:3px;padding:0 6px;font-size:.8rem">×</button></span>').join("")+'</div><label class="row" style="margin-top:8px"><button type="button" class="addf">📷 Agregar fotos</button><small>Hasta 8 fotos. La primera es la portada.</small></label>'+
 "<h5>Datos</h5>"+f("n","Nombre del activo","","Ej: Camión pluma Volvo FM 2015")+
 '<label><span>Categoría</span><select data-k="cat" style="font:500 .95rem system-ui;padding:.6em;border-radius:8px;border:1px solid #d6dbe1">'+CATS.map(([k,n])=>'<option value="'+k+'"'+(it.cat==k?" selected":"")+">"+esc(n)+"</option>").join("")+"</select></label>"+
 f("precio","Precio","Escribe solo el número (ej: 25000000) o un texto como «Conversable». Vacío = «Consultar precio».")+
 '<label><span>Estado</span><select data-k="estado" style="font:500 .95rem system-ui;padding:.6em;border-radius:8px;border:1px solid #d6dbe1">'+Object.entries(ST).map(([k,n])=>'<option value="'+k+'"'+(it.estado==k?" selected":"")+">"+n+"</option>").join("")+"</select></label>"+
 f("anio","Año","","Ej: 2015")+f("det","Detalle corto","Se ve en la tarjeta. Ej: 180.000 km · Grúa 25 t","")+
 '<label><span>Descripción</span><textarea data-k="desc" rows="5" style="font:500 .95rem system-ui;padding:.65em .75em;border-radius:8px;border:1px solid #d6dbe1;background:#f6f7f9;resize:vertical">'+esc(it.desc||"")+"</textarea></label>"+
 '<button type="button" class="ok" style="width:100%;background:#1452e0;color:#fff;border-color:#1452e0;padding:.9em;font-size:.95rem;margin-top:6px">'+(ix>=0?"Aplicar cambios":"Agregar activo")+'</button><p class="nt">Después toca <b>Guardar cambios</b> en la barra de abajo para publicarlo.</p></div>';
  m.querySelectorAll("[data-k]").forEach(i=>i.oninput=i.onchange=()=>{it[i.dataset.k]=i.value});
  m.querySelectorAll("[data-rf]").forEach(b=>b.onclick=()=>{it.fotos.splice(+b.dataset.rf,1);draw()});
  m.querySelectorAll("[data-pf]").forEach(b=>b.onclick=()=>{const [x]=it.fotos.splice(+b.dataset.pf,1);it.fotos.unshift(x);draw()});
  m.querySelector(".addf").onclick=()=>{const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.multiple=true;inp.onchange=async()=>{for(const fl of [...inp.files].slice(0,8-it.fotos.length)){try{const r=await shrink(fl,1100);it.fotos.push(r.fill?r.src:r.src)}catch(e){}}draw()};inp.click()};
  m.querySelector(".cx").onclick=()=>m.remove();
  m.querySelector(".ok").onclick=()=>{if(!String(it.n||"").trim()){const i=m.querySelector('[data-k="n"]');i.focus();i.style.borderColor="#c62828";return}if(ix>=0)ITEMS[ix]=it;else ITEMS.unshift(it);m.remove();if(typeof dirty=="function"&&PNL)dirty();mkRender()}};
 draw();document.body.appendChild(m)}
function mkEdit(on){$$("[data-mk]").forEach(e=>{if(on){e.contentEditable="true";e.dataset.ckl=1}else{e.removeAttribute("contenteditable");delete e.dataset.ckl}});mkRender()}
const readMk=()=>{const o={};$$("[data-mk]").forEach(e=>{const h=clean(e.innerHTML);if(norm(h)!=norm(clean(e.dataset.mo)))o[e.dataset.mk]=h});return o};
mkHead(D.mk);
/* ---------- Panel de administración del Marketplace ---------- */
let PNL=null,pq="",pdirty=false;
function pnlCounts(){const c={disp:0,res:0,vend:0};ITEMS.forEach(i=>{if(i.pub!==false)c[i.estado||"disp"]++});return c}
function pnlRender(){if(!PNL)return;const c=pnlCounts(),q=pq.toLowerCase(),hid=ITEMS.filter(i=>i.pub===false).length;
 const rows=ITEMS.map((it,ix)=>[it,ix]).filter(([it])=>(pf=="all"||(pf=="oculto"?it.pub===false:(it.estado||"disp")==pf&&it.pub!==false))&&(!q||[it.n,it.det,catN(it.cat),it.anio].join(" ").toLowerCase().includes(q)));
 PNL.querySelector(".pk").innerHTML=[["all","Todos",ITEMS.length,"#1452e0"],["disp","Disponibles",c.disp,"#16a34a"],["res","Reservados",c.res,"#d97706"],["vend","Vendidos",c.vend,"#475569"],["oculto","Ocultos",hid,"#9aa3ac"]].map(([k,t,n,col])=>'<button type="button" data-f="'+k+'" class="'+(pf==k?"on":"")+'" style="--c:'+col+'"><b>'+n+'</b><span>'+t+'</span></button>').join("");
 PNL.querySelectorAll(".pk [data-f]").forEach(b=>b.onclick=()=>{pf=b.dataset.f;pnlRender()});
 const STC={disp:"#16a34a",res:"#d97706",vend:"#475569"};
 PNL.querySelector(".pl").innerHTML=rows.length?'<div class="lh"><span></span><span>Equipo</span><span>Categoría</span><span>Precio</span><span>Estado</span><span></span></div>'+rows.map(([it,ix])=>{const f=(it.fotos||[])[0],st=it.estado||"disp",pr=fmtP(it.precio),off=it.pub===false;
  return '<div class="pr'+(st=="vend"?" v":"")+(off?" off":"")+'" data-row="'+ix+'"><span class="pt"'+(f?' style="background-image:url(&quot;'+esc(f)+'&quot;)"':"")+'>'+(f?"":"📷")+((it.fotos||[]).length>1?'<i>'+it.fotos.length+'</i>':"")+'</span>'+
  '<span class="pn"><b>'+esc(it.n||"Sin nombre")+'</b><small>'+[it.anio,it.det].filter(Boolean).map(esc).join(" · ")+'</small>'+(off?'<em class="oc">Oculto en la web</em>':"")+'</span>'+
  '<span class="pc">'+esc(catN(it.cat))+'</span><span class="pp2" data-pr="'+ix+'">'+(pr?esc(pr):'<i>Consultar</i>')+'</span>'+
  '<span class="pst" style="--c:'+STC[st]+'">'+ST[st]+'</span>'+
  '<span class="pdd"><button type="button" class="ddb" data-dd="'+ix+'" aria-haspopup="true" aria-expanded="false">Acciones ▾</button></span></div>'}).join(""):'<div class="pe0">'+(ITEMS.length?"No hay equipos en este filtro.":"Todavía no hay equipos. Toca <b>+ Publicar activo</b> para crear el primero.")+'</div>';
 PNL.querySelectorAll("[data-dd]").forEach(b=>b.onclick=e=>{e.stopPropagation();ddOpen(b,+b.dataset.dd)});
 PNL.querySelectorAll("[data-pr]").forEach(s=>s.ondblclick=()=>priceEdit(+s.dataset.pr));
 const sv=PNL.querySelector(".psv");sv.disabled=!pdirty;sv.textContent=pdirty?"Publicar cambios en la web":"Sin cambios por publicar"}
let pf="all";
function ddClose(){const m=$("#pddm");if(m)m.remove();PNL&&PNL.querySelectorAll(".ddb[aria-expanded=true]").forEach(b=>b.setAttribute("aria-expanded","false"))}
function ddOpen(btn,ix){const was=btn.getAttribute("aria-expanded")=="true";ddClose();if(was)return;const it=ITEMS[ix];if(!it)return;const st=it.estado||"disp",off=it.pub===false,nf=(it.fotos||[]).length;
 const m=document.createElement("div");m.id="pddm";m.setAttribute("role","menu");
 const opt=(a,ico,t,cls,dis)=>'<button type="button" role="menuitem" data-a="'+a+'" class="'+(cls||"")+'"'+(dis?" disabled":"")+'><span>'+ico+'</span>'+t+'</button>';
 m.innerHTML=opt("ver","🖼️","Ver imágenes y ficha"+(nf?" ("+nf+")":""),"",false)+opt("edit","✏️","Editar datos y fotos")+opt("precio","💲","Cambiar precio")+
  '<div class="sep">Cambiar estado</div>'+Object.entries(ST).map(([k,n])=>opt("st:"+k,k==st?"●":"○",n,k==st?"cur":"")).join("")+
  '<div class="sep">Publicación</div>'+(off?opt("pub","🌐","Publicar en la web"):opt("hide","🙈","Ocultar de la web"))+opt("dup","📄","Duplicar")+opt("del","🗑️","Eliminar","del");
 document.body.appendChild(m);btn.setAttribute("aria-expanded","true");
 const r=btn.getBoundingClientRect(),mh=m.offsetHeight,mw=m.offsetWidth;let top=r.bottom+6;if(top+mh>innerHeight-80)top=Math.max(8,r.top-mh-6);m.style.top=top+"px";m.style.left=Math.max(8,Math.min(innerWidth-mw-8,r.right-mw))+"px";
 m.querySelectorAll("[data-a]").forEach(o=>o.onclick=()=>{const a=o.dataset.a;
  if(a=="del"&&!o.dataset.ok){o.dataset.ok=1;o.innerHTML="<span>⚠️</span>Toca otra vez para eliminar";return}
  ddClose();
  if(a=="ver")mkOpen(ix);else if(a=="edit")mkEditor(ix);else if(a=="precio")priceEdit(ix);
  else if(a.startsWith("st:")){it.estado=a.slice(3);dirty();mkRender()}
  else if(a=="hide"){it.pub=false;dirty();mkRender()}else if(a=="pub"){delete it.pub;dirty();mkRender()}
  else if(a=="dup"){const c=JSON.parse(JSON.stringify(it));c.n=(c.n||"")+" (copia)";c.pub=false;ITEMS.splice(ix+1,0,c);dirty();mkRender()}
  else if(a=="del"){ITEMS.splice(ix,1);dirty();mkRender()}});
 const f=m.querySelector("button");if(f)f.focus()}
document.addEventListener("click",e=>{if(!e.target.closest("#pddm,.ddb"))ddClose()});
document.addEventListener("keydown",e=>{if(e.key=="Escape")ddClose()});
document.addEventListener("scroll",ddClose,true);
function priceEdit(ix){const cell=PNL&&PNL.querySelector('[data-pr="'+ix+'"]');if(!cell)return;const it=ITEMS[ix];
 cell.innerHTML='<input value="'+esc(it.precio||"")+'" placeholder="Ej: 2500000">';const i=cell.querySelector("input");i.focus();i.select();
 const done=ok=>{if(ok){it.precio=i.value.trim();dirty()}pnlRender()};i.onkeydown=e=>{if(e.key=="Enter")done(true);if(e.key=="Escape")done(false)};i.onblur=()=>done(true)}
function dirty(){pdirty=true;const sv=PNL&&PNL.querySelector(".psv");if(sv){sv.disabled=false;sv.textContent="Publicar cambios en la web"}}
function pnlOpen(){if(!editing)enter();if(window.show)show("activos",false);if(PNL)return;pdirty=false;const n0=JSON.stringify(ITEMS);
 PNL=document.createElement("div");PNL.id="mkpanel";PNL.innerHTML='<div class="ph"><div><small>Sistema MST</small><h2>🏷️ Marketplace · Panel de administración</h2><p>Publica, edita precios y cambia el estado de los activos en venta. Al tocar <b>Publicar cambios en la web</b> se actualiza la página al instante.</p></div><button type="button" class="px">Cerrar panel</button></div>'+
 '<div class="pk"></div><div class="pbar"><button type="button" class="padd">+ Publicar activo</button><button type="button" class="precv">📥 Recibir desde el Sistema MST</button><button type="button" class="pcopy">📋 Copiar para el Sistema MST</button><input type="search" class="pq" placeholder="Buscar por nombre, categoría o año…"></div><div class="pl"></div>'+
 '<div class="pfoot"><span class="pmsg"></span><button type="button" class="psv" disabled>Sin cambios por publicar</button></div>';
 document.body.appendChild(PNL);document.body.classList.add("pnlon");
 PNL.querySelector(".padd").onclick=()=>mkEditor(-1);
 PNL.querySelector(".precv").onclick=()=>{let m=$("#cmscfg");if(m)m.remove();m=document.createElement("div");m.id="cmscfg";
  m.innerHTML='<div class="cbox"><div class="chd"><b>Recibir activos desde el Sistema MST</b><button type="button" class="cx">Cerrar</button></div><p class="nt" style="margin-top:8px">En el Sistema MST, módulo <b>Marketplace</b>, toca <b>🌐 Enviar a la web</b> y luego <b>Copiar</b>. Pega aquí y toca <b>Recibir y publicar</b>. La lista de la web quedará igual a la del sistema.</p><textarea rows="6" placeholder="Pega aquí (empieza con MSTWEB)…" style="width:100%;font:12px ui-monospace,monospace;padding:8px;border-radius:8px;border:1px solid #d6dbe1;margin-top:8px"></textarea><button type="button" class="ok" style="width:100%;margin-top:10px;background:#16a34a;color:#fff;border-color:#16a34a;padding:.9em;font-size:1rem">Recibir y publicar</button><p class="nt er" style="color:#c62828"></p></div>';
  document.body.appendChild(m);const ta=m.querySelector("textarea");m.querySelector(".cx").onclick=()=>m.remove();setTimeout(()=>ta.focus(),30);
  m.querySelector(".ok").onclick=async()=>{let A=null;try{A=JSON.parse(ta.value.trim().replace(/^MSTWEB:/,""))}catch(e){}
   if(!Array.isArray(A)){m.querySelector(".er").textContent="No se reconoce el texto. Cópialo de nuevo desde el Sistema MST (🌐 Enviar a la web).";return}
   ITEMS.length=0;A.forEach(a=>{if(a&&a.n)ITEMS.push({n:String(a.n),cat:a.cat||"otros",precio:String(a.precio||""),estado:a.estado||"disp",anio:String(a.anio||""),det:String(a.det||""),desc:String(a.desc||""),fotos:(a.fotos||[]).filter(u=>/^data:image\//.test(u)).slice(0,8)})});
   m.remove();dirty();mkRender();const b=PNL.querySelector(".psv");if(b)b.click()}};
 PNL.querySelector(".pcopy").onclick=()=>{const L=ITEMS.map(i=>({n:i.n,cat:i.cat,precio:i.precio||"",estado:i.estado||"disp",anio:i.anio||"",det:i.det||"",desc:i.desc||"",fotos:i.fotos||[],pub:i.pub!==false}));const t="MSTACT:"+JSON.stringify(L);
  let m=$("#cmscfg");if(m)m.remove();m=document.createElement("div");m.id="cmscfg";m.innerHTML='<div class="cbox"><div class="chd"><b>Copiar activos para el Sistema MST</b><button type="button" class="cx">Cerrar</button></div><p class="nt" style="margin-top:8px">1. Copia este texto. 2. En el Sistema MST abre <b>Marketplace → Traer los activos que ya están publicados en la web</b>, pégalo y toca <b>Importar</b>.</p><textarea readonly rows="8" style="width:100%;font:12px ui-monospace,monospace;padding:8px;border-radius:8px;border:1px solid #d6dbe1;margin-top:8px"></textarea><button type="button" class="cp1" style="width:100%;margin-top:10px;background:#1452e0;color:#fff;border-color:#1452e0;padding:.9em">📋 Copiar texto</button><p class="nt ok"></p><p class="nt">Se copian '+L.length+' activos con sus fotos. Hazlo una sola vez: desde ahora los activos se publican en el Sistema MST.</p></div>';
  document.body.appendChild(m);const ta=m.querySelector("textarea");ta.value=t;m.querySelector(".cx").onclick=()=>m.remove();
  const cp=m.querySelector(".cp1");cp.onclick=async()=>{let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){}if(!ok){ta.focus();ta.select();try{ok=document.execCommand("copy")}catch(e){}}m.querySelector(".ok").textContent=ok?"✓ Copiado. Ahora pégalo en el Sistema MST.":"Selecciona el texto de arriba y cópialo a mano (Ctrl+C o mantener presionado → Copiar)."}};
 PNL.querySelector(".pq").oninput=e=>{pq=e.target.value;pnlRender()};
 PNL.querySelector(".px").onclick=()=>{if(pdirty&&!PNL.dataset.ask){PNL.dataset.ask=1;PNL.querySelector(".pmsg").textContent="Tienes cambios sin publicar. Toca «Cerrar panel» otra vez para descartarlos.";return}PNL.remove();PNL=null;document.body.classList.remove("pnlon");cancel()};
 PNL.querySelector(".psv").onclick=async()=>{const b=PNL.querySelector(".psv");b.disabled=true;b.textContent="Publicando…";PNL.querySelector(".pmsg").textContent="";await save();if(PNL&&!editing){PNL.querySelector(".pmsg").textContent="✓ Publicado. La web se está actualizando…"}else if(PNL){b.disabled=false;b.textContent="Publicar cambios en la web";const m=$("#cmsbar .cmsmsg.er");PNL.querySelector(".pmsg").textContent=m?m.textContent:"No se pudo publicar."}};
 pnlRender()}
const _mkR=mkRender;mkRender=function(){_mkR();if(PNL){if(JSON.stringify(ITEMS)!==PNL.dataset.last){PNL.dataset.last=JSON.stringify(ITEMS)}pnlRender()}};

mkRender();
const st=document.createElement("style");st.textContent=`
#cmsgo{position:fixed;left:calc(18px + env(safe-area-inset-left,0px));bottom:calc(100px + env(safe-area-inset-bottom,0px));z-index:40;font:700 .92rem var(--body,system-ui);padding:.85em 1.1em;border-radius:999px;border:1px solid #2c333a;background:#14181c;color:#fff;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.3)}
#cmsbar{position:fixed;left:0;right:0;bottom:0;z-index:60;background:#14181c;color:#eef0f2;border-top:3px solid var(--blue);padding:10px max(14px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(14px,env(safe-area-inset-left,0px));display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-family:var(--body,system-ui)}
#cmsbar p{margin:0;flex:1 1 240px;font-size:.88rem;color:#a2a9b0}#cmsbar p b{color:#fff}
#cmsbar button{font:700 .88rem var(--body,system-ui);padding:.7em 1em;border-radius:8px;cursor:pointer;border:1px solid #343a40;background:transparent;color:#fff}
#cmsbar button.sv{background:var(--blue);border-color:var(--blue)}#cmsbar button:disabled{opacity:.6;cursor:default}
#cmsbar .vw{display:flex;gap:4px;flex-wrap:wrap;flex-basis:100%}#cmsbar .vw button{padding:.45em .75em;font-size:.8rem}#cmsbar .vw button.on{background:#fff;color:#111}
.cmsmsg{font-weight:700}.cmsmsg.ok{color:#5fd38d}.cmsmsg.er{color:#ff8a80}
body.cmsed{padding-bottom:150px}body.cmsed .fab,body.cmsed #cmsgo{display:none}
body.cmsed [data-ck],body.cmsed [data-ckl]{outline:1.5px dashed color-mix(in srgb,var(--blue) 70%,transparent);outline-offset:3px;border-radius:3px;cursor:text}
body.cmsed [data-ck]:focus,body.cmsed [data-ckl]:focus{outline:2px solid var(--blue);background:color-mix(in srgb,var(--blue) 8%,transparent)}
body.cmsed .pick h1 .hl{color:var(--blue);-webkit-text-fill-color:var(--blue)}
.cmsph{position:absolute;z-index:6;top:8px;left:8px;font:700 .8rem var(--body,system-ui);padding:.5em .75em;border-radius:8px;border:0;background:#fff;color:#111;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.35)}.cmsph.rm{top:44px;background:#1d2126;color:#fff}
.cmsl{font:700 .8rem var(--body,system-ui);border-radius:999px;border:1px solid #f1b5b5;background:#fff5f5;color:#c62828;cursor:pointer;padding:.35em .75em;margin:2px 0 8px auto;display:block}.cmsl.add{background:var(--blue);border-color:var(--blue);color:#fff;margin:10px 0 0}
#cmscfg{position:fixed;inset:0;z-index:70;background:rgba(5,8,12,.55);display:flex;justify-content:flex-end}
#cmscfg .cbox{width:min(420px,100%);height:100%;overflow:auto;background:#fff;color:#14181c;padding:20px 20px 150px;box-shadow:-10px 0 30px rgba(0,0,0,.3);font-family:var(--body,system-ui);box-sizing:border-box}
#cmscfg .chd{display:flex;justify-content:space-between;align-items:center}#cmscfg .chd b{font-size:1.15rem}
#cmscfg button{font:700 .85rem var(--body,system-ui);padding:.55em .9em;border-radius:8px;border:1px solid #d6dbe1;background:#fff;color:#14181c;cursor:pointer}
#cmscfg h5{margin:18px 0 8px;font:600 .72rem ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#1452e0}
#cmscfg label{display:flex;flex-direction:column;gap:4px;margin-bottom:10px;font-size:.9rem;font-weight:600}#cmscfg label.row{flex-direction:row;align-items:center;gap:10px;font-weight:500}
#cmscfg input[type=text],#cmscfg input[type=url],#cmscfg input[type=email],#cmscfg input[type=tel]{font:500 .95rem var(--body,system-ui);padding:.65em .75em;border-radius:8px;border:1px solid #d6dbe1;background:#f6f7f9;color:#14181c;width:100%;box-sizing:border-box}
#cmscfg input[type=color]{width:46px;height:36px;border:1px solid #d6dbe1;border-radius:8px;padding:2px;background:none}#cmscfg input[type=checkbox]{width:18px;height:18px}
#cmscol{position:fixed;z-index:65;display:none;align-items:center;gap:5px;padding:6px 8px;border-radius:12px;background:#14181c;box-shadow:0 10px 26px rgba(0,0,0,.35);font-family:var(--body,system-ui)}
#cmscol.on{display:flex}#cmscol .sw{width:24px;height:24px;border-radius:50%;border:2px solid rgba(255,255,255,.85);cursor:pointer;padding:0}
#cmscol button.tx{font:800 .8rem var(--body,system-ui);color:#fff;background:transparent;border:1px solid #3a4148;border-radius:7px;padding:.35em .6em;cursor:pointer}
#cmscol input[type=color]{width:30px;height:28px;border:0;padding:0;background:none;cursor:pointer}#cmscol span{color:#a2a9b0;font-size:.75rem;margin-right:2px}
#mkpanel{position:fixed;inset:0;z-index:66;background:#f3f5f8;color:#14181c;overflow:auto;font-family:var(--body,system-ui);padding:calc(16px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) 110px max(16px,env(safe-area-inset-left,0px))}
#mkpanel>*{max-width:1100px;margin-left:auto;margin-right:auto}
#mkpanel .ph{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap}#mkpanel .ph small{font:600 .72rem ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#c8102e}#mkpanel h2{margin:4px 0;font-size:clamp(1.4rem,3vw,1.9rem)}#mkpanel .ph p{margin:0;color:#5c6670;max-width:60ch}
#mkpanel button{font:600 .9rem var(--body,system-ui);border-radius:9px;border:1px solid #d6dbe1;background:#fff;color:#14181c;padding:.6em 1em;cursor:pointer}
#mkpanel .pk{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:18px}#mkpanel .pk button{text-align:left;background:#fff;border:1px solid #e1e5ea;border-top:4px solid var(--c);border-radius:12px;padding:12px 14px}#mkpanel .pk button.on{box-shadow:0 0 0 2px var(--c);background:color-mix(in srgb,var(--c) 7%,#fff)}#mkpanel .pk b{display:block;font-size:1.6rem;color:var(--c)}#mkpanel .pk span{color:#5c6670;font-size:.85rem;font-weight:600}
#mkpanel .pbar{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}#mkpanel .padd{background:#1452e0;border-color:#1452e0;color:#fff;font-size:1rem;padding:.75em 1.2em}#mkpanel .pcopy,#mkpanel .precv{font-size:1rem;padding:.75em 1.1em}#mkpanel .precv{background:#16a34a;border-color:#16a34a;color:#fff}#mkpanel .pq{flex:1 1 240px;font:500 .95rem var(--body,system-ui);padding:.7em .9em;border-radius:10px;border:1px solid #d6dbe1;background:#fff}
#mkpanel .pl{display:flex;flex-direction:column;gap:8px;margin-top:14px}
#mkpanel .pl{gap:0!important;background:#fff;border:1px solid #e1e5ea;border-radius:14px;overflow:hidden}#mkpanel .lh,#mkpanel .pr{display:grid;grid-template-columns:64px minmax(0,2fr) minmax(0,1.2fr) 130px 120px 130px;gap:12px;align-items:center;padding:10px 14px}#mkpanel .lh{background:#f6f7f9;font:600 .72rem ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#5c6670;padding-block:9px}#mkpanel .pr{border-top:1px solid #edf0f3}#mkpanel .pr:hover{background:#fafbfc}#mkpanel .pr.off{background:repeating-linear-gradient(135deg,#fff 0 10px,#f6f7f9 10px 20px)}#mkpanel .pc{color:#5c6670;font-size:.9rem}#mkpanel .pp2{font-weight:800;color:#1452e0;cursor:text}#mkpanel .pp2 i{font-style:normal;font-weight:600;color:#8a95a1}#mkpanel .pp2 input{width:100%;font:700 .92rem system-ui;padding:.45em .5em;border:1px solid #1452e0;border-radius:7px}#mkpanel .pst{justify-self:start;font-size:.78rem;font-weight:700;padding:.3em .75em;border-radius:999px;color:var(--c);background:color-mix(in srgb,var(--c) 13%,#fff)}#mkpanel .pt{position:relative}#mkpanel .pt i{position:absolute;right:3px;bottom:3px;font:700 .65rem system-ui;font-style:normal;background:rgba(0,0,0,.6);color:#fff;border-radius:999px;padding:0 5px}#mkpanel .oc{font-style:normal;font-size:.72rem;font-weight:700;color:#7a8591}#mkpanel .pdd{justify-self:end}#mkpanel .ddb{background:#14181c;border-color:#14181c;color:#fff;white-space:nowrap}#mkpanel .ddb[aria-expanded=true]{background:#1452e0;border-color:#1452e0}#mkpanel .pe0{border:0!important}
#pddm{position:fixed;z-index:75;min-width:240px;background:#fff;color:#14181c;border-radius:12px;box-shadow:0 16px 40px rgba(0,0,0,.25),0 0 0 1px rgba(0,0,0,.06);padding:6px;font-family:var(--body,system-ui);display:flex;flex-direction:column}#pddm button{display:flex;align-items:center;gap:10px;text-align:left;font:600 .9rem var(--body,system-ui);background:none;border:0;border-radius:8px;padding:.6em .7em;color:#14181c;cursor:pointer}#pddm button span{width:20px;text-align:center}#pddm button:hover,#pddm button:focus{background:#eef3ff;outline:none}#pddm button.cur{color:#1452e0}#pddm button.del{color:#c62828}#pddm button.del:hover{background:#fff1f1}#pddm .sep{font:600 .66rem ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#8a95a1;padding:8px 10px 3px;border-top:1px solid #eef0f3;margin-top:4px}
#mkpanel .pr.v{opacity:.65}#mkpanel .pt{width:72px;height:54px;border-radius:8px;background:#e6e9ee center/cover no-repeat;display:grid;place-items:center;color:#8a95a1}
#mkpanel .pn{display:flex;flex-direction:column;min-width:0}#mkpanel .pn b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#mkpanel .pn small{color:#5c6670}
#mkpanel label{display:flex;flex-direction:column;gap:3px;font-size:.72rem;color:#5c6670;font-weight:600}#mkpanel .pr input,#mkpanel .pr select{font:600 .92rem var(--body,system-ui);padding:.5em .6em;border-radius:8px;border:1px solid #d6dbe1;background:#f8f9fb;min-width:0;width:100%}
#mkpanel .pa{display:flex;gap:6px}#mkpanel .pa .del{color:#c62828;border-color:#f1b5b5;background:#fff5f5}
#mkpanel .pe0{padding:28px;text-align:center;color:#5c6670;background:#fff;border:1.5px dashed #d6dbe1;border-radius:12px}
#mkpanel .pfoot{position:fixed;left:0;right:0;bottom:0;max-width:none;background:#14181c;padding:12px max(16px,env(safe-area-inset-right,0px)) calc(12px + env(safe-area-inset-bottom,0px));display:flex;justify-content:flex-end;align-items:center;gap:12px;flex-wrap:wrap}
#mkpanel .pmsg{color:#cfd6de;font-size:.9rem;flex:1 1 200px}#mkpanel .psv{background:#16a34a;border-color:#16a34a;color:#fff;font-size:1rem;padding:.8em 1.4em}#mkpanel .psv:disabled{background:#3a4148;border-color:#3a4148;color:#aab2ba;cursor:default}
@media(max-width:800px){#mkpanel .pk{grid-template-columns:repeat(3,1fr)}#mkpanel .lh{display:none}#mkpanel .pr{grid-template-columns:56px minmax(0,1fr) auto;row-gap:6px}#mkpanel .pn{grid-column:2/4}#mkpanel .pc{display:none}#mkpanel .pp2{grid-column:1/3}#mkpanel .pst{grid-column:3;justify-self:end}#mkpanel .pdd{grid-column:1/-1;justify-self:stretch}#mkpanel .ddb{width:100%}}
body.pnlon #cmsbar,body.pnlon #cmscol{display:none!important}
#cmscfg small{font-weight:400;color:#5c6670;font-size:.78rem}#cmscfg .nt{font-size:.85rem;color:#5c6670;margin-top:16px}`;
document.head.appendChild(st);
const VIEWS=[["inicio","Inicio"],["camiones","Camiones"],["contenedores","Contenedores"],["tubos","Tubería"],["mantencion","Mantención"],["activos","🏷️ Venta de activos"]];
const cur=()=>{const v=VIEWS.find(([k])=>{const el=document.getElementById("v-"+k);return el&&!el.hidden});return v?v[0]:"inicio"};
function bar(m,cls){let b=$("#cmsbar");if(!b){b=document.createElement("div");b.id="cmsbar";document.body.appendChild(b)}
 b.innerHTML='<div class="vw">'+VIEWS.map(([k,l])=>'<button type="button" data-v="'+k+'" class="'+(cur()==k?"on":"")+'">'+l+'</button>').join("")+'</div><p>'+(m?'<span class="cmsmsg '+(cls||"")+'">'+m+'</span>':'<b>Modo edición.</b> Toca un texto punteado para cambiarlo, <b>📷</b> para cambiar fotos y <b>⚙️ Ajustes</b> para teléfonos, color y fondo. Al tocar un texto aparece la barra de <b>colores</b>.')+'</p><button type="button" id="cmsmk">🏷️ Panel Marketplace</button><button type="button" id="cmscf">⚙️ Ajustes</button><button type="button" id="cmsx">Salir sin guardar</button><button type="button" class="sv" id="cmssv">Guardar cambios</button>';
 b.querySelectorAll("[data-v]").forEach(x=>x.onclick=()=>{if(window.show)show(x.dataset.v,true);bar()});
 $("#cmsx").onclick=cancel;$("#cmssv").onclick=save;$("#cmscf").onclick=cfgPanel;$("#cmsmk").onclick=pnlOpen}
const keyOf=el=>{const a=el.querySelector(".art");const m=a&&a.className.match(/\bi-(\w+)/);return m?m[1]:null};
function photoBtns(){$$(".cmsph").forEach(b=>b.remove());if(!editing)return;$$(".tart,.dart").forEach(el=>{const k=keyOf(el);if(!k)return;
 const mk=(t,cls,fn)=>{const b=document.createElement("button");b.type="button";b.className="cmsph "+cls;b.textContent=t;b.onclick=e=>{e.preventDefault();e.stopPropagation();fn()};el.appendChild(b)};
 mk("📷 Cambiar foto","",()=>pick(k));if(pimg[k])mk("Volver a la original","rm",()=>{delete pimg[k];applyImgs(pimg);photoBtns()})})}
function shrink(f,max){return new Promise((ok,ko)=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);
 const alpha=/png|webp|gif/.test(f.type);const out=alpha?c.toDataURL("image/webp",.85):c.toDataURL("image/jpeg",.82);ok({src:out.startsWith("data:image/webp")||!alpha?out:c.toDataURL("image/png"),fill:!alpha})};im.onerror=ko;im.src=u})}
function pick(k){const i=document.createElement("input");i.type="file";i.accept="image/*";i.onchange=async()=>{const f=i.files[0];if(!f)return;try{pimg[k]=await shrink(f,k=="bg"?1600:1000);applyImgs(pimg);photoBtns()}catch(e){bar("No se pudo leer esa imagen. Prueba con una foto JPG o PNG.","er")}};i.click()}
function listCtl(on){$$(".cmsl").forEach(b=>b.remove());$$(".det .faq summary,.det .faq details p").forEach(e=>{if(on){e.contentEditable="true";e.dataset.ckl=1}else{e.removeAttribute("contenteditable");delete e.dataset.ckl}});if(!on)return;
 const mk=(t,cls,fn)=>{const b=document.createElement("button");b.type="button";b.className="cmsl "+cls;b.textContent=t;b.onclick=e=>{e.preventDefault();e.stopPropagation();fn()};return b};
 FAQS.forEach(f=>{f.querySelectorAll("details").forEach(d=>{d.open=true;d.after(mk("Eliminar esta pregunta","",()=>{d.remove();listCtl(true)}))});f.after(mk("+ Agregar pregunta","add",()=>{const d=document.createElement("details");d.open=true;d.innerHTML="<summary>Nueva pregunta</summary><p>Escribe aquí la respuesta.</p>";f.appendChild(d);listCtl(true)}))})}
function cfgPanel(){let m=$("#cmscfg");if(m){m.remove();return}m=document.createElement("div");m.id="cmscfg";const c=pc;
 const f=(k,l,t,h)=>'<label><span>'+l+'</span><input data-k="'+k+'" type="'+(t||"text")+'" value="'+esc(c[k]||"")+'">'+(h?"<small>"+h+"</small>":"")+"</label>";
 m.innerHTML='<div class="cbox"><div class="chd"><b>Ajustes de la página</b><button type="button" class="cx">Cerrar</button></div>'+
 "<h5>Contacto</h5>"+f("wa","Número de WhatsApp (botones y llamadas)","tel","Con código de país, sin + ni espacios. Ej: 56942706354")+f("waTxt","WhatsApp como se muestra")+f("tel","Teléfono fijo o segundo número")+f("mail","Correo","email")+
 "<h5>Dirección</h5>"+f("dir","Dirección")+f("maps","Enlace de Google Maps (Cómo llegar)","url")+
 '<h5>Color principal</h5><label class="row"><input data-k="acc" type="color" value="'+(c.acc||"#1452e0")+'"><span>Botones, enlaces y detalles</span><button type="button" class="rs">Azul original</button></label>'+
 '<h5>Foto de fondo</h5><label class="row"><button type="button" class="bg">📷 Cambiar foto de fondo</button>'+(pimg.bg?'<button type="button" class="bgr">Volver a la original</button>':"")+"</label>"+
 '<h5>Secciones</h5><label class="row"><input type="checkbox" data-h="hideFacts"'+(c.hideFacts?"":" checked")+"><span>Mostrar la fila de datos bajo los servicios (+13 años, Todo Chile…)</span></label>"+
 '<p class="nt">Los cambios se ven al instante. Toca <b>Guardar cambios</b> abajo para publicarlos.</p></div>';
 document.body.appendChild(m);
 m.querySelectorAll("input[data-k]").forEach(i=>i.oninput=()=>{pc[i.dataset.k]=i.value;applyCfg(pc)});
 m.querySelector("input[data-h]").onchange=e=>{pc.hideFacts=!e.target.checked;applyCfg(pc)};
 m.querySelector(".rs").onclick=()=>{pc.acc="";m.querySelector('[data-k="acc"]').value="#1452e0";applyCfg(pc)};
 m.querySelector(".bg").onclick=()=>pick("bg");const br=m.querySelector(".bgr");if(br)br.onclick=()=>{delete pimg.bg;applyImgs(pimg);m.remove();cfgPanel()};
 m.querySelector(".cx").onclick=()=>m.remove();m.onclick=e=>{if(e.target==m)m.remove()}}
document.addEventListener("click",e=>{if(!editing)return;const t=e.target;if(t.closest("#cmsbar,.cmsph,.cmsl,#cmscfg"))return;
 if(t.closest("[data-ck],[data-ckl]")){e.preventDefault();e.stopPropagation();return}
 if(t.closest("a,button,summary")&&!t.closest("[data-go]"))e.preventDefault()},true);
document.addEventListener("keydown",e=>{if(editing&&e.key=="Enter"&&e.target.closest&&e.target.closest("[data-ck],[data-ckl]")){e.preventDefault();e.target.blur()}});
document.addEventListener("paste",e=>{if(!editing||!e.target.closest||!e.target.closest("[data-ck],[data-ckl]"))return;e.preventDefault();const t=(e.clipboardData||window.clipboardData).getData("text/plain").replace(/\s+/g," ");document.execCommand("insertText",false,t)});
const SW=[["#0e1726","Negro"],["#5f6871","Gris"],["#ffffff","Blanco"],["#1452e0","Azul MST"],["#3d7bff","Azul claro"],["#d32f2f","Rojo"],["#f57c00","Naranjo"],["#f9a825","Amarillo"],["#2e7d32","Verde"]];
function colBar(){let b=$("#cmscol");if(!b){b=document.createElement("div");b.id="cmscol";
 b.innerHTML='<span>Color</span>'+SW.map(([c,n])=>'<button type="button" class="sw" title="'+n+'" data-c="'+c+'" style="background:'+c+'"></button>').join("")+'<input type="color" title="Otro color" value="#1452e0"><button type="button" class="tx" data-r="1" title="Volver al color original">Original</button><button type="button" class="tx" data-b="1" title="Negrita en lo seleccionado">B</button>';
 document.body.appendChild(b);b.addEventListener("mousedown",e=>{if(e.target.tagName!="INPUT")e.preventDefault()});
 const put=c=>{if(!curEl)return;const k=curEl.dataset.ck;if(c)pcol[k]=c;else delete pcol[k];setCol(curEl,c)};
 b.querySelectorAll(".sw").forEach(x=>x.onclick=()=>put(x.dataset.c));b.querySelector("input").oninput=e=>put(e.target.value);
 b.querySelector("[data-r]").onclick=()=>put("");b.querySelector("[data-b]").onclick=()=>{document.execCommand("bold")}}
 return b}
function placeCol(el){const b=colBar();curEl=el;b.classList.add("on");const r=el.getBoundingClientRect(),w=b.offsetWidth||380,h=b.offsetHeight||40;
 let top=r.top-h-10;if(top<74)top=r.bottom+10;b.style.top=Math.round(top)+"px";b.style.left=Math.round(Math.max(8,Math.min(window.innerWidth-w-8,r.left)))+"px"}
document.addEventListener("focusin",e=>{if(!editing)return;const el=e.target.closest&&e.target.closest("[data-ck]");if(el)placeCol(el)});
document.addEventListener("focusout",e=>{setTimeout(()=>{if(!editing)return;const a=document.activeElement;if(!(a&&a.closest&&(a.closest("[data-ck]")||a.closest("#cmscol")))){const b=$("#cmscol");if(b)b.classList.remove("on")}},150)});
window.addEventListener("scroll",()=>{if(editing&&curEl&&$("#cmscol.on"))placeCol(curEl)},{passive:true});
function enter(){editing=true;snap={html:T.map(e=>e.innerHTML),lists:readLists()};pc=JSON.parse(JSON.stringify(LC));pimg=JSON.parse(JSON.stringify(D.img));pcol=JSON.parse(JSON.stringify(D.col));
 ITEMS=JSON.parse(JSON.stringify(D.items));snap.mk=JSON.stringify(D.mk);document.body.classList.add("cmsed");T.forEach(e=>{e.contentEditable="true";e.spellcheck=true});listCtl(true);mkEdit(true);bar();photoBtns()}
function leave(){editing=false;setTimeout(()=>mkEdit(false),0);const cb=$("#cmscol");if(cb)cb.classList.remove("on");curEl=null;document.body.classList.remove("cmsed");T.forEach(e=>e.removeAttribute("contenteditable"));listCtl(false);photoBtns();const m=$("#cmscfg");if(m)m.remove();const b=$("#cmsbar");if(b)b.remove()}
function cancel(){if(busy)return;T.forEach((e,i)=>e.innerHTML=snap.html[i]);listCtl(false);renderLists(snap.lists);applyCfg(D.cfg);applyImgs(D.img);applyCols(D.col);ITEMS=D.items;mkHead(D.mk);leave()}
const safe=s=>s.replace(/</g,"\\u003c");
const fill=(S,d,img)=>S.replace("<!-"+"-MSTIMG-->",()=>'<style id="mstimg">'+img+"</style>").replace("<!-"+"-MSTDATA-->",()=>'<script type="application/json" id="mstdata">'+safe(JSON.stringify(d))+"<\/script>").replace("<!-"+"-MSTSRC-->",()=>'<script type="application/json" id="mstsrc">'+safe(JSON.stringify(S))+"<\/script>");
async function save(){if(busy)return;busy=true;const sv=$("#cmssv");sv.disabled=true;sv.textContent="Guardando…";
 const t={};T.forEach(e=>{const h=clean(e.innerHTML),o=e.dataset.co;if(norm(h)!=norm(clean(o)))t[e.dataset.ck]={o,h}});
 const L=readLists(),cf={};Object.keys(pc).forEach(k=>{if(pc[k]&&pc[k]!==DEF[k])cf[k]=pc[k]});
 const next={t,img:pimg,cfg:cf,col:pcol,items:ITEMS,mk:readMk(),lists:JSON.stringify(L)==JSON.stringify(ORIG_L)?null:L,actualizado:new Date().toISOString()};
 try{const S=JSON.parse(sEl.textContent);const html=SKEL+fill(S,next,iEl.textContent)+"</body></html>";
  const a=await claude.use("artifact");if(!a)throw{code:"not_granted"};
  try{sessionStorage.setItem("mstsaved","1")}catch(_){}
  await a.publish(html);D=next;busy=false;leave();bar("✓ Cambios guardados. La página se está actualizando…","ok");setTimeout(()=>{const b=$("#cmsbar");if(b&&!editing)b.remove()},6000)}
 catch(e){busy=false;try{sessionStorage.removeItem("mstsaved")}catch(_){}sv.disabled=false;sv.textContent="Guardar cambios";const c=e&&e.code;
  bar(c=="conflict"?"Alguien guardó otra versión recién. La página se recarga con esa versión; vuelve a hacer tus cambios.":c=="not_writer"||c=="not_granted"||c=="capability_disabled"?"Desde esta vista no se puede guardar. Abre la página desde tu cuenta de Claude.":c=="too_large"?"Las fotos son muy pesadas. Prueba con imágenes más livianas.":c=="rate_limited"?"Guardaste muchas veces seguidas. Espera un minuto.":"No se pudo guardar. Revisa tu conexión y vuelve a intentar.","er")}}
try{if(sessionStorage.getItem("mstsaved")){sessionStorage.removeItem("mstsaved");const n=document.createElement("div");n.id="cmsbar";n.innerHTML='<p><span class="cmsmsg ok">✓ Cambios guardados y publicados.</span></p><button type="button">Cerrar</button>';n.querySelector("button").onclick=()=>n.remove();document.body.appendChild(n);setTimeout(()=>n.remove(),5000)}}catch(_){}
(async()=>{try{if(!window.claude||!claude.use)return;const u=await claude.use("user");if(!u)return;if(!(await u.canEdit()))return;
 const wantP=/^#(panel|marketplace|admin)/i.test(location.hash);if(wantP){try{sessionStorage.setItem("mstadm","1")}catch(_){}setTimeout(pnlOpen,50)}
 const b=document.createElement("button");b.id="cmsgo";b.type="button";b.textContent="✏️ Editar página";b.onclick=enter;
 let on=false;try{on=sessionStorage.getItem("mstadm")=="1"}catch(_){}
 const reveal=()=>{if(!b.isConnected)document.body.appendChild(b);try{sessionStorage.setItem("mstadm","1")}catch(_){}};if(on)reveal();
 let n=0,tm=null;document.addEventListener("click",e=>{if(!e.target.closest||!e.target.closest("header .logo"))return;n++;clearTimeout(tm);tm=setTimeout(()=>n=0,2500);if(n>=5){n=0;reveal()}},true)}catch(e){}})();
})();
