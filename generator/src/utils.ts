const NUMERALS_REGEX = /^-?[0-9]+\.?0*$/

export interface CheckIntOptions {
  positive?: boolean
}

export function checkInt (
  s: unknown,
  options: CheckIntOptions = {}
): number | undefined {
  // Check for non-numeric characters
  if (!NUMERALS_REGEX.test(s as string)) {
    return
  }

  const i = Number(s)

  if (!Number.isInteger(i)) {
    return
  }

  if (options.positive && i <= 0) {
    return
  }

  return i
}
