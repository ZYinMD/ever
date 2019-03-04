
export const extract = (strVal, pattern) => (strVal.match(pattern) || []).pop() || '';

export const limitLength = (strVal, length) => strVal.substring(0, length);

export const extractAlphanum = (strVal) => extract(strVal, "[0-9a-zA-Z]+");

export const extractCapAlphanum = (strVal) => extract(strVal, "[0-9A-Z]+");

export const extractAlpha = (strVal) => extract(strVal, "[a-zA-Z]+");

export const extractNumeric = (strVal) => extract(strVal, "[0-9]+");

export const allowOnlyAlphaNumeric = (event) => {
  const re = /[0-9a-zA-Z:]+/g;
  if (!re.test(event.key)) {
    event.preventDefault();
  }
}

export const allowOnlyAlphas = (event) => {
  const re = /[0-9a-zA-Z-+,\s\'\/:]+/g;
  if (!re.test(event.key)) {
    event.preventDefault();
  }
}


export const allowOnlyNumeric = (event) => {
  const re = /[0-9:]+/g;
  if (!re.test(event.key)) {
    event.preventDefault();
  }
}
