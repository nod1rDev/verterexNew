"use client"

import * as React from "react"
import { ArrowRight, MapPin } from 'lucide-react'

// Custom Input
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className = "", type, ...props }, ref) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
)
CustomInput.displayName = "CustomInput"

// Custom Textarea
interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      className={`flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
)
CustomTextarea.displayName = "CustomTextarea"

// Custom Button
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
)
CustomButton.displayName = "CustomButton"

export default function Page() {
  // Form state
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
    appointmentDate: "", // selected from calendar
  })
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    message: "",
    appointmentDate: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  // Calendar state
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  // Calendar helpers
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const isToday = (date: Date) => date.toDateString() === new Date().toDateString()
  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
  const isSelectedDate = (date: Date) => selectedDate && date.toDateString() === selectedDate.toDateString()

  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date)
      const formatted = date.toISOString().split("T")[0]
      setFormState((prev) => ({ ...prev, appointmentDate: formatted }))
      setErrors((prev) => ({ ...prev, appointmentDate: "" }))
    }
  }

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const next = new Date(prev)
      next.setMonth(prev.getMonth() + (dir === "next" ? 1 : -1))
      return next
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const days: React.ReactNode[] = []

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const disabled = isPastDate(date)
      const today = isToday(date)
      const selected = !!isSelectedDate(date)

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(date)}
          disabled={disabled}
          className={`
            p-2 text-[13px] font-medium rounded-md transition-colors w-full h-8 flex items-center justify-center
            ${disabled ? "text-white/40 cursor-not-allowed" : "text-white hover:bg-white/15 cursor-pointer"}
            ${today && !selected ? "bg-white/10 border border-white/30" : ""}
            ${selected ? "bg-white text-[#283E61] font-bold" : ""}
          `}
          aria-label={`Date: ${date.toDateString()}`}
        >
          {day}
        </button>
      )
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <button
            type="button"
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-sm sm:text-base font-semibold text-white">{monthName}</h3>
          <button
            type="button"
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((d) => (
            <div key={d} className="p-1 text-center text-[11px] sm:text-xs font-medium text-white/80">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  // Validation
  const validateForm = () => {
    const newErrors = {
      name: formState.name ? "" : "Name is required",
      email: !formState.email
        ? "Email is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)
        ? ""
        : "Invalid email address",
      message: formState.message ? "" : "Message is required",
      appointmentDate: formState.appointmentDate ? "" : "Please select a date from the calendar",
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (res.ok) {
        setSubmitStatus("success")
        setFormState({ name: "", email: "", message: "", appointmentDate: "" })
        setSelectedDate(null)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full pt-10 sm:pt-14 bg-[#EDF1F9]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 id="contact-heading" className="text-3xl lg:text-4xl font-bold tracking-tight text-[#283E61] mb-3">
            Contact Us
          </h2>
          <p className="text-[#283E61] text-lg leading-relaxed mb-8 opacity-80">
            Fill out the form on the left. On the right, the calendar and map are combined in one card.
          </p>
        </div>

        {/* Two columns: Left = Form, Right = Calendar + mini map (single card) */}
        <div className="flex ">
          {/* Left - Form */}
          <div className="w-full bg-white rounded-l-2xl shadow-md p-5 sm:p-6">
            <h3 className="text-xl font-semibold text-[#283E61] mb-1">Send a Message</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please select a date from the calendar on the right and complete the form.
            </p>

            {/* Selected date status */}
            <div className="mb-4">
              {selectedDate ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  Selected date:{" "}
                  <strong>
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </strong>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  No date selected — click a day on the calendar.
                </div>
              )}
              {errors.appointmentDate && <p className="mt-2 text-sm text-red-500">{errors.appointmentDate}</p>}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#403F3F]">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <CustomInput
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#283E61] focus:ring-[#283E61]"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#403F3F]">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <CustomInput
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@domain.com"
                    value={formState.email}
                    onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#283E61] focus:ring-[#283E61]"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#403F3F]">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <CustomTextarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Please describe your inquiry or questions..."
                    value={formState.message}
                    onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#283E61] focus:ring-[#283E61]"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                  Thanks — your message has been sent.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  There was an error sending your message. Please try again later.
                </div>
              )}

              <div>
                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#283E61] hover:bg-[#1F304A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </CustomButton>
              </div>
            </form>
          </div>

          {/* Right - Calendar + mini map (single card) */}
          <div className="w-full">
            <div className="bg-[#283E61] rounded-r-2xl shadow-md overflow-hidden">
              {/* Calendar */}
              {renderCalendar()}

              {/* Mini map — as small as feasible */}
              <div className="px-3 sm:px-4 pb-4">
                <div className="text-white/90 text-sm font-medium mb-2">Map</div>
                <div className="rounded-lg overflow-hidden ring-1 ring-white/20">
                  <div className="relative h-36 sm:h-40">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.06130260456!2d69.13928219999999!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SR Publishing House location — Tashkent, Uzbekistan"
                    />
                  </div>
                </div>
                {/* Compact footer row */}
                <div className="mt-2 flex items-center gap-2 text-[12px] text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-white/90" />
                  <span>Tashkent, Uzbekistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom standalone map section removed — everything is inside the right card */}
      </div>
    </section>
  )
}
