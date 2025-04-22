import { useState, useEffect } from 'react'

const Issues = () => {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetch('http://localhost:1234/issues')
      .then(res => res.json())
      .then(data => {
        setIssues(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])
  return (
    <div>{JSON.stringify(issues)}</div>
  )
}

export default Issues
