export interface TokenAdapterInterface {
  generateToken(
    payload: Record<string, any>,
    secretKey: string,
    userID: string | number,
    expiresIn: number,
  ): Promise<string>;
}
