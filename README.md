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

## Sistema (`sistema/`)

- `sistema/index.html` — copia del Sistema MST tal como estaba publicado al momento de este respaldo.
  Los datos (clientes, ventas, flota, etc.) no están aquí: viven en la base de datos del sistema.
