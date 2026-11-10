# Local Finds

Ứng dụng React Native + Expo khám phá local brand, dùng dữ liệu mẫu và bộ giao diện chung cho nhóm 5 người/5 AI. **Hướng thiết kế đã chốt: Apple-native, ưu tiên iOS 26+ và Liquid Glass.** Đây vẫn là starter có chức năng mẫu; auth, backend và các tích hợp chưa hoàn tất.

## Bắt đầu

Dùng Node.js 24 và npm tại thư mục gốc repository:

```bash
npm ci
npm start
```

Mở bằng Expo Go đúng SDK 58 hoặc development build tương thích. Dùng iPhone thật/iPhone Mirroring để kiểm tra UI native; web chỉ là preview:

```bash
npm run web
```

App chính nằm ở `src/` cạnh package.json gốc. `swan-platform/` là template riêng, không phải nơi thực hiện task Local Finds thông thường. Starter không cần `.env` hoặc database; `.env.example` chỉ để dành cho backend tương lai.

## Bộ chỉ dẫn dùng chung

| Tài liệu                                                               | Đọc khi                                                  |
| ---------------------------------------------------------------------- | -------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                                 | Bắt đầu mọi tác vụ                                       |
| [Design system](docs/design-system.md)                                 | Xây/sửa bất kỳ UI nào                                    |
| [Skill expo-design-system](.agents/skills/expo-design-system/SKILL.md) | Chọn component, triển khai và review UI                  |
| [Apple-native UI và Liquid Glass](docs/apple-native-ui.md)             | Navigation, material, icon, typography, native control   |
| [Kiểm tra native](docs/native-ui-validation.md)                        | Xác nhận UI/gesture trên thiết bị và bàn giao bằng chứng |
| [Quy trình nhóm](docs/team-workflow.md)                                | Phạm vi, shared code và tích hợp 5 vai trò               |
| [Hợp đồng dữ liệu](docs/backend-contract.md)                           | Hooks, repository, fixture hoặc backend                  |

Codex đọc AGENTS/skill local; [Claude](CLAUDE.md), [Gemini](GEMINI.md), [Copilot](.github/copilot-instructions.md) và [Cursor](.cursor/rules/local-finds.mdc) có entry point trỏ về cùng bộ quy tắc. Nếu agent không tự nạp skill, đưa đường dẫn SKILL.md trong yêu cầu. Không duy trì một bộ thiết kế riêng cho từng công cụ.

Task theo vai trò:

- [AI 1 — UI nền tảng và tích hợp](docs/tasks/01-ui-foundation.md)
- [AI 2 — Khám phá](docs/tasks/02-discovery.md)
- [AI 3 — Tìm kiếm và chi tiết](docs/tasks/03-search-product.md)
- [AI 4 — Cửa hàng, đã lưu và cá nhân](docs/tasks/04-map-saved-profile.md)
- [AI 5 — Brand và backend](docs/tasks/05-brand-backend.md)

Task file quy định trách nhiệm và tiêu chí; chỉ triển khai phần được người dùng giao. Xem [CONTRIBUTING.md](CONTRIBUTING.md) khi chuẩn bị bàn giao.

## Những quyết định UI đã chốt

Mobile tabs dùng `NativeTabs` từ `expo-router/native-tabs`; iOS 26+ có thanh tab hệ thống với Liquid Glass/SF Symbols và tương tác do UIKit xử lý. Android dùng native tabs của nền tảng; web có component preview riêng. Không thay tab iOS bằng một hàng nút JavaScript có nền kính.

Custom glass dùng `GlassSurface`/`GlassProvider` hiện có, có guard và nền đặc khi không hỗ trợ hoặc Reduce Transparency. Kính tập trung ở functional layer; nội dung sản phẩm giữ bề mặt thường. Font Apple trên iOS và font hệ thống trên nền tảng khác; token chỉ nằm ở `src/theme/index.ts`. Palette xanh lá/trắng ngà và light mode hiện tại vẫn là nhận diện của app.

Sau khi đổi navigator, **Reload toàn bộ app trong Expo Go**; Fast Refresh có thể giữ thanh tab cũ. Đã tái hiện và thử kéo tab hai chiều trên iPhone qua Mirroring: [báo cáo kiểm tra](docs/liquid-glass-validation.md). Việc đó không chứng minh toàn bộ HIG/accessibility hoặc mọi motion đã đạt; các khoảng thiếu được ghi trong design/validation docs.

## Chức năng hiện tại

| Phần                              | Trạng thái                                                      |
| --------------------------------- | --------------------------------------------------------------- |
| Khám phá                          | Home, category, grid sản phẩm và brand mẫu                      |
| Tìm kiếm                          | Không dấu, tên/brand/tag, category, đến 500k, giá tăng dần      |
| Chi tiết                          | Vector artwork, mô tả, chọn size mẫu, lưu, thông tin cửa hàng   |
| Thông báo                         | Màn giữ chỗ; chưa có chức năng thông báo                        |
| Đã lưu/theo dõi                   | Lưu/bỏ lưu sản phẩm bằng AsyncStorage; trang đã lưu chưa có tab |
| Cửa hàng                          | Danh sách, link tọa độ mẫu; chưa GPS/bản đồ nhúng               |
| Cá nhân/brand/gallery             | Màn mẫu và đối chiếu shared components                          |
| Auth/database/Instagram/AI import | Chưa tích hợp                                                   |
| Web quản trị                      | [Thư mục dành sẵn](brand-admin/README.md), chưa có app          |

Brand/sản phẩm/địa điểm/minh họa đều là demo. Tọa độ ở Hà Nội không phải địa chỉ cửa hàng đã xác minh; chưa có tồn kho, giỏ hàng hay thanh toán.

## Cấu trúc

```text
src/app/                    route mỏng và layouts
src/components/navigation/  NativeTabs mobile và web preview
src/components/ui/          typography, controls, Screen, GlassSurface
src/components/domain/      product, brand, store presentation
src/features/               composition theo tính năng
src/theme/                  token duy nhất
src/contracts/              domain và repository types
src/services/               data adapter
src/hooks/                  catalog queries
src/state/                  saved/followed state local
src/fixtures/               dữ liệu mẫu
docs/                       design, native QA, teamwork, tasks và bằng chứng
.agents/skills/             skill dự án dùng chung
scripts/, tests/            kiểm tra code và logic
backend/, brand-admin/      phần dành cho tác vụ tương lai
```

## Kiểm tra và chạy native

```bash
npm run check
npm run export:web
npx expo export --platform ios --output-dir .build/ios
npm run export:android
```

`check` chạy TypeScript, ESLint, quy tắc UI, tests và Prettier. Export mobile kiểm tra JS/Hermes/assets, không tạo bản cài. Xem [quy trình QA](docs/native-ui-validation.md) để chọn kiểm tra đúng thay đổi. [VALIDATION.md](VALIDATION.md) lưu kết quả starter ngày trước; không dùng như báo cáo hiện tại.

`eas.json` có profile preview Android APK; chưa có bản cài store. Build/signing/OTA/deploy chỉ thực hiện khi được giao, sau khi kiểm tra tài khoản/config và giới hạn phù hợp. Không tự cài lại simulator đã gỡ hoặc mở dịch vụ cloud chỉ để thay cho thiết bị đang có.

Skill dự án đã được thích nghi từ Expo; nguồn/license ở [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Giữ license và notices khi chia sẻ starter. Chỉ dẫn kỹ thuật cần đối chiếu SDK hiện tại; việc có cùng skill không thay thế native QA và review.
