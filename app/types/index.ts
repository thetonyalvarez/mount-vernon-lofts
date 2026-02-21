export interface FormData {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly message: string
  readonly isBroker?: string
  readonly preferredFloor?: string
}

export interface EnhancedFormData extends FormData {
  readonly modalId: string
  readonly triggerSource: string
  readonly submissionId: string
}

export interface FloorPlanFormData extends FormData {
  readonly floorPlansInterest: string
  readonly timeframe?: string
}

export interface EnhancedFloorPlanFormData extends FloorPlanFormData {
  readonly modalId: string
  readonly triggerSource: string
  readonly submissionId: string
}

export interface BrochureFormData extends FormData {
  readonly brochureInterest: string
  readonly timeframe?: string
}

export interface EnhancedBrochureFormData extends BrochureFormData {
  readonly modalId: string
  readonly triggerSource: string
  readonly submissionId: string
}

export interface NavigationProps {
  readonly isMenuOpen: boolean
  readonly onMenuToggle: () => void
  readonly bannerVisible?: boolean
}

export interface MobileMenuProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export interface ContactFormProps {
  readonly formData: FormData
  readonly onSubmit: (e: React.FormEvent) => void
  readonly onChange: (field: keyof FormData, value: string) => void
}