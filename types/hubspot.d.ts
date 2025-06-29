interface Window {
  hbspt?: {
    forms: {
      create: (config: {
        region: string
        portalId: string
        formId: string
        target: string
        onFormSubmitted?: (formData: any) => void
      }) => void
    }
  }
}