<img src="assets/icon.svg" width="64" height="64" alt="">

# llbnotes

Plain-English study notes for the TU LL.B. first year, published as a website with MkDocs Material.

## Run locally

```sh
uv venv .venv
uv pip install --python .venv/bin/python -r requirements.txt
.venv/bin/mkdocs serve
```

Open http://127.0.0.1:8000. Run `.venv/bin/mkdocs build --strict` before pushing; it fails on broken links.

## Layout

- `docs/<paper>/` one folder per paper; `unit-NN-*.md` per syllabus unit.
- `includes/abbreviations.md` the glossary. Each term shows as a hover tip on every page and builds `docs/glossary.md`.
- `templates/` page templates for units and case briefs.
