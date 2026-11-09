# AI 1 — Hệ giao diện và tích hợp

## Mục tiêu đầu tiên

Chốt với nhóm hai màn Khám phá và Chi tiết sản phẩm. Dùng starter làm điểm xuất phát, không coi theme đề xuất là đã được duyệt. Sau đó thống nhất component để bốn nhánh còn lại dùng.

## Phạm vi

`src/theme/`, `src/components/`, `src/app/*layout.tsx`, `src/app/(tabs)/_layout.tsx`, `src/features/design-system/`, `docs/design-system.md`, baseline, scripts và CI. Route mới do người làm feature thêm nhưng thay layout cần phối hợp AI 1.

## Công việc

- Duyệt palette, font, card, tab bar và các trạng thái.
- Thay minh họa bằng ảnh mẫu có quyền sử dụng nếu nhóm chọn; thêm placeholder và ảnh lỗi tại component chung.
- Kiểm tra layout trên 390×844, 360×800 và native có font scaling.
- Chụp baseline có nền tảng/viewport/dữ liệu; sửa lỗi chung ở component.
- Điền handle GitHub trong CODEOWNERS, cấu hình review theo khả năng tài khoản.
- Duyệt yêu cầu biến thể từ các feature; merge sớm và giữ gallery cập nhật.

## Nghiệm thu

Nhóm chốt hai màn; docs và code thống nhất; `npm run check` đạt; các ảnh baseline mới được ghi rõ là web hay native. Không tự nâng SDK hoặc thêm UI library trong một PR chỉ sửa giao diện.
