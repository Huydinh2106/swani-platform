# Backend SWANI trên Supabase

Postgres, Auth, Storage, Data API và Edge Functions chạy trên cùng project Supabase. Mã triển khai nằm trong [supabase/](../supabase/). Catalog trên app đi qua repository và giữ hợp đồng hiện tại.

| Thành phần           | Vai trò                                                                                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Postgres + Data API  | Thương hiệu, cửa hàng, sản phẩm, liên kết sản phẩm với cửa hàng và ảnh. View `catalog_products` trả `store_ids` cho app.                                                               |
| Auth + RLS           | Hồ sơ gắn với `auth.users`. Mỗi tài khoản chỉ đọc và ghi danh sách lưu/theo dõi của mình. Khách chỉ đọc catalog đã xuất bản.                                                           |
| Quản trị thương hiệu | Người đăng nhập tạo thương hiệu nháp bằng RPC và trở thành owner trong cùng giao dịch. Owner thêm/gỡ editor đã có tài khoản bằng ID Auth. Owner/editor quản lý catalog của brand mình. |
| Storage              | Bucket riêng `product-media`, tối đa 5 MiB mỗi ảnh JPEG, PNG, WebP hoặc AVIF.                                                                                                          |
| Edge Function        | `brand-admin` xác thực JWT người dùng và gọi RPC với chính JWT đó.                                                                                                                     |

## Triển khai Cloud

Chạy tại thư mục gốc bằng Node 24. Với project Supabase mới, liên kết đúng project và xem migration trước khi áp dụng.

```sh
npm ci
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push --remote --dry-run
npx supabase db push --remote
npx supabase functions deploy brand-admin --use-api
```

Dùng `npx supabase db push --remote --include-seed` để nạp catalog demo. [Seed](../supabase/seed.sql) có 4 thương hiệu, 6 sản phẩm và 4 cửa hàng hư cấu. ID trùng fixture để các mục lưu trên thiết bị vẫn tham chiếu đúng. Chạy lại seed bỏ qua bản ghi đã tồn tại.

Sao chép [`.env.example`](../.env.example) sang `.env.local`, điền Project URL và khóa `sb_publishable_…` từ hộp thoại **Connect** của project, rồi Reload Expo Go. Để trống cả hai biến khi chạy fixture. Khóa publishable được nhúng vào app, nên quyền truy cập dữ liệu do RLS và các grant SQL quyết định. Mật khẩu Postgres, access token của CLI và secret keys thuộc môi trường quản trị.

## Quản trị và ảnh

Gọi `POST /functions/v1/brand-admin` với header `apikey` là khóa publishable và `Authorization: Bearer <user_access_token>`. Dữ liệu gửi theo một trong hai dạng.

```json
{ "action": "create_brand", "name": "Tên thương hiệu", "handle": "ten-brand", "tagline": "" }
```

```json
{
  "action": "set_brand_editor",
  "brandId": "ID thương hiệu",
  "userId": "UUID người dùng",
  "enabled": true
}
```

Thương hiệu, sản phẩm và cửa hàng có trạng thái `draft`, `published`, `archived`. Catalog công khai yêu cầu cả thương hiệu và nội dung được xuất bản. Thành viên thương hiệu có thể xem bản nháp của mình. Cập nhật quyền editor không thay đổi quyền owner.

Upload ảnh qua Storage API tại `<brandId>/<productId>/<filename>`, rồi thêm hàng tương ứng vào `product_images`. Ảnh đã gắn vào sản phẩm công khai có thể được cấp URL ký thời hạn ngắn. Ảnh nháp chỉ cấp được cho thành viên thương hiệu. Xóa ảnh qua Storage API trước khi gỡ metadata để tránh tệp mồ côi.

## Kiểm thử

`npm run check` kiểm tra repo, chạy migration trên PostgreSQL nhúng, kiểm tra RLS với hai người dùng và hai thương hiệu, và thử adapter cùng Edge Function. Local Supabase đầy đủ có thể chạy bằng `npx supabase start` khi Docker đang hoạt động.

App đọc catalog Cloud sau khi có cấu hình. Đăng nhập trong app, đồng bộ danh sách lưu/theo dõi và hiển thị ảnh từ Storage là các luồng giao diện chưa được kết nối.
