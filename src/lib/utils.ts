export const encrypt = (str: string, shift = 3) => {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join('')
}

export const decrypt = (str: string, shift = 3) => {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('')
}

export const shuffle = <T>(arr: T[]) => {
  return [...arr].sort(() => Math.random() - 0.5)
}

export const shuffleOptions = (quiz: Quiz): Quiz => {
  if (!quiz.questions) {
    return quiz
  }

  return {
    ...quiz,
    questions: quiz.questions.map((question, id) => ({
      ...question,
      id,
      options: shuffle(question.options),
    })),
  }
}

export const getResultLabel = (results: Results, score: number) => {
  // using results: [] dynamically loading label string from results array
  const result = results.find((result) => score >= result.range[0] && score <= result.range[1])
  return result ? result.label : 'Unknown'
}
