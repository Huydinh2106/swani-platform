# Triển khai UI Apple và Liquid Glass

Áp dụng cùng [hệ giao diện chung](design-system.md). Tài liệu mô tả lựa chọn triển khai cho Local Finds; không yêu cầu chuyển dự án sang Swift hay nâng minimum iOS. Baseline hiện tại: Expo SDK 58, React Native 0.88; luôn đọc lại `package.json` trước khi dùng API.

## Chọn đúng API

| Nhu cầu                                 | Lựa chọn                                                                   |
| --------------------------------------- | -------------------------------------------------------------------------- |
| Bốn mục điều hướng chính                | `NativeTabs` từ `expo-router/native-tabs` trên mobile                      |
| Push/back, modal/sheet điều hướng       | Native Stack của Expo Router, options đúng SDK                             |
| Menu, picker, toggle, slider, form ngắn | Kiểm tra `@expo/ui` đã cài; dùng native control có Host theo tài liệu      |
| Catalog dài, nhiều kết quả              | FlatList/FlashList phù hợp; `@expo/ui` List không phải virtualized catalog |
| Custom glass control                    | Shared `GlassSurface` dưới root `GlassProvider`                            |
| Icon iOS trong tab/toolbar              | SF Symbols qua API native; custom shared icon mới xem `expo-symbols`       |
| Hình sản phẩm/brand artwork             | Domain component hiện có; không thay bằng icon hệ thống                    |

Ưu tiên shared component có sẵn. Khi native API phù hợp hơn cho yêu cầu mới, tích hợp nhỏ ở shared UI rồi feature sử dụng. Module SwiftUI/Compose chỉ chạy đúng nền tảng phải nằm trong component platform-specific; không import API iOS-only vào file chạy cả Android/web.

## Thanh tab phải là native

Mobile dùng [app-tabs.tsx](../src/components/navigation/app-tabs.tsx), web dùng [app-tabs.web.tsx](../src/components/navigation/app-tabs.web.tsx); route [layout](<../src/app/(tabs)/_layout.tsx>) chỉ nhập component. Các tab hiện tại: `index`, `stores`, `notifications`, `profile`. Search nằm ở root stack với URL `/search`, mở từ ô tìm kiếm đầu trang chủ; không còn là tab. Chuyển trang bằng native stack, giữ back gesture của hệ thống.

