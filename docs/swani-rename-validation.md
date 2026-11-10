# Đổi tên ứng dụng thành SWANI

Ngày 10/11/2026, phạm vi app chính ở root `package.json` và `src/`.

## Thay đổi

- `app.json`: tên SWANI, slug và scheme `swani`.
- `package.json`, `package-lock.json`: package `swani`, giữ nguyên phiên bản dependency.
- `src/features/home/home-screen.tsx`, `src/features/profile/profile-screen.tsx`: tên thương hiệu SWANI.
- `src/app/+html.tsx`: tiêu đề SWANI và ngôn ngữ `vi` cho bản web; giữ head/body nodes theo Expo Router SDK 58.
- `assets/images/swani-mark.svg`, `icon.png`, `favicon.png`: chữ S thay chữ L, giữ màu thương hiệu.
- `src/state/saved-storage.ts`, `demo-state.tsx`, `tests/saved-storage.test.mjs`: ưu tiên dữ liệu `swani:v1`, đọc khóa cũ khi chưa có dữ liệu mới rồi ghi bằng khóa SWANI qua provider hiện có.
- README, AGENTS, CLAUDE, GEMINI, Copilot, skill UI và tài liệu thiết kế/quy trình/kiểm tra: thống nhất tên SWANI. Đổi Cursor rule thành `.cursor/rules/swani.mdc` và cập nhật liên kết.
- Ảnh baseline lịch sử giữ nguyên; tài liệu Liquid Glass có ghi chú phân biệt kết quả trước khi đổi tên.

## Kiểm tra thực tế

- Node 24.15.0; Expo 58.0.23 / React Native 0.88.1.
- `npm run check`: đạt TypeScript, ESLint, UI rules, 12 test và Prettier.
- `npm run export:web`, `npx expo export --platform ios --output-dir .build/ios`, `npm run export:android`: đạt. Bản web được export lại sau khi bổ sung root HTML.
- HTML trang chủ và cá nhân có title SWANI, `lang="vi"` và script bundle.
- Rà tên cũ trong mã/tài liệu app chính: chỉ còn khóa tương thích trong storage helper và test.
- iPhone 13 Pro qua iPhone Mirroring, Expo Go báo SDK 58.0.0: sau full Reload, trang chủ hiện “SWANI, YOUR STYLE”; tab Cá nhân hiện “SWANI / Starter cho nhóm 5 người”; menu Expo Go hiện tên SWANI. Đã quan sát ảnh qua công cụ trong phiên này, không lưu ảnh vào baseline.
- Manifest từ Metro hiện tên SWANI và slug `swani`.

## Giới hạn

Chưa đọc phiên bản iOS thực tế. Chưa kiểm tra Android runtime hoặc tên/icon/scheme trên bản standalone; cần build mới để áp dụng cấu hình native. Không build/deploy/publish trong tác vụ này. Việc đọc dữ liệu cũ được kiểm tra bằng test; chưa tái hiện migration với dữ liệu cũ có sẵn trên iPhone. Không sửa template riêng `swan-platform/`.
