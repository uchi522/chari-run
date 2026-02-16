---
name: tdd
description: >
  Enforce strict Test-Driven Development (TDD) workflow for all coding tasks.
  Use this skill whenever implementing new features, fixing bugs, or refactoring code.
  Triggers: /tdd command, or any implementation task where TDD is required by project rules.
  Enforces the RED→GREEN→REFACTOR cycle with atomic discipline — no source code changes
  without a failing test first.
---

# TDD Protocol

Execute every coding task using the following atomic cycle. Never skip or reorder phases.

## Cycle: RED → GREEN → REFACTOR

### 1. RED — Write a failing test

1. Analyze requirements from the issue or prompt.
2. Write a single failing test case in the project's test directory.
3. Run the test suite and confirm the failure (expect a specific AssertionError or similar).
4. **Do NOT touch any source code during this phase.** Only test files are modified.

If the test passes immediately, the test is wrong or the feature already exists — investigate before proceeding.

### 2. GREEN — Make it pass with minimum code

1. Write the minimum amount of production code to make the failing test pass.
2. Run the test suite and confirm all tests pass (both the new test and existing tests).
3. **Do NOT add code beyond what the test requires.** No speculative features, no "while I'm here" cleanups.

If existing tests break, fix the production code — do not modify existing tests unless they are genuinely wrong.

### 3. REFACTOR — Clean up under green tests

1. Improve code quality (naming, duplication, structure) while all tests remain green.
2. Run the full test suite after each refactoring change.
3. If any test fails, revert the refactoring change immediately and try a different approach.

Skip this phase only if there is nothing to improve.

## Commit Rule

After completing one full RED→GREEN→REFACTOR cycle, create a single commit that includes both the test and the implementation. Use Conventional Commits format:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for refactoring-only changes
- `test:` for test-only changes (rare — only when adding tests for existing untested code)

## Multiple Requirements

When a task has multiple requirements, repeat the cycle for each requirement independently. Do NOT write all tests upfront — complete one full cycle before starting the next.

## Guiding Principles

- **Tests are the specification.** If it's not tested, it doesn't exist.
- **Small steps.** Each cycle should address one behavior. Prefer multiple small cycles over one large cycle.
- **Trust the process.** Resist the urge to write production code before seeing a failing test.
