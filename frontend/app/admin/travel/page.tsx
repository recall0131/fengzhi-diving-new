'use client';

import AdminTable from '@/components/admin/AdminTable';

const fields = [
  { key: 'destination_id', label: '关联目的地', type: 'select', optionsUrl: '/api/destinations' },
  { key: 'name_zh', label: '套餐名称（中文）', type: 'text', required: true },
  { key: 'name_en', label: '套餐名称（英文）', type: 'text', required: true },
  { key: 'description_zh', label: '行程描述（中文）', type: 'textarea' },
  { key: 'description_en', label: '行程描述（英文）', type: 'textarea' },
  { key: 'includes_zh', label: '费用包含（中文）', type: 'textarea' },
  { key: 'includes_en', label: '费用包含（英文）', type: 'textarea' },
  { key: 'price', label: '价格（元）', type: 'number', required: true },
  { key: 'duration', label: '行程时长（中文）', type: 'text' },
  { key: 'duration_en', label: '行程时长（英文）', type: 'text' },
  { key: 'hero_image', label: '图片路径', type: 'text' },
  { key: 'featured', label: '推荐', type: 'checkbox' },
  { key: 'sort_order', label: '排序', type: 'number' },
];

const columns = [
  { key: 'name_zh', label: '中文名称' },
  { key: 'name_en', label: '英文名称' },
  { key: 'price', label: '价格' },
  { key: 'duration', label: '时长' },
];

export default function TravelAdminPage() {
  return (
    <AdminTable
      title="潜水旅行管理"
      apiPath="/api/admin/travel"
      fields={fields}
      columns={columns}
    />
  );
}
