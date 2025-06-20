'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLastVisitedSpace, setLastVisitedSpace } from '../src/utils/spaces'
import { useAuth } from '../src/context/AuthProvider'
import { GlobalStyle } from '../src/styles/rootStyles'

// Import various templates
import ImageMap from './image-map/layout/index' //TODO: No need for `page` for the other imports, delete that file so it's one less file and just use `layout/index` instead, it's doing pretty much the same thing anyways
import Starter from './starter/page'

// import { StyledRoot } from '@/styles/rootStyles'

/**
 * ActiveTemplate component
 * 
 * This component dynamically renders one of several templates based on the current
 * active template. The active template can be set via a query parameter or from
 * localStorage.
 * 
 * @param {Object} props - The props object
 * @param {Array} props.pages - The data to be passed to each template
 * 
 * @returns {JSX.Element} The currently active template component
 */
const ActiveTemplate = ({ space, pages }) => {

  // Index templates
  // The same `pages` data is used across all templates in the project
  // TODO: use Context or sth instead of having to pass this prop over and over again
  const templates = {
    imageMap: <ImageMap pages={pages} />,
    starter: <Starter pages={pages} />
  }

  const defaultTemplateName = 'imageMap'
  const [activeTemplate, setActiveTemplate] = useState(templates[defaultTemplateName]);
  const router = useRouter()
  const { user, setUser } = useAuth()

  // Fetch user data by ID
  // const fetchUserData = async (userId) => {
  //   try {
  //     const response = await fetch(`/api/users/${userId}`)
  //     if (!response.ok) throw new Error('Failed to fetch user')
  //     const userData = await response.json()
  //     return userData
  //   } catch (error) {
  //     console.error('Error fetching user:', error)
  //     return null
  //   }
  // }

  // Check for userId in query parameters and set user if present
  // useEffect(() => {
  //   const handleUserId = async () => {
  //     if (window && window.location.search) {
  //       const url = new URL(window.location.href)
  //       const userId = url.searchParams.get('userId')
        
  //       if (userId && !user) {
  //         // Fetch complete user data
  //         const userData = await fetchUserData(userId)
  //         if (userData) {
  //           // Set the complete user object
  //           setUser(userData)
            
  //           // Remove the userId from the URL without refreshing the page
  //           url.searchParams.delete('userId')
  //           window.history.replaceState({}, '', url)
  //         }
  //       }
  //     }
  //   }

  //   handleUserId()
  // }, [user, setUser])

  // Load the active template from localStorage if it exists
  useEffect(() => {
    const storedTemplateName = localStorage.getItem('activeTemplate');
    if (storedTemplateName && templates[storedTemplateName]) {
      setActiveTemplate(templates[storedTemplateName]);
    }
  }, []);

  // Set the active template based on the URL query parameter
  useEffect(() => {
    if(window && window.location.search !== '') {
      const url = new URL(window.location.href)
      const templateParam = url.searchParams.get('template');
      
      if(templates[templateParam]){
        setActiveTemplate(templates[templateParam])
        localStorage.setItem('activeTemplate', templateParam);
        router.push('/')
      } else {
        setActiveTemplate(templates[defaultTemplateName])
        localStorage.setItem('activeTemplate', defaultTemplateName);
      }
    }

    return () => {}
  }, [])

  // useEffect(() => {
  //   const checkLastVisitedSpace = async () => {
  //     // Only proceed if we have a user
  //     if (!user) return
      
  //     const lastVisitedSpace = await getLastVisitedSpace(user.id)
  //     if(lastVisitedSpace !== currentSpace){
  //       await setLastVisitedSpace(user.id, currentSpace)
  //     }
  //   }
    
  //   checkLastVisitedSpace()
  // }, [currentSpace, user]) // Add user to dependencies

  return (
    <>
      <GlobalStyle $theme={theme} />
      {activeTemplate}
    </>
  );
}

export default ActiveTemplate