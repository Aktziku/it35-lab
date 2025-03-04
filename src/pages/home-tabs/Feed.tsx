import { 
  IonAvatar,
  IonButton,
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonIcon, 
      IonItem, 
      IonLabel, 
      IonList, 
      IonMenuButton, 
      IonPage, 
      IonText, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
import { chatbubbleEllipsesOutline, ellipsisHorizontal, heart, paperPlaneOutline } from 'ionicons/icons';
  
  const Feed: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Feed</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
        <IonList lines='none'>
        <IonItem className='ion-margin-top'>
            <IonAvatar slot='start'>
                <img src="https://w0.peakpx.com/wallpaper/465/459/HD-wallpaper-iron-man-minimalism-iron-man-minimalism-artist-artwork-behance-superheroes.jpg"  alt='avatar' />
            </IonAvatar>
            <IonLabel>
                <IonText>
                    Iron Man
                </IonText>
                <br />
                <IonText>
                    8 min ago
                </IonText>
            </IonLabel>
        <IonIcon slot='end' icon={ellipsisHorizontal} />
    </IonItem>
    </IonList>
          <IonCard>
          <img alt="Sample" src="https://assets-prd.ignimgs.com/2024/04/08/rdj-1712596895333.jpg?fit=bounds&width=1280&height=720" />
      <IonCardHeader>
        <IonCardTitle>Looks kinda cool Right!!</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
      
      <IonButton fill="clear">
          <IonIcon slot='start' icon={heart} />
          671
      </IonButton>

      <IonButton fill="clear" color='medium'>
        <IonIcon slot='start' icon={chatbubbleEllipsesOutline} />
        551
      </IonButton>

      <IonButton fill='clear' color='medium'>
            <IonIcon slot='start' icon={paperPlaneOutline} />
        105
        </IonButton>
    </IonCard>

    <IonList lines='none'>
        <IonItem className='ion-margin-top'>
            <IonAvatar slot='start'>
                <img src="https://wallpapers.com/images/featured/thor-qzytdg8xliuaelun.jpg"  alt='avatar' />
            </IonAvatar>
            <IonLabel>
                <IonText>
                    Thor
                </IonText>
                <br />
                <IonText>
                    20 min ago
                </IonText>
            </IonLabel>
        <IonIcon slot='end' icon={ellipsisHorizontal} />
    </IonItem>
    </IonList>
    <IonCard>
          <img alt="Sample" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiD7rNiRQrhFE15muP2m28fclYuKbsSW3kivj0-7cpRL7mu1WC9F_7g05JD43TZB2GByIQGe4pduvSRr0zWLD3qq8pLRTiY1KT8AwOfFwcasZRLleXalQdZQYUlYU9KUoXjf4TqxOwcSY/s1600/Chris-Hemsworth-Thor-Art-by-PC-Designs.jpg" />
      <IonCardHeader>
        <IonCardTitle>I am cooler than Iron Man</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
      
      <IonButton fill="clear">
          <IonIcon slot='start' icon={heart} />
          525
      </IonButton>

      <IonButton fill="clear" color='medium'>
        <IonIcon slot='start' icon={chatbubbleEllipsesOutline} />
        650
      </IonButton>

      <IonButton fill='clear' color='medium'>
            <IonIcon slot='start' icon={paperPlaneOutline} />
        150
        </IonButton>
    </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Feed;