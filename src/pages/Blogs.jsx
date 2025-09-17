import React, { useState } from 'react'
import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)

  const handleAddBlog = (blogData) => {
    const newBlog = {
      id: Date.now(),
      ...blogData,
      createdAt: new Date().toLocaleDateString()
    }
    setBlogs([...blogs, newBlog])
    setIsFormOpen(false)
  }

  const handleEditBlog = (blogData) => {
    setBlogs(blogs.map(blog => 
      blog.id === editingBlog.id 
        ? { ...blogData, id: editingBlog.id, createdAt: editingBlog.createdAt }
        : blog
    ))
    setEditingBlog(null)
    setIsFormOpen(false)
  }

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const openEditForm = (blog) => {
    setEditingBlog(blog)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingBlog(null)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header with animated gradient */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Blogs Management
            </h1>
            <p className="text-gray-600">Create and manage your blog content</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Blog</span>
          </button>
        </div>

        {isFormOpen && (
          <div className="mb-8 transform transition-all duration-300 ease-in-out">
            <BlogForm
              onSubmit={editingBlog ? handleEditBlog : handleAddBlog}
              onCancel={closeForm}
              initialData={editingBlog}
              isEditing={!!editingBlog}
            />
          </div>
        )}

        <div className="transform transition-all duration-300">
          <BlogList
            blogs={blogs}
            onEdit={openEditForm}
            onDelete={handleDeleteBlog}
          />
        </div>
      </div>
    </div>
  )
}

export default Blogs