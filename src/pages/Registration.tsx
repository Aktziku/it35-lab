import React, { useState } from 'react';
import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonList, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    IonToast,
    useIonRouter,
    IonInputPasswordToggle
} from '@ionic/react';

const Registration: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const doRegister = () => {
        if (localStorage.getItem(email)) {
            setToastMessage('User already exists');
            setShowToast(true);
        } else {
            localStorage.setItem(email, password);
            setToastMessage('Registration successful');
            setShowToast(true);
            setTimeout(() => {
                navigation.push('/it35-lab', 'forward', 'replace');
            }, 2000); 
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
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
                <IonButton onClick={doRegister} expand="full">
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

export default Registration;