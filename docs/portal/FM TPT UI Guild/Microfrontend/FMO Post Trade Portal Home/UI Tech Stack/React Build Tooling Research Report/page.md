**Webpack vs Rspack vs Vite — Evaluation & Migration Strategy**

---

# 1. Executive Summary

This research evaluates three major React build tools:

- **Webpack** — mature, highly compatible, but slower in development
- **Rspack** — high-performance, webpack-compatible alternative
- **Vite** — modern ESM-first tool with superior developer experience

### Key Conclusions

1. **Rspack is the optimal migration path for existing webpack-based systems**, especially with microfrontend architectures (e.g., single-spa + SystemJS).
2. **Vite is the best choice for new React projects**, prioritizing developer experience and simplicity.
3. **Webpack remains the most robust baseline** for complex enterprise systems with heavy legacy dependencies.

---

# 2. Webpack Evaluation

## 2.1 Positioning

Webpack is a **bundler-first architecture** focused on:

- Maximum configurability
- Extensive plugin/loader ecosystem
- Strong compatibility with legacy systems

It remains the **enterprise standard baseline**.

---

## 2.2 Architecture

Core extensibility model:

- **Loader** → transforms resources (TS, CSS, assets)
- **Plugin** → modifies build lifecycle

Key capabilities:

- Code splitting
- Tree shaking
- HMR
- Module Federation
- Multi-format output (critical for microfrontend systems)

---

## 2.3 Performance (Benchmark Data)

### React-5k Benchmark

| Metric | Webpack |
| --- | --- |
| Dev Cold Start (no cache) | 9324 ms |
| Dev Cold Start (cache) | 5348 ms |
| HMR | 1831 ms |
| Production Build (no cache) | 9278 ms |
| Production Build (cache) | 2391 ms |
| Bundle Size | 2825.4 kB |
| Gzip | 679.3 kB |

### React-10k Benchmark

| Metric | Webpack |
| --- | --- |
| Dev Cold Start | 21444 ms |
| HMR | 2783 ms |
| Production Build | 28138 ms |

---

## 2.4 Assessment

### Strengths

- Most mature ecosystem
- Maximum flexibility
- Strong legacy compatibility
- Best support for complex architectures

### Weaknesses

- Slow dev startup and HMR
- High configuration complexity
- Requires tuning for performance

---

# 3. Rspack Evaluation

## 3.1 Positioning

Rspack is a **Rust-based high-performance alternative to Webpack**, designed for:

- Compatibility with webpack ecosystem
- Significant performance improvement

---

## 3.2 Architecture

- Bundler-first (same mental model as webpack)
- High config compatibility
- Plugin migration support

Key feature:

- Supports `System.register` output → critical for **single-spa + SystemJS**

---

## 3.3 Performance

### React-5k Benchmark

| Metric | Rspack |
| --- | --- |
| Dev Cold Start (no cache) | 759 ms |
| Dev Cold Start (cache) | 573 ms |
| HMR | 105 ms |
| Production Build (no cache) | 1724 ms |
| Production Build (cache) | 1146 ms |
| Bundle Size | 2825.8 kB |
| Gzip | 680.3 kB |

### Performance Gains vs Webpack

- Dev startup: **~12× faster**
- HMR: **~17× faster**
- Production build: **~5× faster**

---

## 3.4 Assessment

### Strengths

- Minimal migration cost from webpack
- Excellent dev performance
- Compatible with microfrontend systems

### Weaknesses

- Partial plugin incompatibility
- Smaller ecosystem than webpack
- Maturity still evolving

---

# 4. Vite Evaluation

## 4.1 Positioning

Vite is an **ESM-first development tool**, optimized for:

- Fast dev server
- Minimal configuration
- Modern frontend workflows

---

## 4.2 Architecture

- Dev: Native ESM + dependency pre-bundling
- Build: Bundler-based (Rollup / Rolldown)

Important characteristics:

