import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

// places in next where you can variable environments and make secure procedures
// getServerSideProps (SSR) - useful for on loading pages
// getStaticProps (SSG)     - useful for on loading pages
// API routes               - useful for user's actions

export function SubscribeButton({ priceId }: SubscribeButtonProps){
    const { data: session, status } = useSession()

    function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}