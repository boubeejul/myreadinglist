import './style/App.css'
import { Input } from './components/Input/Input'
import { useRef, useState } from 'react'
import { Book } from './types/model'
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { List } from './components/List/List'

function App() {

  const [toReadList, setToReadList] = useState<Book[]>([])
  const [hasReadList, setHasReadList] = useState<Book[]>([])
  const newBookInput = useRef<string>("")


  const newBookName = (name: string) => {
    newBookInput.current = name
  }

  const handleAddBook = () => {
    if (newBookInput.current) {
      setToReadList([...toReadList,
      {
        id: Date.now(),
        name: newBookInput.current
      }
      ]);

      newBookInput.current = ""
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination)
      return

    if (destination.index === source.index && destination.droppableId === source.droppableId)
      return

    let add;
    let updatedToReadList = toReadList
    let updatedReadList = hasReadList

    if (source.droppableId == "To Be Read") {
      add = updatedToReadList[source.index]
      updatedToReadList.splice(source.index, 1)
    }
    else {
      add = updatedReadList[source.index]
      updatedReadList.splice(source.index, 1)
    }


    if (destination?.droppableId == "To Be Read")
      updatedToReadList.splice(destination.index, 0, add)
    else
      updatedReadList.splice(destination.index, 0, add)

    setToReadList(updatedToReadList)
    setHasReadList(updatedReadList)
  }

  return (
    <>
      <header>
        <h1>My Reading List</h1>
      </header>

      <div className="book-input-wrapper">
        <Input setNewBookName={newBookName} handleAddBook={handleAddBook} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <main>
          <List
            title="To Be Read" 
            bookList={toReadList} 
            setBookList={setToReadList}
          />
          <List
            title="Read" 
            bookList={hasReadList} 
            setBookList={setHasReadList}
          />
        </main>
      </DragDropContext>
    </>
  )
}

export default App
