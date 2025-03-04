import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonInput, 
      IonInputPasswordToggle, 
      IonItem, 
      IonList, 
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



        <IonContent className='ion-padding ion-text-center'>
      
      <IonList className='ion-margin-bottom'>
      <IonItem className='ion-no-margin'>
        <IonInput  type="email" placeholder="Email"></IonInput>
      </IonItem>

      <IonItem className='ion-no-margin'> 
        <IonInput type="password"  value="" placeholder="Password">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>
     </IonItem>
     </IonList>

        <IonButton onClick={() => doLogin()} expand="full">
            Login    
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;