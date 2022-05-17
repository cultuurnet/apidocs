export default (input, options, context) => {
  if (!input) {
    // Gives a clearer error message than truthy in cases with a lot of nested $refs.
    const field = context.path[context.path.length - 1];
    const parent = context.path[context.path.length - 2];
    const stringifiedPath = context.path.join('.');
    return [
      {
        message: '"' + parent + '" requires a ' + field
      }
    ];
  }
};
