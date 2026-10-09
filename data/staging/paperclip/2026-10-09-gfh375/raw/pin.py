import re
def logical(rawtext):
    out={}; cur=None
    for l in rawtext.splitlines():
        m=re.match(r'L(\d+):\s?(.*)',l)
        if m: cur=int(m.group(1)); out[cur]=m.group(2)
        elif cur is not None: out[cur]+=' '+l
    return out
def locate(rawtext, q, norm):
    L=logical(rawtext); keys=sorted(L); q=norm(q)
    for span in range(4):
        for a in range(len(keys)-span):
            if q in norm(' '.join(L[k] for k in keys[a:a+span+1])):
                return f'L{keys[a]}' if span==0 else f'L{keys[a]}-L{keys[a+span]}'
    return None
