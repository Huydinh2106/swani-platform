# Hợp đồng dữ liệu hiện tại

Nguồn chuẩn cho kiểu dữ liệu của app là [src/contracts/catalog.ts](../src/contracts/catalog.ts). UI tuân thủ [design system](design-system.md) với cả hai nguồn dữ liệu.

Luồng dữ liệu đi từ feature qua [use-catalog](../src/hooks/use-catalog.ts) và [catalog repository](../src/services/catalog-repository.ts) đến fixture hoặc [adapter Supabase](../src/services/supabase-catalog.ts). Adapter đọc view `catalog_products` và bảng `brands`, `stores` qua Data API khi đã cấu hình Project URL và khóa publishable. Hook dùng chung cache catalog và lọc trên dữ liệu đã tải để giữ tìm kiếm tiếng Việt không dấu.

| Kiểu              | Nội dung                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| Product           | ID, brandId, tên, giá nguyên VND, category, color, sizes, tags, description, storeIds |
| Brand             | ID, name, handle, tagline                                                             |
| Store             | ID, brandId, name, address, latitude, longitude, hours                                |
| SearchFilters     | query, category, maxPriceVnd, sort featured/price-asc                                 |
| CatalogRepository | listProducts, getProduct, listBrands, listStores — Promise                            |

`getProduct` trả `undefined` khi không tìm thấy. Hook chuyển kết quả đó thành `null`. ID là string. Seed Cloud dùng cùng ID với fixture. Saved/followed trên app vẫn dùng AsyncStorage. Backend đã có bảng tương ứng với RLS theo tài khoản Supabase Auth.

Xem [hướng dẫn backend](../backend/README.md) để triển khai migration, seed và Edge Function. Các luồng đăng nhập app, GPS, bản đồ nhúng, Instagram và AI import chưa triển khai. Dữ liệu mẫu giữ nhãn demo. Secret server thuộc môi trường quản trị.
