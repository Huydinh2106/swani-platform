# AI 4 — Bản đồ, lưu và cá nhân

## Phạm vi

`src/features/map/`, `src/features/saved/`, `src/features/profile/`, `src/state/`; route liên quan. Shared component và contract cần phối hợp chủ sở hữu.

## Đã có

Danh sách cửa hàng mở tọa độ mẫu trên Google Maps; lưu và theo dõi bằng AsyncStorage; có nhãn lưu trên thiết bị. Chưa có bản đồ nhúng, GPS hoặc Auth.

## Cần làm tiếp

- react-native-maps + expo-location; dùng phiên bản hợp Expo SDK.
- Marker cửa hàng, chọn marker hiện StoreCard, nút chỉ đường và mở bản đồ ngoài.
- Quyền vị trí bị từ chối: cho chọn khu vực; không xin quyền background nếu không cần.
- Tính khoảng cách thật từ vị trí người dùng/khu vực mẫu có nhãn. Phân biệt đường chim bay với quãng đường đi.
- Giữ bản đồ native tách file `.native.tsx`/`.web.tsx` nếu thư viện không hỗ trợ web; web export phải tiếp tục chạy.
- Saved/followed theo tài khoản sau khi AI 5 có Auth; xử lý đăng xuất/đổi tài khoản tránh lộ dữ liệu người trước.
- Gallery và text dài vẫn đúng; kiểm tra bàn phím/safe area trên thiết bị.

## Nghiệm thu

Thử GPS được cấp/từ chối, không có cửa hàng, Maps ngoài không mở được, nhấn lưu liên tục, đóng/mở app, đổi tài khoản khi đã nối Auth. Google Maps phải thử trên APK có cấu hình key, không chỉ trong Expo Go. Check đạt và ghi rõ nền tảng đã thử.
