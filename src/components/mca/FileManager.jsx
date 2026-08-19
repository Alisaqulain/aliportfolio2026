import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FiSearch,
  FiLogOut,
  FiFolderPlus,
  FiUpload,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiMoreVertical,
  FiX,
  FiSun,
  FiMoon,
} from 'react-icons/fi'
import ThemeContext from '../../context/ThemeContext'
import FileIcon from './FileIcon'
import McaModal from './McaModal'
import { useMcaToast } from './McaToast'
import { mcaApi, formatFileSize, formatDate } from '../../utils/mcaApi'
import './FileManager.css'

const FileManager = ({ onLogout }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const { showToast } = useMcaToast()

  const [files, setFiles] = useState([])
  const [breadcrumb, setBreadcrumb] = useState([])
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [rootFolderId, setRootFolderId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)

  const [uploadProgress, setUploadProgress] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const [renameModal, setRenameModal] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [renameError, setRenameError] = useState('')

  const [folderModal, setFolderModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [folderError, setFolderError] = useState('')

  const [deleteModal, setDeleteModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  const fileInputRef = useRef(null)
  const searchTimeout = useRef(null)

  const activeFolderId = currentFolderId || rootFolderId

  const loadFiles = useCallback(async (folderId) => {
    setLoading(true)
    setSearchResults(null)
    setSearchQuery('')
    try {
      const data = await mcaApi.listFiles(folderId)
      setFiles(data.files)
      setBreadcrumb(data.breadcrumb)
      setCurrentFolderId(data.currentFolderId)
      setRootFolderId(data.rootFolderId)
    } catch (err) {
      showToast(err.message || 'Unable to connect to Google Drive', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const session = await mcaApi.checkSession()
        if (mounted && session.rootFolderId) {
          setRootFolderId(session.rootFolderId)
          setCurrentFolderId((prev) => prev || session.rootFolderId)
        }
      } catch {
        // session check handled by parent
      }
      if (mounted) loadFiles(null)
    }

    init()
    return () => { mounted = false }
  }, [loadFiles])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    if (!query.trim()) {
      setSearchResults(null)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    searchTimeout.current = setTimeout(async () => {
      try {
        const data = await mcaApi.searchFiles(query.trim())
        setSearchResults(data.files)
      } catch (err) {
        showToast(err.message || 'Search failed', 'error')
      } finally {
        setIsSearching(false)
      }
    }, 350)
  }

  const displayFiles = searchResults !== null ? searchResults : files

  const handleOpenFolder = (folder) => {
    setMenuOpen(null)
    loadFiles(folder.id)
  }

  const handleOpenFile = (file) => {
    setMenuOpen(null)
    if (file.webViewLink) {
      window.open(file.webViewLink, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = async (file) => {
    setMenuOpen(null)
    try {
      await mcaApi.downloadFile(file.id, file.name)
      showToast('Download started', 'success')
    } catch (err) {
      showToast(err.message || 'Download failed', 'error')
    }
  }

  const handleUpload = async (fileList) => {
    if (!fileList?.length) return
    if (!activeFolderId) {
      showToast('Google Drive is not configured. Check GOOGLE_REFRESH_TOKEN in .env.local.', 'error')
      return
    }

    setUploadProgress(0)
    try {
      await mcaApi.uploadFiles(activeFolderId, fileList, setUploadProgress)
      showToast(
        fileList.length > 1 ? `${fileList.length} files uploaded successfully` : 'File uploaded successfully',
        'success'
      )
      await loadFiles(activeFolderId)
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error')
    } finally {
      setUploadProgress(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleUpload(e.dataTransfer.files)
  }

  const handleCreateFolder = async () => {
    const trimmed = folderName.trim()
    if (!trimmed) {
      setFolderError('Name cannot be empty.')
      return
    }
    if (!activeFolderId) {
      showToast('Google Drive is not configured. Check GOOGLE_REFRESH_TOKEN in .env.local.', 'error')
      return
    }

    setActionLoading('folder')
    try {
      await mcaApi.createFolder(activeFolderId, trimmed)
      showToast('Folder created', 'success')
      setFolderModal(false)
      setFolderName('')
      setFolderError('')
      await loadFiles(activeFolderId)
    } catch (err) {
      showToast(err.message || 'Unable to create folder', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRename = async () => {
    const trimmed = renameValue.trim()
    if (!trimmed) {
      setRenameError('Name cannot be empty.')
      return
    }

    setActionLoading('rename')
    try {
      await mcaApi.renameItem(renameModal.id, trimmed)
      showToast('File renamed', 'success')
      setRenameModal(null)
      setRenameValue('')
      setRenameError('')
      await loadFiles(activeFolderId)
    } catch (err) {
      showToast(err.message || 'Unable to rename', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async () => {
    setActionLoading('delete')
    try {
      await mcaApi.deleteItem(deleteModal.id)
      showToast('File deleted', 'success')
      setDeleteModal(null)
      await loadFiles(activeFolderId)
    } catch (err) {
      showToast(err.message || 'Unable to delete', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogout = async () => {
    try {
      await mcaApi.logout()
    } catch {
      // proceed anyway
    }
    onLogout()
  }

  const navigateBreadcrumb = (item, index) => {
    if (index === breadcrumb.length - 1) return
    loadFiles(item.id)
  }

  return (
    <div
      className={`mca-dashboard ${isDragging ? 'mca-dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <header className="mca-header">
        <div className="mca-header-left">
          <h1 className="mca-brand">MCA AMU</h1>
        </div>

        <div className="mca-header-center">
          <div className="mca-search">
            <FiSearch className="mca-search-icon" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="mca-search-clear"
                onClick={() => handleSearch('')}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        <div className="mca-header-right">
          <button type="button" className="mca-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button type="button" className="mca-logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="mca-main">
        <div className="mca-toolbar">
          <div className="mca-toolbar-title">
            <FileIcon type="folder" size={22} />
            <h2>My MCA Files</h2>
          </div>
          <div className="mca-toolbar-actions">
            <button
              type="button"
              className="mca-action-btn"
              onClick={() => { setFolderModal(true); setFolderName(''); setFolderError('') }}
            >
              <FiFolderPlus />
              <span>New Folder</span>
            </button>
            <button
              type="button"
              className="mca-action-btn mca-action-btn-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUpload />
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                handleUpload(e.target.files)
                e.target.value = ''
              }}
            />
          </div>
        </div>

        {searchResults === null && breadcrumb.length > 0 && (
          <nav className="mca-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={item.id}>
                {index > 0 && <span className="mca-breadcrumb-sep">/</span>}
                <button
                  type="button"
                  className={`mca-breadcrumb-item ${index === breadcrumb.length - 1 ? 'active' : ''}`}
                  onClick={() => navigateBreadcrumb(item, index)}
                >
                  {index === 0 ? 'Home' : item.name}
                </button>
              </span>
            ))}
          </nav>
        )}

        {uploadProgress !== null && (
          <div className="mca-upload-progress">
            <div className="mca-upload-progress-bar">
              <motion.div
                className="mca-upload-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span>Uploading... {uploadProgress}%</span>
          </div>
        )}

        {isDragging && (
          <div className="mca-drop-overlay">
            <FiUpload size={48} />
            <p>Drop files to upload</p>
          </div>
        )}

        <div className="mca-file-table-wrapper">
          {(loading || isSearching) && (
            <div className="mca-loading">
              <div className="mca-spinner" />
              <span>{isSearching ? 'Searching...' : 'Loading files...'}</span>
            </div>
          )}

          {!loading && !isSearching && displayFiles.length === 0 && (
            <div className="mca-empty">
              <FileIcon type="folder" size={48} />
              <p>{searchResults !== null ? 'No results found' : 'This folder is empty'}</p>
              {searchResults === null && (
                <button
                  type="button"
                  className="mca-action-btn mca-action-btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload /> Upload files
                </button>
              )}
            </div>
          )}

          {!loading && !isSearching && displayFiles.length > 0 && (
            <table className="mca-file-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="mca-col-type">Type</th>
                  <th className="mca-col-size">Size</th>
                  <th className="mca-col-date">Modified</th>
                  <th className="mca-col-actions" />
                </tr>
              </thead>
              <tbody>
                {displayFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="mca-file-row"
                    onDoubleClick={() =>
                      file.type === 'folder' ? handleOpenFolder(file) : handleOpenFile(file)
                    }
                  >
                    <td>
                      <button
                        type="button"
                        className="mca-file-name"
                        onClick={() =>
                          file.type === 'folder' ? handleOpenFolder(file) : handleOpenFile(file)
                        }
                      >
                        <FileIcon type={file.type} />
                        <span>{file.name}</span>
                      </button>
                    </td>
                    <td className="mca-col-type">{file.type === 'folder' ? 'Folder' : file.type}</td>
                    <td className="mca-col-size">{file.type === 'folder' ? '—' : formatFileSize(file.size)}</td>
                    <td className="mca-col-date">{formatDate(file.modifiedTime)}</td>
                    <td className="mca-col-actions">
                      <div className="mca-row-actions">
                        {file.type !== 'folder' && (
                          <button
                            type="button"
                            className="mca-row-btn"
                            onClick={() => handleDownload(file)}
                            title="Download"
                          >
                            <FiDownload />
                          </button>
                        )}
                        {file.webViewLink && file.type !== 'folder' && (
                          <button
                            type="button"
                            className="mca-row-btn"
                            onClick={() => handleOpenFile(file)}
                            title="Open"
                          >
                            <FiExternalLink />
                          </button>
                        )}
                        <div className="mca-menu-wrapper">
                          <button
                            type="button"
                            className="mca-row-btn"
                            onClick={() => setMenuOpen(menuOpen === file.id ? null : file.id)}
                            title="More"
                          >
                            <FiMoreVertical />
                          </button>
                          {menuOpen === file.id && (
                            <div className="mca-context-menu">
                              {file.type === 'folder' && (
                                <button type="button" onClick={() => handleOpenFolder(file)}>
                                  Open
                                </button>
                              )}
                              {file.type !== 'folder' && (
                                <>
                                  <button type="button" onClick={() => handleOpenFile(file)}>Open</button>
                                  <button type="button" onClick={() => handleDownload(file)}>Download</button>
                                </>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setMenuOpen(null)
                                  setRenameModal(file)
                                  setRenameValue(file.name)
                                  setRenameError('')
                                }}
                              >
                                <FiEdit2 /> Rename
                              </button>
                              {file.id !== rootFolderId && (
                                <button
                                  type="button"
                                  className="danger"
                                  onClick={() => {
                                    setMenuOpen(null)
                                    setDeleteModal(file)
                                  }}
                                >
                                  <FiTrash2 /> Delete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <McaModal
        isOpen={!!renameModal}
        onClose={() => setRenameModal(null)}
        title="Rename"
        footer={
          <>
            <button type="button" className="mca-btn mca-btn-secondary" onClick={() => setRenameModal(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="mca-btn mca-btn-primary"
              onClick={handleRename}
              disabled={actionLoading === 'rename'}
            >
              {actionLoading === 'rename' ? 'Saving...' : 'Save'}
            </button>
          </>
        }
      >
        <label htmlFor="rename-input">New name</label>
        <input
          id="rename-input"
          className={`mca-modal-input ${renameError ? 'mca-modal-input-error' : ''}`}
          value={renameValue}
          onChange={(e) => { setRenameValue(e.target.value); setRenameError('') }}
          onKeyDown={(e) => e.key === 'Enter' && handleRename()}
          autoFocus
        />
        {renameError && <p className="mca-modal-error">{renameError}</p>}
      </McaModal>

      <McaModal
        isOpen={folderModal}
        onClose={() => setFolderModal(false)}
        title="New Folder"
        footer={
          <>
            <button type="button" className="mca-btn mca-btn-secondary" onClick={() => setFolderModal(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="mca-btn mca-btn-primary"
              onClick={handleCreateFolder}
              disabled={actionLoading === 'folder'}
            >
              {actionLoading === 'folder' ? 'Creating folder...' : 'Create'}
            </button>
          </>
        }
      >
        <label htmlFor="folder-input">Folder name</label>
        <input
          id="folder-input"
          className={`mca-modal-input ${folderError ? 'mca-modal-input-error' : ''}`}
          value={folderName}
          onChange={(e) => { setFolderName(e.target.value); setFolderError('') }}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
          placeholder="Enter folder name"
          autoFocus
        />
        {folderError && <p className="mca-modal-error">{folderError}</p>}
      </McaModal>

      <McaModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete"
        footer={
          <>
            <button type="button" className="mca-btn mca-btn-secondary" onClick={() => setDeleteModal(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="mca-btn mca-btn-danger"
              onClick={handleDelete}
              disabled={actionLoading === 'delete'}
            >
              {actionLoading === 'delete' ? 'Deleting...' : 'Delete'}
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this file?</p>
        {deleteModal && <p className="mca-delete-name">{deleteModal.name}</p>}
      </McaModal>
    </div>
  )
}

export default FileManager
