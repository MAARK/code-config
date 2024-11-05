function useTest({ time }) {
  return {
    today: new Date(),
    date: new Date(time),
  }
}

export default useTest
