export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts' )

   const fotosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

   const [posts, photos] = await Promise.all([postsResponse, fotosResponse])

   const postsJson = await posts.json();
   const photosJson = await photos.json();

   const postAndPhotos = postsJson.map((post, index) => (
      {...post, url: photosJson[index].url, titlePhotos : photosJson[index].title}
   ))

   return postAndPhotos
}