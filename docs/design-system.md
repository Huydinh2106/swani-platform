# Hệ giao diện Local Finds

## Nguồn chuẩn

1. Yêu cầu trực tiếp đã thống nhất của nhóm.
2. Tài liệu này và `src/theme/index.ts`.
3. Component trong `src/components/ui` và `src/components/domain`.
4. Màn đã được nhóm duyệt và ảnh baseline.
5. Skill Expo đi kèm: đọc `.agents/skills/expo-design-system/SKILL.md`.

Ảnh `references/user-flow.png` mô tả luồng và nội dung. Theme hiện tại là **đề xuất khởi đầu**, chưa phải thiết kế đã được chủ dự án duyệt. Trước khi chia màn, nhóm chốt Khám phá và Chi tiết; AI 1 cập nhật theme, component và baseline trong một PR. Không để mỗi AI tự chọn một phong cách mới.

## Hướng thẩm mỹ

Ứng dụng khám phá local brand cho người trẻ: ảnh lớn, bố cục thoáng, nền trắng ngà, xanh lá trầm, một màu nhấn xanh non. Nội dung tiếng Việt. Starter chỉ có light mode. Giữ màu thương hiệu cố định giữa nền tảng; không tự chuyển sang dark mode hoặc đổi theo màu hệ điều hành.

- Font Be Vietnam Pro được đóng gói: Regular, SemiBold, Bold. Không dùng `fontWeight` để giả lập độ đậm.
- Lề màn `spacing.xl`; nhịp cơ bản 4 điểm, lấy giá trị từ theme.
- Grid hai cột, khoảng cách `spacing.lg`. Một sản phẩm còn lại vẫn giữ nửa hàng.
- Ảnh card tỷ lệ 0.86; tên tối đa hai dòng. Giá hiển thị đủ bằng `formatVnd`.
- Screen riêng dùng `PageHeader`; tab/navigation do AI 1 quản lý.
- Các phần có nội dung dài được cuộn; không vô hiệu hóa font scaling toàn ứng dụng.
- Icon nằm trong component `Icon`. Không dùng emoji làm icon điều khiển.

## Component công khai

| Component         | Hợp đồng                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `AppText`         | `variant`: display/title/heading/body/label/caption/eyebrow/price; `tone`: khóa trong colors        |
| `Button`          | `variant`: primary/secondary/ghost; disabled/loading/pressed; title/onPress; style chỉ chỉnh layout |
| `IconButton`      | name/label/onPress; selected/disabled; vùng chạm tối thiểu 44                                       |
| `Chip`            | label/selected/onPress/disabled; tự xuống hàng ở container                                          |
| `SearchInput`     | value/onChangeText/onSubmit; nhãn trợ năng và nút xóa                                               |
| `Screen`          | safe area, nền, lề và độ rộng nội dung; `scroll=false` khi con là danh sách cuộn                    |
| `PageHeader`      | title/subtitle/back                                                                                 |
| `ProductCard`     | product/brand/saved/onPress/onToggleSaved; vị trí nút tim thống nhất                                |
| `ProductGrid`     | products/brands; embedded chỉ dùng với section ngắn                                                 |
| `BrandRow`        | brand; theo dõi lưu trên thiết bị qua DemoProvider                                                  |
| `StoreCard`       | store; nhãn tọa độ mẫu và link bản đồ ngoài                                                         |
| `EmptyState`      | title/description/icon/action                                                                       |
| `CatalogFeedback` | loading/error/retry                                                                                 |

## Khi thiếu component hoặc biến thể

Viết nhu cầu, nơi sử dụng và props đề xuất trong PR/issue. Người phụ trách UI bổ sung tại component chung. Không tạo ButtonV2, ProductCardNew hoặc theme thứ hai. Không đổi màu của Button từ màn gọi; bổ sung variant nếu nhu cầu thực tế đòi hỏi.

`npm run check:ui` kiểm tra AST ở `src/features`: chặn primitive tương tác nhập trực tiếp từ React Native, typography viết riêng và một số giá trị style literal. Đây là kiểm tra có phạm vi, **không** phát hiện được mọi cách đi vòng và không thay thế xem giao diện.

## Kiểm tra trước merge

Chụp trên cùng nền tảng, viewport và dữ liệu với baseline; ghi chúng trong PR. Gợi ý: Android 390×844 làm mẫu, thêm 360×800 để tìm lỗi tràn. Chụp từ native build/Expo Go phù hợp; ảnh web hỗ trợ đối chiếu bố cục nhưng không chứng minh hành vi native. Thử font scaling, tên dài, ảnh lỗi, loading, empty, error, bàn phím và vùng chạm. Sửa ở component chung nếu lỗi lặp lại nhiều màn.

Gallery: tab Cá nhân → Xem bộ component chung. Route `/design-system` còn được xuất trên web ở starter; trước bản phát hành cần ẩn hoặc loại bỏ nếu không muốn công khai.
