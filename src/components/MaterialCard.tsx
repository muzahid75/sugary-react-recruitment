import React from 'react';

interface MaterialCardProps {
  title: string;
  brandName: string;
  imageUrl: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ title, brandName, imageUrl }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '1rem', // ~rounded-2xl
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // shadow-md
        overflow: 'hidden',
        border: '1px solid #f3f4f6', // border-gray-100
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)')
      }
    >
      <div
        style={{
          height: '10rem', // h-40
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            height: '8rem', // h-32 or less than container
            width: '100%',
            objectFit: 'cover',
            borderRadius: '0.75rem', // rounded-xl
            marginBottom: '0.75rem', // mb-3
          }}
        />
      </div>
      <div
        style={{
          padding: '1rem', // p-4
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem', // text-lg
            fontWeight: 600, // font-semibold
            color: '#1f2937', // text-gray-800
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.875rem', // text-sm
            color: '#4b5563', // text-gray-600
          }}
        >
          {brandName}
        </p>
      </div>
    </div>

  );
};

export default MaterialCard;
