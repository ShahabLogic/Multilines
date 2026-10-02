import React from 'react';
import { SiteContext, SiteProvider, useSite } from './SiteContext';

export const ConfigContext = SiteContext;
export const ConfigProvider = ({ children }) => <SiteProvider>{children}</SiteProvider>;
export const useConfig = useSite;
