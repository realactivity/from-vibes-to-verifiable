# The Story: From Vibes to Verifiable

## The tension

Agent demos are optimized for the happy path. Trust is earned on everything
that happens around the happy path:

- what context the agent saw;
- what runtime executed the action;
- what skill contract bounded the behavior;
- what data crossed a trust boundary;
- what happened when the request was unsafe or ambiguous;
- what evidence survived after the action.

The presentation uses Scout and Tula to show that this is not a
framework-specific concern. It is an operating model.

## Act I — OpenClaw is the shared substrate

[OpenClaw](https://github.com/openclaw/openclaw) is the open agent runtime
under both stories.

### Microsoft Scout

[Microsoft Scout](https://learn.microsoft.com/en-us/microsoft-scout/) is an
always-on personal agent for work. Microsoft describes Scout as built on
OpenClaw and Work IQ. It acts across Microsoft 365 and the desktop while adding
enterprise identity, access controls, policy conformance, and human signoff for
sensitive actions.

The important architectural signal is upstream contribution: Microsoft says it
is contributing policy conformance directly to OpenClaw. The open substrate and
the enterprise control plane can improve each other.

### Tula

[Tula](https://github.com/realactivity/tula) is an open-source personal health
agent skill layer built on OpenClaw. It makes healthcare-specific behaviors
explicit through:

- narrow skill contracts;
- private, self-hosted workspace data;
- human-in-the-loop constraints;
- evaluation suites;
- audit-oriented traces and snapshots;
- clear “not for diagnosis or treatment” boundaries.

Scout and Tula solve different problems, but the trust questions are the same.

## Act II — Wren grounds the health agent in the record

The most useful health assistant is not merely eloquent. It is grounded in the
person's authorized clinical record.

Wren lives at
[`services/wren`](https://github.com/realactivity/tula/tree/main/services/wren)
inside Tula. It is RealActivity's MIT-licensed, self-hostable derivative of
[Joshua Mandel's `health-skillz`](https://github.com/jmandel/health-skillz).

### The Wren data journey

```text
Patient
  │ chooses a provider and authenticates
  ▼
Epic / another SMART on FHIR endpoint
  │ returns authorized FHIR R4 data to the browser
  ▼
Wren relay
  │ stores and transports encrypted chunks it cannot read
  ▼
Tula health-records skill
  │ decrypts locally in the patient-controlled workspace
  ▼
FHIR record on disk
  │ grounds health skills and longitudinal views
  ▼
My Aria
```

Wren preserves the upstream wire protocol: SMART on FHIR sessions plus
ECDH P-256 and AES-256-GCM chunked end-to-end encryption. The relay stores
ciphertext; the private key stays with the agent-side session.

This is why Wren is more than “an Epic connector.” It is a visible trust
boundary between patient authorization, the health system, the relay, and the
patient-controlled workspace.

## Act III — My Aria turns the record into a human experience

[My Aria](https://github.com/realactivity/tula/tree/main/apps/my-aria) is the
patient-facing interface on top of Tula's FHIR-shaped record.

It is designed for the questions people actually ask:

- What changed?
- What is coming up?
- Which result needs attention?
- What am I taking now?
- What should I ask at my next visit?

The current public screenshots use synthetic fixture data. The architecture
keeps the view separate from the data-loading seam so the interface can later
read the same local FHIR layer used by Tula.

If SMART on FHIR is the pipe, and Tula is the plumbing, My Aria is the faucet.

## Act IV — Waza turns expectations into evidence

[Microsoft Waza](https://github.com/microsoft/waza) is an open CLI and
framework for evaluating agent skills.

The Tula
[Patient Agent Eval Standard](https://github.com/realactivity/tula/tree/main/evals)
currently defines 78 behavior tasks across eight skills plus a composition
bundle. The tests cover five important modes:

1. positive or expected behavior;
2. handoff and negative behavior;
3. PHI and privacy boundaries;
4. adversarial behavior;
5. deterministic golden outputs.

That creates two complementary lanes:

- **Structural readiness:** Does the skill have a valid contract, evaluation
  configuration, coverage, and expected artifacts?
- **Behavioral certification:** Does the agent actually behave correctly on
  realistic positive, negative, privacy, adversarial, and golden tasks?

A green demo says “it worked once.” A release gate says “we checked the
behavior we care about, under named conditions, with preserved evidence.”

## Act V — Governance makes the evidence operational

[mellowmushroom.realactivity.ai](https://mellowmushroom.realactivity.ai/) is a
synthetic demonstration of a governance bridge. It illustrates how an
organization could make the following visible across workforce and patient
agents:

- identity and consent;
- current policy;
- items requiring human attention;
- action traces;
- audit evidence;
- escalation state.

The prototype is a teaching surface, not production telemetry. Its job in the
story is to make the missing middle visible: the space between “the skill
passed its tests” and “the organization can safely operate the agent.”

## The reusable pattern

Use this checklist for any autonomous agent:

1. **Inspect** the runtime, skill contract, tool permissions, and data boundary.
2. **Test** the expected, refused, adversarial, and failure behavior.
3. **Constrain** consequential actions with identity, policy, and human
   approval.
4. **Audit** the request, context, decision, action, and outcome.

The goal is not an agent that never fails. The goal is an agent whose behavior
can be understood, evaluated, constrained, and reconstructed.
