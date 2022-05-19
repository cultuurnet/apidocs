export default (input) => {
  if ('responses' in input
    && '400' in input.responses) {
    const description = input.responses[400].description ?? '';
    const messages = [];

    if (!description.includes("https://api.publiq.be/probs/body/missing")) {
      messages.push({
        message: "Response with status '400' in operation with 'requestBody' must mention error type 'https://api.publiq.be/probs/body/missing' in response 'description'"
      });
    }

    if (!description.includes("https://api.publiq.be/probs/body/invalid-syntax")) {
      messages.push({
        message: "Response with status '400' in operation with 'requestBody' must mention error type 'https://api.publiq.be/probs/body/invalid-syntax' in response 'description'"
      });
    }

    if (!description.includes("https://api.publiq.be/probs/body/invalid-data")) {
      messages.push({
        message: "Response with status '400' in operation with 'requestBody' must mention error type 'https://api.publiq.be/probs/body/invalid-data' in response 'description'"
      });
    }

    return messages;
  }
};
