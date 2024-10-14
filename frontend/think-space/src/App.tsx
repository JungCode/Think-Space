import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

interface DataType {
  message: string; // Thay đổi theo cấu trúc thực tế của dữ liệu
}
function App() {
  const [count, setCount] = useState(0);
  const[data,setData] = useState<DataType>();
  useEffect(() => {
    axios.get<DataType>('http://localhost:3000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error.message));
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <p>{data?.message}</p>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
