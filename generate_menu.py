#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations
from pathlib import Path
from urllib.parse import quote
import unicodedata

REPO_ROOT = Path(__file__).resolve().parent
OUTPUT = REPO_ROOT / "menu_auto.html"

# 只列這七個資料夾（不含子資料夾）
FOLDER_ORDER = [
    "走势图",
    "账户管理2",
    "账户管理",
    "登录",
    "活动",
    "投注",
    "信用",
]

def norm(s: str) -> str:
    """Normalize for matching folder names on macOS/Windows and remove surrounding spaces."""
    return unicodedata.normalize("NFKC", s).strip()

def url_path(p: Path) -> str:
    """
    Convert a relative path to a URL-safe path for GitHub Pages:
    - use POSIX separators
    - URL-encode each segment (handles Chinese / spaces / special chars)
    """
    parts = p.as_posix().split("/")
    return "/".join(quote(seg) for seg in parts)

def find_folder_by_name(root: Path, expected: str) -> Path | None:
    """
    Try to find a folder in root that matches expected name,
    using normalization + trimming to avoid invisible differences.
    """
    expected_n = norm(expected)
    for child in root.iterdir():
        if child.is_dir() and norm(child.name) == expected_n:
            return child
    return None

def list_top_level_html(folder: Path) -> list[Path]:
    """List only .html files directly under folder (no subfolders)."""
    if not folder.exists() or not folder.is_dir():
        return []
    files = [p for p in folder.glob("*.html") if p.is_file()]
    # sort by file name for stable output
    files.sort(key=lambda p: norm(p.name))
    return files

def build_section(title: str, folder: Path | None, links: list[Path]) -> str:
    count = len(links)
    if folder is None:
        body = '<div class="empty">（找不到此資料夾：請確認資料夾名稱是否完全一致）</div>'
    elif count == 0:
        body = '<div class="empty">（此資料夾沒有找到 .html / 或檔案不在第一層）</div>'
    else:
        items = []
        for p in links:
            rel = p.relative_to(REPO_ROOT)  # e.g. 投注/xxx.html
            href = url_path(rel)
            label = p.stem  # file name without extension
            items.append(
                f'<a class="btn" href="{href}" target="_blank" rel="noopener noreferrer">{label}</a>'
            )
        body = f'<div class="grid">\n' + "\n".join(items) + "\n</div>"

    return f"""
    <details open>
      <summary>{title} <span class="count">({count})</span></summary>
      {body}
    </details>
    """.strip()

def html_template(sections_html: str) -> str:
    return f"""<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prototype Menu (Auto)</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", Arial, sans-serif;
      margin: 16px;
      line-height: 1.4;
      background: #fff;
      color: #111;
    }}
    h1 {{ margin: 0 0 8px 0; font-size: 20px; }}
    .hint {{ margin: 0 0 16px 0; color: #666; font-size: 14px; }}
    details {{
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 10px 12px;
      margin: 10px 0;
      background: #fafafa;
    }}
    summary {{
      cursor: pointer;
      font-weight: 700;
      list-style: none;
      outline: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    summary::-webkit-details-marker {{ display: none; }}
    .count {{ color: #666; font-weight: 600; margin-left: 8px; }}
    .grid {{
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
    }}
    .btn {{
      display: block;
      padding: 10px 12px;
      border: 1px solid #e2e2e2;
      background: #fff;
      border-radius: 10px;
      text-decoration: none;
      color: #111;
      word-break: break-word;
    }}
    .btn:hover {{ border-color: #bbb; }}
    .empty {{
      margin-top: 10px;
      color: #777;
      font-size: 13px;
    }}
    .toplinks {{
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin: 10px 0 16px 0;
    }}
    .toplinks a {{
      padding: 8px 10px;
      border: 1px solid #ddd;
      border-radius: 10px;
      text-decoration: none;
      color: #111;
      background: #fff;
    }}
  </style>
</head>
<body>
  <h1>Prototype Menu (Auto)</h1>
  <p class="hint">點選下列按鈕開啟各頁面（皆另開視窗）。只掃描指定的 7 個資料夾、且只抓第一層 .html。</p>

  <div class="toplinks">
    <a href="{url_path(Path('index.html'))}" target="_blank" rel="noopener noreferrer">開 index.html</a>
  </div>

  {sections_html}

</body>
</html>
"""

def main() -> None:
    print("REPO_ROOT =", REPO_ROOT)
    sections = []

    for folder_name in FOLDER_ORDER:
        folder = find_folder_by_name(REPO_ROOT, folder_name)
        links = list_top_level_html(folder) if folder else []
        # debug output
        if folder is None:
            print(f"[MISS] {folder_name} -> folder not found in repo root")
        else:
            print(f"[OK]   {folder_name} -> {folder.name} / html count = {len(links)}")

        sections.append(build_section(folder_name, folder, links))

    out = html_template("\n\n".join(sections))
    OUTPUT.write_text(out, encoding="utf-8")
    print("Wrote:", OUTPUT)

if __name__ == "__main__":
    main()
