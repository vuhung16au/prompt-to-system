---
id: infinite-loops
title: "Infinite Loops"
summary: "A failure mode in autonomous agents where the model repeatedly performs the same ineffective action or tool call."
aliases: ["agent loops"]
---
Agent workflows can get stuck in infinite loops if the model fails to recognize that a tool is returning the same error, or if its termination condition is never met. Robust agent architectures require loop-breaking mechanisms, such as maximum iteration limits or runtime monitoring.
