# Hợp đồng dữ liệu hiện tại

Nguồn chuẩn là [src/contracts/catalog.ts](../src/contracts/catalog.ts); tài liệu này không tạo API hoặc backend mới. UI tuân thủ [design system](design-system.md) dù dữ liệu đến từ fixture hay backend.

Luồng: feature → [use-catalog](../src/hooks/use-catalog.ts) → [catalog repository](../src/services/catalog-repository.ts) → fixture hiện tại hoặc adapter được triển khai sau. Không gọi backend riêng từ card hoặc bypass hooks để vẽ màn.

| Kiểu              | Nội dung                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| Product           | ID, brandId, tên, giá nguyên VND, category, color, sizes, tags, description, storeIds |
| Brand             | ID, name, handle, tagline                                                             |
| Store             | ID, brandId, name, address, latitude, longitude, hours                                |
| SearchFilters     | query, category, maxPriceVnd, sort featured/price-asc                                 |
| CatalogRepository | listProducts, getProduct, listBrands, listStores — Promise                            |

`getProduct` có thể trả undefined; hook hiện chuyển kết quả đó thành null. Các ID là string, quan hệ fixture phải khớp; không thay cấu trúc này trong task UI không liên quan. Saved/followed hiện thuộc state và AsyncStorage trên thiết bị, chưa có tài khoản hoặc đồng bộ server.

Đổi schema/adapter cần nêu contract trước/sau, cập nhật hooks và caller, kiểm tra search/empty/error/missing product. Auth, GPS, bản đồ nhúng, Instagram/AI import chưa triển khai; không trình bày dữ liệu demo như kết quả tích hợp thật. Secret server không được đưa vào biến public hoặc client. Thực hiện backend/database chỉ khi được giao phạm vi cụ thể.
