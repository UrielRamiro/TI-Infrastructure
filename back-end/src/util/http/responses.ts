export const httpResponses = {
  ok: <T>(body: T) => ({
    statusCode: 200 as const,
    body
  }),
  created: <T>(body: T) => ({
    statusCode: 201 as const,
    body
  }),
  accepted: <T>(body: T) => ({
    statusCode: 202 as const,
    body
  }),
  noContent: () => ({
    statusCode: 204 as const
  }),
  redirect: (location: string) => ({
    statusCode: 302 as const,
    headers: { Location: location }
  }),
  badRequest: (errorMessage?: string, displayMessage?: string) => ({
    statusCode: 400 as const,
    body: {
      errorCode: 'BAD_REQUEST',
      errorMessage: errorMessage || 'Bad request',
      displayTitle: 'Requisição inválida',
      displayMessage: displayMessage || 'Requisição inválida'
    }
  }),
  notFound: (message?: string) => ({
    statusCode: 404 as const,
    body: {
      errorCode: 'NOT_FOUND',
      errorMessage: 'Not found',
      displayTitle: 'Não encontrado',
      displayMessage: message || 'Não encontrado'
    }
  }),
  forbidden: (errorMessage?: string, displayMessage?: string) => ({
    statusCode: 403 as const,
    body: {
      errorCode: 'FORBIDDEN',
      errorMessage: errorMessage || 'Forbidden',
      displayTitle: 'Você não tem acesso à este recurso',
      displayMessage: displayMessage || 'Você não tem acesso à este recurso'
    }
  })
}
