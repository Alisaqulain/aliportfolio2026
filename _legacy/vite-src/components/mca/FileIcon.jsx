import React from 'react'
import {
  FaFolder,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileVideo,
  FaFileArchive,
  FaFileAlt,
} from 'react-icons/fa'

const iconMap = {
  folder: FaFolder,
  pdf: FaFilePdf,
  word: FaFileWord,
  excel: FaFileExcel,
  powerpoint: FaFilePowerpoint,
  image: FaFileImage,
  video: FaFileVideo,
  zip: FaFileArchive,
  text: FaFileAlt,
  file: FaFile,
}

const colorMap = {
  folder: '#fbbf24',
  pdf: '#ef4444',
  word: '#3b82f6',
  excel: '#10b981',
  powerpoint: '#f97316',
  image: '#a855f7',
  video: '#ec4899',
  zip: '#78716c',
  text: '#6b7280',
  file: '#9ca3af',
}

const FileIcon = ({ type, size = 20 }) => {
  const Icon = iconMap[type] || FaFile
  const color = colorMap[type] || colorMap.file
  return <Icon style={{ color, flexShrink: 0 }} size={size} />
}

export default FileIcon
