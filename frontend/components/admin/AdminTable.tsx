'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Field = {
  key: string;
  label: string;
  type: string;
  label_zh?: string;
  options?: { value: string; label: string }[];
  optionsUrl?: string;
  optionsLabel?: string;
  required?: boolean;
  placeholder?: string;
};

type Entity = {
  id: number;
  [key: string]: any;
};

type Column = {
  key: string;
  label: string;
  render?: (v: any, row: Entity) => React.ReactNode;
};

type Props = {
  title: string;
  apiPath: string;
  fields: Field[];
  columns: Column[];
};

export default function AdminTable({ title, apiPath, fields, columns }: Props) {
  const [items, setItems] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Entity | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, any[]>>({});
  const router = useRouter();

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => { loadItems(); }, [loadItems]);

  // Load dynamic options for select fields
  useEffect(() => {
    const urls: string[] = [];
    fields.forEach(f => { if (f.optionsUrl && !dynamicOptions[f.key]) urls.push(f.optionsUrl); });
    if (urls.length === 0) return;
    urls.forEach(url => {
      fetch(url).then(r => r.json()).then(data => {
        const key = fields.find(f => f.optionsUrl === url)?.key;
        if (key) setDynamicOptions(prev => ({ ...prev, [key]: Array.isArray(data) ? data : [] }));
      }).catch(() => {});
    });
  }, [fields]);

  function openAdd() {
    setEditItem(null);
    const init: Record<string, any> = {};
    fields.forEach(f => { init[f.key] = f.type === 'checkbox' ? false : ''; });
    setForm(init);
    setError('');
    setShowModal(true);
  }

  function openEdit(item: Entity) {
    setEditItem(item);
    const init: Record<string, any> = {};
    fields.forEach(f => {
      init[f.key] = f.type === 'checkbox' ? !!item[f.key] : (item[f.key] ?? '');
    });
    setForm(init);
    setError('');
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editItem ? `${apiPath}?id=${editItem.id}` : apiPath;
      const method = editItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setShowModal(false);
        loadItems();
      } else {
        setError(data.error || '保存失败');
      }
    } catch {
      setError('网络错误');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Entity) {
    if (!confirm(`确定删除「${item.name_zh || item.name_en || item.id}」？`)) return;
    await fetch(`${apiPath}?id=${item.id}`, { method: 'DELETE' });
    loadItems();
  }

  function setField(key: string, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={openAdd}
          className="bg-[#006994] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a7f] transition-colors"
        >
          + 新增
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">暂无数据，点击右上角新增</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600">{col.label}</th>
                ))}
                <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-gray-800">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="text-[#006994] hover:underline mr-3">编辑</button>
                    <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editItem ? '编辑' : '新增'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}
              
              {fields.map(field => {
                if (field.type === 'text' || field.type === 'text_zh' || field.type === 'text_en') {
                  return (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}{field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        value={form[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] outline-none"
                      />
                    </div>
                  );
                }
                if (field.type === 'number') {
                  return (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type="number"
                        value={form[field.key] || ''}
                        onChange={e => setField(field.key, Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] outline-none"
                      />
                    </div>
                  );
                }
                if (field.type === 'textarea') {
                  return (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <textarea
                        value={form[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] outline-none resize-none"
                      />
                    </div>
                  );
                }
                if (field.type === 'checkbox') {
                  return (
                    <div key={field.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={field.key}
                        checked={!!form[field.key]}
                        onChange={e => setField(field.key, e.target.checked)}
                        className="w-4 h-4 text-[#006994]"
                      />
                      <label htmlFor={field.key} className="text-sm text-gray-700">{field.label}</label>
                    </div>
                  );
                }
                if (field.type === 'select') {
                  const opts = dynamicOptions[field.key] || field.options || [];
                  return (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <select
                        value={form[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] outline-none"
                      >
                        <option value="">请选择</option>
                        {opts.map((opt: any) => (
                          <option key={opt.id || opt.value} value={String(opt.id || opt.value)}>
                            {opt.name_zh || opt.label || opt.name_en || String(opt)}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                return null;
              })}

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#006994] text-white rounded-lg hover:bg-[#005a7f] transition-colors disabled:opacity-50">
                  {saving ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
