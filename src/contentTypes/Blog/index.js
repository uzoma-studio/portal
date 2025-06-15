import React, { useState } from 'react'
import styled from 'styled-components'
import Single from './single'
import Image from 'next/image'
import { parseDate } from '@/utils/helpers'
import AddPostModal from '@/widgets/SpaceEditor/AddPostModal'

const StyledBlogPostsList = styled.ul`
    li {
        border: 1px solid rgba(0, 0, 0, 0.5);
        margin: 2rem 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 10rem;

        img {
          object-fit: cover;
          margin-right: 20px;
          height: 100%;
          width: 33.3%;
          z-index: 99;
        }

        &:hover {
            background-color: rgba(235, 235, 235);
        }
    }
`

const Blog = ({ data, setIsPageIndex, updateId }) => {
  
  const [currentPost, setCurrentPost] = useState(null)
  const [showAddPostModal, setShowAddPostModal] = useState(false)

  return (
    <div>
      {
        showAddPostModal ? 
          <AddPostModal
            setIsModalOpen={setShowAddPostModal}
            isCreatePostMode={true}
            postData={null}
            setIsEditMode={null}
            updateId={updateId}
          />
          :
          <button className='text-button' onClick={() => setShowAddPostModal(true)}>Add Post</button>
      }
      {
        !currentPost ?
          data && 
            <StyledBlogPostsList>
                {
                    data.map((blogPost) => {
                      const { id, title, date } = blogPost
                      return <li key={id} onClick={() => setCurrentPost(blogPost)}>
                          {blogPost.coverImage && <Image src={blogPost.coverImage.url} width={100} height={150} alt={blogPost.coverImage.alt} /> }
                          <div className='text'>
                            <h4>{title}</h4>
                            <p>{parseDate(date)}</p>
                          </div>
                      </li>
                    })
                }
            </StyledBlogPostsList>
          :
          <Single currentPost={currentPost} setCurrentPost={setCurrentPost} setIsPageIndex={setIsPageIndex} />
      }
  </div>
  )
}

export default Blog