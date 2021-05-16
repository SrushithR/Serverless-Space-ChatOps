exports.handler = () => {
  console.log("Dummy lambda to generate an error");
  throw new Error();
}