# AI 1 — UI nền tảng và tích hợp

Phạm vi từng lần do người dùng giao. Dùng [design system](../design-system.md), [Apple UI](../apple-native-ui.md), [skill local](../../.agents/skills/expo-design-system/SKILL.md) và [quy trình nhóm](../team-workflow.md).

## Trách nhiệm

Theme, `src/components/ui/`, shared domain UI, navigation components, root/tab layouts và gallery. Giữ mobile NativeTabs, SF Symbols, font hệ thống, custom GlassSurface đúng lớp và fallback. Review shared UI cho AI 2–5; không tự mở rộng task thành làm lại mọi màn.

## Hướng cải thiện khi được giao

- Hiệu chỉnh typography tập trung ở `src/theme/index.ts` theo độ đọc HIG, chữ Việt và text scaling; không để các feature tự chỉnh font.
- Native header/toolbar, sheet/menu và SF adapter chỉ chuyển đổi có chủ đích; tránh lặp PageHeader/header hoặc phá icon domain.
- Chuẩn hóa states/spacing/contrast của shared controls, giữ native gestures và inset.
- Khi có API/variant mới, cập nhật gallery và tài liệu dùng chung; không dựng một hệ theme thứ hai.

## Nghiệm thu

`npm run check`, export theo loại thay đổi, kiểm tra [native](../native-ui-validation.md). Khi đổi navigator: full Reload Expo Go, chạm và kéo tab hai chiều; ghi bằng chứng đúng thiết bị, không khẳng định smooth/FPS bằng screenshot. Thay đổi docs-only không cần mở thiết bị.
