import useAuthStore from "../store/authStore";

export const authRoutes = ["/upload"];
export const guestRoutes = ["/login"];
export const nullRoutes = ["/", "/profile/[userId]","/search/[searchTerm]", "/404"];


interface IProps {
  router: any;
  children: any;
}

const ProtectedRoute = ({ router, children }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const isAuthenticated:boolean = userProfile !== null;
  const isAuthRoute:boolean = authRoutes.includes(router.pathname);
  const isGuestRoute:boolean = guestRoutes.includes(router.pathname);
  
  if (!isAuthenticated && isAuthRoute) {
    router.push('/')
  }
  else if (isAuthenticated && isGuestRoute) {
    router.push('/');
  } else {
    return children;
  }

};

export default ProtectedRoute;
