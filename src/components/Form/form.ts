const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export function asyncCheckPhone(name: string): boolean {
  if (!regexPhone.test(name)) {
    return false;
  }

  return true;
}
