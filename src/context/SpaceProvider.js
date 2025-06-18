'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentSpace, fetchPages } from '../../data/fetchContent.server'

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [space, setSpace] = useState(null);
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([])
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      loadingState: { isLoading, error } 
    }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = () => useContext(SpaceContext);