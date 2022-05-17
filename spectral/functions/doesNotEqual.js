export default (input, options, context) => {
  if (input === options.value) {
    return [
      {
        message: '#{{print(\"property\")}}must not equal ' + JSON.stringify(options.value)
      }
    ]
  }
};
