# Kiểm tra UI native

Quy trình này dùng cho UI, navigation, glass và animation; không yêu cầu mở thiết bị cho tác vụ chỉ sửa docs. `npm run check` vẫn cần chạy trước khi kết thúc.

## Xác định app và mã đang chạy

1. Kiểm tra cwd, `package.json`, app config và Metro để chắc đang chạy SWANI ở root, không phải template `swan-platform/`.
2. Dùng Expo Go đúng SDK hoặc development build có native modules tương thích. Đọc phiên bản iOS và khả năng Liquid Glass; không suy ra chỉ từ model iPhone.
3. Sau thay đổi navigator, platform entry hoặc cấu trúc native, chọn **Reload** trong menu Expo Go. Fast Refresh có thể giữ navigator cũ; đóng/mở lại màn không thay cho full reload. Nếu thay native modules/config build, dùng build tương thích mới.
4. Xác nhận màn và bộ icon/tab hiện tại đã xuất hiện trước khi chụp bằng chứng. Không gọi ảnh cache cũ là kết quả code mới.

Đã tái hiện ngày 10/11/2026: iPhone còn giữ tab JavaScript sau Fast Refresh; full Reload làm NativeTabs mới xuất hiện. Sau đó kéo Khám phá ↔ Đã lưu thành công. [Báo cáo và ảnh](liquid-glass-validation.md).

## Thiết bị và công cụ

Ưu tiên thiết bị thật đang có và **iPhone Mirroring** khi hoạt động. Có thể dùng simulator sẵn có. Không coi việc thiếu simulator là lý do bắt buộc cài thêm; không tự cài lại bộ simulator đã được người dùng yêu cầu gỡ. Khi cần công cụ mới hoặc dịch vụ tính phí, dựa trên yêu cầu hiện tại, quyền và giới hạn thực tế; quy trình này không cấp quyền cài/mua tự động.

Quan sát trạng thái UI trước/sau thao tác. Chỉ thao tác trong app/luồng được giao, không mở dữ liệu cá nhân không liên quan. Không chụp notification, màn hình chính hoặc credential vào baseline dự án. Bánh răng/dev menu của Expo Go là công cụ phát triển, không phải thành phần product UI.

## Kiểm tra theo thay đổi

| Thay đổi          | Cần thử trên native                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Tab bar           | Chạm từng tab; kéo vùng chọn qua lại trên thanh; xác nhận màn/selection khớp; giữ state; reselect/scroll nếu liên quan |
| Scroll/insets     | Nội dung cuối và CTA nhìn/chạm được; cuộn sau khi tab thu gọn; cạnh trên/dưới an toàn                                  |
| Custom glass      | Nền sáng/tối hoặc ảnh tương phản; pressed/disabled/loading; Reduce Transparency bật/tắt khi có thể kiểm tra            |
| Text/control      | Tiếng Việt có dấu, chữ dài, text size lớn, label/state đọc được, vùng chạm                                             |
| Input/sheet       | Bàn phím, submit/clear, cuộn đến input, back/dismiss, focus                                                            |
| Animation/gesture | Hai chiều và ngắt thao tác giữa chừng; Reduce Motion; không mất state hoặc giật rõ rệt                                 |
| Dữ liệu           | Loading, empty, error, populated; retry và trạng thái lưu/theo dõi                                                     |

Chỉ chạy các mục liên quan và ghi rõ mục chưa thử. Không tự đổi trợ năng/settings trên thiết bị cá nhân ngoài phạm vi được phép; có thể đánh dấu chưa kiểm tra. Preview web cần thử responsive và hành vi fallback, không thay kiểm tra UIKit.

## Bằng chứng

Với thay đổi giao diện, ghi thiết bị/model nếu biết, OS/version thực đọc được, Expo SDK và Expo Go/development build, viewport hoặc độ phân giải, trạng thái dữ liệu, bước tái hiện và kết quả. Ảnh trước/sau chứng minh hình thức; recording/thử trực tiếp chứng minh tương tác. Đối với cảm giác chuyển động, lấy recording và xem lại nếu công cụ hỗ trợ; không khẳng định 60/120 FPS từ một ảnh hay video đã nén.

Ảnh/video đặt dưới `docs/baselines/` với tên nói rõ native/web, màn và kích thước. Không ghi đè ảnh lịch sử để xóa khác biệt. Báo cáo ngắn trong PR hoặc tài liệu nghiệm thu; [template PR](../.github/pull_request_template.md) là cấu trúc dùng chung.

## Kiểm tra code và export

```bash
npm run check
```

Khi thay navigation/assets/dependencies, chạy web và mobile bị ảnh hưởng:

```bash
npm run export:web
npx expo export --platform ios --output-dir .build/ios
npm run export:android
```

Nếu chỉ ảnh hưởng iOS thì export iOS + web; thay shared component/dependency cho cả mobile thì export cả hai. Export là JS/Hermes/assets, không tạo bản cài và không chứng minh native chạy đúng. Test mới chỉ cần khi có hành vi/logic đáng kiểm tra; không viết test chỉ để so khớp JSX hoặc câu chữ docs.

## Bàn giao

Nêu kết quả, file thay đổi, lệnh đã chạy, môi trường/hành vi thực sự thử, đường dẫn bằng chứng và giới hạn. Khi chưa truy cập được thiết bị, hoàn tất phần kiểm tra độc lập và ghi “chưa xác minh native”; không báo Liquid Glass/gesture đã hoạt động dựa trên web hoặc export.
