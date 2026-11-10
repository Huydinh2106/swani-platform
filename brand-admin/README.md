# Web quản lý brand — chỗ dành sẵn

Thư mục này chưa có web app hoặc dependency. Task AI 5 sẽ khởi tạo React + Vite + TypeScript khi nhóm bắt đầu luồng quản trị; việc đó cần thống nhất package/lockfile và cách dùng chung contract trước.

Dùng chung màu và ngôn ngữ thiết kế từ [design system](../docs/design-system.md), dùng font hệ thống của web. Hướng Apple-native/Liquid Glass mô tả app iOS; web admin vẫn dùng control DOM phù hợp, không được gọi CSS blur là kính UIKit. Component React Native và component DOM khác nhau; không import trực tiếp Button native vào Vite. Khi được giao triển khai, chọn bộ component web đã thống nhất và ánh xạ token tương ứng; chưa có lựa chọn thư viện web nào được cài hoặc chốt.

Màn cần có: đăng nhập brand, thông tin/cửa hàng, nhập bài đăng, duyệt draft, danh sách sản phẩm, lịch sử đồng bộ. Đọc [hợp đồng dữ liệu](../docs/backend-contract.md) và [task AI 5](../docs/tasks/05-brand-backend.md).
