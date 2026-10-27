type TCookieOptions = {
  // Sem maxAge o cookie é de sessão: some quando o navegador fecha.
  maxAge?: number;
};

export const getCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookie = document.cookie
    .split('; ')
    .find(item => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
};

export const setCookie = (
  name: string,
  value: string,
  { maxAge }: TCookieOptions = {},
) => {
  const attributes = ['path=/', 'samesite=lax'];

  if (maxAge) {
    attributes.push(`max-age=${maxAge}`);
  }

  if (window.location.protocol === 'https:') {
    attributes.push('secure');
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; ${attributes.join('; ')}`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};
