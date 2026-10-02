import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const DEFAULT_SETTINGS = {
  companyName: 'Multilines Coating Solutions',
  phone: '0303-4446027',
  email: 'Imtiaz.ali@coatingsolutions.com.pk',
  address: 'Lahore, Pakistan',
  facebookUrl: 'https://www.facebook.com/ResinFlooringPakistan/',
  mapQuery: 'Lahore, Pakistan',
  themeMode: 'light',
  accentColor: '#bf895f',
  tagline: 'High-performance surfaces. Built for the way you work.'
};

export const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsReady, setSettingsReady] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  const receiveSettings = useCallback((next) => {
    if (next && typeof next === 'object') {
      setSettings((current) => ({ ...current, ...next }));
      setApiAvailable(true);
      setSettingsReady(true);
    }
  }, []);

  useEffect(() => {
    let live = true;
    const syncSettings = () => fetch('/api/settings', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Settings service unavailable');
        return response.json();
      })
      .then((data) => { if (live) receiveSettings(data); })
      .catch(() => { if (live) { setApiAvailable(false); setSettingsReady(true); } });

    syncSettings();
    const poll = window.setInterval(syncSettings, 20000);
    let stream;
    if (typeof window.EventSource !== 'undefined') {
      stream = new EventSource('/api/events');
      stream.addEventListener('settings', (event) => {
        try { receiveSettings(JSON.parse(event.data)); } catch (error) { /* ignore malformed stream payload */ }
      });
    }
    return () => {
      live = false;
      window.clearInterval(poll);
      if (stream) stream.close();
    };
  }, [receiveSettings]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.themeMode === 'dark' ? 'dark' : 'light';
    root.style.setProperty('--accent', /^#[0-9a-fA-F]{6}$/.test(settings.accentColor) ? settings.accentColor : DEFAULT_SETTINGS.accentColor);
    root.style.colorScheme = settings.themeMode === 'dark' ? 'dark' : 'light';
  }, [settings.themeMode, settings.accentColor]);

  const updateSettings = useCallback(async (nextSettings, adminKey = '') => {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(adminKey ? { 'X-Admin-Key': adminKey } : {})
      },
      body: JSON.stringify(nextSettings)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Settings could not be saved. Please try again.');
    receiveSettings(result);
    return result;
  }, [receiveSettings]);

  const value = useMemo(() => ({ settings, config: settings, setConfig: updateSettings, settingsReady, apiAvailable, updateSettings }), [settings, settingsReady, apiAvailable, updateSettings]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used within SiteProvider');
  return value;
}
