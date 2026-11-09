# Đóng góp

Đọc [cách làm việc của nhóm](docs/team-workflow.md), [hệ giao diện](docs/design-system.md) và task được giao.

1. Cập nhật main, tạo branch tính năng riêng.
2. Hoàn thiện một thay đổi nhỏ, chạy `npm run check`.
3. Tạo PR theo template, kèm ảnh nếu thay đổi giao diện.
4. Nhờ người phụ trách review shared code. Tự thử sản phẩm do AI viết trước khi yêu cầu merge.
5. Merge qua GitHub, đồng bộ main với các nhánh còn lại.

Repo hiện chưa có danh sách GitHub handle. Điền `.github/CODEOWNERS` và cấu hình branch protection sau khi tạo repository. Tránh push thẳng main sau lần push khởi tạo.
