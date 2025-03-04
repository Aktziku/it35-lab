import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonInput, 
      IonInputPasswordToggle, 
      IonItem, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
    const doLogin = () => {
        navigation.push('/it35-lab/app','forward','replace');
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>



        <IonContent className='ion-padding'>
        <IonItem>
        <IonInput label="Email" type="email" placeholder="Input Your Email"></IonInput>
      </IonItem>

        <IonInput type="password" label="Password" value="" placeholder="Password">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>

        <IonButton onClick={() => doLogin()} expand="full">
            Login    
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;