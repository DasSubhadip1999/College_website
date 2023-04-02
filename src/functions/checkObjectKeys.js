const checkObjectKeys = (incoming) => {
  if (!Object.keys(incoming).length)
    return { status: false, message: "Please send an object" };

  const sample = ["name", "email", "age"];

  for (let i = 0; i < sample.length; i++) {
    if (!incoming[sample[i]]) {
      return { status: false, message: `Please include ${sample[i]}` };
    }
  }

  return { status: true, message: "Every thing is fine" };
};

export default checkObjectKeys;
