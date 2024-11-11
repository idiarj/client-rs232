import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [selectedTab, setSelectedTab] = useState('')
  const [inputMessage, setInputMessage] = useState('')
  const [fileNameToDelete, setFileNameToDelete] = useState('')
  const [newFileName, setNewFileName] = useState('')
  const [newFileContent, setNewFileContent] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecciona un archivo primero')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.text()
        setMessage(result)
      } else {
        setMessage('Error al enviar el archivo')
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      setMessage('Error al enviar el archivo')
      console.error('Error:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage) {
      setMessage('Por favor, ingresa un mensaje primero')
      return
    }
  
    try {
      const response = await fetch('http://localhost:3001/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })
  
      if (response.ok) {
        const result = await response.text()
        setMessage(result)
      } else {
        setMessage('Error al enviar el mensaje')
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      setMessage('Error al enviar el mensaje')
      console.error('Error:', error)
    }
  }

  const handleDeleteFile = async () => {
    if (!fileNameToDelete) {
      setMessage('Por favor, ingresa el nombre del archivo a eliminar')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/delete-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: fileNameToDelete }),
      })

      if (response.ok) {
        const result = await response.text()
        setMessage(result)
      } else {
        setMessage('Error al eliminar el archivo')
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      setMessage('Error al eliminar el archivo')
      console.error('Error:', error)
    }
  }

  const handleCreateFile = async () => {
    if (!newFileName || !newFileContent) {
      setMessage('Por favor, ingresa el nombre y contenido del archivo')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/create-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: newFileName, fileContent: newFileContent }),
      })

      if (response.ok) {
        const result = await response.text()
        setMessage(result)
      } else {
        setMessage('Error al crear el archivo')
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      setMessage('Error al crear el archivo')
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>RS232</h1>
      <div>
        <button onClick={() => setSelectedTab('sendMessage')}>Enviar Mensaje</button>
        <button onClick={() => setSelectedTab('sendFile')}>Enviar Archivo</button>
        <button onClick={() => setSelectedTab('deleteFile')}>Eliminar Archivo</button>
        <button onClick={() => setSelectedTab('createFile')}>Crear Archivo</button>
      </div>

      {selectedTab === 'sendMessage' && (
        <div>
          <h2>Enviar Mensaje</h2>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ingrese el mensaje"
          />
          <button onClick={handleSendMessage}>Enviar Mensaje</button>
        </div>
      )}

      {selectedTab === 'sendFile' && (
        <div>
          <h2>Enviar Archivo</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Enviar Archivo</button>
        </div>
      )}

      {selectedTab === 'deleteFile' && (
        <div>
          <h2>Eliminar Archivo</h2>
          <input
            type="text"
            value={fileNameToDelete}
            onChange={(e) => setFileNameToDelete(e.target.value)}
            placeholder="Ingrese el nombre del archivo"
          />
          <button onClick={handleDeleteFile}>Eliminar Archivo</button>
        </div>
      )}

      {selectedTab === 'createFile' && (
        <div>
          <h2>Crear Archivo</h2>
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Ingrese el nombre del archivo"
          />
          <textarea
            value={newFileContent}
            onChange={(e) => setNewFileContent(e.target.value)}
            placeholder="Ingrese el contenido del archivo"
          />
          <button onClick={handleCreateFile}>Crear Archivo</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}

export default App