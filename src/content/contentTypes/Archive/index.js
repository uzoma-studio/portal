import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const StyledArchiveContainer = styled.div`
    margin: 2rem 1rem;
`
const StyledFoldersContainer = styled.ul`

    display: flex;

    li {
        display: flex;
        width: 150px;
        height: 150px;
        justify-content: center;
        align-items: center;
        background: #222;
        border-radius: 5px;
        margin: 0 1rem;
        cursor: pointer;

        &:hover {
            background: #333;
        }
    }
`

const StyledFilesContainer = styled.ul`
    display: flex;
    
    li {
        color: #222;
        margin: 0 1rem;
    }
`

const Archive = ({ data }) => {

    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${data.attributes.DriveID}'+in+parents&fields=files(id,name,mimeType,thumbnailLink,webContentLink)&key=${process.env.GOOGLE_DRIVE_API_KEY}`);
                const driveContent = await response.json();
                setFolders(driveContent.files);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        };
        fetchFolders();

    }, []);
    
    const fetchFilesInFolder = async (folderId) => {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType,thumbnailLink,webContentLink)&key=${process.env.GOOGLE_DRIVE_API_KEY}`);
            const data = await response.json();
            setFiles(data.files);
            // setHistory((prevHistory) => [...prevHistory, { folders, files }]);
            setFolders([]);
        } catch (error) {
            console.error('Error fetching files in folder:', error);
        }
    };

    return (
        <StyledArchiveContainer>
            {
                files.length > 0 ?
                    <div>
                        <h1>Files</h1>
                        <StyledFilesContainer>
                        {
                            files.map((file) => 
                                <li key={file.id}>
                                    <iframe src={`https://drive.google.com/file/d/${file.id}/preview`} alt="PDF" style={{ width: '100%', height: '500px' }} />
                                    <p>{file.name}</p>
                                </li>
                            )
                        }
                        </StyledFilesContainer>
                    </div>
                    :
                    folders.length > 0 ?
                        <StyledFoldersContainer>
                            {
                                folders.map((folder) => 
                                    <li key={folder.id} onClick={() => fetchFilesInFolder(folder.id)}>
                                        {folder.name}     
                                    </li>
                                )
                            }
                        </StyledFoldersContainer>
                        :
                        <p>No files or folders found</p>
            }
        </StyledArchiveContainer>
    )
}

export default Archive