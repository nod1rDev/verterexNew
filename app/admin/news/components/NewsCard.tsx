"use client"

import type React from "react"

import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"

interface NewsCardProps {
  news: {
    id: number
    title: string
    description: string
    image: string
    category_name: string
    pub_date: string
    is_active: boolean
  }
  onEdit: (news: any) => void
  onDelete: (id: number) => void
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-blue-50/50">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg?height=300&width=500&query=news-article-image"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t " />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {news.category_name}
          </span>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              news.is_active ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
          >
            {news.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#283E61] mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">{news.description}</p>
        <div className="flex justify-between items-center pt-3 border-t border-blue-50">
          <p className="text-gray-500 text-xs">{new Date(news.pub_date).toLocaleDateString()}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(news)}
              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
              title="Edit News"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(news.id)}
              className="text-red-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
              title="Delete News"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
