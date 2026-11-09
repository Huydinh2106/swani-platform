# Hợp đồng backend — kế hoạch triển khai

Starter chưa kết nối Supabase, chưa có schema/migration đã áp dụng và không cần API key. `CatalogRepository` trong `src/contracts/catalog.ts` là interface; `src/services/catalog-repository.ts` hiện dùng dữ liệu local. `use-catalog.ts` là lớp TanStack Query. Khi thay adapter, giữ contract và query keys hoặc cập nhật mọi caller trong cùng PR.

## Kiểu dữ liệu hiện có

- Product: ID, brandId, tên, priceVnd (integer), category, color, sizes, tags, description, storeIds.
- Brand: ID, tên, handle, tagline.
- Store: ID, brandId, tên, địa chỉ, latitude, longitude, hours.
- `color` hiện là khóa bảng màu **minh họa**, không phải toàn bộ mô hình biến thể màu của sản phẩm thật. Mở rộng bằng contract riêng khi thêm ảnh/biến thể.
- `getProduct` trả `undefined` khi không tìm thấy; hook đổi sang `null` để hợp lệ với Query.
- Khoảng cách chưa có trong Product. Khi thêm: quy định rõ mét/km và cửa hàng gần nhất có sản phẩm; chưa có tồn kho thì không khẳng định còn hàng.

## Mô hình dự kiến (chưa thực thi)

profiles → brand_members → brands → products, stores; product_stores liên kết sản phẩm–cửa hàng; favorites(user_id, product_id), follows(user_id, brand_id), imports, sync_runs.

Auth chỉ xác nhận danh tính. Quyền brand dựa trên bảng thành viên do backend kiểm soát, không dựa vào user_metadata tự sửa được. Người dùng chỉ sửa favorites/follows của mình. Người thuộc brand chỉ sửa dữ liệu brand đó. Catalog công khai chỉ đọc sản phẩm đã xuất bản. Bật RLS và test trường hợp người dùng/brand khác nhau; khóa bí mật ở server.

## Các mốc adapter

1. Auth + catalog read; fixture fallback phải hiển thị nhãn rõ và không che lỗi cấu hình thật.
2. Favorites/follows theo tài khoản. Nếu chuyển dữ liệu local vào tài khoản, xin xác nhận hành vi từ nhóm và tránh chuyển sang nhầm tài khoản trên thiết bị chung.
3. Brand nhập caption/ảnh/link → draft → kiểm tra dữ liệu → sửa/duyệt → publish → tìm thấy trên mobile.
4. AI gọi từ server, trả trường thiếu là null, có validation và bước duyệt. Không gọi model mỗi lần tìm kiếm.
5. Instagram thử trên tài khoản nhóm kiểm soát; kiểm tra quyền/API hiện hành. Dữ liệu mẫu và kết nối thật phải phân biệt rõ. Tác vụ lịch chạy phía server và ghi log thật; nút/công tắc UI chưa đủ.

Tìm kiếm khi dùng DB cần chuẩn hóa tiếng Việt và kết hợp filter/sort **trước** phân trang. Dữ liệu local hiện nhỏ nên tìm ngay; khi chuyển sang mạng thêm debounce/cancel và UI giữ kết quả hợp lý. Không tự thêm Elasticsearch, Redis hoặc microservice cho demo.

Không commit SQL giả là migration đã kiểm thử. Khi AI 5 bắt đầu, đọc tài liệu Supabase hiện hành, tạo migration bằng CLI phù hợp phiên bản, áp dụng vào môi trường thử và kiểm tra quyền trước khi nối client.
