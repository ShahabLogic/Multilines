import React, { useContext } from 'react';
import { ConfigContext } from '../context/ConfigContext';

function DynamicPage({ path }) {
  const { config } = useContext(ConfigContext);
  const pageData = config.customLinks.find(link => link.path === path);

  if (!pageData) {
    return <div style={{ padding: '50px', textAlign: 'center' }}><h2>Page not found</h2></div>;
  }

  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: 'auto' }}>
      <h1>{pageData.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
}

export default DynamicPage;
