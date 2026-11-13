import os as _os
_H=_os.path.dirname(_os.path.abspath(__file__))
import re,html
src=open(_os.path.join(_H,'base','marca.html')).read()
arts=re.findall(r'<div class="scart">(<svg.*?</svg>)',src,flags=re.S)
assert len(arts)==4
mark=re.search(r'<svg class="mk".*?</svg>',src,flags=re.S).group(0)
CM={"#c9d3dd":"var(--d-line)","#4d8dff":"var(--d-acc)","#7f93a8":"var(--d-mute)","#0e141a":"var(--d-bg)"}
def recolor(svg):
    def tag(m):
        t=m.group(0);sty=[]
        def a(mm):
            k,v=mm.group(1),mm.group(2).lower()
            if v in CM: sty.append(f"{k}:{CM[v]}");return ""
            return mm.group(0)
        t2=re.sub(r'\s(stroke|fill)="(#[0-9a-fA-F]{6})"',a,t)
        if sty:
            t2=re.sub(r'(/?>)$',lambda e:f' style="{";".join(sty)}"{e.group(1)}',t2,count=1)
        return t2
    svg=re.sub(r'<(?!/)[a-zA-Z][^>]*>',tag,svg)
    return svg.replace('<svg ','<svg class="art" ',1)
A=[recolor(a) for a in arts]
_d=_os.path.join(_H,'art')+'/'
_img=lambda n,cls="":f'<span class="art bgi i-{n} {cls}" role="img" aria-label=""></span>'
_svg=lambda n:open(_d+n+".svg").read().replace('<svg ','<svg class="art" aria-hidden="true" ',1)
NEW=[_img("camion","edge"),_img("cont"),_img("tubos"),_img("grua","br")]
A=NEW
for i,a in enumerate([]): A[i]=a.replace('id="hx"','id="hx%d"'%i).replace('url(#hx)','url(#hx%d)'%i).replace('id="hx2"','id="hy%d"'%i).replace('url(#hx2)','url(#hy%d)'%i)
WA="56942706354"
S=[
 dict(k="camiones",n="Camiones pluma",tag="Arriendo con operador",one="Izaje y traslado de carga pesada.",art=A[0],
  lead="Izamos y trasladamos carga pesada con camiones pluma propios. Cada servicio sale con un operador calificado que dirige la maniobra de principio a fin.",
  inc=["Contenedores de 20' y 40'","Generadores, maquinaria y estructuras","Materiales de construcción","Montaje de módulos y casetas"],
  tbl=("Modalidad","Ideal para",[("Por hora","Horas adicionales sobre el mínimo"),("Mínimo 6 horas","Montajes y descargas puntuales"),("Por semana","Obras con varias maniobras"),("Por mes","Faenas de larga duración"),("Traslado","Según kilómetros hasta la obra")]),
  form=[("carga","¿Qué hay que mover?","Ej: contenedor 20', generador",1),("peso","Peso aproximado","Ej: 3 toneladas",0),("comuna","Comuna de la obra","Ej: Talca",1),("fecha","¿Para cuándo?","Ej: jueves en la mañana",0)],
  intro="Hola, necesito un camión pluma.",
  faq=[("¿El arriendo incluye operador?","Sí. Todos nuestros camiones salen con operador calificado, que revisa el terreno y la carga antes de levantar."),("¿Cuál es el mínimo de horas?","El servicio mínimo es de 6 horas. Sobre eso, las horas adicionales se cobran por hora."),("¿Cómo se cobra el traslado?","Según los kilómetros desde nuestra base en Talca hasta la obra. Te lo indicamos en la cotización.")]),
 dict(k="contenedores",n="Contenedores y módulos",tag="Venta y arriendo",one="Bodegas, oficinas y módulos a medida.",art=A[1],
  lead="Vendemos y arrendamos contenedores marítimos y módulos habilitados. Los llevamos e instalamos en tu terreno con nuestros propios camiones pluma.",
  inc=["Contenedores 20' y 40' estándar","40' High Cube","Oficinas de faena y bodegas","Baños, camarines y módulos habitacionales a medida"],
  tbl=("Unidad","Medidas exteriores (largo × ancho × alto)",[("20' ST","6,06 × 2,44 × 2,59 m"),("40' ST","12,19 × 2,44 × 2,59 m"),("40' High Cube","12,19 × 2,44 × 2,90 m")]),
  form=[("modo","¿Arriendo o compra?","Ej: arriendo por 6 meses",1),("tipo","Tipo de unidad","Ej: 20' bodega, oficina 40'",1),("cant","Cantidad","Ej: 2",0),("comuna","Comuna de instalación","Ej: Linares",1)],
  intro="Hola, me interesa un contenedor o módulo.",
  faq=[("¿Instalan los contenedores?","Sí. Los llevamos e instalamos con nuestros camiones pluma. Solo necesitas un terreno firme y nivelado, con acceso para el camión."),("¿Hacen módulos a medida?","Sí. Cuéntanos el uso, las medidas y la terminación que buscas y te preparamos una propuesta.")]),
 dict(k="tubos",n="Tubería HDPE",tag="Stock en Talca",one="Tubo corrugado para obras y drenaje.",art=A[2],
  lead="Tubería HDPE corrugada con stock permanente en nuestras instalaciones de Talca. Despachamos a toda la región y a cualquier punto de Chile.",
  inc=["Alcantarillado y aguas lluvia","Atraviesos y obras viales","Drenaje agrícola","Proyectos públicos (Mercado Público)"],
  tbl=("Ventaja","Por qué HDPE",[("Durabilidad","Resiste la corrosión y los suelos agresivos"),("Resistencia","Soporta carga sin perder la forma"),("Instalación","Liviano y rápido de instalar")]),
  form=[("diam","Diámetro (mm)","Ej: 400",1),("metros","Metros","Ej: 60",1),("comuna","Comuna de despacho","Ej: Curicó",0),("uso","Uso","Ej: aguas lluvia",0)],
  intro="Hola, necesito tubería HDPE corrugada.",
  faq=[("¿Despachan fuera de Talca?","Sí. Despachamos a toda la Región del Maule y a cualquier punto de Chile."),("¿Qué diámetros tienen?","Consúltanos por el diámetro que necesitas y te confirmamos stock y plazo de entrega.")]),
 dict(k="mantencion",n="Reparación y mantención",tag="Servicio integral",one="Grúa, hidráulica y camión.",art=A[3],
  lead="Servicio integral para camiones pluma: revisamos y reparamos la grúa, su sistema hidráulico y el camión, para que tu equipo trabaje seguro y sin detenciones.",
  inc=["Mantención preventiva y correctiva de grúas","Hidráulica: cilindros, bombas, mangueras y sellos","Estructura y soldadura","Sistema eléctrico y revisión pre-técnica"],
  tbl=("Servicio","Cuándo conviene",[("Preventiva","Según horas de uso o calendario"),("Correctiva","Ante fallas, fugas o ruidos"),("Hidráulica","Pérdida de presión o fugas de aceite"),("Pre-técnica","Antes de la revisión técnica")]),
  form=[("grua","Marca y modelo de la grúa","Ej: Fassi F800",1),("serv","Tipo de servicio","Ej: preventiva, fuga hidráulica",1),("falla","¿Qué le pasa al equipo?","Ej: pierde presión al levantar",0),("comuna","¿Dónde está el equipo?","Ej: San Javier",0)],
  intro="Hola, necesito reparación o mantención para mi camión pluma.",
  faq=[("¿Qué incluye la mantención?","Revisamos la grúa, su sistema hidráulico y el camión: cilindros, bombas, mangueras, sellos, estructura, soldaduras y sistema eléctrico."),("¿Cómo agendo?","Envíanos la marca y modelo de tu grúa y qué le pasa. Te respondemos con el diagnóstico y la fecha disponible.")]),
]
e=html.escape
tiles="".join(f'''<a class="tile" href="#{x["k"]}" data-go="{x["k"]}"><span class="tart">{x["art"]}</span><span class="tbody"><small>{e(x["tag"])}</small><b>{e(x["n"])}</b><span>{e(x["one"])}</span><i>Ver servicio <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></i></span></a>''' for x in S)
seg="".join(f'<a href="#{x["k"]}" data-go="{x["k"]}">{e(x["n"])}</a>' for x in S)

