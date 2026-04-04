'use client';

import AdminTable from '@/components/admin/AdminTable';

const fields = [
  { key: 'name_zh', label: '装备名称（中文）', type: 'text', required: true },
  { key: 'name_en', label: '装备名称（英文）', type: 'text', required: true },
  { key: 'category_zh', label: '分类（中文）', type: 'text' },
  { key: 'category', label: '分类值', type: 'text' },
  { key: 'description_zh', label: '描述（中文）', type: 'textarea' },
  { key: 'description_en', label: '描述（英文）', type: 'textarea' },
  { key: 'price', label: '售价（元）', type: 'number' },
  { key: 'rental_price', label: '租金/天（元）', type: 'number' },
  { key: 'image', label: '图片路径', type: 'text' },
  { key: 'featured', label: '推荐', type: 'checkbox' },
  { key: 'sort_order', label: '排序', type: 'number' },
];

const columns = [
  { key: 'name_zh', label: '中文名称' },
  { key: 'name_en', label: '英文名称' },
  { key: 'category_zh', label: '分类' },
  { key: 'price', label: '售价' },
  { key: 'rental_price', label: '日租金' },
];

export default function EquipmentAdminPage() {
  return (
    <AdminTable
      title="装备租售管理"
      apiPath="/api/admin/equipment"
      fields={fields}
      columns={columns}
    />
  );
}
