export function getProviderFormData(formData: FormData) {
  return {
    nombre_comercial: (formData.get('nombre_comercial') || '')
      .toString()
      .trim(),
    razon_social: (formData.get('razon_social') || '').toString().trim(),
    ruc: (formData.get('ruc') || '').toString().trim(),
    contacto_principal: (formData.get('contacto_principal') || '')
      .toString()
      .trim(),
    telefono: (formData.get('telefono') || '').toString().trim(),
    correo: (formData.get('correo') || '').toString().trim(),
    departamento: (formData.get('departamento') || '').toString().trim(),
    direccion: (formData.get('direccion') || '').toString().trim(),
    sector: (formData.get('sector') || '').toString().trim(),
    subsector: (formData.get('subsector') || '').toString().trim(),
  };
}
