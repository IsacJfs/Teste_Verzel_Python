import { useCallback, useEffect, useState } from 'react'
import { useUserRegister } from '@/features/register/useUserRegister'
import { useLogin } from '@/features/auth/useLogin'
import Input from '../Input'
import Modal from '../Modal'
import { RegisterData } from '@/features/register/types'
import toast from 'react-hot-toast'

const RegisterModal = () => {
  const {register, onClose, isLoading, isOpen, registerSuccess } = useUserRegister()
  const loginModal = useLogin()
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onToggle = useCallback(() => {
    onClose()
    loginModal.onOpen()
  }, [onClose, loginModal])

  useEffect(() => {
    if (registerSuccess) {
      setEmail('')
      setPassword('')
      setFullName('')
      setUsername('')
      setConfirmPassword('')
      onClose()
    }
  }, [registerSuccess, onToggle, onClose])

  const onSubmit = useCallback(async () => {
    const userData: RegisterData = {
      email: email,
      password: password,
      username: username,
      full_name: fullName
    }
    try {
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem')
      }
      await register(userData)

    } catch (e) {
      toast.error('Erro na submissão:' + e)
    }
  }, [email, password, username, fullName, confirmPassword, register])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Nome Completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Senha"
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Confirmar senha"
        value={confirmPassword}
        type='password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Já possui conta?
        <span
          onClick={onToggle}
          className="
          text-blue-500
          cursor-pointer
          hover:underline
          pl-1
          "
        >
          Entrar
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      title="Criar uma conta"
      actionLabel="Registrar"
      body={bodyContent}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      footer={footerContent}
    />
  )
}

export default RegisterModal
