import { renderHook, act } from '@testing-library/react'
import { useLoading } from '../src/useLoading'

describe('useLoading', () => {
  it('should be work', () => {
    const { result } = renderHook(() => useLoading(false))
    expect(result.current.state.value).toBe(false)
    act(() => result.current.start())
    expect(result.current.state.value).toBe(true)
    act(() => result.current.stop())
    expect(result.current.state.value).toBe(false)
  })
})
