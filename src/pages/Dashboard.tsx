import { useEffect, useState } from 'react';
import { getMaterials } from '../api/materialService';
import { useAuth } from '../context/AuthContext';
import MaterialCard from '../components/MaterialCard';

const Dashboard = () => {
  const auth = useAuth();
  const [materials, setMaterials] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState(1); // Responsive columns

  // Responsive grid column setup
  useEffect(() => {
    const updateGridColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(4);
      else if (width >= 992) setColumns(3);
      else if (width >= 640) setColumns(2);
      else setColumns(1);
    };

    updateGridColumns();
    window.addEventListener('resize', updateGridColumns);
    return () => window.removeEventListener('resize', updateGridColumns);
  }, []);

  const loadMore = async () => {
    if (!auth?.tokens.accessToken || loading) return;
    setLoading(true);
    try {
      const data = await getMaterials(auth.tokens.accessToken, skip);
      setMaterials(prev => [...prev, ...data.Materials]);
      setSkip(prev => prev + 20);
    } catch (err: any) {
      setError(err.message || 'Failed to load materials.');
      console.error('Error loading materials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    if (auth?.tokens.accessToken) {
      loadMore();
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [auth?.tokens.accessToken]);

  return (
    <div
      style={{
        padding: '1rem',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: '4.5rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#ef4444',
        }}
      >
        Materials
      </h1>

      {error && (
        <p
          style={{
            color: '#ef4444',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1.5rem',
        }}
      >
        {materials.map((item, i) => (
          <MaterialCard
            key={i}
            title={item.Title}
            brandName={item.BrandName}
            imageUrl={`https://d1wh1xji6f82aw.cloudfront.net/${item.CoverPhoto}`}
          />
        ))}
      </div>

      {loading && (
        <p
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            color: '#3b82f6',
            fontWeight: 500,
          }}
        >
          Loading more...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
