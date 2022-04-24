import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession, signIn } from 'next-auth/react'
import { SubscribeButton } from '.'

jest.mock('next-auth/react')

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
})
