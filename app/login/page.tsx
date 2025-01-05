import { Button } from '@nextui-org/button'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="container mx-auto">
        <div className="max-w-xl mx-auto">
            <form className="flex flex-col">
                <h1 className="text-primary text-3xl my-10">Log in or sign up</h1>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <div className="grid grid-flow-col justify-stretch py-5 gap-5">
                    <Button formAction={login} type="submit" color="primary">Log in</Button>
                    <Button formAction={signup} type="submit" color="secondary">Sign up</Button>
                </div>
            </form>
        </div>
    </div>
  )
}