FLEET=[("Volvo FMX 410","8x4",2019,"Fassi F800","8 prolongas",24,16),("Volvo FMX 370","8x4",2018,"PM 65","6 prolongas + jib de 4",30,12),("Volvo VM 330","8x4",2019,"Hiab 477","8 prolongas",24,9),("Volvo VM 270","6x2",2019,"Effer 305","6 prolongas",22,6),("Volvo VM 330","8x2",2021,"PM 30","6 prolongas",22,5.8)]
def _n(v):return (str(v).replace(".",",") if isinstance(v,float) else str(v))
def fleet_html():
    cards="".join(f'''<article class="flc" data-cap="{c}" data-alt="{a}"><div class="flh"><span class="fln">{i+1:02d}</span><div><b>{e(m)}</b><small>{e(cf)} · Año {y}</small></div></div>
 <div class="flg"><span class="flgl">Grúa</span><b>{e(g)}</b><small>{e(pr)}</small></div>
 <div class="fls"><div><span>Capacidad máx.</span><b>{_n(c)} t</b></div><div><span>Alcance vertical</span><b>{a} m</b></div></div>
 <p class="flok" hidden>✓ Sirve para tu maniobra</p>
 <a class="flb" data-wa="{e(f"Hola, quiero consultar por el camión pluma {m} {cf} ({y}) con grúa {g}. Mi maniobra es: ")}" href="https://wa.me/{WA}" target="_blank" rel="noopener">Consultar este equipo</a></article>''' for i,(m,cf,y,g,pr,a,c) in enumerate(FLEET))
    return f'''<section class="fleet" data-nocms aria-labelledby="flt"><div class="flhd"><div><small>Nuestra flota</small><h3 id="flt">5 camiones pluma Volvo, de 5,8 a 16 toneladas</h3><p>Revisa qué equipo se ajusta a tu maniobra. Escribe el peso y la altura y te marcamos los camiones que sirven.</p></div>
 <form class="flf"><label><span>Peso a levantar (t)</span><input id="fl_p" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Ej: 4"></label><label><span>Altura necesaria (m)</span><input id="fl_a" type="number" inputmode="decimal" min="0" step="1" placeholder="Ej: 15"></label></form></div>
 <p class="flmsg" id="fl_msg" hidden></p><div class="flgrid">{cards}</div>
 <p class="flnote">La capacidad máxima se logra con la pluma recogida y cerca del camión; a mayor distancia la capacidad baja. Cuéntanos tu maniobra y confirmamos el equipo con su tabla de carga.</p></section>'''
