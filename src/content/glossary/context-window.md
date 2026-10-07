---
id: context-window
title: "Context Window"
summary: "The total amount of text (measured in tokens) that an LLM can 'see' and process at one time."
aliases: ["context length"]
---
The context window is the working memory of a Large Language Model. It defines the maximum number of tokens (words or sub-words) the model can consider when generating a response. This limit includes both the input prompt and the generated output. Exceeding the context window will either result in an error or cause the model to 'forget' earlier parts of the conversation.
