import { useState, useEffect, useCallback } from 'react'

function useFetch(url) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setIsLoading(false)
    setIsError(null)
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    isError,
  }
}

export default useFetch