CONT=[("20'","20 pies estándar","6,06 × 2,44 × 2,59 m","≈ 33 m³","Bodega de obra, guardar herramientas o insumos"),
      ("40'","40 pies estándar","12,19 × 2,44 × 2,59 m","≈ 67 m³","Bodegaje de mayor volumen, talleres"),
      ("40' HC","40 pies High Cube","12,19 × 2,44 × 2,90 m","≈ 76 m³","30 cm más de altura: ideal para habilitar como oficina o módulo")]
def cont_html():
    cards="".join(f'''<article class="cnc"><div class="cnh"><span class="cnb">{e(t)}</span><div><b>{e(n)}</b><small>Usado · buen estado</small></div></div>
 <div class="fls"><div><span>Medidas exteriores</span><b class="cnm">{e(d)}</b></div><div><span>Capacidad</span><b>{e(v)}</b></div></div>
 <p class="cnu">{e(u)}</p>
 <a class="flb" data-wa="{e(f"Hola, me interesa comprar un contenedor marítimo de {n} usado. ¿Qué unidades tienen disponibles y a qué precio?")}" href="https://wa.me/{WA}" target="_blank" rel="noopener">Consultar disponibilidad</a></article>''' for t,n,d,v,u in CONT)
    steps=[("Nos cuentas qué necesitas","Uso, medidas, cantidad de personas y dónde va instalado."),("Diseñamos contigo","Definimos distribución, ventanas, puertas, electricidad y terminaciones."),("Construimos","Fabricamos el módulo según el diseño acordado."),("Instalamos","Lo trasladamos e instalamos con nuestros propios camiones pluma.")]
    st="".join(f'<li><span>{i+1}</span><div><b>{e(a)}</b><small>{e(b)}</small></div></li>' for i,(a,b) in enumerate(steps))
    return f'''<section class="fleet cnt" data-nocms aria-labelledby="cnt-t"><div class="flhd"><div><small>Contenedores en venta</small><h3 id="cnt-t">Contenedores marítimos usados de 20', 40' y 40' HC</h3><p>Son contenedores que las navieras dan de baja, en buen estado. Ideales para bodega, oficina o para habilitar como módulo.</p></div></div>
 <div class="flgrid cng">{cards}</div>
 <div class="cnd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V8l9-5 9 5v13M7 21v-7h10v7M7 17h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><div><b>Tenemos depósito propio: ven a verlos y elige el tuyo</b><p>Puedes visitar nuestro depósito y escoger el contenedor que más te acomode en medida, estado y precio. Sin sorpresas: ves la unidad antes de comprar.</p></div><a class="btn pri" data-wa="Hola, me gustaría visitar el depósito para ver contenedores en venta. ¿Qué día puedo ir?" href="https://wa.me/{WA}" target="_blank" rel="noopener">Agendar visita</a></div>
</section>
<section class="fleet cnt" data-nocms aria-labelledby="mod-t"><div class="flhd"><div><small>Módulos a medida</small><h3 id="mod-t">Cada módulo es un proyecto que desarrollamos junto a ti</h3><p>Oficinas, salas de venta, camarines, baños o módulos habitacionales: no vendemos un modelo fijo, lo diseñamos según lo que necesitas.</p></div><a class="btn gh" data-wa="Hola, quiero desarrollar un módulo a medida. Mi idea es: " href="https://wa.me/{WA}" target="_blank" rel="noopener">Contar mi proyecto</a></div>
 <ol class="cns">{st}</ol></section>'''
