# Quy trình chung cho 5 người và 5 AI

Tất cả cùng xây một app SWANI theo [design system](design-system.md), [UI Apple](apple-native-ui.md) và [AGENTS.md](../AGENTS.md). Quyết định của chủ sản phẩm là nguồn ưu tiên; vai trò giúp tránh xung đột file, không chia thành năm hệ thiết kế.

## Phạm vi

| Vai trò                               | Công việc chính                                                   | Shared code cần phối hợp                            |
| ------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| [AI 1](tasks/01-ui-foundation.md)     | Theme, native navigation, shared UI, tích hợp và review hình thức | Theme, components, layouts, skill/docs UI           |
| [AI 2](tasks/02-discovery.md)         | Khám phá/home/category                                            | ProductGrid, BrandRow, hooks                        |
| [AI 3](tasks/03-search-product.md)    | Search/filter/product detail                                      | SearchInput, Chip, Button, contract khi thực sự cần |
| [AI 4](tasks/04-map-saved-profile.md) | Stores/saved/profile, state local                                 | StoreCard, Screen, local storage                    |
| [AI 5](tasks/05-brand-backend.md)     | Brand flow, hợp đồng dữ liệu và backend khi được giao             | Contracts, repository, hooks, backend/admin riêng   |

Task của người dùng trong chat xác định việc cần làm lần này. Task file là hướng dẫn phạm vi, không phải lệnh tự triển khai mọi tính năng đang để dành. Thiếu phân vai không ngăn thực hiện yêu cầu cụ thể đã được giao.

## Trước khi code

Đọc README, AGENTS, design system, skill local và task liên quan. Kiểm tra git diff hiện tại, đọc component/API đang dùng và xác định màn/luồng sẽ đổi. Giữ thay đổi người khác; không reset/reformat cả repository hoặc sửa template con `swan-platform/` để làm sạch checks.

Trước API Expo/RN, xác nhận SDK trong package.json rồi đọc tài liệu đúng version. Không lấy import `unstable-native-tabs` hay font/spacing từ một skill cũ làm chuẩn cho SDK 58.

## Khi cần sửa phần dùng chung

Tìm variant/API đã có trước. Nếu thiếu, chuẩn bị thay đổi nhỏ ở đúng shared layer với lý do, màn bị ảnh hưởng và cách kiểm tra; feature gọi API mới thay vì nhân bản control. AI 1 phối hợp review theme/navigation/UI; AI 5 phối hợp contract/data. Việc cần review không tự tạo một vòng xin phép cho thao tác vốn đã được người dùng giao.

Đổi thang chữ, palette, glass provider, navigator hoặc contract phải cập nhật cả nơi dùng và docs liên quan. Không sửa identity cục bộ để vượt qua bất đồng với shared component. Danh sách chênh lệch hiện tại không phải giấy phép làm lại toàn bộ app trong một task tính năng.

## Bàn giao và tích hợp

1. Hoàn thiện luồng và các trạng thái liên quan; dữ liệu giả vẫn có nhãn.
2. Chạy `npm run check`; export theo [quy tắc native](native-ui-validation.md) khi thuộc loại thay đổi cần export.
3. Với UI, thử trên thiết bị, full Reload sau khi đổi navigation, ghi ảnh/recording và giới hạn. Không dùng web để chứng nhận native.
4. Bàn giao diff cụ thể và kết quả. Khi được yêu cầu tạo PR, dùng [template](../.github/pull_request_template.md); không tự push/publish/merge.
5. Người tích hợp xác nhận shared components và docs vẫn có cùng một quyết định thiết kế.

Dùng npm/Node 24 và lockfile chung. Dependency mới phải cần cho task và tương thích SDK; không nâng SDK hoặc áp `npm audit fix --force` để dập cảnh báo. Cloud/build/deploy/database/tin nhắn bên ngoài cần phạm vi được yêu cầu; task file không cấp thêm quyền.

## Lệnh giao việc gợi ý

“Làm [phạm vi cụ thể] theo AGENTS.md, docs/design-system.md và skill expo-design-system trong repo. Dùng native controls iOS 26+, giữ shared theme/components, kiểm tra theo docs/native-ui-validation.md. Bàn giao file thay đổi, kết quả thực tế và phần chưa kiểm tra.”
