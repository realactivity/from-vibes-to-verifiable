# Demo Runbook

The session is designed for 50 minutes. Keep the demonstrations short enough
that the audience can see the trust boundary, not just the user interface.

## Before the room opens

- Download a local copy of the
  [PowerPoint](downloads/From-Vibes-to-Verifiable-M365-NYC-2026.pptx).
- Open the three demo surfaces in separate browser windows.
- Increase browser zoom until policy labels and trace fields are readable from
  the back of the room.
- Use synthetic records only.
- Confirm that every demo has a screenshot fallback.
- Put terminals in a large monospaced font and clear unrelated history.
- Disable notifications and hide secrets, tokens, tenant IDs, and patient data.
- Keep a clock visible to yourself, not the audience.

## Demo 1 — Follow the Scout action

**Purpose:** Show that the useful part is not merely the action; it is the
context, identity, boundary, and approval around it.

### Show

1. Start with one realistic Microsoft 365 task.
2. Identify the context Scout is using.
3. Follow the action into the runtime/tool boundary.
4. Pause on a sensitive action that requires human signoff.
5. Point to the evidence that would let an administrator reconstruct it.

### Say

> “The result is the least interesting part. I want to know who acted, with
> which context, through which permission, under which policy.”

### Fallback

Use the Scout architecture slide and narrate the same four checkpoints:
context, identity, permission, approval.

## Demo 2 — Inspect Tula, Wren, and Waza

**Purpose:** Make the skill contract, health-data boundary, and evaluation
evidence tangible.

### Show

1. Open Tula's
   [`health-records` skill](https://github.com/realactivity/tula/tree/main/skills/health-records).
2. Show Wren under
   [`services/wren`](https://github.com/realactivity/tula/tree/main/services/wren).
3. Trace the SMART on FHIR flow: patient authorization → encrypted relay →
   local decryption → FHIR on disk.
4. Open one Tula `SKILL.md` and name its “use for” and “do not use for”
   boundaries.
5. Run or narrate:

   ```bash
   waza check skills/prep-my-visit
   waza run evals/prep-my-visit/eval.yaml -v
   ```

6. Open one negative/PHI task and one deterministic golden task.

### Say

> “The skill is a behavioral contract. The eval suite is the executable
> argument that the contract still means something.”

### Fallback

Use the repository links in the companion site. If the CLI is unavailable,
show the task definitions and explain what would cause the release gate to
fail.

## Demo 3 — Trace the governance bridge

**Purpose:** Show how release evidence becomes operational governance.

### Show

1. Open [mellowmushroom.realactivity.ai](https://mellowmushroom.realactivity.ai/).
2. State clearly that the dashboard is synthetic.
3. Pick one interaction.
4. Trace identity and consent.
5. Show the policy decision and any human-attention state.
6. Follow the audit record through to the outcome.
7. Ask: “Could we explain this action tomorrow?”

### Say

> “Evaluation tells us what the agent proved before release. Governance tells
> us what this particular agent did for this particular person.”

### Fallback

Use the governance screenshot in the companion site and point to consent,
attention, and audit in that order.

## Pacing

| Segment | Target |
|---|---:|
| Thesis and architecture | 7 min |
| Scout story + Demo 1 | 10 min |
| Tula/Wren/My Aria + Demo 2 | 15 min |
| Waza and evaluation evidence | 7 min |
| Governance + Demo 3 | 7 min |
| Reusable pattern and close | 4 min |

## Presenter tips

- **Narrate the boundary, not every click.** The audience needs the reason for
  the transition.
- **Let one failure test breathe.** A refusal often explains the safety model
  better than another successful prompt.
- **Use exact status words.** Say “synthetic,” “prototype,” “phase 1,” or
  “in progress” when that is the current state.
- **Separate privacy from governance.** Self-hosting helps control data
  location; it does not automatically provide identity, consent, policy,
  escalation, or audit.
- **End each demo with evidence.** Show the trace, test result, or decision
  record before switching surfaces.
- **Keep medical claims out of the demo.** Demonstrate organization,
  preparation, and safe handoff—not diagnosis or treatment.
