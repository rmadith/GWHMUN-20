/* global neveWhiteLabel, wp */
import Card from './Card';
import Header from './Header';
import { saveOption } from '../utils/rest';
import classnames from 'classnames';

const { useState, useEffect } = wp.element;
const { Snackbar, Button } = wp.components;
const { __ } = wp.i18n;

const App = () => {
  const { optionKey } = neveWhiteLabel;
  const [ settings, setSettings ] = useState(neveWhiteLabel.options);
  const [ saving, setSaving ] = useState(false);
  const [ toast, setToast ] = useState('');
  const [ toastClasses, setToastClasses ] = useState('');

  const updateSetting = (slug, value) => {
    setSettings({
      ...settings,
      [slug]: value
    });
  };

  const updateToast = (message) => {
    setToast(message);
    setToastClasses('visible');
    setTimeout(() => {
      setToastClasses('');
    }, 2500);
  };

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    saveOption(optionKey, JSON.stringify(settings)).then(r => {
      if (! r.success) {
        updateToast(__('An error occurred. Please refesh and try again.', 'neve'));
        setSaving(false);
        return false;
      }

      updateToast(__('Options Updated.', 'neve'));
      setSaving(false);
    });
  };

  return (
    <>
      <Header/>
      <form onSubmit={save} className="container content">
        <div className="main">
          <div className="columns">
            <div className="col">
              <Card type='agency' updateSetting={updateSetting} settings={settings}/>
              <Card type='plugin' updateSetting={updateSetting} settings={settings}/>
            </div>
            <div className="col col-last">
              <Card type='theme' updateSetting={updateSetting} settings={settings}/>
            </div>
          </div>
        </div>
        <Card type='sidebar' updateSetting={updateSetting} settings={settings}>
          <hr/>
          <Button
            type="submit"
            disabled={saving}
            className="save"
            isPrimary>
            {saving ? __('Saving', 'neve') + '...' : __('Save Options', 'neve')}
          </Button>
        </Card>
      </form>
      {
        <Snackbar className={classnames([ 'dash-notice', toastClasses ])}>
          {toast}
        </Snackbar>
      }
    </>
  );

};

export default App;
