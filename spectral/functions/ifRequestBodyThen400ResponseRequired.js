export default (input) => {
  if ('requestBody' in input && !('responses' in input && '400' in input.responses)) {
    return [
      {
        message: 'Operations with requestBody must have a response with status code 400'
      }
    ]
  }
};
