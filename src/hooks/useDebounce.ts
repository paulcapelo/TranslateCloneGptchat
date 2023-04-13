import { useEffect, useState } from 'react'

export default function useDebounce<T> (value: T, delay: 500) {
  const [debounceValue, setdebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(value)
    }, delay)
    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debounceValue
}
