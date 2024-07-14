import { Link } from 'react-router-dom';

export  const PageNotFound = () => {
  return (
    <div className="flex flex-col align-middle justify-center text-center p-2 mt-56">
      <h1 style={styles.heading}>404 - Página Não Encontrada</h1>
      <p style={styles.text}>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/" style={styles.link}>Voltar para a Home</Link>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  link: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
}
