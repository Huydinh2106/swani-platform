import { Screen } from '@/components/ui/screen';
import { PageHeader } from '@/components/ui/page-header';
import { AppText } from '@/components/ui/app-text';
import { SectionHeading } from '@/components/ui/section-heading';
export function BrandScreen() {
  return (
    <Screen>
      <PageHeader title="Không gian của brand" back />
      <AppText tone="muted">
        Đây là điểm bắt đầu của luồng brand, chưa phải màn đăng nhập hoặc đồng bộ đã hoàn thành.
      </AppText>
      <SectionHeading title="Phạm vi AI 5" />
      <AppText>01 / Đăng nhập tài khoản brand</AppText>
      <AppText>02 / Quản lý thông tin và cửa hàng</AppText>
      <AppText>03 / Nhập caption, ảnh và link bài đăng</AppText>
      <AppText>04 / Trích xuất, chỉnh sửa và xuất bản sản phẩm</AppText>
      <AppText>05 / Lịch sử đồng bộ và xử lý lỗi</AppText>
      <AppText variant="caption" tone="muted">
        Đọc docs/tasks/05-brand-backend.md và docs/backend-contract.md trước khi triển khai. API
        Instagram thật cần tài khoản và quyền truy cập riêng.
      </AppText>
    </Screen>
  );
}
