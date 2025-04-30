import { useState, useEffect } from 'react';
import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon, IonPopover } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { colorFill, pencil, trash } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  image_url?: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          post_id,
          user_id,
          username,
          avatar_url,
          post_content,
          post_created_at,
          post_updated_at,
          image_url
        `)
        .order('post_created_at', { ascending: false });
    
      if (!error && data) {
        setPosts(data as Post[]);
      } else {
        console.error('Error fetching posts:', error);
      }
    };
    fetchUser();
    fetchPosts();
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      if (!user?.id) {
        console.error('No user ID found');
        return null;
      }
  
      const fileExt = file.name.split('.').pop();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const fileName = `${uniqueId}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
  
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
  
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw uploadError;
      }
  
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);
  
      return publicUrl;
  
    } catch (error) {
      console.error('Error in uploadImage:', error);
      return null;
    }
  };
  // Replace your existing createPost function
const createPost = async () => {
  if (!postContent || !user || !username) return;

  try {
    let imageUrl = null;
    
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) {
        console.error('Failed to upload image');
        return;
      }
    }

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        post_content: postContent, 
        user_id: user.id, 
        username,
        avatar_url: avatarUrl,
        image_url: imageUrl 
      }])
      .select();

    if (error) {
      console.error('Error creating post:', error);
      return;
    }

    if (data) {
      // Ensure the avatar_url is included in the new post
      const newPost = {
        ...data[0],
        avatar_url: avatarUrl
      } as Post;
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedImage(null);
      setImagePreview(null);
    }

  } catch (error) {
    console.error('Error in createPost:', error);
  }
};

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <IonContent>
        {user ? (
          <>
            <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Create Post</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    id="new-post-content"
                    value={postContent}
                    onIonChange={e => setPostContent(e.detail.value!)}
                    placeholder="Write a post..."
                  />
                  <input
                    id="post-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    style={{ marginTop: '1rem' }}
                  />
                  {imagePreview && (
                    <div style={{ marginTop: '1rem', maxWidth: '100%' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
                    <IonButton onClick={createPost}>Post</IonButton>
                  </div>
                </IonCardContent>
            </IonCard>
  
            {posts.map(post => (
              <IonCard key={post.post_id} style={{ marginTop: '2rem' }}>
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="1.85">
                      <IonAvatar>
                        <img alt={post.username} src={post.avatar_url} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle style={{ marginTop: '10px' }}>{post.username}</IonCardTitle>
                      <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size="auto">
                      <IonButton
                        fill="clear"
                        onClick={(e) =>
                          setPopoverState({
                            open: true,
                            event: e.nativeEvent,
                            postId: post.post_id,
                          })
                        }
                      >
                        <IonIcon color="secondary" icon={pencil} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>
  
                <IonCardContent>
                  <IonText style={{ color: 'black' }}>
                    <h1>{post.post_content}</h1>
                  </IonText>
                  {post.image_url && (
                    <div style={{ marginTop: '1rem', maxWidth: '100%' }}>
                      <img 
                        src={post.image_url} 
                        alt="Post image" 
                        style={{ maxWidth: '100%', height: 'auto' }}
                        onError={(e) => {
                          console.error('Image failed to load:', e);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </IonCardContent>
  
                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() =>
                    setPopoverState({ open: false, event: null, postId: null })
                  }
                >
                  <IonButton
                    fill="clear"
                    onClick={() => {
                      startEditingPost(post);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                  >
                    Edit
                  </IonButton>
                  <IonButton
                    fill="clear"
                    color="danger"
                    onClick={() => {
                      deletePost(post.post_id);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                  >
                    Delete
                  </IonButton>
                </IonPopover>
              </IonCard>
            ))}
          </>
        ) : (
          <IonLabel>Loading...</IonLabel>
        )}
      </IonContent>
  
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonInput
            id="edit-post-content"
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
          />
        </IonContent>
        <IonFooter>
          <IonButton onClick={savePost}>Save</IonButton>
          <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </IonFooter>
      </IonModal>
  
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully!"
        buttons={['OK']}
      />
    </>
  );
  

};

export default FeedContainer;