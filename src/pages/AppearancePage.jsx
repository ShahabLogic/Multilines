import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiCheck, FiEye, FiMoon, FiSave, FiSettings, FiSun, FiUsers } from 'react-icons/fi';
import { useSite } from '../context/SiteContext';
import BrandMark from '../components/BrandMark';

const accentPresets = ['#bf895f', '#c26c58', '#86a06c', '#6d8fa8', '#b481a4'];

export default function AppearancePage() {
  const { settings, settingsReady, apiAvailable, updateSettings } = useSite();
  const [draft, setDraft] = useState(settings);
  const [adminKey, setAdminKey] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' });

  useEffect(() => setDraft(settings), [settings]);

  const edit = (event) => {
    setDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (state.status !== 'idle') setState({ status: 'idle', message: '' });
  };

  const save = async (event) => {
    event.preventDefault();
    setState({ status: 'saving', message: 'Saving shared website settings…' });
    try {
      await updateSettings(draft, adminKey);
      setAdminKey('');
      setState({ status: 'success', message: 'Saved. The global theme and company details have been updated for every visitor.' });
    } catch (error) {
      setState({ status: 'error', message: error.message || 'Could not save changes.' });
    }
  };

  const resetTheme = () => setDraft((current) => ({ ...current, themeMode: 'light', accentColor: '#bf895f' }));

  return (
    <main className="inner-page appearance-page">
      <section className="appearance-hero"><div className="container appearance-hero__inner"><div><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Global appearance</span></div><p className="eyebrow">SITEWIDE SETTINGS · SHARED WITH EVERY VISITOR</p><h1>Set the tone<br /><em>for every surface.</em></h1><p>Choose the shared light or dark theme, tune the accent colour and keep company details consistent across the whole website.</p></div><div className="appearance-hero__stamp"><FiUsers /><strong>One shared<br />website theme.</strong><small>Updates publish to all visitors.</small></div></div></section>

      <section className="section appearance-content"><div className="container appearance-content__grid">
        <form className="appearance-form" onSubmit={save}>
          <div className="appearance-form__top"><div><span className="section-index"><span>01</span><i /> BRAND APPEARANCE</span><h2>Make it <em>yours.</em></h2></div><span className={`api-status${apiAvailable ? ' is-online' : ' is-offline'}`}><i /> {apiAvailable ? 'Shared settings connected' : 'Waiting for the settings API'}</span></div>
          <div className="appearance-fieldset"><span className="appearance-label">Global display mode</span><div className="theme-mode-options"><button type="button" className={`theme-mode-card${draft.themeMode === 'light' ? ' is-selected' : ''}`} onClick={() => setDraft((current) => ({ ...current, themeMode: 'light' }))} aria-pressed={draft.themeMode === 'light'}><FiSun /><span><b>Light</b><small>Warm, bright and open</small></span><i>{draft.themeMode === 'light' && <FiCheck />}</i></button><button type="button" className={`theme-mode-card theme-mode-card--dark${draft.themeMode === 'dark' ? ' is-selected' : ''}`} onClick={() => setDraft((current) => ({ ...current, themeMode: 'dark' }))} aria-pressed={draft.themeMode === 'dark'}><FiMoon /><span><b>Dark</b><small>Deep, focused and refined</small></span><i>{draft.themeMode === 'dark' && <FiCheck />}</i></button></div></div>
          <div className="appearance-fieldset"><div className="appearance-label-row"><span className="appearance-label">Brand accent colour</span><span className="appearance-hex">{draft.accentColor}</span></div><div className="color-presets">{accentPresets.map((colour) => <button key={colour} className={draft.accentColor.toLowerCase() === colour ? 'is-selected' : ''} type="button" style={{ '--swatch': colour }} onClick={() => setDraft((current) => ({ ...current, accentColor: colour }))} aria-label={`Use ${colour} as the brand accent`} />)}<label className="color-custom"><span>Custom</span><input type="color" name="accentColor" value={draft.accentColor} onChange={edit} aria-label="Select custom brand accent colour" /></label></div></div>
          <div className="appearance-fieldset"><span className="appearance-label">Company details</span><div className="appearance-form-grid"><label>Company name<input name="companyName" maxLength="90" value={draft.companyName || ''} onChange={edit} required /></label><label>Tagline<input name="tagline" maxLength="160" value={draft.tagline || ''} onChange={edit} required /></label><label>Phone / WhatsApp<input name="phone" maxLength="50" value={draft.phone || ''} onChange={edit} required /></label><label>Email<input name="email" type="email" maxLength="120" value={draft.email || ''} onChange={edit} required /></label><label>Location<input name="address" maxLength="140" value={draft.address || ''} onChange={edit} required /></label><label>Map search location<input name="mapQuery" maxLength="140" value={draft.mapQuery || ''} onChange={edit} required /></label><label className="appearance-form-grid__wide">Facebook page<input name="facebookUrl" type="url" maxLength="240" value={draft.facebookUrl || ''} onChange={edit} required /></label></div></div>
          <div className="appearance-fieldset appearance-key"><span className="appearance-label">Administrator key <small>(only if configured on the server)</small></span><input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} autoComplete="off" placeholder="Leave blank unless your server requires one" /></div>
          {state.message && <div className={`appearance-feedback appearance-feedback--${state.status}`} role="status">{state.status === 'success' && <FiCheck />}{state.message}</div>}
          <div className="appearance-form__actions"><button type="button" className="text-link text-link--dark" onClick={resetTheme}>Reset theme colours <FiArrowLeft /></button><button type="submit" className="button button--dark" disabled={state.status === 'saving' || !settingsReady}>{state.status === 'saving' ? 'Publishing…' : 'Save sitewide settings'} <FiSave /></button></div>
        </form>

        <aside className="appearance-preview-wrap"><div className="appearance-preview__header"><span><FiEye /> LIVE PREVIEW</span><small>{draft.themeMode === 'dark' ? 'DARK' : 'LIGHT'} / {draft.accentColor}</small></div><div className={`appearance-preview appearance-preview--${draft.themeMode}`} style={{ '--preview-accent': draft.accentColor }}><div className="appearance-preview__nav"><BrandMark compact companyName={draft.companyName} /><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; PROJECTS</span></div><div className="appearance-preview__body"><span className="appearance-preview__overline">SURFACES / SYSTEMS / SOLUTIONS</span><h3>Good work starts<br /><em>with good questions.</em></h3><p>Industrial flooring and protective coatings, planned for the way your space works.</p><button type="button">DISCUSS A PROJECT <FiArrowUpRight /></button></div><div className="appearance-preview__footer"><FiSettings /><span>SHARED GLOBAL THEME</span><i /></div></div><div className="appearance-publish-note"><FiUsers /><p>When saved, the server stores these settings centrally. Open visitors receive changes live; new visitors see the saved theme on arrival.</p></div><div className="appearance-safety-note"><strong>Protected shared settings</strong><p>Once an admin account exists, save changes while signed in to Product Admin or enter an <code>ADMIN_KEY</code> configured on the server. On a fresh install, shared edits are open only when no <code>ADMIN_KEY</code> or <code>ADMIN_SETUP_KEY</code> is configured. <Link to="/admin/products">Open Product Admin <FiArrowUpRight /></Link></p></div><Link to="/" className="appearance-back"><FiArrowLeft /> Return to the website <FiArrowUpRight /></Link></aside>
      </div></section>
    </main>
  );
}
