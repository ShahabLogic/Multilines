import React, { useContext, useState, useEffect } from 'react';
import { ConfigContext } from '../context/ConfigContext';
import '../styles/ConfigPage.css';

function ConfigPage() {
  const { config, setConfig } = useContext(ConfigContext);
  const [formData, setFormData] = useState(config);
  const [newLink, setNewLink] = useState({ name: '', path: '', content: '' });
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setConfig(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.path) {
      const path = newLink.path.startsWith('/') ? newLink.path : `/${newLink.path}`;
      setFormData({
        ...formData,
        customLinks: [...(formData.customLinks || []), { ...newLink, path }]
      });
      setNewLink({ name: '', path: '', content: '' });
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = formData.customLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, customLinks: updatedLinks });
  };

  return (
    <div className="config-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>App Configuration</h2>
        <div>
          {savedMessage && <span style={{ color: 'green', marginRight: '15px', fontWeight: 'bold' }}>Settings Saved!</span>}
          <button onClick={handleSave} className="btn-save" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Save</button>
        </div>
      </div>
      
      <div className="config-section">
        <h3>Company Details</h3>
        <label>
          Company Name:
          <input type="text" name="companyName" value={formData.companyName || ''} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
        </label>
        <label>
          Address (Top bar):
          <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
        </label>
      </div>

      <div className="config-section">
        <h3>Logo Configuration</h3>
        <label>
          Logo URL (leave empty to use default):
          <input type="text" name="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} placeholder="https://example.com/logo.png" />
        </label>
        {formData.logoUrl && <img src={formData.logoUrl} alt="Preview" style={{ height: '50px', marginTop: '10px' }} />}
      </div>

      <div className="config-section">
        <h3>App Setup (Client Type)</h3>
        <label>
          Show features for:
          <select name="clientType" value={formData.clientType || 'both'} onChange={handleChange}>
            <option value="both">Both (Products & Services)</option>
            <option value="services">Services Only</option>
            <option value="products">Products Only</option>
          </select>
        </label>
      </div>

      <div className="config-section">
        <h3>Footer Details</h3>
        <label>
          Footer Email:
          <input type="text" name="footerEmail" value={formData.footerEmail || ''} onChange={handleChange} />
        </label>
        <label>
          Footer Address:
          <input type="text" name="footerAddress" value={formData.footerAddress || ''} onChange={handleChange} />
        </label>
        <label>
          Facebook URL:
          <input type="text" name="footerFacebook" value={formData.footerFacebook || ''} onChange={handleChange} />
        </label>
        <label>
          Instagram URL:
          <input type="text" name="footerInstagram" value={formData.footerInstagram || ''} onChange={handleChange} />
        </label>
        <label>
          LinkedIn URL:
          <input type="text" name="footerLinkedin" value={formData.footerLinkedin || ''} onChange={handleChange} />
        </label>
        <label>
          Copyright Text:
          <input type="text" name="footerCopyrightText" value={formData.footerCopyrightText || ''} onChange={handleChange} />
        </label>
      </div>

      <div className="config-section">
        <h3>Dynamic Pages & Navbar Links</h3>
        <div className="add-link-form">
          <input 
            type="text" 
            placeholder="Link Name (e.g., FAQ)" 
            value={newLink.name} 
            onChange={(e) => setNewLink({...newLink, name: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="Path (e.g., /faq)" 
            value={newLink.path} 
            onChange={(e) => setNewLink({...newLink, path: e.target.value})} 
          />
          <textarea 
            placeholder="Page Content (HTML supported)" 
            value={newLink.content} 
            onChange={(e) => setNewLink({...newLink, content: e.target.value})} 
          />
          <button type="button" onClick={handleAddLink}>Add Page Link</button>
        </div>

        <ul>
          {formData.customLinks && formData.customLinks.map((link, index) => (
            <li key={index}>
              <strong>{link.name}</strong> ({link.path}) 
              <button type="button" onClick={() => handleRemoveLink(index)} className="btn-remove">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <button onClick={handleSave} style={{ padding: '12px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>Save Configuration</button>
      </div>
    </div>
  );
}

export default ConfigPage;
