import React, { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('appConfig');
    return saved ? JSON.parse(saved) : {
      companyName: 'Floors Like Glass',
      phone: '(845) 294 - 9466',
      address: 'Visit us - New Hampton, NY',
      logoUrl: '',
      clientType: 'both', // 'services', 'products', 'both'
      customLinks: [],
      footerEmail: 'floorslikeglass@gmail.com',
      footerAddress: '135 Gate Schoolhouse Rd, New Hampton, NY 10958',
      footerFacebook: 'https://www.facebook.com/floorslikeglass/',
      footerInstagram: 'https://www.instagram.com/floorslikeglass/',
      footerLinkedin: 'https://www.linkedin.com/in/floors-like-glass-dawn-3356618a/',
      footerCopyrightText: '©Copyright | Floors Like Glass | All Rights Reserved',
    };
  });

  useEffect(() => {
    localStorage.setItem('appConfig', JSON.stringify(config));
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
