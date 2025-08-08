"use client";
import * as React from "react"; // Import React for component definitions

import { ArrowRight, Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";

// Custom Input Component
interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomInput.displayName = "CustomInput";

// Custom Textarea Component
interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
CustomTextarea.displayName = "CustomTextarea";

// Custom Button Component
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CustomButton.displayName = "CustomButton";

export default function ContactUs() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    message: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  // Generate time slots
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 17) slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: !formState.name ? "Name is required" : "",
      email: !formState.email
        ? "Email is required"
        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)
        ? "Invalid email address"
        : "",
      message: !formState.message ? "Message is required" : "",
      appointmentDate: !formState.appointmentDate ? "Please select a date" : "",
      appointmentTime: !formState.appointmentTime ? "Please select a time" : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      setFormState((prev) => ({ ...prev, appointmentDate: formattedDate }));
      setErrors((prev) => ({ ...prev, appointmentDate: "" }));
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isDisabled = isPastDate(date);
      const isTodayDate = isToday(date);
      const isSelected = isSelectedDate(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled}
          className={`
            p-2 text-sm font-medium rounded-lg transition-colors w-full h-10 flex items-center justify-center
            ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-white hover:bg-white/20 cursor-pointer"
            }
            ${
              isTodayDate && !isSelected
                ? "bg-white/10 border border-white/30"
                : ""
            }
            ${isSelected ? "bg-white text-[#283E61] font-bold" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-semibold text-white">{monthName}</h3>
          <button
            type="button"
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-white/70"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          message: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full pt-16 bg-[#EDF1F9]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className="text-center mb-16">
          <h2
            id="contact-heading"
            className="text-4xl lg:text-5xl font-bold tracking-tight text-[#283E61] mb-8"
          >
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Schedule an appointment or get in touch with{" "}
            <strong className="font-bold text-[#283E61]">
              SR Publishing House
            </strong>{" "}
            for any questions about our journals, submissions or publishing
            services.
          </p>
        </div>

        {/* Full Width Contact Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-t-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Contact Form */}
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-[#283E61] mb-4">
                  Schedule an Appointment
                </h3>
                <p className="text-gray-600">
                  Choose your preferred date and time for a consultation.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#403F3F]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <CustomInput
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`block w-full rounded-md shadow-sm sm:text-sm ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#403F3F]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <CustomInput
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="example@domain.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={`block w-full rounded-md shadow-sm sm:text-sm ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Date Display */}
                {selectedDate && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Selected Date:{" "}
                      <strong>
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </strong>
                    </p>
                  </div>
                )}

                {errors.appointmentDate && (
                  <p className="text-sm text-red-500">
                    {errors.appointmentDate}
                  </p>
                )}

                {/* Appointment Time */}
                <div>
                  <label
                    htmlFor="appointmentTime"
                    className="block text-sm font-medium text-[#403F3F] mb-2"
                  >
                    <Clock className="inline w-4 h-4 mr-2" />
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    required
                    value={formState.appointmentTime}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        appointmentTime: e.target.value,
                      }))
                    }
                    aria-invalid={!!errors.appointmentTime}
                    aria-describedby={
                      errors.appointmentTime ? "time-error" : undefined
                    }
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      errors.appointmentTime
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    } bg-white px-3 py-2`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.appointmentTime && (
                    <p id="time-error" className="mt-1 text-sm text-red-500">
                      {errors.appointmentTime}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#403F3F]"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <CustomTextarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Please describe your inquiry or questions..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={`block w-full rounded-md shadow-sm sm:text-sm ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
                {submitStatus === "success" && (
                  <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                  >
                    Thanks—your message has been sent.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                    role="alert"
                  >
                    There was an error sending your message. Please try again
                    later.
                  </div>
                )}
                <div>
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#283E61] hover:bg-[#1F304A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </CustomButton>
                </div>
              </form>
            </div>

            {/* Right Side - Calendar (Blue Background) */}
            <div className="bg-[#283E61]">
              {/* Custom Calendar */}
              {renderCalendar()}

              {/* Contact Information */}
              <div className="p-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-white" />
                    <a
                      href="mailto:info@srpublish.com"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      info@srpublish.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-white" />
                    <a
                      href="tel:+998900000000"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      +998(90) 000-00-00
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-white" />
                    <span className="text-blue-100">Tashkent, Uzbekistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Google Maps Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
            {/* Google Maps Embed */}
            <div className="relative h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.06130260456!2d69.13928219999999!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SR Publishing House Location - Tashkent, Uzbekistan"
              />
            </div>

            {/* Address Info */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#283E61]" />
                  <span>Tashkent, Uzbekistan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#283E61]" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
