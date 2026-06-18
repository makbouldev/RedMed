import React from "react";

export default function FloatingContacts() {
  return (
    <div className="floating-contacts">
      {/* Call Button */}
      <a 
        href="tel:+212600000000" 
        className="floating-btn btn-call" 
        aria-label="Call Us"
        title="Appeler"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/212600000000" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn btn-whatsapp" 
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.536 0 10.04-4.502 10.044-10.042.002-2.684-1.038-5.207-2.93-7.1a9.99 9.99 0 0 0-7.115-2.946c-5.539 0-10.043 4.503-10.047 10.042-.001 1.73.468 3.419 1.356 4.935l-.993 3.624 3.71-.973zm11.233-5.28c-.3-.149-1.772-.875-2.046-.975-.275-.101-.476-.149-.675.15-.199.299-.773.975-.947 1.173-.173.199-.348.224-.648.075-1.748-.873-2.906-1.542-4.062-3.52-.304-.523.304-.486.87-1.614.099-.199.049-.373-.025-.523-.075-.15-.675-1.624-.924-2.224-.244-.588-.493-.508-.675-.518-.173-.009-.372-.01-.572-.01-.2 0-.524.075-.798.373-.275.299-1.047 1.024-1.047 2.5 0 1.475 1.072 2.9 1.222 3.1.15.199 2.112 3.224 5.116 4.525.714.31 1.272.495 1.707.633.718.228 1.37.196 1.887.119.577-.087 1.772-.724 2.022-1.424.25-.699.25-1.299.175-1.424-.075-.125-.275-.199-.575-.349z"/>
        </svg>
      </a>

      {/* Instagram Button */}
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn btn-instagram" 
        aria-label="Follow us on Instagram"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
    </div>
  );
}
