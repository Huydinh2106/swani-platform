# Local Finds

Starter React Native + Expo cho nhóm 5 người xây ứng dụng khám phá local brand. Có app chạy với dữ liệu local, bộ giao diện chung, skill Expo được cố định phiên bản, quy tắc cho AI, task và CI để bắt đầu làm chung trên GitHub.

**Đây là bộ khung có chức năng mẫu, chưa phải demo cuối kỳ đã đầy đủ.** Hướng thiết kế xanh lá/trắng ngà là đề xuất ban đầu cần nhóm chốt trước khi mở rộng.

## Chạy lần đầu

Cần Node.js 24.x và npm. Có `.nvmrc` nếu bạn dùng nvm. Chạy các lệnh tại thư mục chứa `package.json`:

```bash
npm ci
npm start
```

Mở bằng Expo Go **hỗ trợ đúng Expo SDK 58** hoặc simulator/development build tương ứng. Nếu Expo Go đang cài chưa hỗ trợ SDK này, không nâng/hạ dependency riêng lẻ: nhóm thống nhất phiên bản Expo Go hoặc dùng development build. Để xem nhanh trên web:

```bash
npm run web
```

Không cần `.env`, database hoặc khóa API để chạy starter. `.env.example` chỉ dành sẵn cho giai đoạn backend, chưa được app sử dụng. Code native được thử trên thiết bị có thể khác web; cần kiểm tra Android/iOS trước khi trình diễn.

## Đã có và chưa có

| Phần                              | Trạng thái                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Khám phá                          | Trang chủ, danh mục, grid, brand mẫu                                              |
| Tìm kiếm                          | Không dấu, theo tên/brand/tag, category, đến 500k, giá tăng dần                   |
| Chi tiết                          | Minh họa vector, mô tả, chọn size mẫu, lưu và thông tin cửa hàng                  |
| Lưu/theo dõi                      | AsyncStorage trên thiết bị; giữ khi tải lại/đóng mở trong cùng môi trường lưu trữ |
| Cửa hàng                          | Danh sách và link mở tọa độ mẫu trên Google Maps                                  |
| Gallery UI                        | Tab Cá nhân → Xem bộ component chung                                              |
| Auth/database                     | Chưa nối; có contract, adapter local và tài liệu backend                          |
| Bản đồ nhúng/GPS/khoảng cách      | Chưa triển khai                                                                   |
| Brand onboarding/Instagram/AI     | Màn định hướng và task; chưa có tích hợp thật                                     |
| Web quản lý brand                 | Thư mục dành sẵn và README; chưa có web app                                       |
| Share/link Instagram/notification | Chưa triển khai                                                                   |

Brand, sản phẩm, địa điểm và minh họa là dữ liệu mẫu. Tọa độ thuộc khu vực Hà Nội để thử link, không phải địa chỉ cửa hàng thật. Không có giỏ hàng/thanh toán trong phạm vi hiện tại.

## Nhóm cần đọc gì?

1. [Quy tắc dành cho AI](AGENTS.md).
2. [Hệ giao diện và component](docs/design-system.md).
3. [Cách làm việc của 5 người](docs/team-workflow.md).
4. [Hợp đồng backend](docs/backend-contract.md).
5. Task theo vai trò:
   - [AI 1 — UI và tích hợp](docs/tasks/01-ui-foundation.md).
   - [AI 2 — Khám phá](docs/tasks/02-discovery.md).
   - [AI 3 — Tìm kiếm và chi tiết](docs/tasks/03-search-product.md).
   - [AI 4 — Bản đồ, lưu và cá nhân](docs/tasks/04-map-saved-profile.md).
   - [AI 5 — Brand và backend](docs/tasks/05-brand-backend.md).

## Skill dùng chung

Skill `expo-design-system` được lưu **đầy đủ trong repo** tại `.agents/skills/expo-design-system/`, gồm các reference và license. Nguồn chính thức: [expo/skills](https://github.com/expo/skills), commit `a9e5bd3fa00b4e61f632e43f85da73aee1942582`. Chi tiết nguồn ở [notices](THIRD_PARTY_NOTICES.md).

Mọi AI phải đọc skill cùng `docs/design-system.md` khi làm UI. Nếu công cụ không tự tìm thư mục skill, đưa đường dẫn vào prompt. Không để mỗi thành viên tự update skill một phiên bản. Chỉ cài cùng skill không bảo đảm giao diện thống nhất: theme, component, ảnh baseline và review mới là nguồn kiểm soát chung.

## Cấu trúc

```text
src/app/               route mỏng và navigation
src/features/          màn hình theo tính năng
src/components/ui/     chữ, nút, chip, input, screen, header
src/components/domain/ product card/grid, brand, store
src/theme/             một nguồn token duy nhất
src/contracts/         kiểu dữ liệu và repository interface
src/services/          adapter catalog local, thay ở đây khi nối backend
src/hooks/             TanStack Query hooks
src/state/             trạng thái lưu/theo dõi local
src/fixtures/          catalog mẫu
docs/                  thiết kế, cách làm nhóm, task và ảnh tham chiếu
scripts/               kiểm tra quy tắc UI
tests/                 logic tìm kiếm, dữ liệu và bộ kiểm tra UI
.github/               CI, PR template, CODEOWNERS cần điền handle
brand-admin/           chỗ dành cho web quản lý
backend/               chỗ dành cho backend
```

## Kiểm tra

```bash
npm run check
npm run export:web
npm run export:android
```

`check` chạy TypeScript, ESLint, kiểm tra quy tắc UI, tests và Prettier. `export:android` chỉ kiểm tra JS/Hermes bundle và asset, **không** tạo APK hay chứng minh app native chạy đúng. CI trên GitHub chạy check và web export.

`npm run format` tự định dạng. `npm run check:ui` phát hiện một số kiểu lệch theme trong feature; không thay thế review ảnh/hành vi. Kết quả kiểm tra starter được ghi tại [VALIDATION.md](VALIDATION.md).

## Đưa lên GitHub

Tạo một GitHub repository trống, không thêm README/license/gitignore từ GitHub. Thư mục này đã có Git và commit starter. Kiểm tra `git status`, sau đó thay URL ví dụ bằng repo thật:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

Nếu đã có remote origin thì kiểm tra `git remote -v` trước, không thêm lần nữa. Mời 4 thành viên còn lại. Điền handle thật trong `.github/CODEOWNERS`, cấu hình review/branch protection nếu gói tài khoản hỗ trợ. File hiện chỉ có ví dụ comment, **chưa áp yêu cầu review**.

Nếu bạn dùng bản ZIP mã nguồn (không chứa `.git`), khởi tạo Git trước các bước thêm remote:

```bash
git init -b main
git add .
git commit -m "feat: initialize Local Finds team starter"
```

Mỗi người clone về, chạy `npm ci`, đọc task và tạo branch riêng. Không cần copy `node_modules`, `.expo` hoặc `.build` lên GitHub. Giữ `package-lock.json`, font, skill và tài liệu trong repo.

## Bản cài để trình diễn sau này

`eas.json` có profile preview Android APK. Nhóm cần tự liên kết Expo project, cấu hình định danh app/signing và đăng nhập tài khoản Expo trước khi build. Profile development còn cần cài `expo-dev-client` bằng `npx expo install expo-dev-client`. Chưa có APK được tạo ở starter này. Trước buổi demo, thử APK độc lập không cần Metro và chuẩn bị video dự phòng.

Ảnh tham chiếu: [user flow ban đầu](docs/references/user-flow.png). Giấy phép font và skill: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
