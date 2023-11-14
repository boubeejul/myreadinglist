import style from "./style.module.css"

interface Props {
    setNewBookName: (name: string) => void,
    handleAddBook: () => void
}

export function Input({ setNewBookName, handleAddBook }: Props) {
    return (
        <>
            <input type="text" name="bookInput" id="bookInput" placeholder="Enter the name of a book" className={style.bookInput}
                onChange={(e) => setNewBookName(e.target.value)} />
            <button className={style.bookInputButton} onClick={handleAddBook}>Add</button>
        </>
    )
}