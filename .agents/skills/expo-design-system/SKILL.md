---
name: expo-design-system
description: Implement or review Local Finds UI using its shared theme, Apple-native controls, iOS 26+ Liquid Glass, system fonts and native verification. Use for screens, components, navigation, visual tokens or UI consistency in this repository; not for unrelated projects or backend-only work.
license: MIT
---

# Local Finds — Apple-native design system

This is the project adaptation of Expo's design-system skill. Its job is to keep independent agents building one coherent app. It does not scaffold a replacement app or authorize publishing, cloud spending, external messages or database changes.

Inline code paths refer to the repository root; Markdown links resolve relative to this file. Follow human instructions, then `AGENTS.md`. The canonical visual contract is [docs/design-system.md](../../../docs/design-system.md); actual token values live in `src/theme/index.ts`. Read the existing component and an affected screen before extending either.

## Choose the existing layer

| Work                             | Use / inspect                                                            |
| -------------------------------- | ------------------------------------------------------------------------ |
| Main mobile tabs                 | `src/components/navigation/app-tabs.tsx` using `expo-router/native-tabs` |
| Web preview tabs                 | `src/components/navigation/app-tabs.web.tsx`                             |
| Stack, sheet, toolbar            | Expo Router native APIs matching the installed SDK                       |
| Custom glass control             | `GlassSurface` under the existing root `GlassProvider`                   |
| Text and input                   | `AppText`, `SearchInput`, named theme typography                         |
| Buttons and filters              | `Button`, `IconButton`, `Chip`                                           |
| Native form control/menu         | Check the installed `@expo/ui` API; integrate in shared UI as needed     |
| Product/brand/store presentation | Existing `src/components/domain/` components                             |
| List data                        | `src/hooks/use-catalog.ts`, existing repository contracts                |

For native API choices and material behavior, read [docs/apple-native-ui.md](../../../docs/apple-native-ui.md). For device evidence and stale Expo Go navigation, read [docs/native-ui-validation.md](../../../docs/native-ui-validation.md).

## Implement without drift

- Keep iOS navigation native: system tab-bar shape, selection lens, dragging and SF Symbols. A custom tab row with a GlassView is not the system tab bar.
- Keep glass on important controls/navigation, separate from the content plane. Prefer system material; use the existing custom fallback rather than another glass provider.
- Extend the existing theme and shared component API. Feature files use tokens for layout and shared variants for identity. Do not create a second palette, local font scale or independent button implementation.
- Keep Apple system fonts on iOS and platform fonts elsewhere. Preserve the current brand palette and light-mode brief. Existing small typography must be reviewed centrally for legibility; do not copy it as proof of HIG compliance.
- Custom interactive primitives belong in shared UI: preserve pressed/disabled/loading/selected state, accessibility labels and at least the theme's touch target. Keep foreground press feedback inside a stable glass surface.
- Use native SF Symbols for new iOS chrome, not a new icon library. Preserve existing domain artwork unless the task includes its migration.
- Check both glass availability functions; respect Reduce Transparency and Reduce Motion. Never fade or clip live glass through an ancestor. Don't insert another glass layer over a native tab bar.
- Keep routes thin, platform-specific implementations in components, state/data in their existing layers. Do not restructure the app to fit a generic tutorial.

If a native control already provides the required behavior, use its API rather than recreating the gesture in Reanimated. Consult the relevant Expo skill/documentation for a new motion, routing or native-control API; this local skill remains the authority for project style.

## Verify the requested behavior

Run `npm run check`; export affected platforms when navigation/assets/dependencies change. Follow the native validation guide: verify the current source, fully reload after changing navigators, then exercise the actual flow on iOS 26+. Capture device evidence and state what remains untested. Android and web retain their own platform behavior and fallbacks.

Do not turn this into an unsolicited redesign. Fix observable drift inside the task. If the task is only an audit, report actionable findings; if it asks for implementation, carry the authorized changes through validation.

## Optional reference material

- [references/audit.md](references/audit.md): project audit checks, only for a requested/needed consistency audit. Adapt them to the actual theme; the local workflow above governs implementation.
- [references/native-slop.md](references/native-slop.md): prompts for spotting generic generated UI. Treat them as review aids; Local Finds' declared palette/light mode is intentional.

Upstream origin and adaptation are recorded in [THIRD_PARTY_NOTICES.md](../../../THIRD_PARTY_NOTICES.md). Retain `LICENSE` when sharing this skill. No automatic feedback submission is authorized.
