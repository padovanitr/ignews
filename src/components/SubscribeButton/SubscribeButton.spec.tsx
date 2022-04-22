import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession, signIn } from 'next-auth/react'
import { SubscribeButton } from '.'
import { useRouter } from 'next/router'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton', () => {
    it('should renders correclty', () => {
        const sessionMocked = mocked(useSession)

        sessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

        render (
            <SubscribeButton />
        )

        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)
        const sessionMocked = mocked(useSession)

        sessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })
        
        render (
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it ('redirects user to posts page when user has subscription', () => {
        const sessionMocked = mocked(useSession)
        const routerMocked = mocked(useRouter)

        const pushMock = jest.fn()

        routerMocked.mockResolvedValueOnce({
            push: pushMock,
        } as never)
        
        sessionMocked.mockReturnValueOnce({ 
            data: {
                user: {
                    name: 'Thiago Padovani',
                    email: 'padovanitr@gmail.com'
                },
                expires: '2023',
                activeSubscription: "fake-subs"
            }, 
            status: "authenticated" 
        })

        render (
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)
        expect(pushMock).toHaveBeenCalled()
    })
})
