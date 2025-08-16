'use client'

import React from 'react'
import CreateSpaceModal from '@/editor/modals/CreateSpaceModal'

// TODO: Add access control to this route. Only logged in user should be able to access
const CreateSpace = () => {
  return (
    <CreateSpaceModal />
  )
}

export default CreateSpace