/**
 * Auth middlewares.
 */

// External imports.
import { Request, Response, NextFunction } from "express"
import { createRemoteJWKSet, jwtVerify } from "jose"

// Utility imports.
import { UnauthorizedError } from "@utils/exceptions"
import { URL } from "url"
import { IncomingHttpHeaders } from "http"

// Config imports.
import config from "@config"

/**
 * JSON Web Token payload type.
 */
export interface Payload {
  iss: string
  sub: string
  aud: string | string[]
  iat: number
  exp: number
  azp: string
  scope: string
  gty?: "client-credentials" | string
  permissions?: string[]
}

// Cached map of keys used to verify signatures.
const keychain = {}

function extractPayload(jwt: string): Payload {
  const payloadBase64 = jwt.split(".")[1]
  const payloadJSON = Buffer.from(payloadBase64, "base64").toString()
  const payload = JSON.parse(payloadJSON)
  return payload
}

async function verifySignature(jwt: string): Promise<Payload> {
  try {
    const payload = extractPayload(jwt)
    const JWKS = createRemoteJWKSet(
      new URL(`${payload.iss}.well-known/jwks.json`),
    )
    await jwtVerify(
      jwt,
      async (header, input) => {
        const keyId = header.kid
        if (!keyId) throw new UnauthorizedError("Malformed token.")
        let key = keychain[payload.iss]?.[keyId]
        if (!key) {
          key = await JWKS(header, input)
          keychain[payload.iss] = {
            ...keychain[payload.iss],
            [keyId]: key,
          }
        }
        return key
      },
      {
        issuer: config.authExpectedIssuer || undefined,
        audience: config.authExpectedAudience || undefined,
      },
    )
    return payload
  } catch (error) {
    throw new UnauthorizedError("Unable to verify token signature.")
  }
}

interface CheckAuthInput {
  headers: IncomingHttpHeaders
}
async function checkAuth({ headers }: CheckAuthInput) {
  const header = headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    throw new UnauthorizedError("Malformed Authorization header.")
  }
  const token = header.substring(7)
  const payload = await verifySignature(token)
  const actorId = payload.sub.endsWith("@clients")
    ? payload.sub.split("@")[0]
    : payload.sub.split("|")[1]
  const system = payload.sub.endsWith("@clients")
  return {
    sub: payload.sub,
    id: actorId,
    permissions: payload.permissions || [],
    system,
  }
}

/**
 * Express auth handler.
 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const actor = await checkAuth({ headers: req.headers })
  req.actor = actor
  next()
}
