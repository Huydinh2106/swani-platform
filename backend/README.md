# Backend — chưa triển khai

Starter chạy bằng fixture; thư mục này dành cho task AI 5. Chưa có tài nguyên cloud được tạo, chưa có database/migration được áp dụng, chưa có API AI hoặc Instagram thật.

Đọc [hợp đồng dữ liệu](../docs/backend-contract.md) và [task AI 5](../docs/tasks/05-brand-backend.md). Khi triển khai, commit migration và cấu hình có thể tái tạo môi trường thử; giữ credential ở nơi quản lý secret. Không commit service_role, password DB, Instagram token hay AI API key. RLS và phân quyền phải có kiểm thử với ít nhất hai người dùng và hai brand.
