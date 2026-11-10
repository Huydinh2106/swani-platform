# AI 5 — Brand và dữ liệu

Phạm vi: brand flow, `src/contracts/`, `src/services/`, `src/hooks/`, backend/admin khi được giao cụ thể. Đọc [hợp đồng hiện tại](../backend-contract.md), [design system](../design-system.md), [skill UI](../../.agents/skills/expo-design-system/SKILL.md) nếu đổi màn và [quy trình nhóm](../team-workflow.md).

Giữ screen → hook → repository → data source. Contract là nguồn chuẩn; thay đổi cần cập nhật caller và thử dữ liệu biên, lỗi, missing record. Không đưa khóa server vào app/public env. Nhãn auth/Instagram/AI import/demo phải phản ánh triển khai thật.

Brand screen trong app dùng cùng Apple-native controls, typography và material; không tạo nhận diện riêng cho màn quản trị trong mobile. Web admin là ứng dụng DOM riêng, ánh xạ ngôn ngữ thiết kế; không import component native vào web runtime khác.

Không tạo database/migration, gửi tin nhắn, deploy hoặc publish chỉ vì task file nhắc backend. Khi có yêu cầu triển khai backend, dùng skill phù hợp và phạm vi được giao. Nghiệm thu logic/data, `npm run check`, và [native QA](../native-ui-validation.md) nếu đổi UI.
