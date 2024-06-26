import { useCallback, useEffect, useState } from 'react'
import { useUserRegister } from '../../features/register/useUserRegister'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'
import { useLogin } from '../../features/auth/useLogin'
import Input from '../Input'

const LoginModal = () => {
  const registerModal = useUserRegister()
  const { login, onClose, isOpen, userData, isAuthenticated} = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    onClose()
    registerModal.onOpen()
    console.log(registerModal)
  }, [registerModal, onClose])

  useEffect(() => {
    if (isAuthenticated) {
      console.log("UserData",userData?.token)
      setPassword('')
      sessionStorage.setItem('auth_token', userData?.token || '')
      sessionStorage.setItem('user', username)
      onClose()
    }
  }, [isAuthenticated, onClose, userData?.token, username])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      login(username, password)
    } catch (e) {
      toast.error('Erro na submissão:')
    } finally {
      setIsLoading(false)
    }
  }, [login, username, password])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Não possui conta?
        <span
          onClick={onToggle}
          className="
          text-blue-500
          cursor-pointer
          hover:underline
          pl-1
          "
        >
          Crie uma conta
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Entrar"
      body={bodyContent}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      footer={footerContent}
    />
  )
}

export default LoginModal
