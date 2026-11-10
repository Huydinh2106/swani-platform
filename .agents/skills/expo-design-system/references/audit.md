# Audit UI Local Finds

Dùng khi cần kiểm tra drift giữa các màn hoặc task yêu cầu review. Theo [SKILL.md](../SKILL.md); audit-only thì báo finding, implementation task thì sửa phần được giao. Không tự redesign toàn app sau khi thấy một literal.

## Xác định đúng nguồn

App chính: `src/`; theme: `src/theme/index.ts`; shared controls: `src/components/ui/`; mobile tabs: `src/components/navigation/app-tabs.tsx`. Không tính template `swan-platform/`, generated `.expo/` hay output `.build/` là source app chính.

Đọc [design system](../../../../docs/design-system.md), [native implementation](../../../../docs/apple-native-ui.md) và [validation](../../../../docs/native-ui-validation.md). Palette cố định và light mode là brief có chủ đích; không báo chúng là defect chỉ vì khác ví dụ màu semantic/dark mode của upstream.

## Kiểm tra có tín hiệu

```bash
npm run check:ui
rg -n 'fontSize:|fontFamily:|fontWeight:|lineHeight:|letterSpacing:' src/features
rg -n '#[0-9a-fA-F]{3,8}|rgba?\(' src/features src/components
rg -n 'GlassView|GlassContainer|expo-glass-effect|backdrop-filter' src
rg -n 'NativeTabs|tabBarBackground|PanGesture|Gesture\.Pan' src
rg -n 'overflow:|opacity:|allowFontScaling|maxFontSizeMultiplier' src
```

Inspect từng hit trong ngữ cảnh. Glass import ở shared surface là đúng; JS tab ở `.web.tsx` là fallback có chủ đích. Opacity ở foreground control không cùng lỗi với opacity trên glass ancestor; clipping ảnh không cùng lỗi với clipping glass. SVG artwork có màu domain riêng không đồng nghĩa control bypass theme. `check:ui` hiện chỉ phân tích feature files; nó không chứng nhận shared/native material, accessibility hay motion.

## Đối chiếu trên thiết bị

- Hành động chính rõ, text đọc được, tiếng Việt/wrap/chữ lớn không bị cắt.
- Cùng loại control dùng cùng shared variant; native controls giữ hành vi hệ thống.
- Glass phân lớp điều khiển với nội dung; không có glass card/gradient trang trí lấn nội dung.
- Tab mobile là native thật, giữ gesture kéo; full Reload khi đổi navigator.
- Safe area, keyboard, phần tử cuối, data states và state qua chuyển tab.
- Guards/fallback của custom glass, Reduce Transparency/Motion được xử lý; ghi mức kiểm tra thực tế.

## Báo cáo

Mỗi finding nêu file/vị trí, hành vi hoặc tình huống gây lỗi, ảnh hưởng và shared layer cần sửa. Phân biệt lỗi đang quan sát với rủi ro/chưa kiểm tra. Ghi thiết bị/runtime, bước tái hiện và bằng chứng; không chấm điểm “Apple-native” chỉ bằng số grep hit hoặc ảnh web.

Đây là reference đã thích nghi từ audit upstream; xem notices tại root để biết nguồn và license.
