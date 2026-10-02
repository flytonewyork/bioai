---
name: queue
description: Process tasks exported from the cockpit's ActionBar (ops/queue/queue.json).
disable-model-invocation: true
---
Read ops/queue/queue.json. Show the tasks grouped by command with an estimated search budget,
and ask Thomas which to run. Run the approved ones one at a time through the matching command
(/deepen, /redteam, /refresh, /people, /verify). Mark each task done or failed in the file and
append results to ops/runlog.md. Stop at the spend ceiling.
