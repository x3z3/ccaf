# hello-claude.py
import re
import urllib.request

url = "https://example.com"

with urllib.request.urlopen(url) as response:
    status_code = response.status
    html = response.read().decode("utf-8")

match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
title = match.group(1).strip() if match else "No title found"

print(f"Status code: {status_code}")
print(f"Title: {title}")