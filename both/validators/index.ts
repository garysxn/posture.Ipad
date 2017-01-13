export function isValidEmail (address) {
  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
};

export function isValidName (value) {
    return /^[a-zA-Z ]{2,30}$/.test(value);
};

export function isValidPhone (value) {
    return /^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(value);
}