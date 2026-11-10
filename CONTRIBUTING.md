# Đóng góp

Mọi thay đổi dùng chung [AGENTS.md](AGENTS.md), [hệ giao diện](docs/design-system.md), [skill UI](.agents/skills/expo-design-system/SKILL.md) và [quy trình nhóm](docs/team-workflow.md). Hướng thiết kế đã chốt là Apple-native iOS 26+ với Liquid Glass.

1. Đọc task và diff hiện tại; giữ thay đổi người khác. Dùng branch tính năng khi công việc Git được giao, không tự reset hoặc chuyển checkout đang dùng.
2. Dùng shared token/component, native navigation và [quy tắc material](docs/apple-native-ui.md). Phối hợp người phụ trách khi thay shared code/contract.
3. Chạy `npm run check`; export khi thay navigation/assets/dependencies. Với UI, dùng [kiểm tra native](docs/native-ui-validation.md), ghi thiết bị và bằng chứng phù hợp hành vi.
4. Bàn giao thay đổi cụ thể. Khi được yêu cầu mở PR, dùng [template](.github/pull_request_template.md), nêu trước/sau và giới hạn; không tự push, publish hay merge.

`.github/CODEOWNERS` hiện chỉ là ví dụ comment. Điền handle thật và cấu hình review/branch protection khi chủ repository giao việc; không coi chúng là cơ chế đang có hiệu lực.
