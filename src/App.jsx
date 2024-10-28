import { useState } from 'react'
import './App.css'

function App() {
  const [filePath, setFilePath] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('info')
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFilePath(file.name)
      if(file.name.split('.').pop() !== 'txt'){
        setError('El archivo seleccionado no es un archivo de texto')
        console.log('El archivo seleccionado no es un archivo de texto')
        return
      }
      setError('')
      const reader = new FileReader()
      reader.onload = (e) => {
        setFileContent(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const selectSendFile = () => {
    setSelectedTab('file')
  }

  const selectShowInfo = () => {
    setSelectedTab('info')
  }

  let content
  if (selectedTab === 'file') {
    content = (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button>Enviar</button>
        {filePath && !error ? (
          <div>
            <h3>Archivo seleccionado: {filePath}</h3>
            <pre>{fileContent}</pre>
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    )
  } else {
    content = (
      <div>
        <h3>Información</h3>
        <p>RS-232 es un estándar de comunicación en serie utilizado principalmente para la transmisión de datos entre dispositivos. 
          Fue desarrollado en la década de 1960 y fue ampliamente utilizado en computadoras, terminales y otros dispositivos electrónicos para conectar 
          periféricos como impresoras, módems y equipos de diagnóstico.</p>
      </div>
    )
  }

  return (
    <>
    <h1>RS232</h1>
    <div>Seleccione una opcion</div>
      <section>
        <button onClick={selectSendFile}>Enviar Archivo</button>
        <button onClick={selectShowInfo}>Mostrar Información</button>
        {content}
      </section>
    </>
  )
}

export default App
