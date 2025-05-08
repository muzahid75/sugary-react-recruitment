interface TokenResponse {
    Token: string;
    RefreshToken: string;
  }
  
  export const storeTokens = (res: TokenResponse): void => {
    const { Token, RefreshToken } = res;
    console.log('[storeTokens] Storing tokens:', { accessToken: Token, refreshToken: RefreshToken });
  
    localStorage.setItem('accessToken', Token);
    localStorage.setItem('refreshToken', RefreshToken);
  };
  
  export const getAccessToken = (): string => {
    const token = localStorage.getItem('accessToken');
    console.log('[getAccessToken] Access token:', token);
    return token ?? '';
  };
  
  export const getRefreshToken = (): string => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('[getRefreshToken] Refresh token:', refreshToken);
    return refreshToken ?? '';
  };
  
  export const debugToken = (): void => {
    const token = getAccessToken();
    if (!token) {
      console.warn('[debugToken] No access token found.');
      return;
    }
  
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = atob(base64Payload);
      const payload = JSON.parse(decodedPayload);
      console.log('[debugToken] Decoded token payload:', payload);
    } catch (err) {
      console.error('[debugToken] Failed to decode token:', err);
    }
  };
  