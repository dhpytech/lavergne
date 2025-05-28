'use client'

import { useState, useEffect } from 'react'

const EMPLOYEES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C']
const PRODUCT_CODES = ['P001', 'P002', 'P003']
const CASES = ['Case A', 'Case B', 'Case C']
const STOP_TIMES = ['Machine A', 'Machine B']
const PROBLEMS = ['Problem X', 'Problem Y']

export default function MarisInputPage() {
  const [mainDataRows, setMainDataRows] = useState(4)

  const [formData, setFormData] = useState({
    date: '',
    employee: '',
    shift: '',
    mainData: [],
    stopTimeRows: 2,
    problemRows: 2,
    stopTimes: [],
    problems: [],
    comment: ''
  })

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      mainData: Array.from({ length: 4 }, () => ({
        productCode: '',
        goodPro: '',
        dlnc: '',
        case: '',
        reject: '',
        scrap: '',
        screen: '',
        visslab: ''
      })),
      stopTimes: Array.from({ length: 2 }, () => ({ stopTime: '', hour: '' })),
      problems: Array.from({ length: 2 }, () => ({ problem: '', hour: '' }))
    }))
  }, [])

  const updateFormArray = (type, index, key, value) => {
    const updated = [...formData[type]]
    updated[index] = { ...updated[index], [key]: value }
    setFormData({ ...formData, [type]: updated })
  }

  const handleMainDataRowChange = (count) => {
    setMainDataRows(count)
    const newRows = Array.from({ length: count }, (_, i) =>
      formData.mainData[i] || {
        productCode: '',
        goodPro: '',
        dlnc: '',
        case: '',
        reject: '',
        scrap: '',
        screen: '',
        visslab: ''
      }
    )
    setFormData({ ...formData, mainData: newRows })
  }

  const handleDynamicRowChange = (type, count) => {
    setFormData({
      ...formData,
      [`${type}Rows`]: count,
      [type]: Array.from({ length: count }, (_, i) =>
        formData[type][i] || {
          [type === 'stopTimes' ? 'stopTime' : 'problem']: '',
          hour: ''
        }
      )
    })
  }

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8000/entries/maris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    alert(res.ok ? 'Dữ liệu đã được gửi thành công!' : 'Gửi dữ liệu thất bại.')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Maris Input</h1>

      {/* Trường Chung */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          className="p-2 border rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <select
          className="p-2 border rounded"
          value={formData.employee}
          onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
        >
          <option value="">Chọn nhân viên</option>
          {EMPLOYEES.map((emp) => (
            <option key={emp} value={emp}>{emp}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
        >
          <option value="">Chọn ca</option>
          {['Ca 1', 'Ca 2', 'Ca 3'].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Số dòng Dữ liệu chính */}
      <div>
        <label className="font-semibold">Số dòng dữ liệu chính: </label>
        <select
          className="p-2 border rounded"
          value={mainDataRows}
          onChange={(e) => handleMainDataRowChange(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Dữ liệu Chính */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Dữ liệu Chính</h2>
        {formData.mainData.map((row, idx) => (
          <div key={idx} className="grid grid-cols-8 gap-2">
            <select className="p-2 border rounded" value={row.productCode} onChange={(e) => updateFormArray('mainData', idx, 'productCode', e.target.value)}>
              <option value="">ProductCode</option>
              {PRODUCT_CODES.map((code) => (<option key={code} value={code}>{code}</option>))}
            </select>
            {['goodPro', 'dlnc', 'reject', 'scrap', 'screen', 'visslab'].map((field) => (
              <input key={field} type="number" placeholder={field} className="p-2 border rounded" value={row[field]} onChange={(e) => updateFormArray('mainData', idx, field, e.target.value)} />
            ))}
            <select className="p-2 border rounded" value={row.case} onChange={(e) => updateFormArray('mainData', idx, 'case', e.target.value)}>
              <option value="">Case</option>
              {CASES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        ))}
      </div>

      {/* StopTime */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Stop Time</h2>
        <select className="p-2 border rounded" value={formData.stopTimeRows} onChange={(e) => handleDynamicRowChange('stopTimes', Number(e.target.value))}>
          {[0, 1, 2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n}</option>))}
        </select>
        {formData.stopTimes.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <select className="p-2 border rounded" value={row.stopTime} onChange={(e) => updateFormArray('stopTimes', idx, 'stopTime', e.target.value)}>
              <option value="">Chọn StopTime</option>
              {STOP_TIMES.map((st) => (<option key={st} value={st}>{st}</option>))}
            </select>
            <input type="text" placeholder="Giờ/Thời gian" className="p-2 border rounded" value={row.hour} onChange={(e) => updateFormArray('stopTimes', idx, 'hour', e.target.value)} />
          </div>
        ))}
      </div>

      {/* Problem */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Problem</h2>
        <select className="p-2 border rounded" value={formData.problemRows} onChange={(e) => handleDynamicRowChange('problems', Number(e.target.value))}>
          {[0, 1, 2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n}</option>))}
        </select>
        {formData.problems.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <select className="p-2 border rounded" value={row.problem} onChange={(e) => updateFormArray('problems', idx, 'problem', e.target.value)}>
              <option value="">Chọn Problem</option>
              {PROBLEMS.map((pr) => (<option key={pr} value={pr}>{pr}</option>))}
            </select>
            <input type="text" placeholder="Giờ" className="p-2 border rounded" value={row.hour} onChange={(e) => updateFormArray('problems', idx, 'hour', e.target.value)} />
          </div>
        ))}
      </div>

      {/* Comment */}
      <div>
        <textarea className="w-full p-2 border rounded" rows={3} placeholder="Ghi chú thêm (Comment)" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
      </div>

      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSubmit}>
        Nhập Dữ Liệu
      </button>
    </div>
  )
}
