export function evaluateFormula(value: string, data: string[][]) {

  if (!value.startsWith("=")) return value

  try {

    let expression = value.substring(1)

    expression = expression.replace(/[A-Z][0-9]+/g, (match) => {

      const col = match.charCodeAt(0) - 65
      const row = parseInt(match.substring(1)) - 1

      const cellValue = data[row]?.[col]

      return cellValue || "0"
    })

    return eval(expression)

  } catch {
    return "ERROR"
  }

}