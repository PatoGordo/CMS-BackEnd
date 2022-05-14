export async function validateString(
  string?: string[] | string,
  whatWrong?: string[] | string
) {
  if (typeof string === "string" && typeof whatWrong === "string") {
    if (!string || string.trim() === "") {
      throw new Error(`"${whatWrong}" is a require parameter in the request.`);
    }
    return;
  }

  if (typeof string === "object" && typeof whatWrong === "object") {
    string.forEach((str, index) => {
      if (!str || str.trim() === "") {
        throw new Error(
          `"${whatWrong[index]}" is a require parameter in the request.`
        );
      }
      return;
    });
  }
}
