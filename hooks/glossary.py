import re
from pathlib import Path

MARKER = "<!-- glossary -->"
ENTRY = re.compile(r"^\*\[(.+?)\]:\s*(.+)$")


def on_page_markdown(markdown, page, config, files):
    if MARKER not in markdown:
        return markdown
    source = Path(config["config_file_path"]).parent / "includes" / "abbreviations.md"
    entries = sorted(
        (m.groups() for line in source.read_text().splitlines() if (m := ENTRY.match(line))),
        key=lambda e: e[0].lower(),
    )
    rows = "\n".join(f"| **{term}** | {meaning} |" for term, meaning in entries)
    return markdown.replace(MARKER, f"| Term | Meaning |\n|---|---|\n{rows}")
