"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    // Name
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters.";
    }

    // Phone
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      tempErrors.phone = "Invalid phone number format.";
    }

    // Subject
    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required.";
    } else if (formData.subject.trim().length < 3) {
      tempErrors.subject = "Subject must be at least 3 characters.";
    }

    // Email
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }

    // Message
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message should be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch {
      setLoading(false);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl ">
        <h1 className="text-2xl font-bold text-center mb-6">Send Us a Message</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : ""}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${errors.email ? "border-red-500" : ""}`}
              placeholder="john.doe@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              autoComplete="off"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${errors.phone ? "border-red-500" : ""}`}
              placeholder="+91 9876543210"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              autoComplete="off"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${errors.subject ? "border-red-500" : ""}`}
              placeholder="Inquiry about admissions"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium">Your Message</label>
            <textarea
              name="message"
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${errors.message ? "border-red-500" : ""}`}
              rows={5}
              placeholder="Type your message here..."
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status && <p className="mt-4 text-center text-green-600">{status}</p>}
      </div>
    </div>
  );
}