def detail(x):
    h,c,rows=x["tbl"]
    fields="".join(f'<label for="{x["k"]}-{f[0]}"><span>{e(f[1])}{" <b>*</b>" if f[3] else ""}</span><input id="{x["k"]}-{f[0]}" data-l="{e(f[1])}" {"data-req" if f[3] else ""} placeholder="{e(f[2])}" autocomplete="off"></label>' for f in x["form"])
    others="".join(f'<a class="mini" href="#{o["k"]}" data-go="{o["k"]}"><span class="mart">{o["art"]}</span><b>{e(o["n"])}</b></a>' for o in S if o["k"]!=x["k"])
    return f'''<section class="det" id="v-{x["k"]}" data-k="{x["k"]}" hidden>
 <div class="wrap">
  <div class="dtop"><a class="back" href="#inicio" data-go="inicio"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H4M8 4L4 8l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Todos los servicios</a><nav class="seg" aria-label="Cambiar de servicio">{seg}</nav></div>
  <div class="dhead">
   <div class="dart">{x["art"]}</div>
   <div class="dtxt"><small>{e(x["tag"])}</small><h2>{e(x["n"])}</h2><p>{e(x["lead"])}</p>
    <ul class="inc">{"".join(f"<li>{e(i)}</li>" for i in x["inc"])}</ul></div>
  </div>
  {fleet_html() if x["k"]=="camiones" else cont_html() if x["k"]=="contenedores" else ""}
  <div class="dgrid">
   <div class="card"><h3>{"Modalidades" if x["k"]=="camiones" else "Medidas" if x["k"]=="contenedores" else "Ventajas" if x["k"]=="tubos" else "Tipos de servicio"}</h3>
    <div class="tw"><table><thead><tr><th>{e(h)}</th><th>{e(c)}</th></tr></thead><tbody>{"".join(f"<tr><td>{e(a)}</td><td>{e(b)}</td></tr>" for a,b in rows)}</tbody></table></div>
    <h3 style="margin-top:26px">Preguntas frecuentes</h3>
    <div class="faq">{"".join(f"<details><summary>{e(q)}</summary><p>{e(r)}</p></details>" for q,r in x["faq"])}</div>
   </div>
   <form class="card qf" data-intro="{e(x["intro"])}" novalidate><h3>Cotiza este servicio</h3><p class="mut">Completa lo que sepas y te respondemos por WhatsApp.</p>
    <div class="ff">{fields}<label for="{x["k"]}-nom"><span>Tu nombre <b>*</b></span><input id="{x["k"]}-nom" data-l="Nombre" data-req placeholder="Ej: Carolina Muñoz" autocomplete="name"></label></div>
    <p class="err" hidden></p>
    <a class="btn pri send" href="https://wa.me/{WA}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>Enviar por WhatsApp</a>
    <p class="mut sm">Se abre WhatsApp con tu mensaje ya escrito. Solo tocas enviar.</p></form>
  </div>
  <div class="more"><h3>Otros servicios de MST</h3><div class="minis">{others}</div></div>
 </div></section>'''
