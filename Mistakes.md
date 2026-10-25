# MISTAKES — Log d'erreurs & corrections

Format : `[YYYY-MM-DD] [Étape X] [Type] — Description → Correction appliquée`.

Types : `HYDRATION` | `RENDER` | `PERF` | `A11Y` | `BUILD` | `TYPE` | `DESIGN` | `LOGIC`.

---

[2026-05-16] [Étape 8] [A11Y] — Portfolio : sous `prefers-reduced-motion`, le pinning GSAP est désactivé et le track horizontal n'est plus translaté. Les cards 2 à 5 sortent du viewport visible (l'overflow `lg:overflow-hidden` du `trackContainer` les masque). Aucun mode de navigation fallback. → **À corriger en V2** : sous reduced-motion ET ≥ 1024px, basculer `lg:overflow-hidden` en `lg:overflow-x-auto` et autoriser le scroll horizontal natif (clavier + souris/trackpad). Garder le pinning désactivé. Solution : ajouter un attribut `data-motion-reduced` sur le wrapper et conditionner l'overflow via CSS.
