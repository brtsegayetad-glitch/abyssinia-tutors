import React from 'react';

export default function FidelGame() {
  return (
    <div style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
        Fidel Fundamentals Game
      </h2>
      <div style={{ 
        width: '100%', 
        maxWidth: '800px', 
        height: '600px', 
        margin: '0 auto', 
        border: '4px solid #4F46E5', 
        borderRadius: '12px', 
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <iframe 
          src="https://brtsegayetad-glitch.github.io/fidel-fundamentals/"
          title="Fidel Fundamentals Game"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
