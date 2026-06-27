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
  selectedImageId,
  selectedTextId,
  setSpace,
  setSettings,
  setImages,
  setTexts,
}) => {
  const [historyIndex, setHistoryIndex] = useState(-1)
  const historyRef = useRef([])
  const clipboardRef = useRef(null)
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

  const createPastedPosition = (position) => {
    if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
      return { x: 5, y: 5 }
    }

    return {
      x: Math.min(95, position.x + 5),
      y: Math.min(95, position.y + 5),
    }
  }

  const buildNewId = (prefix) => `${prefix}_${Date.now()}_${Math.round(Math.random() * 10000)}`

  const handleCopy = useCallback(() => {
    if (selectedImageId) {
      const image = spaceImages.find((img) => img.id === selectedImageId)
      if (image) {
        clipboardRef.current = { type: 'image', value: cloneSnapshot(image) }
      }
      return
    }

    if (selectedTextId) {
      const text = spaceTexts.find((txt) => txt.id === selectedTextId)
      if (text) {
        clipboardRef.current = { type: 'text', value: cloneSnapshot(text) }
      }
    }
  }, [selectedImageId, selectedTextId, spaceImages, spaceTexts])

  const handlePaste = useCallback(() => {
    const clipboard = clipboardRef.current
    if (!clipboard) return

    if (clipboard.type === 'image') {
      const copiedImage = clipboard.value
      const patch = {
        ...cloneSnapshot(copiedImage),
        id: buildNewId('preview'),
        position: createPastedPosition(copiedImage.position),
      }
      setImages((prev) => [...prev, patch])
      return
    }

    if (clipboard.type === 'text') {
      const copiedText = clipboard.value
      const patch = {
        ...cloneSnapshot(copiedText),
        id: buildNewId('text'),
        position: createPastedPosition(copiedText.position),
      }
      setTexts((prev) => [...prev, patch])
    }
  }, [setImages, setTexts])

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
      const key = event.key.toLowerCase()

      if (isEditableElement(event.target)) return

      if (isMeta && key === 'z') {
        event.preventDefault()
        if (event.shiftKey) {
          handleRedo()
        } else {
          handleUndo()
        }
        return
      }

      if (isMeta && key === 'c') {
        event.preventDefault()
        handleCopy()
        return
      }

      if (isMeta && key === 'v') {
        event.preventDefault()
        handlePaste()
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isBuildMode, handleUndo, handleRedo, handleCopy, handlePaste])

  return {
    canUndo: historyIndex > 0,
    canRedo: historyIndex < historyRef.current.length - 1,
    undo: handleUndo,
    redo: handleRedo,
  }
}

export default useKeyboardShortcuts
