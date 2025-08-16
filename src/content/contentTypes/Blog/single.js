import React, { useState, useEffect } from 'react'
import RichText from '@/utils/richTextRenderer'
import { parseDate } from '@/utils/helpers'
import Image from 'next/image'
import AddPostModal from '@/editor/modals/AddPostModal'
import { useSpace } from '@/context/SpaceProvider'

const Single = ({ currentPostId, setCurrentPostId, setIsPageIndex }) => {
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  
  const { posts, setPosts, isCurrentUserSpaceOwner } = useSpace()
  const currentPost = posts.find((post) => post.id === currentPostId)
  
  const { title, date, body, coverImage } = currentPost


  useEffect(() => {
    setIsPageIndex(false)
  }, [])
  
  return (
    <div>
      { 
        showAddPostModal ?
          <AddPostModal
            setIsModalOpen={setShowAddPostModal}
            isCreatePostMode={false}
            postData={currentPost}
            setPosts={setPosts}
          />
          :
          <>
            <button 
              onClick={() => { setCurrentPostId(null); setIsPageIndex(true) }}
              style={{fontSize: '2rem', marginBottom: '1rem'}}
            >
              ⬅️
            </button>
            <h1>{title}</h1>
            <p>{parseDate(date)}</p>
            { !showAddPostModal && isCurrentUserSpaceOwner && <button className='text-button mt-4 mb-4' onClick={() => setShowAddPostModal(true)}>Edit Post</button>}
            <br />
            {coverImage && <Image src={coverImage.url} width={500} height={500} alt={coverImage.alt} style={{objectFit: 'contain', margin: '2rem 0'}} /> }
            <RichText data={body} />
          </>
      }
    </div>
  )
}

export default Single