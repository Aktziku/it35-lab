import { 
  IonAvatar,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonItem, 
      IonLabel, 
      IonList, 
      IonMenuButton, 
      IonPage, 
      IonSearchbar, 
      IonText, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Search: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Search</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonContent className='ion-padding-top'>
          <IonText color='midium'className='ion-margin'>2 results</IonText>
          <IonList className='ion-margin-top'>
              <IonItem className='ion-margin-bottom'>
                <IonAvatar slot='start'>
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="" />
                </IonAvatar>
                <IonLabel>Iron Man</IonLabel>
              </IonItem>

              <IonItem className='ion-margin-bottom'>
                <IonAvatar slot='start'>
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="" />
                </IonAvatar>
                <IonLabel>Thor</IonLabel>
              </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Search;