'use client'

import { useState } from 'react'

const EMPLOYEES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C']
const PRODUCT_CODES = ['P001', 'P002', 'P003']
const CASES = ['Case A', 'Case B', 'Case C']
const STOP_TIMES = ['Machine A', 'Machine B']
const PROBLEMS = ['Problem X', 'Problem Y']

export default function MarisInputPage() {
  const [formData, setFormData] = useState({
    date: '',
    employee: '',
    shift: '',
    mainData: Array(5).fill({
      productCode: '',
      goodPro: '',
      dlnc: '',
      case: '',
      reject: '',
      scrap: '',
      screen: '',
      visslab: ''
    }),
    stopTimeRows: 0,
    problemRows: 0,
    stopTimes: [],
    problems: [],
    comment: ''
  })

  const updateMainData = (index: number, key: string, value: string) => {
    const updated = [...formData.mainData]
    updated[index] = { ...updated[index], [key]: value }
    setFormData({ ...formData, mainData: updated })
  }

  const updateStopTime = (index: number, key: string, value: string) => {
    const updated = [...formData.stopTimes]
    updated[index] = { ...updated[index], [key]: value }
    setFormData({ ...formData, stopTimes: updated })
  }

  const updateProblem = (index: number, key: string, value: string) => {
    const updated = [...formData.problems]
    updated[index] = { ...updated[index], [key]: value }
    setFormData({ ...formData, problems: updated })
  }

  const handleStopTimeRowChange = (count: number) => {
    setFormData({
      ...formData,
      stopTimeRows: count,
      stopTimes: Array(count).fill({ stopTime: '', hour: '' })
    })
  }

  const handleProblemRowChange = (count: number) => {
    setFormData({
      ...formData,
      problemRows: count,
      problems: Array(count).fill({ problem: '', hour: '' })
    })
  }

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8000/api/maris/input/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert('Dữ liệu đã được gửi thành công!')
    } else {
      alert('Gửi dữ liệu thất bại.')
    }
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
            <option key={emp} value={emp}>
              {emp}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
        >
          <option value="">Chọn ca</option>
          <option value="Ca 1">Ca 1</option>
          <option value="Ca 2">Ca 2</option>
          <option value="Ca 3">Ca 3</option>
        </select>
      </div>

      {/* Dữ liệu Chính */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Dữ liệu Chính</h2>
        {formData.mainData.map((row, idx) => (
          <div key={idx} className="grid grid-cols-8 gap-2">
            <select
              className="p-2 border rounded"
              value={row.productCode}
              onChange={(e) => updateMainData(idx, 'productCode', e.target.value)}
            >
              <option value="">ProductCode</option>
              {PRODUCT_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="GoodPro"
              className="p-2 border rounded"
              value={row.goodPro}
              onChange={(e) => updateMainData(idx, 'goodPro', e.target.value)}
            />
            <input
              type="number"
              placeholder="DLNC"
              className="p-2 border rounded"
              value={row.dlnc}
              onChange={(e) => updateMainData(idx, 'dlnc', e.target.value)}
            />
            <select
              className="p-2 border rounded"
              value={row.case}
              onChange={(e) => updateMainData(idx, 'case', e.target.value)}
            >
              <option value="">Case</option>
              {CASES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Reject"
              className="p-2 border rounded"
              value={row.reject}
              onChange={(e) => updateMainData(idx, 'reject', e.target.value)}
            />
            <input
              type="number"
              placeholder="Scrap"
              className="p-2 border rounded"
              value={row.scrap}
              onChange={(e) => updateMainData(idx, 'scrap', e.target.value)}
            />
            <input
              type="number"
              placeholder="Screen"
              className="p-2 border rounded"
              value={row.screen}
              onChange={(e) => updateMainData(idx, 'screen', e.target.value)}
            />
            <input
              type="number"
              placeholder="Visslab"
              className="p-2 border rounded"
              value={row.visslab}
              onChange={(e) => updateMainData(idx, 'visslab', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* StopTime */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Stop Time</h2>
        <select
          className="p-2 border rounded"
          onChange={(e) => handleStopTimeRowChange(Number(e.target.value))}
        >
          <option value={0}>Số dòng</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {formData.stopTimes.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <select
              className="p-2 border rounded"
              value={row.stopTime}
              onChange={(e) => updateStopTime(idx, 'stopTime', e.target.value)}
            >
              <option value="">Chọn StopTime</option>
              {STOP_TIMES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Giờ/Thời gian"
              className="p-2 border rounded"
              value={row.hour}
              onChange={(e) => updateStopTime(idx, 'hour', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Problem */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Problem</h2>
        <select
          className="p-2 border rounded"
          onChange={(e) => handleProblemRowChange(Number(e.target.value))}
        >
          <option value={0}>Số dòng</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {formData.problems.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <select
              className="p-2 border rounded"
              value={row.problem}
              onChange={(e) => updateProblem(idx, 'problem', e.target.value)}
            >
              <option value="">Chọn Problem</option>
              {PROBLEMS.map((pr) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Giờ"
              className="p-2 border rounded"
              value={row.hour}
              onChange={(e) => updateProblem(idx, 'hour', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Comment */}
      <div>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Ghi chú thêm (Comment)"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />
      </div>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Nhập Dữ Liệu
      </button>
    </div>
  )
}
