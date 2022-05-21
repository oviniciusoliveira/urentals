export interface TokenAdapterInterface {
  generateToken(
    payload: Record<string, any>,
    secretKey: string,
    userID: string | number,
    expiresIn: number,
  ): Promise<string>;

  verifyToken(token: string, secretKey: string): Promise<Record<string, any>>;
}
