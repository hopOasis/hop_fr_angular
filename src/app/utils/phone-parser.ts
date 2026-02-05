export const phoneParser = (phone: string): string => {
  let parsedPhone = '';
  const phoneReg = /(\+)+([0-9]){13}/;
  if (phone.match(phoneReg) && phone.length <= 9) {
    console.log(phone.length);
    parsedPhone +=
      phone.slice(0, 2) +
      phone.slice(2, 5) +
      phone.slice(5, 7) +
      phone.slice(7);
  }
  return parsedPhone;
};
