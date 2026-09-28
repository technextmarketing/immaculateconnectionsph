"""A conservative JavaScript minifier for this site's scripts.

It removes comments, indentation and blank lines, and drops the spaces that aren't needed
between tokens. Anything inside a string, a template literal (including templates nested in
${...}) or a regular expression is copied exactly. Line breaks between statements are kept,
so automatic semicolon insertion behaves exactly as in the source.

Written because rjsmin treats a template literal nested inside ${...} as code and strips the
spaces from its markup ("book it.</strong> Your" became "book it.</strong>Your").
"""

WS = " \t\r\n\f\v ﻿  "
REGEX_AFTER = {"return", "typeof", "case", "do", "else", "in", "of", "new", "delete", "void", "throw", "instanceof", "yield", "await"}


def is_word(ch): return ch.isalnum() or ch in "_$\\" or ord(ch) > 127


def minify(src):
    out, i, n = [], 0, len(src)
    stack, depth = [], 0          # template nesting: brace depth at each open ${
    last = ""                     # last code token, to tell a regex from a division
    ws_space = ws_nl = False      # whitespace seen since the last token

    def emit(tok):
        nonlocal ws_space, ws_nl, last
        if out:
            prev = out[-1][-1]
            if ws_nl: out.append("\n")
            elif ws_space and (is_word(prev) and is_word(tok[0]) or prev in "+-" and tok[0] == prev or prev == "/" and tok[0] == "/"):
                out.append(" ")
        ws_space = ws_nl = False
        out.append(tok); last = tok

    def template_from(j):
        """Scan template text from j; return (end index, 'end' | 'expr')."""
        while j < n:
            c = src[j]
            if c == "\\": j += 2; continue
            if c == "`": return j + 1, "end"
            if c == "$" and j + 1 < n and src[j + 1] == "{": return j + 2, "expr"
            j += 1
        raise ValueError("unterminated template literal")

    while i < n:
        c = src[i]
        if c in WS:
            j = i
            while j < n and src[j] in WS: j += 1
            if any(x in src[i:j] for x in "\n\r  "): ws_nl = True
            else: ws_space = True
            i = j; continue
        if src.startswith("//", i):
            j = src.find("\n", i); i = n if j < 0 else j; continue
        if src.startswith("/*", i):
            j = src.find("*/", i + 2)
            if j < 0: raise ValueError("unterminated comment")
            if "\n" in src[i:j]: ws_nl = True
            else: ws_space = True
            i = j + 2; continue
        if c in "'\"":
            j = i + 1
            while src[j] != c:
                if src[j] == "\\": j += 2; continue
                if src[j] == "\n": raise ValueError(f"line break in a string at {i}")
                j += 1
            emit(src[i:j + 1]); i = j + 1; continue
        if c == "`":
            j, kind = template_from(i + 1)
            emit(src[i:j])
            if kind == "expr": stack.append(depth); depth += 1
            i = j; continue
        if c == "}" and stack and depth - 1 == stack[-1]:
            depth -= 1; stack.pop()
            j, kind = template_from(i + 1)
            ws_space = ws_nl = False
            out.append(src[i:j]); last = "`"
            if kind == "expr": stack.append(depth); depth += 1
            i = j; continue
        if c == "/":
            division = bool(last) and (is_word(last[-1]) or last[-1] in ")]}'\"`") and last not in REGEX_AFTER
            if not division:
                j, in_class = i + 1, False
                while True:
                    ch = src[j]
                    if ch == "\\": j += 2; continue
                    if ch == "\n": raise ValueError(f"line break in a regular expression at {i}")
                    if in_class:
                        if ch == "]": in_class = False
                    elif ch == "[": in_class = True
                    elif ch == "/": break
                    j += 1
                j += 1
                while j < n and is_word(src[j]): j += 1
                emit(src[i:j]); i = j; continue
        if is_word(c):
            j = i + 1
            num = c.isdigit()
            while j < n and (is_word(src[j]) or (num and src[j] == ".")): j += 1
            emit(src[i:j]); i = j; continue
        if c == "." and i + 1 < n and src[i + 1].isdigit():   # .5
            j = i + 1
            while j < n and is_word(src[j]): j += 1
            emit(src[i:j]); i = j; continue
        if c == "{": depth += 1
        elif c == "}": depth -= 1
        emit(c); i += 1
    if stack: raise ValueError("unterminated template expression")
    return "".join(out).strip() + "\n"


if __name__ == "__main__":
    import sys
    sys.stdout.write(minify(open(sys.argv[1], encoding="utf-8").read()))
