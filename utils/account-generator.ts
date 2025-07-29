import { randomInt } from 'crypto';
export function generateEmailAddress(
  firstName: string = 'JohnDoe',
  domain: string = 'example.com'
): string {
  const formattedFirstName = firstName.toLowerCase().replace(/\s+/g, '');
  const timestamp = Date.now();
  return `${formattedFirstName}+${timestamp}@${domain}`;
}

export function generatePassword(
  length: number = randomInt(8, 16), // Default length between 8 and 16
  includedSpecialChars: string = '!@#$%^&*()_+[]{}|;:,.<>?~`',// Default special characters
  includeUpperCase: boolean = true,
  includeLowerCase: boolean = true,
  includeDigit: boolean = true
): string {
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digitChars = '0123456789';
  let password = '';
  if (includeLowerCase) {
    let selectedChars = randomInt(0, lowerCaseChars.length);
    password += lowerCaseChars[selectedChars];
  }
  if (includeUpperCase) {
      let selectedChars = randomInt(0, upperCaseChars.length);
      password += upperCaseChars[selectedChars];
  }
  if (includeDigit) {
      let selectedChars = randomInt(0, digitChars.length); 
      password += digitChars[selectedChars];
  }
  if (includedSpecialChars.length > 0) {
      let selectedChars = randomInt(0, includedSpecialChars.length);
      password += includedSpecialChars[selectedChars];
  }
  while (password.length < length) {
    const allChars = [
      ...(includeLowerCase ? lowerCaseChars : ''),
      ...(includeUpperCase ? upperCaseChars : ''),
      ...(includeDigit ? digitChars : ''),
      ...includedSpecialChars
    ].join('');
    const randomIndex = randomInt(0, allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

export function generatePsudoName(
  length: number = randomInt(3, 8)
): string {
  return generatePassword(length, '', true, true, false);
}