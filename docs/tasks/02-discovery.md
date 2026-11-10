# AI 2 — Khám phá

Phạm vi: `src/features/home/` và các route mỏng liên quan khi được giao. Đọc [design system](../design-system.md), [skill](../../.agents/skills/expo-design-system/SKILL.md) và [quy trình nhóm](../team-workflow.md).

Dùng `Screen`, `AppText`, `SearchInput`, `Chip`, `Button`, `SectionHeading`, `ProductGrid`, `BrandRow`; dữ liệu qua hooks catalog. Nội dung sản phẩm ở bề mặt thường, điều khiển dùng material/variant chung. Giữ nhãn dữ liệu mẫu và đường đi đến search/product/brand.

Không sửa theme, navigator, glass provider hoặc nhân bản shared component để đổi riêng phong cách home. Khi cần shared API, phối hợp AI 1 với diff nhỏ. Hero có mục đích nội dung; không thêm gradient/animation chỉ để trang trí.

Nghiệm thu: tìm từ home, chọn category, mở sản phẩm, lưu item, loading/empty/error liên quan, cuộn phần tử cuối không bị tab che. Chạy `npm run check`, export nếu thuộc điều kiện và ghi [bằng chứng native](../native-ui-validation.md) cho UI được sửa.
