# Liquid Glass và font hệ thống

Kiểm tra ngày 10/11/2026 cho app Local Finds ở thư mục gốc repository.

## Cập nhật thanh tab native

Theo yêu cầu chỉnh lại, thanh tab mobile đã chuyển từ JavaScript Tabs có nền `GlassSurface` sang `NativeTabs` của Expo Router SDK 58. iOS sử dụng thanh tab hệ thống (UIKit), SF Symbols và hiệu ứng Liquid Glass do iOS 26+ dựng. Tương tác kéo/chọn mục trên thanh tab giao cho hệ thống; không có lớp Pressable hoặc pan gesture tự viết che lên thanh tab native. `minimizeBehavior="onScrollDown"` bật thu gọn khi cuộn xuống. Đây là kéo trên thanh tab, không phải cử chỉ vuốt ngang nội dung màn hình.

Các file của lần sửa này:

- `src/components/navigation/app-tabs.tsx`: NativeTabs cho iOS/Android, đủ 5 route cũ và giữ thứ tự mục.
- `src/components/navigation/app-tabs.web.tsx`: chuyển bản tab tùy biến trước đó sang web; ảnh web bên dưới chỉ minh họa bản này.
- `src/app/(tabs)/_layout.tsx`: route mỏng dùng component tab theo nền tảng.
- `src/app/_layout.tsx`: ThemeProvider nền sáng cùng màu app để tránh nháy nền khi đổi tab.
- `src/components/ui/screen.tsx`: bỏ chiều cao tab cố định trên mobile; NativeTabs xử lý inset của ScrollView/FlatList. Giữ wrapper không collapsable để iOS nhận ra ScrollView.
- `README.md` và tài liệu này: cập nhật cách hoạt động và giới hạn kiểm tra.

Tương tác kéo trên thanh tab đã được kiểm tra trực tiếp qua iPhone Mirroring, như ghi nhận bên dưới. Thu gọn khi cuộn vẫn chưa được kiểm tra trên native. Không cần dependency mới cho giao diện.

Sau lần chuyển sang NativeTabs: `npm run check` và cả ba lệnh export web/iOS/Android đều đạt. Đã mở lại bản web mới, chuyển Khám phá → Tìm kiếm tại viewport 390 × 844 và kiểm tra bố cục: [ảnh bản web sau khi tách native](baselines/native-tabs-web-fallback-390.jpg).

## Kiểm tra iPhone và dọn công cụ simulator

Ngày 10/11/2026, sau khi người dùng khởi động lại Mac, đã kết nối và thao tác trực tiếp qua iPhone Mirroring:

- Mở Expo Go → app Local Finds, SDK 58.0.0.
- Ban đầu màn hình vẫn hiển thị navigator cũ dù Metro đã có module NativeTabs mới. Dùng Reload trong menu Expo Go để tải lại toàn bộ app; sau reload thanh tab native với SF Symbols xuất hiện. Fast Refresh trước đó chưa thay navigator đang được giữ trên thiết bị.
- Kéo trên thanh tab từ Khám phá → Đã lưu: màn hình Đã lưu xuất hiện và trái tim được chọn.
- Kéo ngược từ Đã lưu → Khám phá: màn hình Khám phá xuất hiện và biểu tượng nhà được chọn.
- Đã quan sát hiệu ứng kính/khúc xạ của vùng chọn khi kéo. Kiểm tra này xác nhận thao tác chuyển tab hai chiều, không đo FPS hoặc chứng minh không có khựng ở mọi tình huống.

Ảnh chụp cửa sổ iPhone Mirroring, 784 × 1720 px: [tab Đã lưu trên iPhone thật](baselines/native-tabs-iphone-saved.jpg). Nút bánh răng xanh là công cụ phát triển của Expo Go.

Theo yêu cầu người dùng, đã gỡ `expo-device-hub`, xcodes tải trong thư mục công cụ riêng, tệp tải/catalog tạm và bản EAS CLI 27.4.1 trong cache npx. Không có runtime hoặc thiết bị simulator local nào được cài; không có phiên simulator cloud nào được khởi chạy. Đã bỏ liên kết EAS thử nghiệm khỏi `app.json`; project Expo trống tạo để kiểm tra quyền cloud vẫn tồn tại trên tài khoản, chưa có build hoặc phiên simulator. `package.json`, `package-lock.json` và `app.json` đã trở lại như trước bước thiết lập simulator. `npm run check` và các export web/iOS/Android sau khi gỡ đều đạt.

