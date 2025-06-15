import React, { useState, useEffect } from 'react'
import RichText from '@/utils/richTextRenderer'
import { parseDate } from '@/utils/helpers'
import Image from 'next/image'
import AddPostModal from '@/widgets/SpaceEditor/AddPostModal'

const Single = ({ currentPost, setCurrentPost, setIsPageIndex }) => {
  const { title, date, body, coverImage } = currentPost
  const [showAddPostModal, setShowAddPostModal] = useState(false)

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
          />
          :
          <>
            <button 
              onClick={() => { setCurrentPost(null); setIsPageIndex(true) }}
              style={{fontSize: '2rem', marginBottom: '1rem'}}
            >
              ⬅️
            </button>
            <h1>{title}</h1>
            <p>{parseDate(date)}</p>
            { !showAddPostModal && <button className='text-button mt-4 mb-4' onClick={() => setShowAddPostModal(true)}>Edit Post</button>}
            <br />
            {coverImage && <Image src={coverImage.url} width={500} height={500} alt={coverImage.alt} style={{objectFit: 'contain', margin: '2rem 0'}} /> }
            <RichText data={body} />
          </>
      }
    </div>
  )
}

export default Single