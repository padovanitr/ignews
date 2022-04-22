import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

// places in next where you can variable environments and make secure procedures
// getServerSideProps (SSR) - useful for on loading pages
// getStaticProps (SSG)     - useful for on loading pages
// API routes               - useful for user's actions

export function SubscribeButton(){
    const { data: session, status } = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        if (session.activeSubscription) {
            router.push('/posts')
            return;
        }

        try {
          const response = await api.post('/subscribe')

          const { sessionId } = response.data;
          
          const stripe = await getStripeJs()

          await stripe.redirectToCheckout({ sessionId })
        } catch (error) {
            alert(error.message)
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