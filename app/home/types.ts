export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactFormProps {
  formData: ContactFormData
  onSubmit: (e: React.FormEvent) => void
  onChange: (field: keyof ContactFormData, value: string) => void
}