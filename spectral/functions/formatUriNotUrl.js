export default (input) => {
  if (input === 'url') {
    return [
      {
        message: "Format 'url' does not exist, did you mean 'uri'?"
      }
    ]
  }
};
