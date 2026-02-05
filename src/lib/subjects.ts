const SUBJECT_LABELS: Record<string, string> = {
  toan: 'Toán',
  ngu_van: 'Ngữ Văn',
  ngoai_ngu: 'Ngoại Ngữ',
  vat_li: 'Vật Lí',
  hoa_hoc: 'Hóa Học',
  sinh_hoc: 'Sinh Học',
  lich_su: 'Lịch Sử',
  dia_li: 'Địa Lí',
  gdcd: 'Giáo Dục Công Dân',
}

const LANGUAGE_CODES: Record<string, string> = {
  N1: 'Tiếng Anh',
  N2: 'Tiếng Nga',
  N3: 'Tiếng Pháp',
  N4: 'Tiếng Trung',
  N5: 'Tiếng Đức',
  N6: 'Tiếng Nhật',
  N7: 'Tiếng Hàn',
}

export function getSubjectLabel(key: string): string {
  return SUBJECT_LABELS[key] ?? key
}

export function getLanguageLabel(code: string): string {
  return LANGUAGE_CODES[code] ?? code
}
