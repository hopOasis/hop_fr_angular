const nameValidator = (name: string): boolean => {
  // have to add Ukrainian letters
  const nameMatch =
    name.match(
      /^[А-Яа-яІіЇїЄєҐґ']{3,30}([А-Яа-яІіЇїЄєҐґ'\s'`-]{3,30}){0,1}$/g,
    ) === null
      ? false
      : true;
  return name.length >= 3 && nameMatch;
};

const emailValidator = (email: string): boolean => {
  // it should be checked
  return email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g) ===
    null
    ? true
    : false;
};

const phoneValidator = (phone: string): boolean =>
  phone.match(/(\+)+([0-9]){13}/) === null ? false : true;

export { nameValidator, emailValidator, phoneValidator };
