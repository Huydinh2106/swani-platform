## Vấn đề và hành vi sau thay đổi

Nêu tình huống cụ thể, trước/sau và task liên quan.

## Hệ giao diện chung

- [ ] Theo AGENTS.md, docs/design-system.md và skill local; hoặc không áp dụng vì không đổi UI.
- [ ] Dùng native component đúng nền tảng; mobile NativeTabs giữ hành vi hệ thống.
- [ ] Glass nằm đúng lớp điều khiển/điều hướng; custom glass có guard và fallback trợ năng.
- [ ] Dùng shared token/font/component; ghi rõ shared API hoặc quyết định thiết kế đã thay.

## Kiểm tra

- [ ] `npm run check` đạt.
- [ ] Đã export web/mobile bị ảnh hưởng nếu thay navigation/assets/dependencies.
- [ ] Đã thử luồng chính và loading/empty/error/selected/disabled liên quan.
- [ ] Dữ liệu mẫu và tính năng chưa tích hợp vẫn được ghi rõ.

Liệt kê lệnh và kết quả thực tế; đánh dấu không áp dụng hoặc chưa chạy cùng lý do. Không đánh dấu đạt native chỉ vì export thành công.

## Bằng chứng UI/native

Thiết bị/OS nếu biết, Expo SDK, Expo Go hoặc development build, source/reload, viewport/độ phân giải, dữ liệu và trạng thái. Đính kèm ảnh trước/sau; recording cho nhận định về motion khi có thể. Nếu đổi tab, ghi kết quả chạm và kéo hai chiều trên thanh native sau full Reload. Web preview không chứng minh UIKit Liquid Glass.

Nếu không đổi UI, ghi không áp dụng.

## File dùng chung và giới hạn

Nêu shared component/theme/contract thay đổi, ảnh hưởng và người phối hợp review. Ghi các nền tảng/hành vi chưa thử, rủi ro hoặc phụ thuộc còn lại. Tham khảo docs/native-ui-validation.md.
