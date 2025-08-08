"use client"

import { useState, useEffect } from "react"

const NewsModal = ({ isOpen, onClose, onSave, newsItem }: any) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [category, setCategory] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title)
      setDescription(newsItem.description)
      setCategory(newsItem.category_name)
      setIsActive(newsItem.is_active)
      setImage(null) // Clear file input for edit
      setImagePreview(newsItem.image) // Set existing image for preview
    } else {
      setTitle("")
      setDescription("")
      setCategory("")
      setIsActive(true)
      setImage(null)
      setImagePreview(null)
    }
  }, [newsItem])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    if (image) {
      formData.append("file", image)
    }
    formData.append("category_name", category)
    formData.append("is_active", String(isActive)) // Ensure isActive is sent

    onSave(formData, newsItem ? newsItem.id : null)

    setTitle("")
    setDescription("")
    setCategory("")
    setIsActive(true)
    setImage(null)
    setImagePreview(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-[#283E61] mb-6 text-center">
          {newsItem ? "Edit News" : "Add News"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out min-h-[120px] resize-y"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0]
                  setImage(file)
                  setImagePreview(URL.createObjectURL(file)) // Create URL for preview
                } else {
                  setImage(null)
                  setImagePreview(null)
                }
              }}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview || "/placeholder.svg?height=128&width=256&query=news-image-preview"}
                  alt="Image Preview"
                  className="max-w-full h-32 object-cover rounded-md shadow-sm border border-gray-200"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out appearance-none bg-white pr-8"
              required
            >
              <option value="">Select a category</option>
              <option value="Medical News">Medical News</option>
              <option value="Clinical Guidelines">Clinical Guidelines</option>
              <option value="Research Update">Research Update</option>
              <option value="Pharmaceutical">Pharmaceutical</option>
              <option value="Diseases">Diseases</option>
              <option value="Treatment Methods">Treatment Methods</option>
              <option value="Surgical News">Surgical News</option>
              <option value="Med Technology">Med Technology</option>
              <option value="Diagnostics">Diagnostics</option>
              <option value="Prevention">Prevention</option>
              <option value="Health Policy">Health Policy</option>
              <option value="Medical Education">Medical Education</option>
              <option value="Medical Ethics">Medical Ethics</option>
              <option value="New Drugs">New Drugs</option>
              <option value="Emergency Updates">Emergency Updates</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 cursor-pointer">
              Active
            </label>
          </div>
          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#283E61] text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewsModal
