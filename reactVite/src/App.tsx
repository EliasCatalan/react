import { useState } from 'react';
import './App.css'
import { Test } from './Components';

function App() 
{
	const [a, setA] = useState(0);
	
	return (
		<>
			<button onClick={() => setA(a + 1) }>Click</button>
			<Test><>{a}</></Test>
		</>
	)
}

export default App
