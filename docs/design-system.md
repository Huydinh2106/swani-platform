# Local Finds — hệ giao diện chung

Định hướng đã chốt: **trải nghiệm native theo Apple, ưu tiên iOS 26+ và Liquid Glass**. Mọi AI dùng cùng quy tắc này. Phạm vi tài liệu là app ở `src/` của repository gốc; web quản trị và template con có runtime riêng.

## Nguồn chuẩn

| Nguồn                                                        | Vai trò                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [AGENTS.md](../AGENTS.md)                                    | Quy tắc làm việc và ranh giới tác vụ                                              |
| [Theme](../src/theme/index.ts)                               | Giá trị màu, chữ, khoảng cách, bo góc, kích thước, motion và kính                 |
| [Skill dự án](../.agents/skills/expo-design-system/SKILL.md) | Quy trình chọn thành phần và triển khai                                           |
| [UI native Apple](apple-native-ui.md)                        | Hành vi native, material, icon, fallback và API                                   |
| [Kiểm tra native](native-ui-validation.md)                   | Tiêu chí xác nhận UI trên thiết bị                                                |
| [Gallery](../src/features/design-system/gallery-screen.tsx)  | Đối chiếu component đang có; không chứng minh mọi trạng thái đã đạt accessibility |

Yêu cầu mới của chủ sản phẩm được ưu tiên. Khi thay đổi quyết định chung, cập nhật nguồn chuẩn cùng diff; không để mỗi AI tự chọn phong cách theo screenshot hoặc skill bên ngoài.

## Ngôn ngữ thiết kế

Nội dung sản phẩm là trọng tâm. Điều hướng và hành động nổi ở lớp phía trước; danh sách, mô tả, giá và hình ảnh ở lớp nội dung dễ đọc. Dùng thứ bậc chữ, khoảng trắng và nhóm nội dung thay cho việc đặt mọi phần vào card có bóng. Nội dung tiếng Việt ngắn, rõ; giữ nhãn demo ở thông tin giả lập.

Ưu tiên điều khiển thật của hệ thống: tab native, stack, sheet, menu, picker và toggle. Giữ hành vi chạm, kéo, cuộn, quay lại và bàn phím quen thuộc. Liquid Glass hỗ trợ phân lớp, không thay thế cấu trúc và tính dễ đọc. Cơ sở: [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars).

## Theme và typography

