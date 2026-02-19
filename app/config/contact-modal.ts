// Contact Modal Configuration
// Edit this file to update contact modal content across the site

export interface ContactModalConfig {
  title: string
  subtitle: string
  form: {
    fields: {
      name: {
        placeholder: string
        label: string
      }
      email: {
        placeholder: string
        label: string
      }
      phone: {
        placeholder: string
        label: string
      }
      message: {
        placeholder: string
        label: string
      }
    }
    submitButton: {
      default: string
      loading: string
    }
  }
  messages: {
    success: {
      title: string
      description: string
    }
    error: {
      title: string
      description: string
    }
    validation: {
      required: string
      invalidEmail: string
    }
  }
}

export const contactModalConfig: ContactModalConfig = {
  title: "Learn About Mount Vernon Lofts",
  subtitle: "Connect with our team about attainable Montrose ownership",
  form: {
    fields: {
      name: {
        placeholder: "Name*",
        label: "Full Name"
      },
      email: {
        placeholder: "Email*",
        label: "Email Address"
      },
      phone: {
        placeholder: "Phone*",
        label: "Phone Number"
      },
      message: {
        placeholder: "Message*",
        label: "Your Message"
      }
    },
    submitButton: {
      default: "Submit Inquiry",
      loading: "Submitting..."
    }
  },
  messages: {
    success: {
      title: "Thank You!",
      description: "Your inquiry has been submitted successfully. We'll be in touch within 24 hours."
    },
    error: {
      title: "Submission Error",
      description: "There was an error submitting your inquiry. Please try again or contact us directly."
    },
    validation: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address"
    }
  }
}

// Contact display preferences
export const contactDisplayConfig = {
  showContactInfo: true,
  contactInfoPosition: "bottom" as const,
  logoSize: {
    width: 40,
    height: 60
  }
}
