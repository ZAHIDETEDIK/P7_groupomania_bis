// Permet de vérifier que l'utilisateur dispose bien d'un token pour accéder à la page demandée
export default function auth (to, from, next) {
    if (!localStorage.getItem('token')) {
      next({ name: 'Home' });
      return false
    }
    return next()
}