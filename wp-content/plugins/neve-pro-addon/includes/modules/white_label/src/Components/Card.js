/* global neveWhiteLabel */
import classnames from 'classnames';

const { ToggleControl } = wp.components;

const Card = ({ type, updateSetting, settings, children }) => {
  const { assetsURL } = neveWhiteLabel;
  const { icon, title, fields } = neveWhiteLabel.fields[type];
  return (
    <div className={`${type} card`}>
      <div className="card-header">
        {icon && <img className="icon" src={assetsURL + icon} alt="icon"/>}
        {title && <h3 className="title">{title}</h3>}
      </div>
      <div className="card-content">
        {
          Object.keys(fields).map(key => {
            const { type, label, description } = fields[key];
            return (
              <div className={classnames([ 'field-wrap', key ])}>
                {('text' === type || 'url' === type) &&
                <>
                  <label htmlFor={key}>{label}:</label>
                  <input
                    type={type}
                    id={key}
                    value={settings[key]}
                    onChange={(e) => {
                      updateSetting(key, e.target.value);
                    }}
                  />
                </>
                }
                {'textarea' === type &&
                <>
                  <label htmlFor={key}>{label}:</label>
                  <textarea
                    id={key}
                    value={settings[key]}
                    onChange={(e) => {
                      updateSetting(key, e.target.value);
                    }}
                  />
                </>
                }
                {'toggle' === type &&
                <>
                  <ToggleControl
                    checked={settings[key]}
                    label={label}
                    onChange={(newValue) => {
                      updateSetting(key, newValue);
                    }}/>
                  {(settings[key] && description) &&
                  <p className="description">{description}</p>
                  }
                </>
                }
              </div>
            );
          })
        }
        {children}
      </div>
    </div>
  );
};

export default Card;