- TypeScript → transpile only (no type check)
- Strong React integration
- Requires adaptation for non-standard setups

---

## 4.3 Performance

### React-5k Benchmark

| Metric | Vite |
| --- | --- |
| Dev Cold Start (no cache) | 3294 ms |
| Dev Cold Start (cache) | 2163 ms |
| HMR | 147 ms |
| Production Build (no cache) | 1075 ms |
| Production Build (cache) | 881 ms |
| Bundle Size | 2630.1 kB |
| Gzip | 692.8 kB |

### React-10k Benchmark

| Metric | Vite |
| --- | --- |
| Dev Cold Start | 6505 ms |
| HMR | 191 ms |
| Production Build | 1986 ms |

---

## 4.4 Assessment

### Strengths

- Excellent developer experience
- Fast HMR and build
- Minimal configuration

### Weaknesses

- Requires paradigm shift from webpack
- Poor fit for SystemJS-based microfrontends
- Edge cases with linked packages / legacy modules

---

# 5. Comparative Analysis

## 5.1 High-Level Comparison

| Dimension | Webpack | Rspack | Vite |
| --- | --- | --- | --- |
| Dev Startup | Slow | Fastest | Medium |
| HMR | Slow | Fastest | Fast |
| Production Build | Slow | Fast | Fastest |
| Ecosystem | Largest | Medium | Large |
| Config Complexity | High | Medium | Low |
| Migration Cost (from webpack) | N/A | Low | Medium–High |
| Microfrontend Support | Strong | Strong | Weak |
| New Project Suitability | Medium | High | Very High |

---

## 5.2 Key Insight

- **Rspack = best incremental upgrade**
- **Vite = best modern default**
- **Webpack = safest legacy baseline**

---

# 6. Migration Strategy

## 6.1 Migration to Rspack

### Feasibility: High

### Benefits

- Minimal architectural change
- Maintains SystemJS compatibility
- Significant performance gains

### Risks

- Plugin compatibility gaps
- Cache stability considerations

### Recommended Approach

1. Audit current webpack config
2. Pilot migration on one application
3. Validate: - SystemJS loading - HMR behavior - asset paths
4. Gradually roll out

---

## 6.2 Migration to Vite

### Feasibility: Medium–Low (for current architecture)

### Key Challenge

Mismatch between:

- Vite → ESM dev model
- Current system → SystemJS + System.register

---

### Migration Options

#### Option A — Preserve current architecture

- Force SystemJS compatibility
- Add bridging layers

→ **High complexity**

---

#### Option B — Redesign architecture

- Move toward native ESM/import maps

→ **Platform-level transformation**

---

### Risks

- Dev/prod inconsistency
- Microfrontend integration issues
- Ecosystem limitations (e.g., plugin maintenance)

---

# 7. Ecosystem & Industry Adoption

## 7.1 Vite

- Weekly downloads: **56M – 120M+**
- Live sites: **2.15M+**
- Widely adopted by major tech companies
- Strong ecosystem (Vitest, Rolldown)

### Conclusion

→ **Industry default for modern frontend**

---

## 7.2 Rspack

- Weekly downloads: **100K+**
- Enterprise usage (ByteDance, Microsoft, Amazon, etc.)
- Internal large-scale production usage

### Conclusion

→ **Enterprise-focused adoption**

---

## 7.3 Ecosystem Comparison

| Dimension | Vite | Rspack |
| --- | --- | --- |
| Community Size | Very Large | Medium |
| Enterprise Adoption | High | Very High |
| Ecosystem Maturity | High | Growing |
| Microfrontend Fit | Medium | Strong |

---

# 8. Final Recommendations

### Short-Term

→ **Adopt Rspack as primary migration target**

- Low risk
- High performance gain
- Preserves architecture

---

### Mid-Term

→ Evaluate Vite for:

- New applications
- Simplified architectures

---

### Long-Term

→ Consider:

- Migration away from SystemJS
- Adoption of modern ESM-based microfrontend patterns