Trên SDK 58, cú pháp là `NativeTabs.Trigger` cùng `.Icon`/`.Label`. Import `unstable-native-tabs` thuộc SDK cũ, không sao chép vào app hiện tại theo trí nhớ. Native tab tự nhận Liquid Glass trên iOS 26+; không cần bọc `GlassView`. [API SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/router/native-tabs/), [hướng dẫn](https://docs.expo.dev/router/advanced/native-tabs/).

Giữ vùng chọn, hình dạng, phản hồi kéo và metric của hệ thống. Không đặt lớp chạm, pan gesture hoặc indicator riêng đè lên native tab. Không đoán chiều cao thanh native bằng `size.tabBar` — token này hiện phục vụ preview web. `minimizeBehavior="onScrollDown"` đang bật; kiểm tra cuộn trước khi thay tùy chọn.

**Kéo trên thanh tab** để chọn mục và **vuốt ngang nội dung trang** là hai hành vi khác nhau. Yêu cầu thứ hai cần quyết định navigation riêng; không thêm pager/gesture vào toàn app chỉ để giả hiệu ứng tab Apple.

Trên iOS 26+, nền tab do hệ thống quyết định theo nội dung. `backgroundColor`, `blurEffect`, `shadowColor` của tab không phải cách ép Liquid Glass mới; một số chỉ ảnh hưởng iOS cũ. Duy trì theme điều hướng phù hợp nền app để tránh nháy nền khi chuyển mục. Giữ tab tĩnh; không thêm/bớt tab theo trạng thái tạm thời rồi làm mất state.

## Kính tùy biến

Đọc [glass-surface.tsx](../src/components/ui/glass-surface.tsx) trước. Nơi dùng không tự tạo provider, listener hoặc wrapper kính thứ hai.

- Chỉ dùng kính cho functional layer: điều hướng hoặc control quan trọng nổi trên nội dung. Bề mặt product card, dòng mô tả, giá và nền màn giữ thường. Theo [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials).
- Dùng `regular` làm mặc định dễ đọc. `clear` cần nền hình/video phù hợp và kiểm tra tương phản; không dùng chỉ để “kính hơn”.
- Chỉ render custom GlassView khi `isLiquidGlassAvailable()` **và** `isGlassEffectAPIAvailable()` thành công. Số phiên bản iOS riêng lẻ chưa đủ để kết luận API/build khả dụng.
- Provider đọc và theo dõi Reduce Transparency. Custom glass dùng nền đặc khi bật tùy chọn này hoặc không đọc được trạng thái. Không thay bằng blur trong Reduce Transparency. Native chrome tự theo trợ năng của hệ thống.
- `interactive` của shared GlassSurface chỉ dành cho control có tương tác; không bật trên nền trang/card. Bề mặt kính giữ ổn định; pressed/disabled feedback thay foreground bên trong.
- Không animate `opacity` của GlassView hoặc ancestor. Khi cần chuyển glass style, dùng API được SDK hỗ trợ. Không đặt `overflow: hidden`/mask ancestor làm cắt rim hoặc vùng kính phồng khi nhấn. Clip ảnh ở container riêng.
- Không lồng nhiều bề mặt kính để tăng độ bóng. `GlassContainer` chỉ có lý do khi nhóm glass controls cần tương tác hòa nhập; AI 1 tích hợp và kiểm tra trước khi nhân rộng.
- Màu kính/tint/fallback lấy từ theme. Không tự tạo CSS `backdrop-filter`, gradient/scrim hoặc SVG refraction rồi gọi đó là native Liquid Glass.

Đối chiếu [GlassEffect SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/glass-effect/) khi thay props/hành vi; không chép ví dụ phiên bản khác.

## Font, icon và control

iOS dùng font Apple qua `system-ui`; web/Android dùng font nền tảng. `fontWeight` đến từ typography token; native label giữ metric native. Đọc [Apple Typography](https://developer.apple.com/design/human-interface-guidelines/typography) và [React Native fontFamily](https://reactnative.dev/docs/text-style-props#fontfamily). Không dùng font tải từ mạng, không thêm tệp SF Pro để cố làm Android giống iOS.

SF Symbols dùng tên đúng API/OS và trạng thái default/selected khi phù hợp. Không dùng emoji hoặc nhiều bộ icon cho cùng loại control. `Icon` SVG hiện có phục vụ code/domain cũ; thay nó bằng SF adapter là một shared migration có kiểm tra, không sửa từng feature tự phát.

Dùng sheet/menu hệ thống cho thao tác chọn hoặc chỉnh ngắn. Native confirmation vẫn thích hợp cho hành động cần xác nhận. Một custom centered web dialog không thay thế hành vi sheet, dismissal và bàn phím native.

## Insets, bàn phím và hiệu năng

NativeTabs tự xử lý inset theo nền tảng: iOS điều chỉnh ScrollView đầu tiên; Android xử lý bottom safe area. Giữ shared Screen nhận diện được ScrollView (`collapsable={false}` ở wrapper hiện tại). Không cộng thêm đáy/chiều cao tab riêng trong từng màn. Nếu thay đổi cấu trúc scroll hoặc dùng màn không cuộn, kiểm tra phần tử cuối, empty state và bàn phím; không giả định auto inset giải quyết mọi layout.

Giữ khu vực nội dung cuối có thể cuộn vào vùng nhìn thấy; không che CTA bằng tab hoặc bàn phím. Kiểm tra back/dismiss và không lặp header native với PageHeader cùng vai trò. Dùng danh sách ảo cho catalog dài, tránh nested list dọc, tránh mount/unmount màn để giả chuyển tab nếu làm mất state.

Animation mới cần phản hồi trực tiếp với thao tác, không bounce trang trí trên mọi phần tử. Dùng motion token, giữ native gesture có sẵn và tôn trọng Reduce Motion. Haptic chỉ khi xác nhận một tương tác có ý nghĩa; không thêm dependency ngoài scope.

## Ma trận nền tảng

| Môi trường                        | Điều được kỳ vọng                                                            |
| --------------------------------- | ---------------------------------------------------------------------------- |
| iOS 26+ với runtime/build phù hợp | NativeTabs + system Liquid Glass; custom glass nếu guard/trợ năng cho phép   |
| iOS cũ còn được app hỗ trợ        | Tab hệ thống của OS đó; custom glass fallback, không giả thiết API 26        |
| Android                           | NativeTabs/Material và control nền tảng; custom glass fallback               |
| Web                               | Preview trong `.web.tsx`; không có tab UIKit hoặc gesture kéo native của iOS |

Không nâng deployment target, chuyển SDK, cài simulator hay mua dịch vụ cloud chỉ để đạt một ảnh giống Apple nếu task chưa cần. Khi cần thiết lập môi trường, dùng phạm vi được người dùng cho phép và báo rõ điều kiện thực tế. Luồng kiểm tra: [native-ui-validation.md](native-ui-validation.md).
