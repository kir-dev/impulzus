import { ReactNode, createContext } from 'react'
import { UserEntity } from '../users/dto/UserEntity.dto'

export type AuthContextType = {
  isLoggedIn: boolean
  loggedInUser: UserEntity | undefined
  loggedInUserLoading: boolean
  loggedInUserError: unknown
  onLoginSuccess: (jwt: string) => void
  onLoginStarted: () => void
  onLogout: (path?: string) => void
  refetchUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: undefined,
  loggedInUserLoading: false,
  loggedInUserError: undefined,
  onLoginSuccess: () => {},
  onLoginStarted: () => {},
  onLogout: () => {},
  refetchUser: async () => {}
})

enum CookieKeys {
  IMPULZUS_JWT_TOKEN = 'IMPULZUS_JWT_TOKEN'
}

type Props = {
  children: ReactNode
}

/*export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.IMPULZUS_JWT_TOKEN) !== 'undefined')
  const {
    isLoading,
    data: user,
    error
  } = useQuery('currentUser', userModule.fetchCurrentUser, {
    enabled: isLoggedIn,
    retry: false,
    onSuccess: (data) => {
      if (data.jwt) {
        Cookies.set(CookieKeys.IMPULZUS_JWT_TOKEN, data.jwt, { expires: 2 })
      }
    }
  })

  const onLoginSuccess = (jwt: string) => {
    Cookies.set(CookieKeys.IMPULZUS_JWT_TOKEN, jwt, { expires: 2 })
    setIsLoggedIn(true)
    queryClient.invalidateQueries('currentUser')
  }

  const onLoginStarted = () => {
    window.location.href = `${HOST}/auth/login`
  }

  const onLogout = (path: string = PATHS.INDEX) => {
    Cookies.remove(CookieKeys.IMPULZUS_JWT_TOKEN)
    setIsLoggedIn(false)
    queryClient.invalidateQueries('currentUser')
    navigate(path, { replace: true })
  }

  const refetchUser = async () => {
    return queryClient.invalidateQueries('currentUser')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUserLoading: isLoading,
        loggedInUser: user,
        loggedInUserError: error,
        onLoginSuccess,
        onLoginStarted,
        onLogout,
        refetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}*/
