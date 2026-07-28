import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert('수면 고민을 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('REM 수면 상태를 분석하고 있습니다...')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.result)
      } else {
        setResult('오류 발생: ' + (data.error || '분석에 실패했습니다.'))
      }
    } catch (error) {
      setResult('통신 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>REM 수면 분석 및 측정</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="현재 겪고 계신 수면 고민을 자유롭게 적어주세요..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '측정 중...' : '수면 상태 측정하기'}
      </button>
      {result && <div className="result-box">{result}</div>}
    </div>
  )
}

export default App
