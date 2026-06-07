# Architecture Policy v0.1

## Principle

The Factory creates AI-optimized product repositories.

Priority order:

1. changeability by agents
2. clear module boundaries
3. strong typing
4. simple tests
5. low architecture drift

## Core Rules

### 1. Single Stack per Archetype

Each product uses exactly one defined archetype stack.

No free technology selection during implementation.

### 2. Feature-Based Structure

Code is primarily organized by features, not technical layers.

Example:

```text
src/features/billing/
src/features/auth/
src/features/dashboard/
```

### 3. Small Files Preferred

Files should remain small and focused.

Large files are avoided because they degrade agent context quality.

### 4. Explicit Contracts

APIs, schemas, and interfaces must be explicitly typed.

### 5. No Hidden Architecture

Architecture decisions must be documented in `.factory/product/decisions.md` or `docs/adr/`.

### 6. No Autonomous Architecture Rewrite

Agents must not independently replace the existing product architecture.

### 7. Tests Follow Features

Tests should live close to the feature or follow strict naming conventions.

### 8. Consistency Over Cleverness

Simple, repeatable patterns are preferred over clever abstractions.
