# AI 3 — Tìm kiếm và chi tiết

## Phạm vi

`src/features/search/`, `src/features/product/`, route liên quan; tests nghiệp vụ. Contract và adapter thay đổi phải thống nhất với AI 5.

## Đã có

Tìm không dấu theo tên/brand/tag; filter category/giá; sắp xếp giá; chi tiết với size mẫu, lưu và cửa hàng. Logic search có tests.

## Cần làm tiếp

- Thêm giới tính, size/màu/phong cách theo contract đã thống nhất.
- Bộ lọc dạng sheet qua shared component do AI 1 cung cấp.
- Gallery ảnh, size guide, link bài gốc và share; kiểm tra link mở đúng sản phẩm.
- Khi nối mạng: debounce, cancel và phân trang; server filter/sort trước pagination.
- Khoảng cách cần adapter trả về quy tắc xác định; không hardcode số km.
- Chuyển generateStaticParams đang dùng fixture sang chiến lược web phù hợp nếu catalog động. Mobile route vẫn nhận ID động.

## Nghiệm thu

Tìm “ao so mi”/brand/tag có kết quả đúng khi dữ liệu hỗ trợ; filter kết hợp; reset hoạt động; sản phẩm không tồn tại có trạng thái rõ; lưu không kích hoạt nhầm mở card; một kết quả vẫn giữ nửa hàng. Tests, ảnh và check đạt.
