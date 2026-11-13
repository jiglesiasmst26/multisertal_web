# MST · Multiservicios Talca

Repositorio de los dos proyectos digitales de MST:

| Carpeta | Qué es |
| --- | --- |
| `web/` | Sitio web público de MST Servicios (camiones pluma, contenedores y módulos, tubería HDPE, reparación de grúas y venta de activos). |
| `sistema/` | Sistema MST de gestión interna (uso exclusivo del equipo). |

## Web (`web/`)

- `web/dist/index.html` — la página lista, en un solo archivo (es la versión publicada).
- `web/src/` — las fuentes con las que se arma la página:
  - `template.html` — estructura, estilos y scripts (flota, contenedores, guía animada).
  - `cms.js` — editor interno (se abre tocando 5 veces el logo; solo para quien tiene permiso de edición).
  - `data.json` — textos, colores y productos guardados desde el editor.
  - `build.py` — arma la página: lee todo lo anterior y genera `web/dist/index.html`.
  - `art/` y `base/` — imágenes y la marca MST.

Para regenerar la página:

```bash
cd web/src
python3 build.py
```

## Publicación en Netlify

El sitio está vinculado a Netlify: cada cambio que se sube a la rama `main` se publica solo.
`netlify.toml` le indica a Netlify que publique únicamente la carpeta `web/dist/`
(la carpeta `sistema/` no se publica).
También hay una copia de la página en `index.html` (raíz) y un archivo `_redirects`, como respaldo por si
Netlify estuviera configurado para publicar la raíz del repositorio: en ese caso tampoco se puede entrar a `sistema/`.

Para cambiar la web: editar los archivos de `web/src/`, correr `python3 build.py` dentro de esa carpeta
y subir los cambios (incluido el nuevo `web/dist/index.html`). `build.py` también actualiza la copia `index.html` de la raíz.

## Sistema (`sistema/`)

- `sistema/index.html` — copia del Sistema MST tal como estaba publicado al momento de este respaldo.
  Los datos (clientes, ventas, flota, etc.) no están aquí: viven en la base de datos del sistema.

## Barra y sello de Netlify

`build.py` genera también un archivo `_headers` con una política de seguridad (CSP) que solo permite
ejecutar los scripts propios de la página (identificados por su huella `sha256`). Como efecto, Netlify
no puede inyectar su barra de pre-lanzamiento ni el sello "Powered by Netlify".
Si se edita el HTML a mano sin correr `build.py`, las huellas dejan de coincidir y la página deja de
funcionar en Netlify: siempre regenerar con `python3 build.py` antes de subir cambios.
