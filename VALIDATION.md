# Kiểm tra starter — 09/11/2026

## Đã chạy và đạt

- Cài sạch từ lockfile: `npm ci`.
- TypeScript: `npm run typecheck`.
- ESLint: `npm run lint`, không cho phép warning.
- Quy tắc UI: `npm run check:ui`, kiểm tra 9 file trong features.
- Tests: `npm test`, 8 test đạt; tìm kiếm tiếng Việt, kết hợp filter, giới hạn giá, sort không đổi dữ liệu gốc, quan hệ fixture và phát hiện lệch quy tắc UI.
- Prettier: `npm run format:check`.
- Expo Doctor: 20/20 kiểm tra đạt.
- Expo dependency compatibility: `npx expo install --check`.
- Web static export và các route sản phẩm mẫu.
- Android và iOS JS/Hermes export, có asset font đóng gói.

## Đã thử tương tác trong trình duyệt

- Trang chủ ở viewport 390×844 và 360×800; tab bar có nhãn hiển thị đầy đủ.
- Tìm `so mi` trả hai sản phẩm; giá tăng dần hiển thị 390.000 trước 420.000.
- Từ khóa không tồn tại có empty state; Xóa bộ lọc khôi phục sáu sản phẩm.
- Nhấn tim đổi trạng thái; tab Đã lưu có sản phẩm và giữ card nửa hàng.
- Tải lại toàn bộ app từ trang chủ vẫn giữ sản phẩm đã lưu.
- Mở chi tiết, chọn size M; theo dõi brand và thấy brand ở Cá nhân sau tải lại.
- Mở gallery UI; console không có error trong lượt kiểm tra cuối.

Ảnh ở `docs/baselines/`. Bộ lọc category/giá và dữ liệu biên được kiểm tra bằng unit tests; chưa thử mọi tổ hợp thao tác trên UI.

## Chưa xác minh hoặc chưa triển khai

- Chưa chạy bằng Expo Go, simulator hoặc điện thoại Android/iOS. Export bundle không tương đương build/cài/chạy native.
- Chưa có APK, signing, TestFlight, cloud deployment, GitHub remote hoặc GitHub Actions run.
- Chưa kiểm tra native safe area, bàn phím, accessibility text scaling, GPS và xử lý quyền trên thiết bị.
- Auth/database/Instagram/AI import/push/share và bản đồ nhúng chưa triển khai. Web quản trị mới là thư mục dành sẵn.
- Theme và ảnh baseline là đề xuất ban đầu, cần nhóm chốt trước khi chia màn.
- Test bằng Node có thể in cảnh báo `MODULE_TYPELESS_PACKAGE_JSON` khi nạp các file TypeScript ESM của Expo; test vẫn đạt. Không đổi module configuration chỉ để che cảnh báo khi chưa kiểm tra lại Metro/tooling.
- `npm audit` hiện báo 12 mục moderate, 0 high và 0 critical trong cây dependency Expo/CLI và lint. Một số đề xuất tự động yêu cầu đổi major/hạ Expo SDK; chưa áp `--force` để tránh phá tương thích. Đây không phải báo cáo không có lỗ hổng; rà lại advisory và bản vá tương thích khi cập nhật dependency.

Đây là bộ khung để nhóm tiếp tục phát triển, không phải kết quả nghiệm thu toàn bộ tính năng trong user flow.
