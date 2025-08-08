"use client"

import { useEffect, useState } from "react"
import withAdminAuth from "../components/withAdminAuth"
import NewsCard from "./components/NewsCard"
import NewsModal from "./components/NewsModal"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"


interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  category_name: string
  pub_date: string
  is_active: boolean
}

interface NewsApiResponse {
  code: number
  message: string
  data: NewsItem[]
  success: boolean
}

const NewsAdminPage = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Display 6 news cards per page
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newsToDeleteId, setNewsToDeleteId] = useState<number | null>(null)

  const fetchNews = async () => {
    if (typeof window === "undefined") return;
    try {
      const token = localStorage.getItem("token")
      console.log("Fetching news with token:", token)
      const response = await fetch("http://217.199.253.46:3001/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: NewsApiResponse = await response.json()
      console.log("News API response:", data)
      if (data.success) {
        setNews(data.data)
      } else {
        console.error("Failed to fetch news:", data.message)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleSave = async (formData: FormData, id: number | null) => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token")
    const url = id ? `http://217.199.253.46:3001/news/${id}` : "http://217.199.253.46:3001/news"
    const method = id ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save news")
      }

      fetchNews()
      setIsModalOpen(false)
      setSelectedNews(null)
    } catch (error) {
      console.error("Error saving news:", error)
    }
  }

  const handleDelete = (id: number) => {
    setNewsToDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (typeof window === "undefined") return;
    if (newsToDeleteId === null) return;
    const id = newsToDeleteId;
    setNewsToDeleteId(null);
    setIsDeleteModalOpen(false);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://217.199.253.46:3001/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete news")
      }

      fetchNews()
    } catch (error) {
      console.error("Error deleting news:", error)
    }
  }

  const totalPages = Math.ceil(news.length / itemsPerPage)
  const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="max-w-[100%] mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#283E61] dark:text-gray-50">News Management</h1>
        <button
          onClick={() => {
            setSelectedNews(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center bg-[#283E61] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground  h-10 px-4 py-2 shadow-sm"
        >
          Add News
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentNews.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
            onEdit={(newsItem:any) => {
              setSelectedNews(newsItem)
              setIsModalOpen(true)
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center text-[#283E61] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${currentPage === index + 1 ? "bg-[#283E61] text-primary-foreground " : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center text-[#283E61] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Next
        </button>
      </div>

      <NewsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedNews(null)
          // Reset modal's internal state when closed
          // This is handled by the useEffect in NewsModal based on newsItem prop
        }}
        onSave={handleSave}
        newsItem={selectedNews}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={news.find((n) => n.id === newsToDeleteId)?.title || "this news item"}
      />
    </div>
  )
}

export default withAdminAuth(NewsAdminPage)
