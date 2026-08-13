# CCAF Day 1-2 Outputs

## Running through node:

```
PS C:\ccaf\ccaf-day1> node hello-npm.js
Status: 200
<!doctype html><html lang="en"><head><title>Example Domain</title><link rel="icon" href="data:,"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{background:#eee;width:6
```

## Running through Python + pip:

```
PS C:\ccaf\ccaf-day1> python .\hello_pip.py
Status: 200
<!doctype html><html lang="en"><head><title>Example Domain</title><link rel="icon" href="data:,"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{background:#eee;width:6
PS C:\ccaf\ccaf-day1> 
```

## Asking Claude Code to build something:

```
I'll create the script using Python's standard library (no extra dependencies needed) and then run it.

● Write(hello_claude.py)
Wrote 14 lines to hello_claude.py
import re
import urllib.request

url = "https://example.com"

with urllib.request.urlopen(url) as response:
    status_code = response.status
    html = response.read().decode("utf-8")

match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
… +4 lines

  Ran 1 shell command

Created hello_claude.py and ran it. Output:

Status code: 200
```