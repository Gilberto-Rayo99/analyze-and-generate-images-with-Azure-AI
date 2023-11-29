import React from 'react';

function App() {

  return (
    <>
      <div style={{ flex: 1 }}>
        <h1 type="title" style={{ margin: 20 }}>Computer Vision</h1>

        <div style="flex-direction:column">
          <p>Insert URL or type prompt:</p>

          <input type="text" placeholder='ENTER URL o analye prompt to generate an image'></input>

          <div style={{ "flex-direction": "row", margin: 20 }}>
            <button >
              Analyze
            </button>
            <button>
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