## Thay đổi

- `src/components/ui/glass-surface.tsx`: bề mặt dùng chung và provider kiểm tra cả hai API khả dụng; đọc và theo dõi Reduce Transparency. Dùng nền đặc trước khi biết tùy chọn trợ năng và trên nền tảng không hỗ trợ.
- `src/theme/index.ts`: token kính và font hệ thống theo nền tảng, giữ các cấp typography hiện có. iOS dùng `system-ui`; Android/web dùng font hệ thống tương ứng.
- `src/app/_layout.tsx`: cung cấp trạng thái kính, bỏ bước chờ tải Be Vietnam Pro; bổ sung theme điều hướng sáng.
- `src/app/(tabs)/_layout.tsx` và `src/components/navigation/app-tabs*`: thanh tab hệ thống trên mobile, tab tùy biến trên web.
- `src/components/ui/screen.tsx`: inset tự động của tab native trên mobile; chừa khoảng cuối nội dung cho thanh tab nổi trên web.
- `src/components/ui/button.tsx`, `icon-button.tsx`, `search-input.tsx`: áp dụng kính cho nút phụ, nút biểu tượng và ô tìm kiếm. Phản hồi nhấn chỉ thay đổi nội dung bên trong bề mặt kính.
- `src/features/home/home-screen.tsx`: bỏ clipping ở khung hero để không cắt viền kính của nút phụ.
- `AGENTS.md`, `README.md`: cập nhật quy ước font và hành vi kính theo yêu cầu mới.
- `tsconfig.json`, `eslint.config.js`, `.prettierignore`: giới hạn kiểm tra app chính, tránh thu thập project con độc lập `swan-platform/`; lint bỏ qua kiểu router tự sinh trong `.expo/`.
- `docs/liquid-glass-validation.md` và các ảnh `docs/baselines/liquid-glass-*.jpg`: ghi nhận kiểm tra lần này.

Không đổi dependency hoặc lockfile; `expo-glass-effect` 58.0.5 đã có sẵn. Không chỉnh project con `swan-platform/`.

## Đã kiểm tra

- `npm run check`: TypeScript, ESLint, quy tắc UI, 8 test và Prettier đều đạt.
- Xuất web: `npm run export:web`.
- Xuất iOS: `npx expo export --platform ios --output-dir .build/ios`.
- Xuất Android: `npm run export:android`.
- Trình duyệt trong ứng dụng, viewport 390 × 844 và 360 × 800 CSS px: kiểm tra trang chủ, thanh tab, ô tìm kiếm và khoảng chừa cuối trang. Nội dung cuối trang chủ ở 360 px không bị thanh tab che.
- Thử tìm `linen` được 2 sản phẩm, xóa từ khóa trở lại 6 sản phẩm; lưu/bỏ lưu; mở chi tiết và quay lại; nút phụ và các trạng thái disabled/loading trong gallery.

## Ảnh kiểm tra web

- [Trang chủ, 390 × 844](baselines/liquid-glass-home-web-390.jpg)
- [Trang chủ, 360 × 800](baselines/liquid-glass-home-web-360.jpg)
- [Tìm kiếm, 390 × 844](baselines/liquid-glass-search-web-390.jpg)
- [Chi tiết sản phẩm, 390 × 844](baselines/liquid-glass-product-web-390.jpg)
- [Component và trạng thái nút, 390 × 844](baselines/liquid-glass-gallery-web-390.jpg)

## Giới hạn

Ảnh web thể hiện nền thay thế đặc, không thể hiện Liquid Glass native. Đã kiểm tra kéo chuyển tab hai chiều trên iPhone thật qua Mirroring. Chưa kiểm tra Android native, thay đổi Reduce Transparency, bàn phím native hoặc hành vi thu gọn tab khi cuộn. Export mobile xác nhận JS/Hermes bundle thành công, không thay thế các kiểm tra runtime còn thiếu.

Tài liệu đối chiếu: [NativeTabs SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/router/native-tabs/), [hướng dẫn native tabs](https://docs.expo.dev/router/advanced/native-tabs/), [Expo GlassEffect SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/glass-effect/), [fontFamily trong React Native](https://reactnative.dev/docs/text-style-props#fontfamily).
