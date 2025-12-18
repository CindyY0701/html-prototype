#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import quote

REPO_ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = REPO_ROOT / "menu.html"

# 確認的 7 個資料夾
FOLDERS = [
    "走勢圖",
    "帳戶管理2",
    "帳戶管理",
    "登入",
    "活動",
    "投注",
    "信用",
]

# repo root 你也有放兩個 html（可依需要增減）
ROOT_PAGES = [
    "index.html",          # 原型首頁（保留，方便直接開）
    "哈希投注详情.html",
    "区块链哈希值.html",
    "cq9.html",
]

def href_for(rel_path: Path) -> str:
    # URL encode：避免中文、空格、特殊符號導致 GitHub Pages 404
    parts = [quote(p) for p in rel_path.as_posix().split("/")]
    return "/".join(parts)

def list_html_files_in_folder(folder: str):
    folder_path = REPO_ROOT / folder
    if not folder_path.exists() or not folder_path.is_dir():
        return []
    # 不含子資料夾，只抓本層 .html
    pages = [p for p in folder_path.iterdir() if p.is_file() and p.suffix.lower() == ".html"]
    return sorted(pages, key=lambda p: p.name)

def make_section(title: str, links: list[str]) -> str:
    if not links:
        return f"""<details open>
  <summary>{title}（0）</summary>
  <div class="empty">此資料夾未找到 HTML</div>
</details>
"""
    items = "\n".join(links)
    return f"""<details open>
  <summary>{title}（{len(links)}）</summary>
  <div class="grid">
{items}
  </div>
</details>
"""

def main():
    # root links
    root_links = []
    for f in ROOT_PAGES:
        p = REPO_ROOT / f
        if p.exists() and p.is_file():
            root_links.append(
                f'    <a class="btn" href="{href_for(Path(f))}" target="_blank" rel="noopener noreferrer">{p.ste
