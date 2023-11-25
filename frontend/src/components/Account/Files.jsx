import React, { useState, useRef } from 'react'

export const Files = ({ user }) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleOnChange = (e) => {
        setFiles([...e.target.files]);
        console.log([...e.target.files]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newFiles = e.dataTransfer.files;
        if (newFiles) {
            setFiles([...newFiles]);
            // Aquí puedes manejar los archivos arrastrados
        }
    }

    const handleClick = (e) => {
        fileInputRef.current.click();
    }

    return (
        <>
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
            className='flex flex-col justify-center items-center bg-blue-50 border-2 text-blue-300 border-blue-300 hover:bg-blue-100 hover:text-blue-400 hover:border-blue-400 duration-300 cursor-pointer border-dashed h-28 rounded-lg'
        >
            <span htmlFor="files">
                Upload your files here
            </span>
            <input 
                ref={fileInputRef}
                onChange={handleOnChange} 
                name="files" 
                id="files" 
                type="file" 
                className='hidden'
                multiple
            />
        </div>
        <div>
            <h2 className='text-2xl font-bold'>Files:</h2>
            {!user?.documents?.length && <p className='text-gray-400'>There is no files yet.</p>}
        </div>
        </>
    )
}
