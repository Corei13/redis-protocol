const reduce = data => {
  const { state, char, eol } = data;

  if (state === 'START') {
    if (char !== ' ') {
      return char === '"' ?
        { ...data, state: 'END', endToken: '"' }
        : reduce({ ...data, state: 'END', endToken: ' ' });
    }
  } else if (state === 'END') {
    const { endToken, buffer, args } = data;

    if (eol || char === endToken) {
      return {
        ...data,
        args: [...args, char !== endToken ? buffer + char : buffer],
        buffer: '',
        state: 'START'
      };
    }

    return {
      ...data,
      buffer: buffer + char
    };
  }
  return data;
};

const parse = command => command
  .split('')
  .reduce((data, char, index) =>
    reduce({ ...data, char, eol: index + 1 === command.length }),
    { state: 'START', args: [], buffer: '' }
  );

const encode = text => {
  const { args } = parse(text.trim());
  return args.length === 0 ? []
    : args.reduce(
      (result, arg) => [...result, `$${Buffer.byteLength(arg)}`, arg],
      [`*${args.length}`]
    );
};

export { encode };
