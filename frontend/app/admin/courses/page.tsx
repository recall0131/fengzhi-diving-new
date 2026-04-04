'use client';

import AdminTable from '@/components/admin/AdminTable';

const fields = [
  { key: 'name_zh', label: '课程名称（中文）', type: 'text', required: true },
  { key: 'name_en', label: '课程名称（英文）', type: 'text', required: true },
  { key: 'short_desc_zh', label: '简短描述（中文）', type: 'textarea' },
  { key: 'short_desc_en', label: '简短描述（英文）', type: 'textarea' },
  { key: 'description_zh', label: '详细内容（中文）', type: 'textarea' },
  { key: 'description_en', label: '详细内容（英文）', type: 'textarea' },
  { key: 'level_zh', label: '等级标签（中文）', type: 'text' },
  { key: 'level', label: '等级值', type: 'text' },
  { key: 'price', label: '价格（元）', type: 'number', required: true },
  { key: 'duration', label: '时长（中文）', type: 'text' },
  { key: 'duration_en', label: '时长（英文）', type: 'text' },
  { key: 'hero_image', label: '图片路径', type: 'text' },
  { key: 'featured', label: '首页推荐', type: 'checkbox' },
  { key: 'sort_order', label: '排序', type: 'number' },
];

const columns = [
  { key: 'name_zh', label: '中文名称' },
  { key: 'name_en', label: '英文名称' },
  { key: 'level_zh', label: '等级' },
  { key: 'price', label: '价格' },
  { key: 'duration', label: '时长' },
  { key: 'featured', label: '推荐' },
];

export default function CoursesAdminPage() {
  return (
    <AdminTable
      title="潜水课程管理"
      apiPath="/api/admin/courses"
      fields={fields}
      columns={columns}
    />
  );
}
