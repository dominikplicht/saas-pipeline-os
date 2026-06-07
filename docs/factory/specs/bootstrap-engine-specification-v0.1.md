# Bootstrap Engine v0.1

## Zweck

Die Bootstrap Engine erzeugt aus einer Produktidee automatisch ein produktionsfähiges Start-Repository.

```text
Product Intent
→ Archetype Selection
→ Repo Bootstrap
→ Factory Control Plane
→ Initial PRD
→ Initial Roadmap
→ Initial Task Graph
→ CI/CD Setup
```

## Kernprinzip

Die Factory startet kein leeres Projekt.

Sie erzeugt zuerst ein **Factory-native Product Repository**.

Das heißt:

- Codebase
- `.factory/` Control Plane
- GitHub-Struktur
- CI/CD
- Policies
- initiale Produktdokumente
- erste ausführbare Tasks

werden gemeinsam erzeugt.

---

# 1. Input: Product Intent

Minimaler Input durch dich:

```yaml
product_name:
product_idea:
target_users:
core_problem:
desired_platform:
quality_level:
constraints:
```

Beispiel:

```yaml
product_name: MenuPilot
product_idea: KI-gestützte Menüplanung für kleine Restaurants
target_users: Restaurantbesitzer und Küchenleiter
core_problem: Menüplanung ist zeitaufwändig und ineffizient
desired_platform: web-app
quality_level: mvp
constraints:
  - cloud-native
  - low-maintenance
```

---

# 2. Bootstrap Output

Die Bootstrap Engine erzeugt:

```text
product-repo/
├── product codebase
├── .factory/
├── .github/
├── docs/
├── README.md
└── initial working app
```

Wichtig: Das Ergebnis muss **sofort lauffähig** sein.

---

# 3. Archetype Selection

Initial nur wenige erlaubte Archetypes.

## v0.1 Archetypes

| Archetype | Zweck | Stack |
|---|---|---|
| `saas-web-app` | klassische SaaS-App | Next.js, TypeScript, Tailwind, Supabase, Vercel |
| `ai-chat-product` | AI-Chat / Assistant App | Next.js, OpenAI SDK, Supabase, Streaming |
| `internal-tool` | Dashboard / Admin Tool | Next.js, TypeScript, Supabase, shadcn |
| `api-service` | API-only Produkt | Node/Fastify oder Next API, Postgres |
| `landing-page-mvp` | schneller Markt-Test | Next.js, Tailwind, Vercel |

Meine Empfehlung für v0.1: mit **`saas-web-app`** starten.

---

# 4. Bootstrap Lifecycle

## Step 1 — Intent Normalization

Aus freiem Input wird ein strukturiertes `product-intent.md`.

## Step 2 — Archetype Selection

Die Engine wählt genau einen Archetype.

## Step 3 — Repository Generation

Das Repo wird aus zentralem Archetype-Repo erzeugt.

## Step 4 — Factory Layer Injection

Die Struktur aus `factory-repository-structure-v0.2` wird eingefügt.

## Step 5 — Product Docs Generation

Erzeugt:

```text
.factory/product/product-intent.md
.factory/product/prd.md
.factory/product/roadmap.md
.factory/product/feature-map.md
.factory/product/open-questions.md
```

## Step 6 — Initial Task Graph

Erzeugt erste Tasks:

```text
setup.auth
setup.database
ui.app-shell
feature.core-flow
test.smoke
deploy.preview
```

## Step 7 — GitHub Setup

Erzeugt:

- Issue Templates
- Labels
- PR Template
- Actions
- Branch Protection Empfehlung

## Step 8 — First Validation

Repo muss bestehen:

```text
lint
typecheck
test
build
```

---

# 5. Bootstrap Success Criteria

Ein Bootstrap gilt als erfolgreich, wenn:

```text
Repo exists
Factory structure exists
Initial app builds
Initial PRD exists
Initial task graph exists
CI workflow exists
README exists
Deployment target defined
```

---

# 6. Kritische Regel

Die Bootstrap Engine darf in v0.1 **nicht dynamisch beliebige Stacks kombinieren**.

Sie darf nur:

```text
Product Intent → erlaubter Archetype
```

---

# 7. Offene Entscheidung

Für die nächste Spezifikation brauchen wir eine Entscheidung:

## Welcher Archetype wird der erste produktive Standard?

### Option A — `saas-web-app`
Beste Wahl für die meisten Produktideen.

### Option B — `ai-chat-product`
Besser, wenn die Factory direkt AI-native Apps priorisieren soll.

### Option C — `landing-page-mvp`
Schnellster Markt-Test, aber weniger „vollwertiges Produkt“.

Empfehlung: **Option A — `saas-web-app`**.
