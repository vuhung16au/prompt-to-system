---
id: harness-engineering
title: Harness Engineering
summary: Providing tools, constraints, and feedback around an agent.
level: advanced
last_verified: 2026-10-05
---

## Key Takeaway
Agents are only as safe and effective as the environment they operate in. Harness engineering provides the scaffolding—sandboxes, tool permissions, state management, and guardrails—required to run autonomous AI agents reliably and securely in production.

## Explanation
Harness engineering focuses on the "outer loop" surrounding the LLM. While prompt engineering dictates how the model thinks, harness engineering dictates how the model interacts with the outside world. It answers the crucial questions: *What tools can this agent use? What happens if a tool fails? How do we prevent the agent from deleting production data or getting stuck in an infinite loop?*

A robust harness typically includes:
1. **Execution Environments:** Sandboxed areas (like Docker containers, restricted VMs, or serverless functions) where the agent can run code safely without compromising the host system.
2. **State & Memory Management:** Systems to persist the agent's context, action history, and working memory across multiple turns or sessions.
3. **Guardrails & Permissions:** Strict access controls, such as read-only API keys or human-in-the-loop (HITL) approval steps for high-stakes actions.
4. **Resilience Mechanisms:** Built-in retries, timeout constraints, and error-parsing logic to help the agent recover gracefully when a tool fails or an API times out.

## When to use it
- **Autonomous Agents:** Any time an agent is given agency to execute code, query databases, or call external APIs.
- **Multi-step Workflows:** When tasks require long-running, asynchronous operations that might fail and need retry logic.
- **Production Systems:** Whenever security, reliability, and cost-control are strict requirements.

## When NOT to use it
- **Text-only Conversational Tasks:** Basic chatbots or summarization tools that only output text to the user don't require complex execution harnesses.
- **Simple Zero-shot Classification:** When the LLM is just categorizing data and returning a static JSON response.

## Small Example
Imagine a data analysis agent that writes and executes Python code based on a user's request.

Instead of running the generated code directly on your server, you use a harness:

```python
# Pseudo-code for an execution harness
def run_agent_action(tool_call, agent_state):
    if tool_call.name == "execute_python":
        # 1. Enforce Guardrails: Check if the code contains forbidden imports (e.g., 'os', 'subprocess')
        if not is_code_safe(tool_call.code):
            return "Error: Unsafe code detected. Please rewrite without system calls."
        
        # 2. Execution Environment: Run inside a restricted, short-lived Docker container
        try:
            result = run_in_sandbox(tool_call.code, timeout_seconds=10)
            return result
        except TimeoutException:
            # 3. Resilience: Provide feedback so the agent can fix the issue
            return "Error: Code execution timed out. Please optimize the algorithm."
        except Exception as e:
            return f"Error executing code: {str(e)}. Please review and fix."
```
The harness ensures that even if the LLM hallucinates malicious or inefficient code, the system remains secure and stable, while providing constructive feedback back to the agent.

## Common Failure Modes
- **Unrestricted Access:** Giving an agent root access or write permissions to a production database, leading to catastrophic data loss.
- **Infinite Action Loops:** The agent encounters an error, tries the exact same broken tool call repeatedly, and racks up massive API costs without making progress.
- **Brittle Output Parsing:** The harness expects a perfect JSON tool call, but the LLM includes conversational text or markdown formatting, causing the harness to crash instead of gracefully handling the error.
- **Lack of Timeouts:** The agent initiates a long-running process that hangs indefinitely, consuming compute resources and blocking other tasks.

## How to Evaluate
- **Security Audits:** Actively try to prompt-inject the agent to see if it can break out of the sandbox or access unauthorized data (Red Teaming).
- **Recovery Rate:** When a tool intentionally returns an error, measure how often the agent successfully understands the error and corrects its next action.
- **Execution Overhead:** Measure the latency and cost added by the sandbox environment and guardrail checks compared to the raw LLM inference time.

## Related Examples
- [Root-cause Debugging Playbook](/prompt-to-system/examples/root-cause-debugging)
- [Code Review Assistant](/prompt-to-system/examples/code-review-assistant)
