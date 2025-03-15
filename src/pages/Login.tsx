import React, { useState } from 'react';
import { 
    IonButton,
    IonContent, 
    IonHeader, 
    IonInput, 
    IonInputPasswordToggle, 
    IonItem, 
    IonList, 
    IonPage, 
    IonTitle, 
    IonToast, 
    IonToolbar, 
    useIonRouter
} from '@ionic/react';

const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const doLogin = () => {
        const storedPassword = localStorage.getItem(email);
        if (storedPassword && storedPassword === password) {
            navigation.push('/it35-lab/app', 'forward', 'replace');
        } else {
            setToastMessage('Invalid email or password');
            setShowToast(true);
        }
    };

    const doRegister = () => {
        navigation.push('/it35-lab/register', 'forward', 'replace');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding ion-text-center'>
                <IonList className='ion-margin-bottom'>
                    <IonItem className='ion-no-margin'>
                        <IonInput 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onIonChange={e => setEmail(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem className='ion-no-margin'> 
                        <IonInput 
                            type="password"  
                            placeholder="Password" 
                            value={password} 
                            onIonChange={e => setPassword(e.detail.value!)}
                        >
                            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                        </IonInput>
                    </IonItem>
                </IonList>

                <IonButton onClick={doLogin} expand="full">
                    Login
                </IonButton>
                or
                <IonButton onClick={doRegister} expand="full" color="secondary">
                    Register
                </IonButton>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;