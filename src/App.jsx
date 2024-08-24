import React, { useState } from 'react';
import './App.css'

function App() {
  const [dots, setDots] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const colors = [
    '#2c3e50',
    '#34495e',
    '#c0392b',
    '#e74c3c',
    '#27ae60',
    '#3498db',
    '#f39c12',
    '#f1c40f'
  ];

  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  };



  const Click = (event) => {
    const {clientX, clientY} = event;
    setDots([...dots, {x: clientX, y: clientY, color: getRandomColor() }])

    setRedoStack([]);
  }


  const handleUndo = (event) => {
    event.stopPropagation();
    if (dots.length > 0) {
      const newDots = [...dots];
      const lastDot = newDots.pop();
      setDots(newDots);
      setRedoStack([...redoStack, lastDot]);
    }
  };


  const handleRedo = (event) => {
    event.stopPropagation();
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const lastRedoDot = newRedoStack.pop();
      setDots([...dots, lastRedoDot]);
      setRedoStack(newRedoStack);
    }
  };


  const handleReset = (event) => {
    event.stopPropagation();
    setDots([]);
    setRedoStack([]);
  };

  



  return (
    <div onClick={Click} style={{position: 'relative',width: '100vw',height: '100vh',}}>

      <div className='btn-container'>
        <button onClick={handleUndo} disabled={dots.length === 0}>
          Undo
        </button>

        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          Redo
        </button>

        <button onClick={handleReset} disabled={dots.length === 0 && redoStack.length === 0}>
          Reset
        </button>
        
      </div>
      {dots.map((dot, index) => (
        <div key={index} style={{position: 'absolute', left: dot.x, top: dot.y, width: '10px',
            height: '10px',
            backgroundColor: dot.color,
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}

export default App;
