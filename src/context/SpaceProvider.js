'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentSpace, fetchPages } from '../../data/fetchContent.server'
import { getCurrentUser } from '@/utils/auth';
import { useAuth } from './AuthProvider';

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [space, setSpace] = useState(null);
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([])
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth()
  const [spaceUser, setSpaceUser] = useState(null)
  const [isCurrentUserSpaceOwner, setIsCurrentUserSpaceOwner] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        
        const spaceDomain = window.location.pathname.split('/')[1];
        const space = await getCurrentSpace(spaceDomain);
        setSpace(space);
        
        setSettings(space.settings);

        const pages = await fetchPages(space.id);
        setPages(pages.docs);

        // If user has already been called by the useAuth hook, use that data instead
        const userData = user ? user : await getCurrentUser();
        setSpaceUser(userData)

        setIsCurrentUserSpaceOwner(space?.owner ? space.owner.id === userData?.id : false)

      } catch (err) {
        setError(err.message || 'Failed to load space data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    
  }, []);

  return (
    <SpaceContext.Provider value={{ 
      space,
      pages, 
      setPages,
      posts,
      setPosts, 
      settings,
      setSettings,
      user: spaceUser,
      isCurrentUserSpaceOwner,
      setIsCurrentUserSpaceOwner,
      loadingState: { isLoading, error } 
    }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = () => useContext(SpaceContext);