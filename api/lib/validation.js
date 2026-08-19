const INVALID_NAME_CHARS = /[\\/:*?"<>|]/
const MAX_NAME_LENGTH = 255

export function validateFileName(name) {
  if (typeof name !== 'string') {
    return { valid: false, error: 'Name is required.' }
  }
  const trimmed = name.trim()
  if (!trimmed) {
    return { valid: false, error: 'Name cannot be empty.' }
  }
  if (trimmed.length > MAX_NAME_LENGTH) {
    return { valid: false, error: 'Name is too long.' }
  }
  if (INVALID_NAME_CHARS.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters.' }
  }
  if (trimmed === '.' || trimmed === '..') {
    return { valid: false, error: 'Invalid name.' }
  }
  return { valid: true, value: trimmed }
}

export function validateSearchQuery(query) {
  if (typeof query !== 'string') {
    return { valid: false, error: 'Search query is required.' }
  }
  const trimmed = query.trim()
  if (!trimmed) {
    return { valid: false, error: 'Search query cannot be empty.' }
  }
  if (trimmed.length > 200) {
    return { valid: false, error: 'Search query is too long.' }
  }
  return { valid: true, value: trimmed }
}

export function normalizeFolderId(raw) {
  if (typeof raw !== 'string') return null
  let trimmed = raw.trim()
  if (!trimmed) return null

  // Fix accidental copy-paste like GOOGLE_DRIVE_FOLDER_ID=1abc...
  trimmed = trimmed.replace(/^GOOGLE_DRIVE_FOLDER_ID=/i, '')

  const urlMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/)
  if (urlMatch) return urlMatch[1]

  return trimmed
}

export function validateFolderId(folderId) {
  const normalized = normalizeFolderId(folderId)
  if (!normalized) {
    return { valid: false, error: 'Folder ID is required.' }
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(normalized)) {
    return { valid: false, error: 'Invalid folder ID.' }
  }
  return { valid: true, value: normalized }
}

export function validateFileId(fileId) {
  if (typeof fileId !== 'string' || !fileId.trim()) {
    return { valid: false, error: 'File ID is required.' }
  }
  const trimmed = fileId.trim()
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return { valid: false, error: 'Invalid file ID.' }
  }
  return { valid: true, value: trimmed }
}
