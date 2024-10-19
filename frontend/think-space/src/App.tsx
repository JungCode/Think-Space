import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import Paragraph from './components/Paragraph';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Landing from './pages/Landing';
import DashBoard from './pages/DashBoard';

interface DataType {
  message: string; // Thay đổi theo cấu trúc thực tế của dữ liệu
}
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<DataType>();
  useEffect(() => {
    axios.get<DataType>('https://think-space-back-end-production.up.railway.app/')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching data:', error.message));
  }, []);
  return (
    <>
      <SignedOut>
        <Landing/>
      </SignedOut>
      <SignedIn>
        <DashBoard/>
      </SignedIn>
    </>
  )
}

export default App
