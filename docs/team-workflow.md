# Cách làm chung cho 5 người và 5 AI

## Bắt đầu

1. Cả nhóm dùng Node 24, npm và `npm ci`. Commit lockfile; không đổi package manager.
2. Đọc README, AGENTS, design-system và task được giao.
3. Một người nhận vai AI 1: chủ trì giao diện và tích hợp. Chốt hai màn chuẩn trước khi mở rộng.
4. Mỗi người clone repo ở máy mình, làm branch riêng từ main mới nhất. Nếu nhiều AI cùng chạy trên một máy, dùng checkout/worktree riêng.
5. Tạo PR nhỏ theo một task. Mọi thành viên có trách nhiệm chạy app và review kết quả AI.

## Quyền sở hữu đề xuất

| Vai trò | File chính                                                                   | Phối hợp                                           |
| ------- | ---------------------------------------------------------------------------- | -------------------------------------------------- |
| AI 1    | theme, components, layouts, gallery, scripts, CI                             | Duyệt thay đổi giao diện chung; tích hợp hàng ngày |
| AI 2    | features/home                                                                | Khám phá, danh mục, trang brand người dùng         |
| AI 3    | features/search, features/product                                            | Tìm kiếm, bộ lọc và chi tiết                       |
| AI 4    | features/map, features/saved, features/profile, state                        | GPS, bản đồ, lưu/theo dõi và cá nhân               |
| AI 5    | services, contracts, hooks/use-catalog, features/brand, brand-admin, backend | Auth, database, import/AI, đồng bộ và web brand    |

Quyền trên là thỏa thuận làm việc và review, không phải khóa filesystem. `CODEOWNERS` chưa có GitHub handle thực nên chưa yêu cầu review tự động. Điền handle sau khi tạo repo, rồi cấu hình branch protection/ruleset nếu tài khoản hỗ trợ. Chặn push thẳng main, yêu cầu review và CI `quality`. Không cấp bypass đại trà.

## Nhịp làm việc

- Trước task: cập nhật main, tạo branch `feat/03-search-filters` hoặc tên tương đương.
- Khi cần thay contract/component: thống nhất thay đổi nhỏ trước; không sửa âm thầm ở nhiều branch.
- Khi PR đổi shared code merge: báo nhóm bằng kênh nhóm đang dùng; các nhánh cập nhật trước khi tiếp tục. AI không tự gửi tin ra dịch vụ ngoài nếu chưa được yêu cầu.
- PR kèm ảnh trước/sau, bước thử và phần dùng mock. Người khác thử lại luồng chính trước merge.
- Một ngày tích hợp ít nhất một lần. Không đợi đến cuối kỳ mới ghép các nhánh.

## Prompt giao việc cho mọi công cụ AI

```text
Đọc AGENTS.md, docs/design-system.md, docs/team-workflow.md,
.agents/skills/expo-design-system/SKILL.md và docs/tasks/[task của tôi].md.
Đọc code hiện có trước khi sửa. Dùng chung theme, component và contract.
Chỉ sửa phạm vi task. Nếu cần shared code, trình bày thay đổi nhỏ rõ ràng trong PR.
Không tự cài thư viện, đổi theme, cấu trúc route hoặc hợp đồng dữ liệu.
Đọc yêu cầu trực tiếp của người phụ trách để giải quyết xung đột với hướng dẫn chung.
Hoàn thành chức năng, chạy npm run check, chụp màn hình nếu có giao diện,
và báo file đã sửa, cách thử, giới hạn còn lại. Không gọi mock là tích hợp thật.
```

Tên skill giống nhau chưa đủ: cả nhóm dùng **cùng bản skill đã commit**, cùng tài liệu và component. Nếu công cụ không tự đọc AGENTS hoặc `.agents/skills`, đưa các đường dẫn trên vào prompt đầu phiên. Không phụ thuộc cơ chế tự nhận diện của một công cụ.

## Nghiệm thu một task

- Đúng yêu cầu nghiệp vụ và phạm vi file.
- `npm run check` đạt; CI web export đạt.
- Ảnh có viewport, nền tảng, dữ liệu; hành vi được thử trên native khi có thay đổi native.
- Loading/empty/error, text dài và quyền bị từ chối được xử lý theo tính năng.
- Không commit `.env`, token, mật khẩu hoặc generated native folders.
- Component/contract thay đổi có mô tả tác động và người phụ trách review.
