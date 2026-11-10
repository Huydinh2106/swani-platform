# AI 3 — Tìm kiếm và chi tiết

Phạm vi: `src/features/search/`, `src/features/product/`, route mỏng tương ứng. Dùng [design system](../design-system.md), [Apple UI](../apple-native-ui.md), [skill](../../.agents/skills/expo-design-system/SKILL.md) và [quy trình nhóm](../team-workflow.md).

Search là màn trong root stack (`src/app/search.tsx`), không nằm trong tab bar. Home dùng SearchEntry để mở màn; SearchInput dùng variant chữ `search` tại theme. Giữ URL `/search`, query/category params và hành vi back. Dùng shared SearchInput/Chip/Button/PageHeader, ProductGrid và feedback. Dữ liệu qua hooks; giữ quy tắc tìm kiếm tiếng Việt, filter và sort. Size hiện là minh họa; lưu local, chưa có đặt hàng/tồn kho.

Kính chỉ ở control dùng chung. Kết quả, giá, mô tả và artwork không thành glass card. Dùng native sheet/menu cho bộ chọn mới nếu phù hợp; tích hợp qua shared UI với AI 1. Không sửa navigator để thêm vuốt ngang trang như một cách thay gesture tab.

Nghiệm thu: bàn phím/submit/clear, filter phối hợp, giá tăng dần, empty/reset, missing product, size, lưu/bỏ lưu, back. Test logic search khi đổi hành vi; UI theo [kiểm tra native](../native-ui-validation.md). Không hạ chất lượng typography để ép chip vào một hàng.
