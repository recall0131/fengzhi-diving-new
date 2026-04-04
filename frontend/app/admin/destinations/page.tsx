'use client';

import AdminTable from '@/components/admin/AdminTable';

const fields = [
  { key: 'name_zh', label: '目的地名称（中文）', type: 'text', required: true },
  { key: 'name_en', label: '目的地名称（英文）', type: 'text', required: true },
  { key: 'location', label: '位置（中文）', type: 'text' },
  { key: 'location_en', label: '位置（英文）', type: 'text' },
  { key: 'description_zh', label: '描述（中文）', type: 'textarea' },
  { key: 'description_en', label: '描述（英文）', type: 'textarea' },
  { key: 'hero_image', label: '图片路径', type: 'text' },
  { key: 'featured', label: '首页推荐', type: 'checkbox' },
  { key: 'sort_order', label: '排序', type: 'number' },
];

const columns = [
  { key: 'name_zh', label: '中文名称' },
  { key: 'name_en', label: '英文名称' },
  { key: 'location', label: '位置' },
  { key: 'featured', label: '推荐' },
  { key: 'sort_order', label: '排序' },
];

export default function DestinationsAdminPage() {
  return (
    <AdminTable
      title="目的地管理"
      apiPath="/api/admin/destinations"
      fields={fields}
      columns={columns}
    />
  );
}
