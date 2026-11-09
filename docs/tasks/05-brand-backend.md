# AI 5 — Brand, dữ liệu và tích hợp

## Phạm vi

`src/features/brand/`, `src/services/`, `src/contracts/`, `src/hooks/use-catalog.ts`, `brand-admin/`, `backend/`, env/config backend liên quan. Không thay theme/components hoặc package version ngoài phạm vi đã thống nhất.

## Đã có

Interface CatalogRepository, adapter local, hooks Query, contract TypeScript, fixtures và đặc tả backend. Brand route chỉ là màn định hướng. Chưa có backend/cloud resource hoặc migration đã áp dụng.

## Mốc công việc

1. Đọc docs/backend-contract.md, thiết kế schema + RLS và Auth. Dùng Supabase khi nhóm đã có project và env. Không đưa secret vào client.
2. Hoàn thiện adapter catalog, favorites/follows; xử lý lỗi rõ, giữ contract nhất quán.
3. Brand nhập caption/ảnh/link → draft → sửa/duyệt → publish → mobile tìm thấy.
4. Thêm API AI phía server có validation; thiếu dữ liệu để trống, không tự bịa giá/tồn kho.
5. Thử kết nối Instagram sớm bằng tài khoản nhóm kiểm soát. Giữ nguồn dữ liệu mẫu có nhãn. Nếu yêu cầu bắt buộc API thật, mock không thay thế tiêu chí đó.
6. Web quản lý trong brand-admin nếu nhóm chọn làm web. Hiện thư mục này mới có README, chưa phải app đã cài dependency.

## Nghiệm thu

Một sản phẩm mới đi hết luồng publish → tìm thấy. Brand A không sửa dữ liệu Brand B; người dùng chỉ sửa favorites/follows của mình. Có lịch sử import/sync thật khi triển khai. Chạy migration/query tests ở môi trường thử và báo kết quả; không coi TypeScript pass là kiểm thử backend.
