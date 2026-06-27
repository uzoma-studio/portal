import { useEffect, useRef, useState, useCallback } from 'react'

const cloneSnapshot = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch (error) {
    console.warn('Unable to clone snapshot value', error)
    return value
  }
}

const isEditableElement = (target) => {
  if (!(target instanceof HTMLElement)) return false
  const tagName = target.tagName.toLowerCase()
  if (tagName === 'input' || tagName === 'textarea') return true
  return target.isContentEditable
}

const useKeyboardShortcuts = ({
  isBuildMode,
  space,
  settings,
  spaceImages,
  spaceTexts,
  setSpace,
  setSettings,
  setImages,
  setTexts,
}) => {
  const [historyIndex, setHistoryIndex] = useState(-1)
  const historyRef = useRef([])
  const isApplyingHistoryRef = useRef(false)

  const createSnapshot = useCallback(() => {
    return {
      space: cloneSnapshot(space),
      settings: cloneSnapshot(settings),
      images: cloneSnapshot(spaceImages),
      texts: cloneSnapshot(spaceTexts),
    }
  }, [space, settings, spaceImages, spaceTexts])

  const applySnapshot = useCallback((snapshot) => {
    if (!snapshot) return
    isApplyingHistoryRef.current = true
    if (snapshot.space !== undefined) {
      setSpace(snapshot.space)
    }
    if (snapshot.settings !== undefined) {
      setSettings(snapshot.settings)
    }
    if (snapshot.images !== undefined) {
      setImages(snapshot.images)
    }
    if (snapshot.texts !== undefined) {
      setTexts(snapshot.texts)
    }
    window.requestAnimationFrame(() => {
      isApplyingHistoryRef.current = false
    })
  }, [setSpace, setSettings, setImages, setTexts])

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return
    const nextIndex = historyIndex - 1
    const entry = historyRef.current[nextIndex]
    if (!entry) return
    setHistoryIndex(nextIndex)
    applySnapshot(entry.snapshot)
  }, [historyIndex, applySnapshot])

  const handleRedo = useCallback(() => {
    if (historyIndex >= historyRef.current.length - 1) return
    const nextIndex = historyIndex + 1
    const entry = historyRef.current[nextIndex]
    if (!entry) return
    setHistoryIndex(nextIndex)
    applySnapshot(entry.snapshot)
  }, [historyIndex, applySnapshot])

  useEffect(() => {
    if (!space?.id) return
    if (isApplyingHistoryRef.current) return

    const snapshot = createSnapshot()
    const snapshotKey = JSON.stringify(snapshot)
    const currentEntry = historyRef.current[historyIndex]

    if (currentEntry?.key === snapshotKey) {
      return
    }

    const nextHistory = historyRef.current.slice(0, historyIndex + 1)
    nextHistory.push({ snapshot, key: snapshotKey })
    historyRef.current = nextHistory
    setHistoryIndex(nextHistory.length - 1)
  }, [space?.id, createSnapshot, historyIndex])

  useEffect(() => {
    if (!isBuildMode) return

    const onKeyDown = (event) => {
      const isMeta = event.metaKey || event.ctrlKey
      if (!isMeta || event.key.toLowerCase() !== 'z') return

      if (isEditableElement(event.target)) return

      event.preventDefault()
      if (event.shiftKey) {
        handleRedo()
      } else {
        handleUndo()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isBuildMode, handleUndo, handleRedo])

  return {
    canUndo: historyIndex > 0,
    canRedo: historyIndex < historyRef.current.length - 1,
    undo: handleUndo,
    redo: handleRedo,
  }
}

export default useKeyboardShortcuts
