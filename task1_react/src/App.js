import { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { Table } from './components/Table';

function App() {

  const [input, setInput] = useState('')

  return (
    <div className="App">
      <SearchBar input={input} setInput={setInput}/>
      <Table input={input}/>
    </div>
  );
}

export default App;