dets="".join(detail(x) for x in S)
IMGCSS="".join(f'.i-{n}{{background-image:url(data:image/webp;base64,{open(_d+n+".b64").read()})}}' for n in ["camion","grua","cont","tubos"])+f'.wm{{--bgimg:url(data:image/webp;base64,{open(_d+"bgobra.b64").read()})}}'
import json,os
S_=open(_os.path.join(_H,'template.html')).read().replace("{{MARK}}",mark).replace("{{TILES}}",tiles).replace("{{DETAILS}}",dets).replace("{{CMS}}",open(_os.path.join(_H,'cms.js')).read())
for ph in ("<!--MSTIMG-->","<!--MSTDATA-->","<!--MSTSRC-->"): assert S_.count(ph)==1,ph
_dp=_os.path.join(_H,'data.json')
DATA=json.load(open(_dp)) if os.path.exists(_dp) else {}
_safe=lambda x:x.replace("<","\\u003c")
_js=lambda o:_safe(json.dumps(o,ensure_ascii=False,separators=(",",":")))
page=S_.replace("<!--MSTIMG-->",'<style id="mstimg">'+IMGCSS+'</style>',1).replace("<!--MSTDATA-->",'<script type="application/json" id="mstdata">'+_js(DATA)+'</script>',1).replace("<!--MSTSRC-->",'<script type="application/json" id="mstsrc">'+_js(S_)+'</script>',1)
# Página completa para Netlify (claude.ai agrega este esqueleto solo; Netlify no).
_SK=('<!doctype html><html lang="es"><head><meta charset="utf-8">'
 '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
 '<meta name="description" content="MST Multiservicios Talca: arriendo de camiones pluma, venta de contenedores marítimos y módulos a medida, tubería HDPE y reparación de grúas.">'
 '<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171b1f">'
 '<style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style>'
 '</head><body>')
page=_SK+page+'</body></html>'
open(_os.path.join(_H,'..','dist','index.html'),'w',encoding='utf-8').write(page);open(_os.path.join(_H,'..','..','index.html'),'w',encoding='utf-8').write(page);print("ok",len(page))
# Netlify: CSP que solo permite los scripts propios de la página (por hash).
# Efecto: Netlify no puede inyectar su barra/sello (scripts en línea sin hash).
import hashlib as _hl,base64 as _b64
_hs=[]
for _a,_b in re.findall(r'<script([^>]*)>(.*?)</script>',page,re.S):
    if 'type=' in _a and 'javascript' not in _a and 'module' not in _a: continue
    if 'src=' in _a: continue
    _hs.append("'sha256-"+_b64.b64encode(_hl.sha256(_b.encode('utf-8')).digest()).decode()+"'")
_csp="script-src 'self' "+" ".join(_hs)+"; object-src 'none'; base-uri 'self'"
_hdr="/*\n  Content-Security-Policy: "+_csp+"\n"
for _d in [_os.path.join(_H,'..','dist'),_os.path.join(_H,'..','..')]:
    open(_os.path.join(_d,'_headers'),'w').write(_hdr)
import json as _json
# Vercel: publicar solo web/dist, bloquear sistema/ y fuentes, misma CSP.
_vc={"$schema":"https://openapi.vercel.sh/vercel.json","framework":None,"buildCommand":"","installCommand":"","outputDirectory":"web/dist",
 "redirects":[{"source":"/sistema/:path*","destination":"/","permanent":False},{"source":"/web/:path*","destination":"/","permanent":False}],
 "headers":[{"source":"/(.*)","headers":[{"key":"Content-Security-Policy","value":_csp},{"key":"X-Content-Type-Options","value":"nosniff"}]}]}
open(_os.path.join(_H,'..','..','vercel.json'),'w').write(_json.dumps(_vc,indent=2,ensure_ascii=False)+"\n")
print("csp",len(_hs),"scripts")
