
import StoreProvider from "./redux/StoreProvider"


export const getServerSideProps = StoreProvider.getServerSideProps( (store) =>
  async (context) => {

  const state = store.getState()
     
     // Redirect to login if user doesnt exist in redux state
     if (!state.auth.user) {
         return {
             redirect: {
                 permanent: false,
                 destination: "/login"
             }
         }
     // If user is logged in render profile page
     } else {        
         return {props:{}}
     }    
})