- Duy nhất [src/theme/index.ts](../src/theme/index.ts); đọc giá trị trực tiếp tại đây. Không sao chép một bảng giá trị mới vào feature.
- Giữ palette xanh lá/trắng ngà và light mode hiện tại. Màu thương hiệu dùng làm tint/nhấn; material, kích thước và chuyển động của native chrome do hệ thống quản lý. Đổi palette hoặc thêm dark mode là thay đổi theme chung.
- Custom text dùng `AppText` với các variant hiện có: `display`, `title`, `heading`, `body`, `search`, `label`, `caption`, `eyebrow`, `price`. Input dùng typography token; native controls giữ chữ hệ thống.
- iOS dùng `system-ui` để hệ thống chọn font Apple; Android/web dùng font hệ thống tương ứng. Không đóng gói hoặc tải SF Pro; Be Vietnam Pro còn trong assets lịch sử nhưng không còn là font hoạt động.
- Ưu tiên khả năng đọc. HIG lấy 17 pt làm cỡ mặc định trên iOS và 11 pt làm mốc tối thiểu; các token hiện tại có cỡ nhỏ hơn nên **chưa được coi là bộ type đạt chuẩn Apple hoàn chỉnh**. AI 1 cần hiệu chỉnh cả thang chữ tại theme trong một thay đổi UI có kiểm tra, không tăng/giảm riêng ở từng feature. [Apple Typography](https://developer.apple.com/design/human-interface-guidelines/typography).
- Không tắt text scaling toàn app. Nội dung và nhãn phải tăng chiều cao/wrap khi chữ lớn; không thu nhỏ chữ để ép layout.
- Layout dùng `spacing`, `radius`, `size`, `motion`, `shadows`, `glass`. Custom control có vùng chạm tối thiểu theo `size.touch` (hiện 44). Native controls dùng metric native, không ép vào kích thước tab web.

## Hợp đồng component

| Cần làm                       | Thành phần / nơi sửa                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| Nội dung chữ                  | `AppText`; thay thang chữ ở theme                                                   |
| Hành động chính/phụ/nhẹ       | `Button` với `primary` / `secondary` / `ghost`                                      |
| Quay lại, lưu, nút biểu tượng | `IconButton`, giữ label và selected/disabled state                                  |
| Category, size, bộ lọc        | `Chip`, thể hiện selected bằng nhiều dấu hiệu dễ nhận biết                          |
| Tìm sản phẩm                  | `SearchEntry` mở root Search từ đầu home; `SearchInput` nhập/xóa/submit và bàn phím |
| Tiêu đề màn hiện tại          | `PageHeader`; màn dùng header native thì tránh lặp tiêu đề lớn                      |
| Bố cục và safe area           | `Screen`, không tự cộng chiều cao native tab ở feature                              |
| Product/brand/store           | Component trong `src/components/domain/`                                            |
| Kính tùy biến                 | `GlassSurface` + `GlassProvider`, cùng token/fallback                               |
| Tabs mobile                   | `AppTabs` trong `src/components/navigation/app-tabs.tsx`                            |
| Native form/menu/sheet mới    | Kiểm tra `@expo/ui` hoặc Expo Router; AI 1 tích hợp API dùng chung khi cần          |

Feature chỉ compose các thành phần này. Custom primitive mới cần variants thực tế, states, accessibility và style override cho layout. Tách component khi có vai trò dùng lại rõ ràng; không tạo wrapper chỉ để bọc một native control đã đủ API. Không import raw `Text`/`Pressable`/`TextInput` để dựng lại shared control trong feature.

## Material theo vai trò

| Lớp                                   | Quyết định                                          |
| ------------------------------------- | --------------------------------------------------- |
| Tab bar, toolbar, native navigation   | Native API, material/interaction của hệ thống       |
| Custom control cần nổi lên nội dung   | `GlassSurface`, ưu tiên regular, tương phản rõ      |
| Danh sách, ảnh, mô tả, giá, nền màn   | Bề mặt thường; không phủ Liquid Glass               |
| Không hỗ trợ hoặc Reduce Transparency | Custom surface nền đặc; native chrome theo hệ thống |

Đọc [quy tắc Liquid Glass](apple-native-ui.md) trước khi thêm vị trí kính mới. Hiện ô tìm kiếm, nút phụ và nút biểu tượng đã dùng bề mặt chung; điều đó không cho phép áp kính cho mọi control tương lai.

## Hiện trạng và mục tiêu

NativeTabs và GlassSurface đã có. Đã thử kéo tab hai chiều trên iPhone qua Mirroring; xem [bằng chứng](liquid-glass-validation.md). Bộ typography nhỏ, icon SVG domain, PageHeader tùy biến và các màn hiện có là code để kế thừa có kiểm tra, không phải bằng chứng toàn app đã tuân thủ mọi mục HIG. Hướng cải thiện nằm trong [task AI 1](tasks/01-ui-foundation.md); không tự mở rộng task của AI khác thành redesign.

## Điều kiện bàn giao UI

Cùng token/component, đúng lớp material, đủ trạng thái dữ liệu và không phá luồng chính. Có kiểm tra native đúng hành vi được tuyên bố, ảnh/recording kèm thiết bị và runtime nếu biết, và danh sách giới hạn. Dùng [quy trình native](native-ui-validation.md); check code và ảnh web chỉ là một phần của nghiệm thu.
