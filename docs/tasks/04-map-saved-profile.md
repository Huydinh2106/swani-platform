# AI 4 — Cửa hàng, đã lưu và cá nhân

Phạm vi: `src/features/map/`, `saved/`, `profile/` và state local khi được giao. Đọc [design system](../design-system.md), [skill](../../.agents/skills/expo-design-system/SKILL.md) và [quy trình nhóm](../team-workflow.md).

Dùng Screen/PageHeader/EmptyState/StoreCard và shared controls. Trang cá nhân ưu tiên nhóm nội dung/hành động rõ ràng; form control mới dùng API native phù hợp, không một card kính cho mọi hàng.

Giữ demo stores/coordinates được ghi nhãn. GPS, embedded map, tài khoản và sync server chưa có; không biến link bản đồ mẫu thành tuyên bố định vị thật. Saved/followed giữ state và hydration qua AsyncStorage hiện tại.

Nghiệm thu: empty/populated/error, lưu/bỏ lưu, reload giữ state, theo dõi brand và chuyển tab không mất state, nội dung cuối có thể chạm. Không thay thứ tự tab hoặc màu/type cục bộ. Chạy check và [native QA](../native-ui-validation.md) theo thay đổi.
